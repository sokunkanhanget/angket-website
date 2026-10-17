import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  BadgeCheck,
  FileText,
  Tag,
  CreditCard,
  LogOut,
} from "lucide-react"
import { useAuth } from "@/lib/auth"
import logoImg from "@/assets/logo.png"

const NAV_ITEMS = [
  { to: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { to: "/admin/users", label: "Users", icon: <Users size={18} /> },
  { to: "/admin/verifications", label: "Verifications", icon: <BadgeCheck size={18} /> },
  { to: "/admin/reports", label: "Reports", icon: <FileText size={18} /> },
  { to: "/admin/categories", label: "Categories", icon: <Tag size={18} /> },
  { to: "/admin/subscriptions", label: "Subscriptions", icon: <CreditCard size={18} /> },
]

export default function Sidebar({ open, onNavigate }) {
  const { admin, logout } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.replace("/")
  }

  const displayName = admin?.name || "Admin"
  const initials = displayName.charAt(0).toUpperCase()

  return (
    <aside className={`w-[260px] md:w-[248px] flex-shrink-0 bg-white border-r border-admin-border flex flex-col fixed top-0 left-0 md:sticky h-screen z-[1100] transform transition-transform duration-200 ease-in-out md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
      <div className="flex items-center gap-2.5 px-5 py-[22px] border-b border-admin-border">
        <img src={logoImg} alt="Angket" className="w-[38px] h-[38px] rounded-none" />
        <span className="font-bold text-[17px] text-admin-slate">Angket</span>
        <span className="ml-auto text-[10px] font-bold tracking-[0.6px] text-admin-accent bg-admin-accent-bg rounded-full px-2 py-[3px] uppercase">ADMIN</span>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-admin-accent-bg text-admin-accent"
                : "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-admin-slate-600 hover:bg-admin-hover-bg hover:text-admin-slate"
            }
          >
            <span className="inline-flex items-center justify-center">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-3 px-5 py-4 border-t border-admin-border">
        <span className="w-[38px] h-[38px] rounded-full bg-admin-slate text-white text-[13px] font-semibold inline-flex items-center justify-center flex-shrink-0">{initials}</span>
        <div className="flex flex-col leading-[1.3]">
          <span className="text-[13px] font-semibold text-admin-slate">{displayName}</span>
        </div>
        <button type="button" className="ml-auto inline-flex items-center justify-center w-[30px] h-[30px] border-none rounded-lg bg-transparent text-admin-slate-600 cursor-pointer transition-colors hover:bg-admin-rose-bg hover:text-admin-rose flex-shrink-0" onClick={handleLogout} aria-label="Log out">
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  )
}