import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "@/lib/auth"

export default function ProtectedAdminRoute() {
  const { admin } = useAuth()
  const location = useLocation()

  if (!admin) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return <Outlet />
}
