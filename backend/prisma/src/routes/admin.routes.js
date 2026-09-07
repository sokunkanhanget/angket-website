import { Router } from "express"
import {
  dashboardStats, listAdminReports, listUsers, updateReportStatus,
} from "../controllers/admin.controller.js"
import { listSubscriptions, listVerifications, updateVerification } from "../controllers/subscriptions.controller.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import adminMiddleware from "../middlewares/adminMiddleware.js"

const router = Router()

router.use(authMiddleware, adminMiddleware)

router.get("/dashboard/stats", dashboardStats)
router.get("/users", listUsers)
router.get("/reports", listAdminReports)
router.patch("/reports/:id/status", updateReportStatus)

router.get("/subscriptions", listSubscriptions)
router.get("/subscriptions/verifications", listVerifications)
router.patch("/subscriptions/verifications/:id", updateVerification)

export default router
