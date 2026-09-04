import { useEffect, useState } from "react"
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
      {error && <div className="placeholder-card"><p>Failed to load users: {error}</p></div>}
      {!error && (
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={4} className="table-empty">Loading…</td></tr>
              )}
              {!loading && users.length === 0 && (
                <tr><td colSpan={4} className="table-empty">No users yet.</td></tr>
              )}
              {!loading && users.map((u) => (
                <tr key={u.id}>
                  <td className="cell-strong">{u.full_name || "—"}</td>
                  <td className="mono">{u.phone || "—"}</td>
                  <td><span className={`badge ${u.role === "admin" ? "badge-blue" : "badge-neutral"}`}>{u.role}</span></td>
                  <td>{u.created_at ? new Date(u.created_at).toLocaleDateString() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageShell>
  )
}
