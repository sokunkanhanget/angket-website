import { Link } from "react-router-dom"

export default function StatCard({ icon, tint, color, value, label, to }) {
  const content = (
    <>
      <span className="stat-icon" style={{ background: tint, color }}>
        {icon}
      </span>
      <div className="stat-text">
        <span className="stat-value mono">{value}</span>
        <span className="stat-label">{label}</span>
      </div>
    </>
  )

  if (to) {
    return (
      <Link to={to} className="stat-card stat-card-link">
        {content}
      </Link>
    )
  }

  return <div className="stat-card">{content}</div>
}
