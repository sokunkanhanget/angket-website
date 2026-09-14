import { Router } from "express"
import {
  listSubscriptions, listVerifications, updateVerification,
} from "../controllers/subscriptions.controller.js"
import {
  createOrder, getMySubscription, getMyUsage, getOrderQr, getOrderStatus, getPlans, paywayCallback,
} from "../controllers/subscriptionApi.controller.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import adminMiddleware from "../middlewares/adminMiddleware.js"

const router = Router()

router.get("/plans", getPlans)
router.post("/orders/payway-callback", paywayCallback)
router.get("/me", authMiddleware, getMySubscription)
router.get("/usage", authMiddleware, getMyUsage)
router.post("/orders", authMiddleware, createOrder)
router.get("/orders/:orderId/qr", authMiddleware, getOrderQr)
router.get("/orders/:orderId/status", authMiddleware, getOrderStatus)
router.get("/", authMiddleware, adminMiddleware, listSubscriptions)
router.get("/verifications", authMiddleware, adminMiddleware, listVerifications)
router.patch("/verifications/:id", authMiddleware, adminMiddleware, updateVerification)

export default router
