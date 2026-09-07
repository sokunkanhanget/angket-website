import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import PageShell from "../components/PageShell"
import { adminApi } from "@/lib/services"

function statusBadge(status) {
  switch (status) {
    case "approved": return "badge-green"
    case "pending": return "badge-amber"
    case "rejected": return "badge-rose"
    case "active": return "badge-green"
    default: return "badge-neutral"
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
      <div className="user-detail-wrap">
      <Link className="btn-sm btn-sm-neutral detail-back" to="/admin/users">
        <ArrowLeft size={14} /> Back to Users
      </Link>

      <section className="user-detail-profile">
        <span className="user-detail-avatar">{initials(user.full_name)}</span>
        <div className="user-detail-meta">
          <h2>{user.full_name || "—"}</h2>
          <p className="user-detail-email">{user.email || "—"}</p>
          <div className="user-detail-row">
            <span>Phone</span>
            <strong className="mono">{user.phone || "—"}</strong>
          </div>
          <div className="user-detail-row">
            <span>Role</span>
            <span className={`badge ${user.role === "admin" ? "badge-blue" : "badge-neutral"}`}>{user.role}</span>
          </div>
          <div className="user-detail-row">
            <span>Joined</span>
            <strong>{fmt(user.created_at)}</strong>
          </div>
        </div>
      </section>

      <section className="detail-section">
        <h3 className="detail-section-title">Reports ({reports.length})</h3>
        <div className="table-card">
          {reports.length === 0 ? (
            <div className="placeholder-card"><p>No reports.</p></div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Platform</th>
                  <th>Status</th>
                  <th>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.report_form_id}>
                    <td className="cell-strong">{r.title}</td>
                    <td>{r.category || "—"}</td>
                    <td>{r.platform || "—"}</td>
                    <td><span className={`badge ${statusBadge(r.status)}`}>{r.status}</span></td>
                    <td>{fmt(r.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <section className="detail-section">
        <h3 className="detail-section-title">Subscriptions ({subscriptions.length})</h3>
        <div className="table-card">
          {subscriptions.length === 0 ? (
            <div className="placeholder-card"><p>No subscriptions.</p></div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Started</th>
                  <th>Expires</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((s) => (
                  <tr key={s.id}>
                    <td className="cell-strong">{s.plan}</td>
                    <td><span className={`badge ${statusBadge(s.status)}`}>{s.status}</span></td>
                    <td>{fmt(s.started_at)}</td>
                    <td>{fmt(s.expires_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <section className="detail-section">
        <h3 className="detail-section-title">Verifications ({verifications.length})</h3>
        <div className="table-card">
          {verifications.length === 0 ? (
            <div className="placeholder-card"><p>No verifications.</p></div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th>Reviewed</th>
                </tr>
              </thead>
              <tbody>
                {verifications.map((v) => (
                  <tr key={v.id}>
                    <td className="cell-strong">{v.type}</td>
                    <td><span className={`badge ${statusBadge(v.status)}`}>{v.status}</span></td>
                    <td>{fmt(v.submitted_at)}</td>
                    <td>{fmt(v.reviewed_at)}</td>
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