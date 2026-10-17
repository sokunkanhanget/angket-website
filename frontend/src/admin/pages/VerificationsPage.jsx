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
      {error && <div className="bg-white border border-admin-border rounded-2xl p-10 text-center text-admin-slate-600 text-[15px]"><p>Failed: {error}</p></div>}
      {!error && (
        <div className="bg-white border border-admin-border rounded-2xl overflow-hidden">
          <table className="w-full border-collapse text-[14px]">
            <thead>
              <tr>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">User</th>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Type</th>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Status</th>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Submitted</th>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={5} className="text-center text-admin-slate-600 py-8">Loading…</td></tr>}
              {!loading && verifications.length === 0 && (
                <tr><td colSpan={5} className="text-center text-admin-slate-600 py-8">No verifications yet.</td></tr>
              )}
              {!loading && verifications.map((v) => (
                <tr key={v.id} className="border-b border-admin-border-light last:border-b-0 hover:bg-admin-surface-hover">
                  <td className="px-5 py-3 font-semibold text-admin-slate">{v.user_name || v.email || "—"}</td>
                  <td className="px-5 py-3">{v.type}</td>
                  <td className="px-5 py-3"><span className={`inline-block px-2.5 py-[3px] rounded-full text-[12px] font-semibold capitalize ${statusBadge(v.status)}`}>{v.status}</span></td>
                  <td className="px-5 py-3">{v.submitted_at ? new Date(v.submitted_at).toLocaleDateString() : "—"}</td>
                  <td className="px-5 py-3">
                    {v.status === "pending" && (
                      <div className="flex gap-2 flex-wrap">
                        <button type="button" className="inline-block px-3 py-[6px] rounded-lg text-[12px] font-semibold border border-transparent bg-admin-green-bg text-admin-green hover:bg-emerald-100 transition-colors" onClick={() => handleReview(v.id, "approved")}>Approve</button>
                        <button type="button" className="inline-block px-3 py-[6px] rounded-lg text-[12px] font-semibold border border-transparent bg-admin-rose-bg text-admin-rose hover:bg-rose-100 transition-colors" onClick={() => handleReview(v.id, "rejected")}>Reject</button>
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
    case "approved": return "bg-admin-green-bg text-admin-green"
    case "pending": return "bg-admin-amber-bg text-admin-amber"
    case "rejected": return "bg-admin-rose-bg text-admin-rose"
    default: return "bg-slate-100 text-admin-slate-600"
  }
}
