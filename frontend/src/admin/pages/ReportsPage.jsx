import { useEffect, useState, useCallback } from "react"
import { useSearchParams } from "react-router-dom"
import PageShell from "../components/PageShell"
import { adminApi, categoriesApi } from "@/lib/services"

const STATUSES = ["all", "published", "approved", "pending", "rejected"]

export default function ReportsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState("all")
  const category = searchParams.get("category") || "all"

  const load = useCallback((s, c) => {
    setLoading(true)
    setError(null)
    adminApi
      .reports(s, c)
      .then((res) => setReports(res.reports || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    load(status, category)
  }, [load, status, category])

  useEffect(() => {
    categoriesApi
      .list()
      .then((res) => setCategories(res.categories || []))
      .catch(() => {})
  }, [])

  const selectCategory = (value) => {
    const next = new URLSearchParams(searchParams)
    if (value === "all") next.delete("category")
    else next.set("category", value)
    setSearchParams(next)
  }

  const changeStatus = async (reportFormId, nextStatus) => {
    try {
      await adminApi.setReportStatus(reportFormId, nextStatus)
      setReports((prev) => prev.map((r) => (r.report_form_id === reportFormId ? { ...r, status: nextStatus } : r)))
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
      <div className="filter-row filter-row-cat">
        {["all", ...categories.map((c) => c.value)].map((c) => (
          <button
            key={c}
            type="button"
            className={`filter-chip${category === c ? " active" : ""}`}
            onClick={() => selectCategory(c)}
          >
            {c === "all" ? "All Categories" : (categories.find((x) => x.value === c)?.label_en || c)}
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
                <th>Submitted By</th>
                <th>Category</th>
                <th>Platform</th>
                <th>Reports</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={7} className="table-empty">Loading…</td></tr>}
              {!loading && reports.length === 0 && (
                <tr><td colSpan={7} className="table-empty">No reports.</td></tr>
              )}
              {!loading && reports.map((r) => (
                <tr key={r.report_form_id}>
                  <td className="cell-strong">{r.title_en}</td>
                  <td>{r.user_name || r.user_email || "—"}</td>
                  <td>{r.category}</td>
                  <td>{r.platform || "—"}</td>
                  <td className="mono">{r.reported_count}</td>
                  <td><span className={`badge ${statusBadge(r.status)}`}>{r.status}</span></td>
                  <td>
                    <div className="table-actions">
                      {r.status !== "approved" && (
                        <button type="button" className="btn-sm btn-sm-green" onClick={() => changeStatus(r.report_form_id, "approved")}>Approve</button>
                      )}
                      {r.status !== "rejected" && (
                        <button type="button" className="btn-sm btn-sm-rose" onClick={() => changeStatus(r.report_form_id, "rejected")}>Reject</button>
                      )}
                      {r.status !== "published" && (
                        <button type="button" className="btn-sm btn-sm-neutral" onClick={() => changeStatus(r.report_form_id, "published")}>Publish</button>
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
