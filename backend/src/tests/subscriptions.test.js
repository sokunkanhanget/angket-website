import { afterEach, mock, test } from "node:test"
import assert from "node:assert/strict"
import crypto from "node:crypto"
import prisma from "../lib/prisma.js"
import {
	calculateRemainingLimits,
	canScanFile,
	canScanMessage,
	canUseTokens,
	createPendingOrder,
	getActiveSubscription,
	getUsageSummary,
	incrementFileUsage,
} from "../services/subscriptionService.js"
import {
  generateSubscriptionOrderQr,
  verifyAndActivateSubscriptionOrder,
} from "../services/paywayService.js"

const userId = "user-1"
const plan = {
	id: "individual",
	name: "Individual",
	price: 1.99,
	durationDays: 30,
	maxMembers: 1,
	dailyFileLimit: 5,
	dailyMessageLimit: 15,
	dailyTokenLimit: 60000,
	isActive: true,
}
const subscription = {
	id: "sub-1",
	userId,
	status: "active",
	endDate: null,
	subscriptionPlan: plan,
}

const restores = []
function patch(object, methodName, implementation) {
	const original = object[methodName]
	object[methodName] = implementation
	restores.push(() => { object[methodName] = original })
	return implementation
}

function spy(implementation) {
	const calls = []
	const fn = (...args) => {
		calls.push({ arguments: args })
		return implementation(...args)
	}
	fn.mock = { calls }
	return fn
}

afterEach(() => {
	mock.restoreAll()
	while (restores.length) restores.pop()()
})

test("free-style plan limits calculate remaining usage", () => {
	const freePlan = { dailyFileLimit: 3, dailyMessageLimit: 10, dailyTokenLimit: 15000 }
	const usage = { fileCount: 1, messageCount: 4, tokenCount: 2500 }
	assert.deepEqual(calculateRemainingLimits(freePlan, usage), {
		files: 2,
		messages: 6,
		tokens: 12500,
	})
})

test("usage checks create today's record and reject reached limits", async () => {
	patch(prisma.userSubscription, "findFirst", async () => subscription)
	patch(prisma.subscriptionUsage, "upsert", async () => ({
		id: "usage-1",
		usageDate: new Date("2026-09-13T00:00:00.000Z"),
		fileCount: 5,
		messageCount: 14,
		tokenCount: 59900,
	}))

	const file = await canScanFile(userId)
	const message = await canScanMessage(userId)
	const tokens = await canUseTokens(userId, 101)

	assert.equal(file.allowed, false)
	assert.equal(file.reason, "DAILY_FILES_LIMIT_REACHED")
	assert.equal(message.allowed, true)
	assert.equal(tokens.allowed, false)
})

test("usage summary and increment operate on the shared UserSubscription", async () => {
	patch(prisma.userSubscription, "findFirst", async () => subscription)
	patch(prisma.subscriptionUsage, "upsert", async () => ({
		id: "usage-1",
		usageDate: new Date("2026-09-13T00:00:00.000Z"),
		fileCount: 2,
		messageCount: 3,
		tokenCount: 400,
	}))
	const update = patch(prisma.subscriptionUsage, "update", spy(async ({ data }) => ({ id: "usage-1", ...data })))

	const summary = await getUsageSummary(userId)
	await incrementFileUsage(userId)

	assert.equal(summary.remaining.files, 3)
	assert.equal(summary.remaining.messages, 12)
	assert.equal(summary.remaining.tokens, 59600)
	assert.equal(update.mock.calls[0].arguments[0].where.id, "usage-1")
	assert.deepEqual(update.mock.calls[0].arguments[0].data.fileCount, { increment: 1 })
})

test("expired subscriptions are inactive", async () => {
	let call = 0
	patch(prisma.userSubscription, "findFirst", async () => {
		call += 1
		return call === 1 ? null : { ...subscription, status: "expired", endDate: new Date("2026-09-12") }
	})

	await assert.rejects(
		() => getActiveSubscription(userId),
		(error) => error.code === "SUBSCRIPTION_EXPIRED" && error.status === 403,
	)
})

test("pending orders use the database plan price and never frontend amount", async () => {
	patch(prisma.subscriptionPlan, "findUnique", async () => plan)
	const transaction = {
		botSubscriber: {
			findFirst: mock.fn(async () => ({ id: "bot-1", userId })),
			create: mock.fn(),
		},
		subscriptionOrder: {
			findUnique: mock.fn(async () => null),
			create: mock.fn(async ({ data, include }) => ({
				id: "order-1",
				...data,
				amount: data.amount,
				createdAt: new Date(),
				subscriptionPlan: plan,
				include,
			})),
		},
	}
	patch(prisma, "$transaction", async (callback) => callback(transaction))

	const order = await createPendingOrder({
		userId,
		planId: plan.id,
		platform: "telegram",
		platformUserId: "123456789",
		amount: 0.01,
	})

	assert.equal(order.status, "pending")
	assert.equal(order.amount, 1.99)
	assert.equal(transaction.subscriptionOrder.create.mock.calls[0].arguments[0].data.amount, 1.99)
})

test("PayWay QR generation sends the documented signed request", async () => {
	process.env.PAYWAY_MERCHANT_ID = "merchant-1"
	process.env.PAYWAY_API_KEY = "api-key-1"
	process.env.PAYWAY_CURRENCY = "USD"
	process.env.PAYWAY_MERCHANT_NAME = "Angket"
	patch(prisma.subscriptionOrder, "findFirst", async () => ({
		id: "order-1",
		token: "order-token",
		amount: 1.99,
		status: "pending",
		subscriptionPlan: plan,
	}))
	patch(prisma.subscriptionOrder, "update", spy(async ({ data }) => data))
	const fetch = patch(global, "fetch", spy(async (_url, options) => {
		assert.equal(options.headers["Content-Type"], "application/json")
		const params = JSON.parse(options.body)
		const input = [
			params.req_time, params.merchant_id, params.tran_id, params.amount, params.items,
			params.firstname, params.lastname, params.email, params.phone, "", params.payment_option,
			"", "", params.currency, "", "", "", params.lifetime, params.qr_image_template,
		].join("")
		assert.equal(params.hash, crypto.createHmac("sha512", "api-key-1").update(input).digest("base64"))
		return new Response(JSON.stringify({ status: { code: 0 }, data: { qrString: "payway-qr", transaction_id: "qr-transaction" } }), { status: 200 })
	}))

	const result = await generateSubscriptionOrderQr({ orderId: "order-1", userId })
	assert.equal(result.status, "pending")
	assert.equal(result.qr, "payway-qr")
	assert.equal(result.transactionId, "qr-transaction")
	assert.equal(fetch.mock.calls.length, 1)
})

test("successful PayWay verification activates once and saves the transaction ID", async () => {
	process.env.PAYWAY_MERCHANT_ID = "merchant-1"
	process.env.PAYWAY_API_KEY = "api-key-1"
	process.env.PAYWAY_CURRENCY = "USD"
	const order = { ...subscription, id: "order-1", amount: 1.99, status: "pending", qrMd5: "qr-md5", token: "token-1", subPlanId: plan.id }
	patch(prisma.subscriptionOrder, "findFirst", async () => order)
	patch(global, "fetch", async () => new Response(JSON.stringify({
		status: { code: 0 },
		data: { status: "success", transaction_id: "transaction-1", merchant_id: "merchant-1", currency: "USD", amount: 1.99 },
	}), { status: 200, headers: { "Content-Type": "application/json" } }))

	const activated = { id: "sub-paid", status: "active", startDate: new Date(), endDate: new Date(), subscriptionPlan: plan }
	const database = {
		subscriptionOrder: {
			updateMany: spy(async () => ({ count: 1 })),
			findUnique: spy(async () => ({ ...order, status: "paid", transactionId: "transaction-1" })),
			update: spy(async ({ data }) => ({ ...order, ...data })),
		},
		userSubscription: {
			findFirst: spy(async () => null),
			update: spy(async () => null),
			create: spy(async () => activated),
		},
	}
	patch(prisma, "$transaction", async (callback) => callback(database))

	const result = await verifyAndActivateSubscriptionOrder({ orderId: "order-1", userId })
	assert.equal(result.paymentStatus, "paid")
	assert.equal(result.subscription.id, "sub-paid")
	assert.equal(database.userSubscription.create.mock.calls.length, 1)
	assert.equal(database.subscriptionOrder.updateMany.mock.calls[0].arguments[0].data.transactionId, "transaction-1")
})

test("pending PayWay responses do not activate subscriptions", async () => {
	process.env.PAYWAY_MERCHANT_ID = "merchant-1"
	process.env.PAYWAY_API_KEY = "api-key-1"
	process.env.PAYWAY_CURRENCY = "USD"
	const order = { ...subscription, id: "order-1", amount: 1.99, status: "pending", qrMd5: "qr-md5" }
	patch(prisma.subscriptionOrder, "findFirst", async () => order)
	const fetch = patch(global, "fetch", spy(async () => new Response(JSON.stringify({ status: { code: 0 }, data: { status: "pending" } }), { status: 200 })))
	const transaction = patch(prisma, "$transaction", spy(async () => { throw new Error("must not activate") }))

	const result = await verifyAndActivateSubscriptionOrder({ orderId: "order-1", userId })
	assert.equal(result.paymentStatus, "pending")
	assert.equal(fetch.mock.calls.length, 1)
	assert.equal(transaction.mock.calls.length, 0)
})
