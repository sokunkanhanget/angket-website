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
      {error && <div className="bg-white border border-admin-border rounded-2xl p-10 text-center text-admin-slate-600 text-[15px]"><p>Failed to load subscriptions: {error}</p></div>}
      {!error && (
        <div className="bg-white border border-admin-border rounded-2xl overflow-hidden">
          <table className="w-full border-collapse text-[14px]">
            <thead>
              <tr>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">User</th>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Plan</th>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Status</th>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Started</th>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Expires</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={5} className="text-center text-admin-slate-600 py-8">Loading…</td></tr>}
              {!loading && subscriptions.length === 0 && (
                <tr><td colSpan={5} className="text-center text-admin-slate-600 py-8">No subscriptions yet.</td></tr>
              )}
              {!loading && subscriptions.map((s) => (
                <tr key={s.id} className="border-b border-admin-border-light last:border-b-0 hover:bg-admin-surface-hover">
                  <td className="px-5 py-3 font-semibold text-admin-slate">{s.email || "—"}</td>
                  <td className="px-5 py-3">{s.plan}</td>
                  <td className="px-5 py-3"><span className={`inline-block px-2.5 py-[3px] rounded-full text-[12px] font-semibold capitalize ${s.status === "active" ? "bg-admin-green-bg text-admin-green" : "bg-slate-100 text-admin-slate-600"}`}>{s.status}</span></td>
                  <td className="px-5 py-3">{s.started_at ? new Date(s.started_at).toLocaleDateString() : "—"}</td>
                  <td className="px-5 py-3">{s.expires_at ? new Date(s.expires_at).toLocaleDateString() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageShell>
  )
}
