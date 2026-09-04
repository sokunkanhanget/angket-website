import { Router } from "express"
import { analyze } from "../controllers/analysis.controller.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const router = Router()

router.post("/", authMiddleware, analyze)

export default router
