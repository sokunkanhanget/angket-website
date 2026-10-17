import { Link } from "react-router-dom"

export default function StatCard({ icon, tint, color, value, label, to }) {
  const content = (
    <>
      <span className="w-[42px] h-[42px] rounded-[11px] inline-flex items-center justify-center flex-shrink-0" style={{ background: tint, color }}>
        {icon}
      </span>
      <div className="flex flex-col min-w-0">
        <span className="text-[22px] font-bold text-admin-slate leading-[1.2] font-[IBM_Plex_Mono,monospace] font-variant-numeric-tabular-nums">{value}</span>
        <span className="text-[13px] text-admin-slate-600 leading-[1.4] mt-0.5">{label}</span>
      </div>
    </>
  )

  if (to) {
    return (
      <Link to={to} className="flex items-center gap-3.5 bg-white border border-admin-border rounded-2xl p-5 no-underline transition-all hover:border-admin-accent hover:shadow-md hover:-translate-y-[1px] focus-visible:outline-2 focus-visible:outline-admin-accent focus-visible:outline-offset-2">
        {content}
      </Link>
    )
  }

  return <div className="flex items-center gap-3.5 bg-white border border-admin-border rounded-2xl p-5">{content}</div>
}
