import { Router } from "express"
import multer from "multer"
import { addReportImages, createReport, deleteReport, getReport, listReports, updateReport } from "../controllers/reports.controller.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
})

const router = Router()

router.get("/", listReports)
router.get("/:id", getReport)
router.post("/", authMiddleware, createReport)
router.put("/:id", authMiddleware, updateReport)
router.delete("/:id", authMiddleware, deleteReport)
router.post("/:id/images", authMiddleware, upload.array("images", 5), addReportImages)

export default router
