import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import helmet from "helmet"
import apiRoutes from "./routes/index.js"

dotenv.config()

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }))
app.use(express.json({ limit: "1mb" }))

app.get("/health", (_request, response) => {
  response.json({ status: "ok" })
})

app.use("/api", apiRoutes)

app.use((_request, response) => {
  response.status(404).json({ error: "Not found" })
})

app.use((error, _request, response, _next) => {
  console.error(error)
  response.status(500).json({ error: "Internal server error" })
})

export default app