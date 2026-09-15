import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Menu, X } from "lucide-react"
import Sidebar from "./components/Sidebar"

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="admin-shell">
      <button
        type="button"
        className="admin-menu-btn"
        aria-label="Toggle sidebar"
        aria-expanded={sidebarOpen}
        onClick={() => setSidebarOpen((v) => !v)}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <div
        className={`admin-overlay${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      <Sidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  )
}