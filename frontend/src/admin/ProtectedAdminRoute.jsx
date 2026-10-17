import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "@/lib/auth"

export default function ProtectedAdminRoute() {
  const { admin, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className="bg-white border border-admin-border rounded-2xl p-10 text-center text-admin-slate-600 text-[15px] m-6">Loading…</div>
  }

  if (!admin || admin.role !== "admin") {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return <Outlet />
}
