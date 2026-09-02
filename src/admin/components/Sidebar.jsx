import { NavLink, useNavigate } from "react-router-dom"
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

const NAV_ITEMS = [
  { to: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { to: "/admin/users", label: "Users", icon: <Users size={18} /> },
  { to: "/admin/verifications", label: "Verifications", icon: <BadgeCheck size={18} /> },
  { to: "/admin/reports", label: "Reports", icon: <FileText size={18} /> },
  { to: "/admin/categories", label: "Categories", icon: <Tag size={18} /> },
  { to: "/admin/subscriptions", label: "Subscriptions", icon: <CreditCard size={18} /> },
]

export default function Sidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login", { replace: true })
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-mark">A</span>
        <span className="brand-word">Angket</span>
        <span className="brand-pill">ADMIN</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-profile">
        <span className="profile-avatar">A</span>
        <div className="profile-meta">
          <span className="profile-name">Admin</span>
        </div>
        <button type="button" className="profile-logout" onClick={handleLogout} aria-label="Log out">
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  )
}
