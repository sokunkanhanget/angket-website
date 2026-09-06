import { Router } from "express"
import {
  createCategory, deleteCategory, listCategories, updateCategory,
} from "../controllers/categories.controller.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import adminMiddleware from "../middlewares/adminMiddleware.js"

const router = Router()

router.get("/", listCategories)
router.post("/", authMiddleware, adminMiddleware, createCategory)
router.put("/:id", authMiddleware, adminMiddleware, updateCategory)
router.delete("/:id", authMiddleware, adminMiddleware, deleteCategory)

export default router
