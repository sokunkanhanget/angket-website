import { useEffect, useState } from "react"
import PageShell from "../components/PageShell"
import { adminApi } from "@/lib/services"

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    adminApi
      .subscriptions()
      .then((res) => mounted && setSubscriptions(res.subscriptions || []))
      .catch((err) => mounted && setError(err.message))
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  return (
    <PageShell title="Subscriptions">
      {error && <div className="placeholder-card"><p>Failed to load subscriptions: {error}</p></div>}
      {!error && (
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Started</th>
                <th>Expires</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={5} className="table-empty">Loading…</td></tr>}
              {!loading && subscriptions.length === 0 && (
                <tr><td colSpan={5} className="table-empty">No subscriptions yet.</td></tr>
              )}
              {!loading && subscriptions.map((s) => (
                <tr key={s.id}>
                  <td className="mono">{s.user_id || "—"}</td>
                  <td className="cell-strong">{s.plan}</td>
                  <td><span className={`badge ${s.status === "active" ? "badge-green" : "badge-neutral"}`}>{s.status}</span></td>
                  <td>{s.started_at ? new Date(s.started_at).toLocaleDateString() : "—"}</td>
                  <td>{s.expires_at ? new Date(s.expires_at).toLocaleDateString() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageShell>
  )
}
