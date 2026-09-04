import { analyzeReport } from "../services/geminiService.js"

export async function analyze(req, res, next) {
  try {
    const { text } = req.body
    if (!text) return res.status(400).json({ error: "text is required" })

    const result = await analyzeReport({ description: text })
    return res.json({ analysis: result })
  } catch (err) {
    next(err)
  }
}
