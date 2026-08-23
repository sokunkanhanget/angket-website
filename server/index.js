import path from "node:path"
import { fileURLToPath } from "node:url"
import express from "express"
import { desc } from "drizzle-orm"
import { db, pool } from "../src/lib/db/index.js"
import { reports } from "../src/lib/db/schema.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
app.use(express.json())

await pool.query(`
  CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    scam_type TEXT NOT NULL,
    description TEXT NOT NULL,
    platform TEXT,
    scammer_contact TEXT,
    amount_lost TEXT,
    reporter_name TEXT,
    image_url TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
  )
`)

app.get("/api/reports", async (_req, res) => {
  try {
    const rows = await db
      .select()
      .from(reports)
      .orderBy(desc(reports.createdAt))
      .limit(60)
    res.json(rows)
  } catch (err) {
    console.error("[api] GET /api/reports failed:", err.message)
    res.status(500).json({ error: "Failed to load reports" })
  }
})

app.post("/api/reports", async (req, res) => {
  try {
    const { title, scamType, description, platform, scammerContact, amountLost, reporterName, imageUrl } =
      req.body ?? {}

    if (!title?.trim() || !scamType?.trim() || !description?.trim()) {
      return res.status(400).json({ error: "Title, type of scam and description are required." })
    }

    const [row] = await db
      .insert(reports)
      .values({
        title: title.trim(),
        scamType: scamType.trim(),
        description: description.trim(),
        platform: platform?.trim() || null,
        scammerContact: scammerContact?.trim() || null,
        amountLost: amountLost?.trim() || null,
        reporterName: reporterName?.trim() || null,
        imageUrl: imageUrl?.trim() || null,
      })
      .returning()

    res.status(201).json(row)
  } catch (err) {
    console.error("[api] POST /api/reports failed:", err.message)
    res.status(500).json({ error: "Failed to submit report" })
  }
})

// Serve the built frontend in production
const distDir = path.join(__dirname, "..", "dist")
app.use(express.static(distDir))
app.get(/^\/(?!api\/).*/, (_req, res) => {
  res.sendFile(path.join(distDir, "index.html"))
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`[api] server listening on http://localhost:${port}`)
})
