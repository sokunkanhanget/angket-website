import { Router } from "express"
import {
  listSubscriptions, listVerifications, updateVerification,
} from "../controllers/subscriptions.controller.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import adminMiddleware from "../middlewares/adminMiddleware.js"

const router = Router()

router.get("/", authMiddleware, adminMiddleware, listSubscriptions)
router.get("/verifications", authMiddleware, adminMiddleware, listVerifications)
router.patch("/verifications/:id", authMiddleware, adminMiddleware, updateVerification)

export default router
