import { useEffect, useState } from "react"
import {
  Users,
  FileText,
  BadgeCheck,
  Hourglass,
  CheckCircle2,
  UserPlus,
} from "lucide-react"
import StatCard from "../components/StatCard"
import PageShell from "../components/PageShell"

const COLORS = {
  blue: { color: "#1D5FC4", tint: "#E6EEFC" },
  green: { color: "#2F9E6E", tint: "#E1F5EA" },
  amber: { color: "#D08B2A", tint: "#FBF0DE" },
  rose: { color: "#C0483D", tint: "#FBE7E4" },
}

// Stand-in for a backend call that returns the DashboardStats payload.
function fetchDashboardStats() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalUsers: 1284,
        totalReports: 356,
        activeSubscriptions: 218,
        pendingVerifications: 47,
        reportsApprovedToday: 18,
        newSignupsThisWeek: 64,
      })
    }, 250)
  })
}

export default function DashboardPage() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    let mounted = true
    fetchDashboardStats().then((data) => {
      if (mounted) setStats(data)
    })
    return () => {
      mounted = false
    }
  }, [])

  if (!stats) {
    return (
      <PageShell title="Dashboard">
        <div className="stat-row">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="stat-card">
              <span className="stat-icon" style={COLORS.blue} />
              <div className="stat-text">
                <span className="stat-value mono">–</span>
                <span className="stat-label">Loading…</span>
              </div>
            </div>
          ))}
        </div>
      </PageShell>
    )
  }

  const rowOne = [
    { icon: <Users size={20} />, ...COLORS.blue, value: stats.totalUsers, label: "Total Users" },
    { icon: <FileText size={20} />, ...COLORS.blue, value: stats.totalReports, label: "Total Reports" },
    { icon: <BadgeCheck size={20} />, ...COLORS.green, value: stats.activeSubscriptions, label: "Active Subscriptions" },
    { icon: <Hourglass size={20} />, ...COLORS.amber, value: stats.pendingVerifications, label: "Pending Verifications" },
  ]

  const rowTwo = [
    { icon: <CheckCircle2 size={20} />, ...COLORS.green, value: stats.reportsApprovedToday, label: "Reports Approved Today" },
    { icon: <UserPlus size={20} />, ...COLORS.blue, value: stats.newSignupsThisWeek, label: "New Signups This Week" },
  ]

  return (
    <PageShell title="Dashboard">
      <section className="stat-row">
        {rowOne.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </section>
      <section className="stat-row">
        {rowTwo.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </section>
    </PageShell>
  )
}
