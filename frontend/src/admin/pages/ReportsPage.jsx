import { useEffect, useState, useCallback } from "react"
import PageShell from "../components/PageShell"
import { adminApi } from "@/lib/services"

const STATUSES = ["all", "published", "approved", "pending", "rejected"]

export default function ReportsPage() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState("all")

  const load = useCallback((s) => {
    setLoading(true)
    setError(null)
    adminApi
      .reports(s)
      .then((res) => setReports(res.reports || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    load(status)
  }, [load, status])

  const changeStatus = async (id, nextStatus) => {
    try {
      await adminApi.setReportStatus(id, nextStatus)
      setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status: nextStatus } : r)))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <PageShell title="Reports">
      <div className="filter-row">
        {STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            className={`filter-chip${status === s ? " active" : ""}`}
            onClick={() => setStatus(s)}
          >
            {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
      {error && <div className="placeholder-card"><p>Failed: {error}</p></div>}
      {!error && (
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Platform</th>
                <th>Reports</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={6} className="table-empty">Loading…</td></tr>}
              {!loading && reports.length === 0 && (
                <tr><td colSpan={6} className="table-empty">No reports.</td></tr>
              )}
              {!loading && reports.map((r) => (
                <tr key={r.id}>
                  <td className="cell-strong">{r.title_en}</td>
                  <td>{r.category}</td>
                  <td>{r.platform || "—"}</td>
                  <td className="mono">{r.reported_count}</td>
                  <td><span className={`badge ${statusBadge(r.status)}`}>{r.status}</span></td>
                  <td>
                    <div className="table-actions">
                      {r.status !== "approved" && (
                        <button type="button" className="btn-sm btn-sm-green" onClick={() => changeStatus(r.id, "approved")}>Approve</button>
                      )}
                      {r.status !== "rejected" && (
                        <button type="button" className="btn-sm btn-sm-rose" onClick={() => changeStatus(r.id, "rejected")}>Reject</button>
                      )}
                      {r.status !== "published" && (
                        <button type="button" className="btn-sm btn-sm-neutral" onClick={() => changeStatus(r.id, "published")}>Publish</button>
                      )}
                    </div>
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
