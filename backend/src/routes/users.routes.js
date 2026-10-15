import { Router } from "express"
import multer from "multer"
import {
  avatar, changePassword, forgotPassword, login, logout, me, refreshSession, removeAvatar,
  resendVerification, resetPassword, signup, updateMe, verifyEmailLink,
  verifySignupOtp,
} from "../controllers/users.controller.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
})

const router = Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/resend-verification", resendVerification)
router.post("/forgot-password", forgotPassword)
router.post("/verify", verifyEmailLink)
router.post("/verify-otp", verifySignupOtp)
router.post("/refresh", refreshSession)
router.post("/logout", authMiddleware, logout)
router.get("/me", authMiddleware, me)
router.put("/me", authMiddleware, updateMe)
router.post("/reset-password", authMiddleware, resetPassword)
router.post("/avatar", authMiddleware, upload.single("avatar"), avatar)
router.delete("/avatar", authMiddleware, removeAvatar)
router.post("/change-password", authMiddleware, changePassword)

export default router
