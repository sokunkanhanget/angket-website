import { useEffect, useState, useCallback } from "react"
import { useSearchParams } from "react-router-dom"
import PageShell from "../components/PageShell"
import { adminApi, categoriesApi } from "@/lib/services"
import { IconClose } from "@/components/icons"

const STATUSES = ["all", "published", "banned", "inactive"]

export default function ReportsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])
  const [status, setStatus] = useState("all")
  const [selected, setSelected] = useState(null)
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
      <div className="flex flex-wrap gap-2 items-center">
        {STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            className={`px-3.5 py-[7px] rounded-full border text-[13px] font-medium cursor-pointer transition-colors ${status === s ? "bg-admin-accent border-admin-accent text-white" : "bg-white border-admin-border text-admin-slate-600 hover:border-[#c3d4ec]"}`}
            onClick={() => setStatus(s)}
          >
            {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 items-center mt-2.5 pb-0.5">
        {["all", ...categories.map((c) => c.value)].map((c) => (
          <button
            key={c}
            type="button"
            className={`px-3.5 py-[7px] rounded-full border text-[13px] font-medium cursor-pointer transition-colors ${category === c ? "bg-admin-accent border-admin-accent text-white" : "bg-white border-admin-border text-admin-slate-600 hover:border-[#c3d4ec]"}`}
            onClick={() => selectCategory(c)}
          >
            {c === "all" ? "All Categories" : (categories.find((x) => x.value === c)?.label_en || c)}
          </button>
        ))}
      </div>
      {error && <div className="bg-white border border-admin-border rounded-2xl p-10 text-center text-admin-slate-600 text-[15px]"><p>Failed: {error}</p></div>}
      {!error && (
        <div className="bg-white border border-admin-border rounded-2xl overflow-hidden">
          <table className="w-full border-collapse text-[14px]">
            <thead>
              <tr>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Title</th>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Submitted By</th>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Category</th>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Platform</th>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Reports</th>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Status</th>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={7} className="text-center text-admin-slate-600 py-8">Loading…</td></tr>}
              {!loading && reports.length === 0 && (
                <tr><td colSpan={7} className="text-center text-admin-slate-600 py-8">No reports.</td></tr>
              )}
              {!loading && reports.map((r) => (
                <tr key={r.report_form_id} className="border-b border-admin-border-light last:border-b-0 hover:bg-admin-surface-hover cursor-pointer" onClick={() => setSelected(r)}>
                  <td className="px-5 py-3 font-semibold text-admin-slate">{r.title_en}</td>
                  <td className="px-5 py-3">{r.user_name || r.user_email || "—"}</td>
                  <td className="px-5 py-3">{r.category}</td>
                  <td className="px-5 py-3">{r.platform || "—"}</td>
                  <td className="px-5 py-3 font-[IBM_Plex_Mono,monospace] font-variant-numeric-tabular-nums">{r.reported_count}</td>
                  <td className="px-5 py-3"><span className={`inline-block px-2.5 py-[3px] rounded-full text-[12px] font-semibold capitalize ${statusBadge(r.status)}`}>{r.status}</span></td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2 flex-wrap">
                      <button type="button" className="inline-block px-3 py-[6px] rounded-lg text-[12px] font-semibold border border-transparent bg-admin-blue-soft text-admin-info hover:bg-sky-400 hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); setSelected(r) }}>View</button>
                      {r.status !== "inactive" && (
                        <button type="button" className="inline-block px-3 py-[6px] rounded-lg text-[12px] font-semibold border border-transparent bg-slate-100 text-admin-slate-600 hover:bg-slate-200 transition-colors" onClick={(e) => { e.stopPropagation(); changeStatus(r.report_form_id, "inactive") }}>Inactive</button>
                      )}
                      {r.status !== "banned" && (
                        <button type="button" className="inline-block px-3 py-[6px] rounded-lg text-[12px] font-semibold border border-transparent bg-admin-rose-bg text-admin-rose hover:bg-rose-100 transition-colors" onClick={(e) => { e.stopPropagation(); changeStatus(r.report_form_id, "banned") }}>Banned</button>
                      )}
                      {r.status !== "published" && (
                        <button type="button" className="inline-block px-3 py-[6px] rounded-lg text-[12px] font-semibold border border-transparent bg-slate-100 text-admin-slate-600 hover:bg-slate-200 transition-colors" onClick={(e) => { e.stopPropagation(); changeStatus(r.report_form_id, "published") }}>Publish</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selected && <ReportDetailModal report={selected} onClose={() => setSelected(null)} />}
    </PageShell>
  )
}

function statusBadge(status) {
  switch (status) {
    case "banned": return "bg-admin-rose-bg text-admin-rose"
    case "inactive": return "bg-slate-100 text-admin-slate-600"
    default: return "bg-slate-100 text-admin-slate-600"
  }
}

function fmtDateTime(value) {
  if (!value) return "—"
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return String(value)
  const dd = String(d.getDate()).padStart(2, "0")
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const yyyy = d.getFullYear()
  const hh = String(d.getHours()).padStart(2, "0")
  const min = String(d.getMinutes()).padStart(2, "0")
  return `${dd}/${mm}/${yyyy} ${hh}:${min}`
}

function fmtDate(value) {
  if (!value) return "—"
  const m = String(value).match(/^\d{4}-\d{2}-\d{2}/)
  if (m) return m[0].split("-").reverse().join("/")
  return String(value)
}

function ReportDetailModal({ report: r, onClose }) {
  const image = r.screenshot_url || r.images?.[0] || null
  return (
    <>
      <div className="fixed inset-0 bg-black/45 z-[1300]" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(520px,calc(100vw-1rem))] max-h-[92vh] bg-white rounded-2xl overflow-hidden shadow-xl z-[1400] flex flex-col" role="dialog" aria-modal="true" aria-labelledby="adm-rpt-title">
        <div className="relative h-44 bg-slate-100">
          {image ? (
            <img src={image} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#e6eefc] to-[#dbeafe]" aria-hidden="true" />
          )}
          <button type="button" className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-admin-border flex items-center justify-center" aria-label="Close" onClick={onClose}>
            <IconClose />
          </button>
        </div>
        <div className="p-5 overflow-auto flex-1">
          <span className="text-xs font-semibold text-admin-accent bg-admin-accent-bg px-2 py-0.5 rounded-full uppercase tracking-wider">{r.category || "General"}</span>
          <h3 id="adm-rpt-title" className="text-lg font-bold text-admin-slate mt-2 mb-1">{r.title_en}</h3>
          {r.title_km && r.title_km !== r.title_en && (
            <p className="text-sm text-admin-slate-600">{r.title_km}</p>
          )}
          {r.description_en && <p className="text-[14px] text-admin-slate mt-2">{r.description_en}</p>}
          {r.description_km && r.description_km !== r.description_en && (
            <p className="text-sm text-admin-slate-600 mt-1">{r.description_km}</p>
          )}
          <dl className="mt-3 flex flex-col gap-2 pt-3 border-t border-admin-border-light">
            {r.platform && (
              <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-2.5 text-[13.5px] leading-[1.55]">
                <dt className="text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider">Platform</dt>
                <dd className="m-0 text-admin-slate break-words">{r.platform}</dd>
              </div>
            )}
            <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-2.5 text-[13.5px] leading-[1.55]">
              <dt className="text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider">Status</dt>
              <dd className="m-0"><span className={`inline-block px-2.5 py-[3px] rounded-full text-[12px] font-semibold capitalize ${statusBadge(r.status)}`}>{r.status}</span></dd>
            </div>
            <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-2.5 text-[13.5px] leading-[1.55]">
              <dt className="text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider">Submitted by</dt>
              <dd className="m-0 text-admin-slate break-words">{r.is_anonymous ? "Anonymous" : (r.user_name || r.user_email || r.display_name || "—")}</dd>
            </div>
            <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-2.5 text-[13.5px] leading-[1.55]">
              <dt className="text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider">Reported count</dt>
              <dd className="m-0 text-admin-slate">{r.reported_count ?? 0}</dd>
            </div>
            {r.date_occurred && (
              <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-2.5 text-[13.5px] leading-[1.55]">
                <dt className="text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider">Date occurred</dt>
                <dd className="m-0 text-admin-slate">{fmtDate(r.date_occurred)}</dd>
              </div>
            )}
            {r.amount_lost && (
              <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-2.5 text-[13.5px] leading-[1.55]">
                <dt className="text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider">Amount lost</dt>
                <dd className="m-0 text-admin-slate">{r.amount_lost}</dd>
              </div>
            )}
            {r.contact_method && (
              <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-2.5 text-[13.5px] leading-[1.55]">
                <dt className="text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider">Contact method</dt>
                <dd className="m-0 text-admin-slate break-words">{r.contact_method}</dd>
              </div>
            )}
            <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-2.5 text-[13.5px] leading-[1.55]">
              <dt className="text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider">Created at</dt>
              <dd className="m-0 text-admin-slate">{fmtDateTime(r.created_at)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  )
}
