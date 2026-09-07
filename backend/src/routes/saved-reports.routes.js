import { Router } from "express"
import { saveReport, unsaveReport, listSavedReports } from "../controllers/saved-reports.controller.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const router = Router()

router.get("/", authMiddleware, listSavedReports)
router.post("/:reportId", authMiddleware, saveReport)
router.delete("/:reportId", authMiddleware, unsaveReport)

export default router
