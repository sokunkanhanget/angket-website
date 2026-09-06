import { useEffect, useState, useCallback } from "react"
import PageShell from "../components/PageShell"
import { categoriesApi } from "@/lib/services"

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ value: "", label_en: "", label_km: "", description_en: "", description_km: "" })

  const load = useCallback(() => {
    setLoading(true)
    categoriesApi
      .list()
      .then((res) => setCategories(res.categories || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await categoriesApi.create(form)
      setForm({ value: "", label_en: "", label_km: "", description_en: "", description_km: "" })
      setError(null)
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await categoriesApi.remove(id)
      setCategories((prev) => prev.filter((c) => c.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  return (
    <PageShell title="Categories">
      <form className="category-form" onSubmit={handleCreate}>
        <div className="field">
          <label>Value (slug)</label>
          <input className="control" value={form.value} onChange={update("value")} placeholder="e.g. fake-job" required />
        </div>
        <div className="field">
          <label>Label (EN)</label>
          <input className="control" value={form.label_en} onChange={update("label_en")} placeholder="Fake Job" required />
        </div>
        <div className="field">
          <label>Label (KM)</label>
          <input className="control" value={form.label_km} onChange={update("label_km")} placeholder="ការងារក្លែងក្លាយ" />
        </div>
        <button type="submit" className="btn-sm btn-sm-green">Add</button>
      </form>

      {error && <div className="placeholder-card"><p>Failed: {error}</p></div>}
      {!error && (
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Value</th>
                <th>Label (EN)</th>
                <th>Label (KM)</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={5} className="table-empty">Loading…</td></tr>}
              {!loading && categories.length === 0 && (
                <tr><td colSpan={5} className="table-empty">No categories yet.</td></tr>
              )}
              {!loading && categories.map((c) => (
                <tr key={c.id}>
                  <td className="mono">{c.value}</td>
                  <td className="cell-strong">{c.label_en}</td>
                  <td>{c.label_km || "—"}</td>
                  <td>{c.description_en || "—"}</td>
                  <td>
                    <button type="button" className="btn-sm btn-sm-rose" onClick={() => handleDelete(c.id)}>Delete</button>
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
