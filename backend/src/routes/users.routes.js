import { Router } from "express"
import multer from "multer"
import {
  avatar, changePassword, login, me, removeAvatar, signup, updateMe,
} from "../controllers/users.controller.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
})

const router = Router()

router.post("/signup", signup)
router.post("/login", login)
router.get("/me", authMiddleware, me)
router.put("/me", authMiddleware, updateMe)
router.post("/avatar", authMiddleware, upload.single("avatar"), avatar)
router.delete("/avatar", authMiddleware, removeAvatar)
router.post("/change-password", authMiddleware, changePassword)

export default router
