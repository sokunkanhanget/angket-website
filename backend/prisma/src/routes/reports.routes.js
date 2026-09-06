import { Router } from "express"
import { createReport, getReport, listReports } from "../controllers/reports.controller.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const router = Router()

router.get("/", listReports)
router.get("/:id", getReport)
router.post("/", authMiddleware, createReport)

export default router
