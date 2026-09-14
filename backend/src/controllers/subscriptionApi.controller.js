import {
  createPendingOrder,
  getSubscriptionOrFree,
  getUsageSummaryOrFree,
  getUserByAuthId,
  listPlans,
  mapPlan,
} from "../services/subscriptionService.js"
import { generateSubscriptionOrderQr, handlePaywayCallback, verifyAndActivateSubscriptionOrder } from "../services/paywayService.js"

function mapSubscription(subscription) {
  return {
    id: subscription.id,
    status: subscription.status,
    start_date: subscription.startDate,
    end_date: subscription.endDate,
    plan: mapPlan(subscription.subscriptionPlan),
  }
}

export async function getPlans(_req, res, next) {
  try {
    return res.json({ plans: await listPlans() })
  } catch (error) {
    next(error)
  }
}

export async function getMySubscription(req, res, next) {
  try {
    const user = await getUserByAuthId(req.user.id)
    const subscription = await getSubscriptionOrFree(user.id)
    return res.json({ subscription: mapSubscription(subscription) })
  } catch (error) {
    next(error)
  }
}

export async function getMyUsage(req, res, next) {
  try {
    const user = await getUserByAuthId(req.user.id)
    const summary = await getUsageSummaryOrFree(user.id)
    return res.json({
      usage: {
        date: summary.usage.usageDate,
        files: summary.usage.fileCount,
        messages: summary.usage.messageCount,
        tokens: summary.usage.tokenCount,
      },
      limits: summary.limits,
      remaining: summary.remaining,
      plan: mapPlan(summary.plan),
    })
  } catch (error) {
    next(error)
  }
}

export async function createOrder(req, res, next) {
  try {
    const user = await getUserByAuthId(req.user.id)
    const order = await createPendingOrder({
      userId: user.id,
      ...req.body,
      idempotencyKey: req.body.idempotencyKey || req.get("Idempotency-Key"),
    })
    return res.status(201).json({
      order: {
        id: order.id,
        token: order.token,
        status: order.status,
        amount: Number(order.amount),
        payment_method: order.paymentMethod,
        plan: mapPlan(order.subscriptionPlan),
        created_at: order.createdAt,
      },
    })
  } catch (error) {
    next(error)
  }
}

export async function getOrderQr(req, res, next) {
  try {
    const user = await getUserByAuthId(req.user.id)
    const qr = await generateSubscriptionOrderQr({
      orderId: req.params.orderId,
      userId: user.id,
    })
    return res.json({ payment: qr })
  } catch (error) {
    next(error)
  }
}

export async function getOrderStatus(req, res, next) {
  try {
    const user = await getUserByAuthId(req.user.id)
    const result = await verifyAndActivateSubscriptionOrder({
      orderId: req.params.orderId,
      userId: user.id,
    })
    return res.json({
      order: {
        id: result.order.id,
        status: result.order.status,
        amount: Number(result.order.amount),
        transaction_id: result.order.transactionId,
        paid_at: result.order.paidAt,
      },
      payment_status: result.paymentStatus,
      subscription: result.subscription
        ? {
          id: result.subscription.id,
          status: result.subscription.status,
          start_date: result.subscription.startDate,
          end_date: result.subscription.endDate,
          plan: mapPlan(result.subscription.subscriptionPlan),
        }
        : null,
    })
  } catch (error) {
    next(error)
  }
}

export async function paywayCallback(req, res, next) {
  try {
    const tranId = req.body?.tran_id || req.body?.tranId
    if (!tranId) return res.status(400).json({ error: "tran_id is required" })
    const result = await handlePaywayCallback({ tranId })
    return res.json({ status: result.paymentStatus })
  } catch (error) {
    next(error)
  }
}