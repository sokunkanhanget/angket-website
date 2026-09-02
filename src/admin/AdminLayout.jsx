import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <Sidebar />
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  )
}
