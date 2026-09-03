export default function StatCard({ icon, tint, color, value, label }) {
  return (
    <div className="stat-card">
      <span className="stat-icon" style={{ background: tint, color }}>
        {icon}
      </span>
      <div className="stat-text">
        <span className="stat-value mono">{value}</span>
        <span className="stat-label">{label}</span>
      </div>
    </div>
  )
}
