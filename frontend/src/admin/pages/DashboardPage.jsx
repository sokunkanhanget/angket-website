import { useEffect, useState } from "react"
import {
  Users,
  FileText,
  BadgeCheck,
  Hourglass,
  Tag,
  UserPlus,
} from "lucide-react"
import StatCard from "../components/StatCard"
import PageShell from "../components/PageShell"
import { adminApi } from "@/lib/services"

const COLORS = {
  blue: { color: "#1D5FC4", tint: "#E6EEFC" },
  green: { color: "#2F9E6E", tint: "#E1F5EA" },
  amber: { color: "#D08B2A", tint: "#FBF0DE" },
  rose: { color: "#C0483D", tint: "#FBE7E4" },
}

export default function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    adminApi
      .stats()
      .then((data) => {
        if (mounted) setStats(data.stats)
      })
      .catch((err) => {
        if (mounted) setError(err.message)
      })
    return () => {
      mounted = false
    }
  }, [])

  if (!stats) {
    return (
      <PageShell title="Dashboard">
        {error ? (
          <div className="bg-white border border-admin-border rounded-2xl p-10 text-center text-admin-slate-600 text-[15px]">
            <p>Failed to load stats: {error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3.5 bg-white border border-admin-border rounded-2xl p-5">
                <span className="w-[42px] h-[42px] rounded-[11px] inline-flex items-center justify-center flex-shrink-0" style={COLORS.blue} />
                <div className="flex flex-col min-w-0">
                  <span className="text-[22px] font-bold text-admin-slate leading-[1.2] font-[IBM_Plex_Mono,monospace] font-variant-numeric-tabular-nums">–</span>
                  <span className="text-[13px] text-admin-slate-600 leading-[1.4] mt-0.5">Loading…</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </PageShell>
    )
  }

const rowOne = [
  { icon: <Users size={20} />, ...COLORS.blue, value: stats.totalUsers, label: "Total Users", to: "/admin/users" },
  { icon: <FileText size={20} />, ...COLORS.blue, value: stats.totalReports, label: "Total Reports", to: "/admin/reports" },
  { icon: <BadgeCheck size={20} />, ...COLORS.green, value: stats.activeSubscriptions, label: "Active Subscriptions", to: "/admin/subscriptions" },
  { icon: <Hourglass size={20} />, ...COLORS.amber, value: stats.pendingVerifications, label: "Pending Verifications", to: "/admin/verifications" },
]

const rowTwo = [
  { icon: <Tag size={20} />, ...COLORS.green, value: stats.totalCategories, label: "Report Categories", to: "/admin/categories" },
  { icon: <UserPlus size={20} />, ...COLORS.blue, value: stats.newSignupsThisWeek, label: "New Signups This Week", to: "/admin/users" },
]

  return (
    <PageShell title="Dashboard">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {rowOne.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {rowTwo.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </section>
    </PageShell>
  )
}
