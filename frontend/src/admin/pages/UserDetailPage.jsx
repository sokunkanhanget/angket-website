import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import PageShell from "../components/PageShell"
import { adminApi } from "@/lib/services"

function statusBadge(status) {
  switch (status) {
    case "approved": return "bg-admin-green-bg text-admin-green"
    case "pending": return "bg-admin-amber-bg text-admin-amber"
    case "rejected": return "bg-admin-rose-bg text-admin-rose"
    case "banned": return "bg-admin-rose-bg text-admin-rose"
    case "inactive": return "bg-slate-100 text-admin-slate-600"
    case "active": return "bg-admin-green-bg text-admin-green"
    default: return "bg-slate-100 text-admin-slate-600"
  }
}

export default function UserDetailPage() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)
    adminApi
      .userDetail(id)
      .then((res) => mounted && setData(res))
      .catch((err) => mounted && setError(err.message))
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [id])

  const fmt = (date) => (date ? new Date(date).toLocaleDateString() : "—")
  const initials = (name) => (name ? name.charAt(0).toUpperCase() : "?")

  if (loading) {
    return (
      <PageShell title="User Detail">
        <div className="placeholder-card">Loading…</div>
      </PageShell>
    )
  }

  if (error) {
    return (
      <PageShell title="User Detail">
        <div className="placeholder-card"><p>Failed to load user: {error}</p></div>
        <Link className="btn-sm btn-sm-neutral" to="/admin/users">Back to Users</Link>
      </PageShell>
    )
  }

  const { user, reports, subscriptions, verifications } = data

  return (
    <PageShell title={`User · ${user.full_name || user.email}`}>
      <div className="flex flex-col gap-3.5">
      <Link className="inline-flex items-center gap-1.5 self-start px-3 py-[6px] rounded-lg text-[12px] font-semibold border border-transparent bg-slate-100 text-admin-slate-600 hover:bg-slate-200 transition-colors" to="/admin/users">
        <ArrowLeft size={14} /> Back to Users
      </Link>

      <section className="flex items-center gap-3.5 bg-white border border-admin-border rounded-2xl p-4">
        <span className="w-11 h-11 rounded-full bg-admin-accent text-white text-lg font-bold inline-flex items-center justify-center flex-shrink-0">{initials(user.full_name)}</span>
        <div className="min-w-0">
          <h2 className="text-[17px] font-bold text-admin-slate m-0 mb-0.5">{user.full_name || "—"}</h2>
          <p className="text-[13px] text-admin-slate-600 m-0 mb-2">{user.email || "—"}</p>
          <div className="flex items-center gap-2 text-[13px] mt-[3px]">
            <span className="min-w-[60px] text-admin-slate-600">Phone</span>
            <strong className="text-admin-slate font-[IBM_Plex_Mono,monospace] font-variant-numeric-tabular-nums">{user.phone || "—"}</strong>
          </div>
          <div className="flex items-center gap-2 text-[13px] mt-[3px]">
            <span className="min-w-[60px] text-admin-slate-600">Role</span>
            <span className={`inline-block px-2.5 py-[3px] rounded-full text-[12px] font-semibold capitalize ${user.role === "admin" ? "bg-admin-accent-bg text-admin-accent" : "bg-slate-100 text-admin-slate-600"}`}>{user.role}</span>
          </div>
          <div className="flex items-center gap-2 text-[13px] mt-[3px]">
            <span className="min-w-[60px] text-admin-slate-600">Joined</span>
            <strong className="text-admin-slate">{fmt(user.created_at)}</strong>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-1.5">
        <h3 className="text-[13px] font-bold text-admin-slate m-0 mb-1.5">Reports ({reports.length})</h3>
        <div className="bg-white border border-admin-border rounded-2xl overflow-hidden">
          {reports.length === 0 ? (
            <div className="bg-white border-t-0 border-admin-border rounded-b-2xl p-10 text-center text-admin-slate-600 text-[15px]"><p>No reports.</p></div>
          ) : (
            <table className="w-full border-collapse text-[14px]">
              <thead>
                <tr>
                  <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Title</th>
                  <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Category</th>
                  <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Platform</th>
                  <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Status</th>
                  <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.report_form_id} className="border-b border-admin-border-light last:border-b-0 hover:bg-admin-surface-hover">
                    <td className="px-5 py-3 font-semibold text-admin-slate">{r.title}</td>
                    <td className="px-5 py-3">{r.category || "—"}</td>
                    <td className="px-5 py-3">{r.platform || "—"}</td>
                    <td className="px-5 py-3"><span className={`inline-block px-2.5 py-[3px] rounded-full text-[12px] font-semibold capitalize ${statusBadge(r.status)}`}>{r.status}</span></td>
                    <td className="px-5 py-3">{fmt(r.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-1.5">
        <h3 className="text-[13px] font-bold text-admin-slate m-0 mb-1.5">Subscriptions ({subscriptions.length})</h3>
        <div className="bg-white border border-admin-border rounded-2xl overflow-hidden">
          {subscriptions.length === 0 ? (
            <div className="bg-white border-t-0 border-admin-border rounded-b-2xl p-10 text-center text-admin-slate-600 text-[15px]"><p>No subscriptions.</p></div>
          ) : (
            <table className="w-full border-collapse text-[14px]">
              <thead>
                <tr>
                  <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Plan</th>
                  <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Status</th>
                  <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Started</th>
                  <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Expires</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((s) => (
                  <tr key={s.id} className="border-b border-admin-border-light last:border-b-0 hover:bg-admin-surface-hover">
                    <td className="px-5 py-3 font-semibold text-admin-slate">{s.plan}</td>
                    <td className="px-5 py-3"><span className={`inline-block px-2.5 py-[3px] rounded-full text-[12px] font-semibold capitalize ${statusBadge(s.status)}`}>{s.status}</span></td>
                    <td className="px-5 py-3">{fmt(s.started_at)}</td>
                    <td className="px-5 py-3">{fmt(s.expires_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-1.5">
        <h3 className="text-[13px] font-bold text-admin-slate m-0 mb-1.5">Verifications ({verifications.length})</h3>
        <div className="bg-white border border-admin-border rounded-2xl overflow-hidden">
          {verifications.length === 0 ? (
            <div className="bg-white border-t-0 border-admin-border rounded-b-2xl p-10 text-center text-admin-slate-600 text-[15px]"><p>No verifications.</p></div>
          ) : (
            <table className="w-full border-collapse text-[14px]">
              <thead>
                <tr>
                  <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Type</th>
                  <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Status</th>
                  <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Submitted</th>
                  <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Reviewed</th>
                </tr>
              </thead>
              <tbody>
                {verifications.map((v) => (
                  <tr key={v.id} className="border-b border-admin-border-light last:border-b-0 hover:bg-admin-surface-hover">
                    <td className="px-5 py-3 font-semibold text-admin-slate">{v.type}</td>
                    <td className="px-5 py-3"><span className={`inline-block px-2.5 py-[3px] rounded-full text-[12px] font-semibold capitalize ${statusBadge(v.status)}`}>{v.status}</span></td>
                    <td className="px-5 py-3">{fmt(v.submitted_at)}</td>
                    <td className="px-5 py-3">{fmt(v.reviewed_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
      </div>
    </PageShell>
  )
}