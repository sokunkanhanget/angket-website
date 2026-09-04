import { Router } from "express"
import adminRoutes from "./admin.routes.js"
import analysisRoutes from "./analysis.routes.js"
import categoriesRoutes from "./categories.routes.js"
import reportsRoutes from "./reports.routes.js"
import subscriptionsRoutes from "./subscriptions.routes.js"
import usersRoutes from "./users.routes.js"

const router = Router()

router.get("/health", (_request, response) => {
  response.json({ status: "ok" })
})

router.use("/users", usersRoutes)
router.use("/reports", reportsRoutes)
router.use("/categories", categoriesRoutes)
router.use("/subscriptions", subscriptionsRoutes)
router.use("/analysis", analysisRoutes)
router.use("/admin", adminRoutes)

export default router
