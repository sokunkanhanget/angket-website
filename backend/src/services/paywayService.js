import crypto from "node:crypto"
import prisma from "../lib/prisma.js"

function serviceError(status, message, code) {
  const error = new Error(message)
  error.status = status
  error.code = code
  return error
}

function getPaywayConfig() {
  const merchantId = process.env.PAYWAY_MERCHANT_ID
  const apiKey = process.env.PAYWAY_API_KEY
  if (!merchantId || !apiKey) throw serviceError(500, "PayWay is not configured", "PAYWAY_NOT_CONFIGURED")
  return {
    merchantId,
    apiKey,
    currency: (process.env.PAYWAY_CURRENCY || "USD").toUpperCase(),
    merchantName: process.env.PAYWAY_MERCHANT_NAME || "Angket",
    apiUrl: (process.env.PAYWAY_API_URL || "https://checkout-sandbox.payway.com.kh").replace(/\/$/, ""),
  }
}

function paywayHash(config, values) {
  return crypto.createHmac("sha512", config.apiKey).update(values.join("")).digest("base64")
}

function amountString(amount) {
  return Number(amount).toFixed(2)
}

function requestTime() {
  const now = new Date()
  const pad = (value) => String(value).padStart(2, "0")
  return `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}`
}

function responseMessage(payload) {
  return payload?.status?.message || payload?.responseMessage || payload?.message || "PayWay request failed"
}

async function postPayway(config, path, values) {
  let response
  try {
    response = await fetch(`${config.apiUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(values),
    })
  } catch {
    throw serviceError(502, "Could not connect to PayWay", "PAYWAY_UNAVAILABLE")
  }
  let payload
  try {
    payload = await response.json()
  } catch {
    throw serviceError(502, "PayWay returned an invalid response", "PAYWAY_INVALID_RESPONSE")
  }
  if (!response.ok || (payload.status?.code !== undefined && String(payload.status.code) !== "0")) {
    throw serviceError(502, responseMessage(payload), "PAYWAY_REQUEST_FAILED")
  }
  return payload
}

function getQr(payload) {
  const data = payload?.data || payload
  const qr = data.qrString || data.qr || data.qrImage
  if (!qr) throw serviceError(502, "PayWay returned no QR data", "PAYWAY_QR_FAILED")
  return { qr, transactionId: data.transaction_id || data.transactionId || null }
}

export async function generateSubscriptionOrderQr({ orderId, userId }) {
  const config = getPaywayConfig()
  const order = await prisma.subscriptionOrder.findFirst({
    where: { id: String(orderId), userId },
    include: { subscriptionPlan: { select: { id: true, name: true } } },
  })
  if (!order) throw serviceError(404, "Subscription order not found", "ORDER_NOT_FOUND")
  if (order.status !== "pending") throw serviceError(409, "Only pending orders can generate a payment QR", "ORDER_NOT_PENDING")

  const values = {
    req_time: requestTime(),
    merchant_id: config.merchantId,
    tran_id: order.token,
    amount: amountString(order.amount),
    items: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    payment_option: "abapay_khqr",
    currency: config.currency,
    lifetime: "5",
    qr_image_template: "template3_color",
    request: "generate-qr",
  }
  const hash = paywayHash(config, [
    values.req_time, values.merchant_id, values.tran_id, values.amount, values.items,
    values.firstname, values.lastname, values.email, values.phone, "", values.payment_option,
    "", "", values.currency, "", "", "", values.lifetime, values.qr_image_template,
  ])
  const payload = await postPayway(config, "/api/payment-gateway/v1/payments/generate-qr", { ...values, hash })
  const qrResult = getQr(payload)
  await prisma.subscriptionOrder.update({ where: { id: order.id }, data: { proofRef: qrResult.transactionId } })
  return {
    orderId: order.id,
    token: order.token,
    status: order.status,
    amount: Number(order.amount),
    currency: config.currency,
    plan: order.subscriptionPlan,
    qr: qrResult.qr,
    transactionId: qrResult.transactionId,
  }
}

async function checkTransaction(config, tranId) {
  const reqTime = requestTime()
  const payload = await postPayway(config, "/api/payment-gateway/v1/payments/check-transaction-2", {
    req_time: reqTime,
    merchant_id: config.merchantId,
    tran_id: tranId,
    hash: paywayHash(config, [reqTime, config.merchantId, tranId]),
  })
  return payload.data || payload
}

function isSuccessful(transaction) {
  const status = String(transaction.status || transaction.status_code || transaction.payment_status || "").toLowerCase()
  return ["success", "successful", "approved", "paid", "completed", "00", "0"].includes(status)
}

function amountsMatch(actual, expected) {
  return Number.isFinite(Number(actual)) && Math.abs(Number(actual) - Number(expected)) < 0.000001
}

function addDays(date, days) {
  const result = new Date(date)
  result.setUTCDate(result.getUTCDate() + days)
  return result
}

async function activateVerifiedOrder(orderId, transaction, transactionId) {
  const order = await transaction.subscriptionOrder.findUnique({ where: { id: orderId }, include: { subscriptionPlan: true } })
  if (!order) throw serviceError(404, "Subscription order not found", "ORDER_NOT_FOUND")
  if (order.status === "paid" && order.transactionId) {
    const subscription = await transaction.userSubscription.findFirst({ where: { paymentRef: order.transactionId, userId: order.userId }, include: { subscriptionPlan: true } })
    if (subscription) return { order, subscription }
  }
  const now = new Date()
  const previous = await transaction.userSubscription.findFirst({
    where: { userId: order.userId, status: "active", OR: [{ endDate: null }, { endDate: { gt: now } }] },
    orderBy: { createdAt: "desc" },
  })
  if (previous) await transaction.userSubscription.update({ where: { id: previous.id }, data: { status: "expired", endDate: now } })
  const endDate = order.subscriptionPlan.durationDays > 0 ? addDays(now, order.subscriptionPlan.durationDays) : null
  const subscription = await transaction.userSubscription.create({
    data: { userId: order.userId, subPlanId: order.subPlanId, startDate: now, endDate, status: "active", previousSubId: previous?.id || null, paymentRef: transactionId },
    include: { subscriptionPlan: true },
  })
  const updatedOrder = await transaction.subscriptionOrder.update({
    where: { id: order.id },
    data: { status: "paid", paidAt: now, transactionId, proofRef: transactionId },
    include: { subscriptionPlan: true },
  })
  return { order: updatedOrder, subscription }
}

export async function verifyAndActivateSubscriptionOrder({ orderId, userId }) {
  const order = await prisma.subscriptionOrder.findFirst({ where: { id: String(orderId), userId }, include: { subscriptionPlan: true } })
  if (!order) throw serviceError(404, "Subscription order not found", "ORDER_NOT_FOUND")
  if (order.status === "paid" && order.transactionId) {
    const subscription = await prisma.userSubscription.findFirst({ where: { paymentRef: order.transactionId, userId }, include: { subscriptionPlan: true } })
    return { order, paymentStatus: "paid", subscription }
  }
  if (order.status !== "pending") return { order, paymentStatus: order.status, subscription: null }
  const config = getPaywayConfig()
  const transaction = await checkTransaction(config, order.token)
  if (!isSuccessful(transaction)) return { order, paymentStatus: "pending", subscription: null }
  const transactionId = String(transaction.transaction_id || transaction.transactionId || transaction.tran_id || order.token)
  if (!amountsMatch(transaction.amount, order.amount) ||
    String(transaction.currency || config.currency).toUpperCase() !== config.currency ||
    String(transaction.merchant_id || config.merchantId) !== config.merchantId) {
    return { order, paymentStatus: "amount_mismatch", subscription: null }
  }
  return prisma.$transaction(async (database) => {
    const claimed = await database.subscriptionOrder.updateMany({ where: { id: order.id, status: "pending" }, data: { status: "paid", paidAt: new Date(), transactionId, proofRef: transactionId } })
    if (claimed.count === 0) {
      const current = await database.subscriptionOrder.findUnique({ where: { id: order.id }, include: { subscriptionPlan: true } })
      const subscription = current?.transactionId
        ? await database.userSubscription.findFirst({ where: { paymentRef: current.transactionId, userId }, include: { subscriptionPlan: true } })
        : null
      return { order: current, paymentStatus: current?.status || "pending", subscription }
    }
    const activated = await activateVerifiedOrder(order.id, database, transactionId)
    return { ...activated, paymentStatus: "paid" }
  })
}

export async function handlePaywayCallback({ tranId }) {
  const order = await prisma.subscriptionOrder.findFirst({ where: { token: String(tranId) }, select: { id: true, userId: true } })
  if (!order) throw serviceError(404, "Subscription order not found", "ORDER_NOT_FOUND")
  return verifyAndActivateSubscriptionOrder({ orderId: order.id, userId: order.userId })
}