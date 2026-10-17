import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Menu, X } from "lucide-react"
import Sidebar from "./components/Sidebar"

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-admin-bg font-sans text-admin-slate">
      <button
        type="button"
        className="md:hidden fixed top-3.5 left-3.5 z-[1200] w-10 h-10 rounded-xl border border-admin-border bg-white text-admin-slate cursor-pointer grid place-items-center shadow-sm"
        aria-label="Toggle sidebar"
        aria-expanded={sidebarOpen}
        onClick={() => setSidebarOpen((v) => !v)}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <div
        className={`${sidebarOpen ? "block" : "hidden"} md:hidden fixed inset-0 z-[1050] bg-black/45`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      <Sidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col md:pt-0 pt-[62px]">
        <Outlet />
      </div>
    </div>
  )
}