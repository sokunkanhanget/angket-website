import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "@/lib/auth"

export default function ProtectedAdminRoute() {
  const { admin, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className="placeholder-card" style={{ margin: 24 }}>Loading…</div>
  }

  if (!admin || admin.role !== "admin") {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return <Outlet />
}
