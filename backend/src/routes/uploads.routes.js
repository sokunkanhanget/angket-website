import { Router } from "express"
import multer from "multer"
import authMiddleware from "../middlewares/authMiddleware.js"
import { uploadScreenshot } from "../services/storageService.js"

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
})

const router = Router()

router.post("/screenshot", authMiddleware, upload.single("screenshot"), async (req, res, next) => {
  try {
    const url = await uploadScreenshot(req.file)
    return res.status(201).json({ url })
  } catch (err) {
    next(err)
  }
})

export default router