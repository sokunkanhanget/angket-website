import { useEffect, useState } from "react"
import PageShell from "../components/PageShell"
import { adminApi } from "@/lib/services"

export default function VerificationsPage() {
  const [verifications, setVerifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    adminApi
      .verifications()
      .then((res) => mounted && setVerifications(res.verifications || []))
      .catch((err) => mounted && setError(err.message))
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  const handleReview = async (id, status) => {
    try {
      await adminApi.updateVerification(id, status)
      setVerifications((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v)))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <PageShell title="Verifications">
      {error && <div className="placeholder-card"><p>Failed: {error}</p></div>}
      {!error && (
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={5} className="table-empty">Loading…</td></tr>}
              {!loading && verifications.length === 0 && (
                <tr><td colSpan={5} className="table-empty">No verifications yet.</td></tr>
              )}
              {!loading && verifications.map((v) => (
                <tr key={v.id}>
                  <td className="mono">{v.user_id || "—"}</td>
                  <td className="cell-strong">{v.type}</td>
                  <td><span className={`badge ${statusBadge(v.status)}`}>{v.status}</span></td>
                  <td>{v.submitted_at ? new Date(v.submitted_at).toLocaleDateString() : "—"}</td>
                  <td>
                    {v.status === "pending" && (
                      <div className="table-actions">
                        <button type="button" className="btn-sm btn-sm-green" onClick={() => handleReview(v.id, "approved")}>Approve</button>
                        <button type="button" className="btn-sm btn-sm-rose" onClick={() => handleReview(v.id, "rejected")}>Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageShell>
  )
}

function statusBadge(status) {
  switch (status) {
    case "approved": return "badge-green"
    case "pending": return "badge-amber"
    case "rejected": return "badge-rose"
    default: return "badge-neutral"
  }
}
