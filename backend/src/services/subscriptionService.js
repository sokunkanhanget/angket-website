import crypto from "node:crypto"
import prisma from "../lib/prisma.js"

const PLAN_SELECT = {
  id: true,
  name: true,
  price: true,
  durationDays: true,
  maxMembers: true,
  dailyFileLimit: true,
  dailyMessageLimit: true,
  dailyTokenLimit: true,
  isActive: true,
  supportsKhmer: true,
  supportsEnglish: true,
  supportsLiveDetection: true,
}

function httpError(status, message, code = undefined) {
  const error = new Error(message)
  error.status = status
  if (code) error.code = code
  return error
}

function startOfUtcDay(date = new Date()) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
}

function activeSubscriptionWhere(now) {
  return {
    status: "active",
    OR: [{ endDate: null }, { endDate: { gt: now } }],
  }
}

async function getSubscriptionById(id) {
  return prisma.userSubscription.findUnique({
    where: { id },
    include: { subscriptionPlan: { select: PLAN_SELECT } },
  })
}

export async function getActiveSubscription(userId) {
  const now = new Date()
  const subscription = await prisma.userSubscription.findFirst({
    where: { userId, ...activeSubscriptionWhere(now) },
    include: { subscriptionPlan: { select: PLAN_SELECT } },
    orderBy: { createdAt: "desc" },
  })
  if (subscription) return subscription

  const latest = await prisma.userSubscription.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  })
  if (!latest) throw httpError(404, "No subscription found", "SUBSCRIPTION_NOT_FOUND")
  throw httpError(403, "Subscription is expired or inactive", "SUBSCRIPTION_EXPIRED")
}

export async function getCurrentUserActiveSubscription(userId) {
  return getActiveSubscription(userId)
}

function requireFamilySubscription(subscription) {
  if (subscription.subscriptionPlan.name.toLowerCase() !== "family") {
    throw httpError(403, "Family members are available only on the Family plan", "FAMILY_PLAN_REQUIRED")
  }
  return subscription
}

function validateTelegramId(platformUserId) {
  const value = String(platformUserId ?? "")
  if (!/^\d+$/.test(value)) {
    throw httpError(400, "platformUserId must be a Telegram numeric user ID", "INVALID_TELEGRAM_ID")
  }
  return value
}

function mapFamilyMember(member) {
  return {
    id: member.id,
    added_at: member.addedAt,
    removed_at: member.removedAt,
    user: {
      id: member.botSubscriber.user.id,
      name: member.botSubscriber.user.name,
      email: member.botSubscriber.user.email,
    },
    platform: member.botSubscriber.platform,
    platform_user_id: member.botSubscriber.platformUserId,
  }
}

async function getFamilySubscriptionMembers(subscriptionId, client = prisma) {
  return client.subscriptionMember.findMany({
    where: { subId: subscriptionId, removedAt: null },
    include: {
      botSubscriber: { include: { user: true } },
    },
    orderBy: { addedAt: "asc" },
  })
}

export async function getFamilyMembers(userId) {
  const subscription = requireFamilySubscription(await getActiveSubscription(userId))
  const members = await getFamilySubscriptionMembers(subscription.id)
  return members.map(mapFamilyMember)
}

export async function isFamilyMember(userId, platformUserId) {
  const subscription = requireFamilySubscription(await getActiveSubscription(userId))
  const telegramId = validateTelegramId(platformUserId)
  const member = await prisma.subscriptionMember.findFirst({
    where: {
      subId: subscription.id,
      removedAt: null,
      botSubscriber: { platform: "telegram", platformUserId: telegramId },
    },
    select: { id: true },
  })
  return Boolean(member)
}

export async function hasFamilyMemberCapacity(userId) {
  const subscription = requireFamilySubscription(await getActiveSubscription(userId))
  const members = await getFamilySubscriptionMembers(subscription.id)
  const memberCount = 1 + members.length
  return {
    allowed: memberCount < subscription.subscriptionPlan.maxMembers,
    memberCount,
    maxMembers: subscription.subscriptionPlan.maxMembers,
    remainingSlots: Math.max(0, subscription.subscriptionPlan.maxMembers - memberCount),
  }
}

export async function addFamilyMember({ ownerUserId, platformUserId, name = "Telegram User" }) {
  const subscription = requireFamilySubscription(await getActiveSubscription(ownerUserId))
  const telegramId = validateTelegramId(platformUserId)
  if (typeof name !== "string" || name.trim().length === 0) {
    throw httpError(400, "name must be a non-empty string", "INVALID_MEMBER_NAME")
  }

  const capacity = await hasFamilyMemberCapacity(ownerUserId)
  if (!capacity.allowed) {
    throw httpError(409, "Family subscription has reached its member limit", "FAMILY_MEMBER_LIMIT_REACHED")
  }

  return prisma.$transaction(async (transaction) => {
    let botSubscriber = await transaction.botSubscriber.findFirst({
      where: { platform: "telegram", platformUserId: telegramId },
      include: { user: true },
    })

    if (botSubscriber?.userId === subscription.userId) {
      throw httpError(409, "The subscription owner cannot be added as a member", "OWNER_CANNOT_BE_MEMBER")
    }

    if (!botSubscriber) {
      const memberUser = await transaction.user.create({
        data: {
          name: name.trim(),
          email: `telegram-${telegramId}@users.angket.local`,
        },
      })
      botSubscriber = await transaction.botSubscriber.create({
        data: {
          platform: "telegram",
          platformUserId: telegramId,
          userId: memberUser.id,
        },
        include: { user: true },
      })
    }

    const existingMember = await transaction.subscriptionMember.findFirst({
      where: { subId: subscription.id, userSubId: botSubscriber.id },
    })
    if (existingMember?.removedAt) {
      const restored = await transaction.subscriptionMember.update({
        where: { id: existingMember.id },
        data: { removedAt: null },
        include: { botSubscriber: { include: { user: true } } },
      })
      return mapFamilyMember(restored)
    }
    if (existingMember) {
      throw httpError(409, "Telegram user is already a Family member", "FAMILY_MEMBER_ALREADY_EXISTS")
    }

    const member = await transaction.subscriptionMember.create({
      data: {
        userSubId: botSubscriber.id,
        subId: subscription.id,
      },
      include: { botSubscriber: { include: { user: true } } },
    })
    return mapFamilyMember(member)
  })
}

export async function removeFamilyMember({ ownerUserId, platformUserId }) {
  const subscription = requireFamilySubscription(await getActiveSubscription(ownerUserId))
  const telegramId = validateTelegramId(platformUserId)
  const member = await prisma.subscriptionMember.findFirst({
    where: {
      subId: subscription.id,
      removedAt: null,
      botSubscriber: { platform: "telegram", platformUserId: telegramId },
    },
  })
  if (!member) throw httpError(404, "Family member not found", "FAMILY_MEMBER_NOT_FOUND")

  const removed = await prisma.subscriptionMember.update({
    where: { id: member.id },
    data: { removedAt: new Date() },
    include: { botSubscriber: { include: { user: true } } },
  })
  return mapFamilyMember(removed)
}

export async function getActiveSubscriptionForBotSubscriber(platform, platformUserId, expectedUserId = undefined) {
  if (!platform || !platformUserId) {
    throw httpError(400, "platform and platformUserId are required", "INVALID_BOT_IDENTITY")
  }

  const botSubscriber = await prisma.botSubscriber.findFirst({
    where: {
      platform: String(platform),
      platformUserId: String(platformUserId),
      ...(expectedUserId ? { userId: expectedUserId } : {}),
    },
    include: {
      subscriptionMembers: {
        orderBy: { addedAt: "desc" },
        include: { userSubscription: true },
      },
    },
  })
  if (!botSubscriber) throw httpError(404, "Bot subscriber not found", "BOT_SUBSCRIBER_NOT_FOUND")

  const now = new Date()
  const activeMember = botSubscriber.subscriptionMembers.find((member) => {
    const subscription = member.userSubscription
    return !member.removedAt && subscription.status === "active" &&
      (!subscription.endDate || subscription.endDate > now)
  })
  if (activeMember) return getSubscriptionById(activeMember.subId)

  const ownerSubscription = await prisma.userSubscription.findFirst({
    where: { userId: botSubscriber.userId, ...activeSubscriptionWhere(now) },
    include: { subscriptionPlan: { select: PLAN_SELECT } },
    orderBy: { createdAt: "desc" },
  })
  if (ownerSubscription) return ownerSubscription

  throw httpError(403, "Subscription is expired or inactive", "SUBSCRIPTION_EXPIRED")
}

export async function getSubscriptionOrFree(userId) {
  try {
    return await getActiveSubscription(userId)
  } catch (error) {
    if (error.code !== "SUBSCRIPTION_NOT_FOUND" && error.code !== "SUBSCRIPTION_EXPIRED") throw error
  }

  const freePlan = await prisma.subscriptionPlan.findUnique({
    where: { id: "free" },
    select: PLAN_SELECT,
  })
  if (!freePlan) throw httpError(500, "Free subscription plan is not configured", "FREE_PLAN_NOT_CONFIGURED")

  const existingFree = await prisma.userSubscription.findFirst({
    where: { userId, subPlanId: freePlan.id, status: "active" },
    include: { subscriptionPlan: { select: PLAN_SELECT } },
    orderBy: { createdAt: "desc" },
  })
  if (existingFree) return existingFree

  const created = await prisma.userSubscription.create({
    data: {
      userId,
      subPlanId: freePlan.id,
      startDate: new Date(),
      endDate: null,
      status: "active",
    },
  })
  return getSubscriptionById(created.id)
}

export async function getCurrentPlan(userId) {
  const subscription = await getActiveSubscription(userId)
  return subscription.subscriptionPlan
}

export async function getCurrentPlanForBotSubscriber(platform, platformUserId) {
  const subscription = await getActiveSubscriptionForBotSubscriber(platform, platformUserId)
  return subscription.subscriptionPlan
}

export async function getOrCreateTodayUsage(userSubscriptionId, date = new Date()) {
  const usageDate = startOfUtcDay(date)
  return prisma.subscriptionUsage.upsert({
    where: { userSubscriptionId_usageDate: { userSubscriptionId, usageDate } },
    create: { userSubscriptionId, usageDate },
    update: {},
  })
}

export async function getTodayUsage(userSubscriptionId, date = new Date()) {
  return getOrCreateTodayUsage(userSubscriptionId, date)
}

export async function getTodayUsageForUser(userId, date = new Date()) {
  const subscription = await getActiveSubscription(userId)
  return getTodayUsage(subscription.id, date)
}

export async function getTodayUsageForBotSubscriber(platform, platformUserId, date = new Date()) {
  const subscription = await getActiveSubscriptionForBotSubscriber(platform, platformUserId)
  return getTodayUsage(subscription.id, date)
}

export function calculateRemainingLimits(plan, usage) {
  return {
    files: Math.max(0, plan.dailyFileLimit - usage.fileCount),
    messages: Math.max(0, plan.dailyMessageLimit - usage.messageCount),
    tokens: Math.max(0, plan.dailyTokenLimit - usage.tokenCount),
  }
}

function validateAmount(amount, resource) {
  if (!Number.isInteger(amount) || amount < 1) {
    throw httpError(400, `${resource} amount must be a positive integer`, "INVALID_USAGE_AMOUNT")
  }
}

async function checkLimit(subscription, usageField, limitField, amount, resource, date) {
  validateAmount(amount, resource)
  const usage = await getTodayUsage(subscription.id, date)
  const limit = subscription.subscriptionPlan[limitField]
  const used = usage[usageField]
  const remaining = Math.max(0, limit - used)
  const allowed = amount <= remaining

  return {
    allowed,
    resource,
    requested: amount,
    used,
    limit,
    remaining,
    reason: allowed ? null : `DAILY_${resource.toUpperCase()}_LIMIT_REACHED`,
    message: allowed ? null : `Daily ${resource} limit reached`,
    subscriptionId: subscription.id,
    usage,
  }
}

export async function canScanFile(userId, amount = 1, date = new Date()) {
  const subscription = await getActiveSubscription(userId)
  return checkLimit(subscription, "fileCount", "dailyFileLimit", amount, "files", date)
}

export async function canScanMessage(userId, amount = 1, date = new Date()) {
  const subscription = await getActiveSubscription(userId)
  return checkLimit(subscription, "messageCount", "dailyMessageLimit", amount, "messages", date)
}

export async function canUseTokens(userId, amount, date = new Date()) {
  const subscription = await getActiveSubscription(userId)
  return checkLimit(subscription, "tokenCount", "dailyTokenLimit", amount, "tokens", date)
}

export async function canScanFileForBotSubscriber(platform, platformUserId, amount = 1, date = new Date()) {
  const subscription = await getActiveSubscriptionForBotSubscriber(platform, platformUserId)
  return checkLimit(subscription, "fileCount", "dailyFileLimit", amount, "files", date)
}

export async function canScanMessageForBotSubscriber(platform, platformUserId, amount = 1, date = new Date()) {
  const subscription = await getActiveSubscriptionForBotSubscriber(platform, platformUserId)
  return checkLimit(subscription, "messageCount", "dailyMessageLimit", amount, "messages", date)
}

export async function canUseTokensForBotSubscriber(platform, platformUserId, amount, date = new Date()) {
  const subscription = await getActiveSubscriptionForBotSubscriber(platform, platformUserId)
  return checkLimit(subscription, "tokenCount", "dailyTokenLimit", amount, "tokens", date)
}

async function incrementUsage(subscription, field, amount, resource, date) {
  validateAmount(amount, resource)
  const usage = await getTodayUsage(subscription.id, date)
  return prisma.subscriptionUsage.update({
    where: { id: usage.id },
    data: { [field]: { increment: amount } },
  })
}

export async function incrementFileUsage(userId, amount = 1, date = new Date()) {
  return incrementUsage(await getActiveSubscription(userId), "fileCount", amount, "files", date)
}

export async function incrementMessageUsage(userId, amount = 1, date = new Date()) {
  return incrementUsage(await getActiveSubscription(userId), "messageCount", amount, "messages", date)
}

export async function incrementTokenUsage(userId, amount, date = new Date()) {
  return incrementUsage(await getActiveSubscription(userId), "tokenCount", amount, "tokens", date)
}

export async function incrementFileUsageForBotSubscriber(platform, platformUserId, amount = 1, date = new Date()) {
  return incrementUsage(await getActiveSubscriptionForBotSubscriber(platform, platformUserId), "fileCount", amount, "files", date)
}

export async function incrementMessageUsageForBotSubscriber(platform, platformUserId, amount = 1, date = new Date()) {
  return incrementUsage(await getActiveSubscriptionForBotSubscriber(platform, platformUserId), "messageCount", amount, "messages", date)
}

export async function incrementTokenUsageForBotSubscriber(platform, platformUserId, amount, date = new Date()) {
  return incrementUsage(await getActiveSubscriptionForBotSubscriber(platform, platformUserId), "tokenCount", amount, "tokens", date)
}

export async function getUsageSummary(userId, date = new Date()) {
  const subscription = await getActiveSubscription(userId)
  const usage = await getTodayUsage(subscription.id, date)
  const limits = {
    files: subscription.subscriptionPlan.dailyFileLimit,
    messages: subscription.subscriptionPlan.dailyMessageLimit,
    tokens: subscription.subscriptionPlan.dailyTokenLimit,
  }
  return {
    usage,
    plan: subscription.subscriptionPlan,
    limits,
    remaining: calculateRemainingLimits(subscription.subscriptionPlan, usage),
  }
}

export async function getUsageSummaryOrFree(userId, date = new Date()) {
  const subscription = await getSubscriptionOrFree(userId)
  const usage = await getTodayUsage(subscription.id, date)
  const limits = {
    files: subscription.subscriptionPlan.dailyFileLimit,
    messages: subscription.subscriptionPlan.dailyMessageLimit,
    tokens: subscription.subscriptionPlan.dailyTokenLimit,
  }
  return {
    usage,
    plan: subscription.subscriptionPlan,
    limits,
    remaining: calculateRemainingLimits(subscription.subscriptionPlan, usage),
  }
}

export async function getUsageSummaryForBotSubscriber(platform, platformUserId, date = new Date()) {
  const subscription = await getActiveSubscriptionForBotSubscriber(platform, platformUserId)
  const usage = await getTodayUsage(subscription.id, date)
  const limits = {
    files: subscription.subscriptionPlan.dailyFileLimit,
    messages: subscription.subscriptionPlan.dailyMessageLimit,
    tokens: subscription.subscriptionPlan.dailyTokenLimit,
  }
  return {
    usage,
    plan: subscription.subscriptionPlan,
    limits,
    remaining: calculateRemainingLimits(subscription.subscriptionPlan, usage),
  }
}


async function getOrCreateBotSubscriber(userId, platform, platformUserId, client = prisma) {
  const normalizedPlatform = platform || "web"
  const normalizedPlatformUserId = platformUserId || userId
  let botSubscriber = await client.botSubscriber.findFirst({
    where: {
      userId,
      platform: String(normalizedPlatform),
      platformUserId: String(normalizedPlatformUserId),
    },
  })
  if (!botSubscriber) {
    botSubscriber = await client.botSubscriber.create({
      data: {
        userId,
        platform: String(normalizedPlatform),
        platformUserId: String(normalizedPlatformUserId),
      },
    })
  }
  return botSubscriber
}

export async function createPendingOrder({
  userId,
  planId,
  platform,
  platformUserId,
  paymentMethod,
  idempotencyKey,
}) {
  if (!userId || !planId) {
    throw httpError(400, "planId is required", "INVALID_ORDER_REQUEST")
  }
  if (paymentMethod !== undefined && (typeof paymentMethod !== "string" || paymentMethod.length > 50)) {
    throw httpError(400, "paymentMethod must be a string of 50 characters or fewer", "INVALID_ORDER_REQUEST")
  }
  if (idempotencyKey !== undefined &&
    (typeof idempotencyKey !== "string" || idempotencyKey.trim().length === 0 || idempotencyKey.length > 100)) {
    throw httpError(400, "idempotencyKey must be a non-empty string of 100 characters or fewer", "INVALID_ORDER_REQUEST")
  }

  const plan = await prisma.subscriptionPlan.findUnique({
    where: { id: String(planId) },
    select: { id: true, price: true, isActive: true },
  })
  if (!plan) throw httpError(400, "Invalid subscription plan", "INVALID_PLAN")
  if (!plan.isActive) throw httpError(400, "Subscription plan is not available", "PLAN_INACTIVE")

  return prisma.$transaction(async (transaction) => {
    if (idempotencyKey) {
      const existing = await transaction.subscriptionOrder.findUnique({
        where: { idempotencyKey: idempotencyKey.trim() },
        include: { subscriptionPlan: { select: PLAN_SELECT } },
      })
      if (existing) {
        if (existing.userId !== userId || existing.subPlanId !== plan.id) {
          throw httpError(409, "Idempotency key is already associated with another order", "IDEMPOTENCY_KEY_CONFLICT")
        }
        return existing
      }
    }

    const botSubscriber = await getOrCreateBotSubscriber(userId, platform, platformUserId, transaction)
    try {
      return await transaction.subscriptionOrder.create({
        data: {
          token: crypto.randomBytes(10).toString("hex"),
          amount: plan.price,
          status: "pending",
          paymentMethod: paymentMethod || null,
          idempotencyKey: idempotencyKey?.trim() || null,
          botSubId: botSubscriber.id,
          subPlanId: plan.id,
          userId,
        },
        include: { subscriptionPlan: { select: PLAN_SELECT } },
      })
    } catch (error) {
      if (error.code === "P2002" && idempotencyKey) {
        return transaction.subscriptionOrder.findUniqueOrThrow({
          where: { idempotencyKey: idempotencyKey.trim() },
          include: { subscriptionPlan: { select: PLAN_SELECT } },
        })
      }
      throw error
    }
  })
}
export async function getLatestSubscription(userId) {
  return prisma.userSubscription.findFirst({
    where: { userId },
    include: { subscriptionPlan: { select: PLAN_SELECT } },
    orderBy: { createdAt: "desc" },
  })
}

export function mapPlan(plan) {
  return {
    id: plan.id,
    name: plan.name,
    price: Number(plan.price),
    duration_days: plan.durationDays,
    max_members: plan.maxMembers,
    daily_file_limit: plan.dailyFileLimit,
    daily_message_limit: plan.dailyMessageLimit,
    daily_token_limit: plan.dailyTokenLimit,
    is_active: plan.isActive,
    supports_khmer: plan.supportsKhmer,
    supports_english: plan.supportsEnglish,
    supports_live_detection: plan.supportsLiveDetection,
  }
}

export async function listPlans() {
  const plans = await prisma.subscriptionPlan.findMany({
    where: { isActive: true },
    select: PLAN_SELECT,
    orderBy: { price: "asc" },
  })
  return plans.map(mapPlan)
}

export async function getUserByAuthId(authId) {
  const user = await prisma.user.findUnique({ where: { id: authId } })
  if (!user) throw httpError(404, "User not found", "USER_NOT_FOUND")
  return user
}