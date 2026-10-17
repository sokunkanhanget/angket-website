import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import PageShell from "../components/PageShell"
import { adminApi } from "@/lib/services"

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    adminApi
      .users()
      .then((res) => mounted && setUsers(res.users || []))
      .catch((err) => mounted && setError(err.message))
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  return (
    <PageShell title="Users">
      {error && <div className="bg-white border border-admin-border rounded-2xl p-10 text-center text-admin-slate-600 text-[15px]"><p>Failed to load users: {error}</p></div>}
      {!error && (
        <div className="bg-white border border-admin-border rounded-2xl overflow-hidden">
          <table className="w-full border-collapse text-[14px]">
            <thead>
              <tr>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Name</th>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Phone</th>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Role</th>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Joined</th>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={5} className="text-center text-admin-slate-600 py-8">Loading…</td></tr>
              )}
              {!loading && users.length === 0 && (
                <tr><td colSpan={5} className="text-center text-admin-slate-600 py-8">No users yet.</td></tr>
              )}
              {!loading && users.map((u) => (
                <tr key={u.id} className="border-b border-admin-border-light last:border-b-0 hover:bg-admin-surface-hover">
                  <td className="px-5 py-3 font-semibold text-admin-slate">{u.full_name || "—"}</td>
                  <td className="px-5 py-3 font-[IBM_Plex_Mono,monospace] font-variant-numeric-tabular-nums">{u.phone || "—"}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-block px-2.5 py-[3px] rounded-full text-[12px] font-semibold capitalize ${u.role === "admin" ? "bg-admin-accent-bg text-admin-accent" : "bg-slate-100 text-admin-slate-600"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3">{u.created_at ? new Date(u.created_at).toLocaleDateString() : "—"}</td>
                  <td className="px-5 py-3">
                    <Link className="inline-block px-3 py-[6px] rounded-lg text-[12px] font-semibold border border-transparent bg-admin-blue-soft text-admin-info hover:bg-sky-400 hover:text-white transition-colors" to={`/admin/users/${u.id}`}>View</Link>
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
