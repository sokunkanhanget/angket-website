import { useEffect, useState, useCallback } from "react"
import { Link } from "react-router-dom"
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
      <form className="flex gap-2.5 flex-wrap bg-white border border-admin-border rounded-2xl p-4 items-end" onSubmit={handleCreate}>
        <div className="flex flex-col gap-1.5 flex-[1_1_160px]">
          <label className="text-[12px] font-semibold text-admin-slate-600">Value (slug)</label>
          <input className="border border-admin-border rounded-xl px-3 py-2 text-[14px] text-admin-slate bg-white outline-none focus:border-admin-accent transition-colors" value={form.value} onChange={update("value")} placeholder="e.g. fake-job" required />
        </div>
        <div className="flex flex-col gap-1.5 flex-[1_1_160px]">
          <label className="text-[12px] font-semibold text-admin-slate-600">Label (EN)</label>
          <input className="border border-admin-border rounded-xl px-3 py-2 text-[14px] text-admin-slate bg-white outline-none focus:border-admin-accent transition-colors" value={form.label_en} onChange={update("label_en")} placeholder="Fake Job" required />
        </div>
        <div className="flex flex-col gap-1.5 flex-[1_1_160px]">
          <label className="text-[12px] font-semibold text-admin-slate-600">Label (KM)</label>
          <input className="border border-admin-border rounded-xl px-3 py-2 text-[14px] text-admin-slate bg-white outline-none focus:border-admin-accent transition-colors" value={form.label_km} onChange={update("label_km")} placeholder="ការងារក្លែងក្លាយ" />
        </div>
        <div className="flex flex-col gap-1.5 flex-[1_1_160px]">
          <label className="text-[12px] font-semibold text-admin-slate-600">Description (EN)</label>
          <input className="border border-admin-border rounded-xl px-3 py-2 text-[14px] text-admin-slate bg-white outline-none focus:border-admin-accent transition-colors" value={form.description_en} onChange={update("description_en")} placeholder="Describe this category in English" />
        </div>
        <div className="flex flex-col gap-1.5 flex-[1_1_160px]">
          <label className="text-[12px] font-semibold text-admin-slate-600">Description (KM)</label>
          <input className="border border-admin-border rounded-xl px-3 py-2 text-[14px] text-admin-slate bg-white outline-none focus:border-admin-accent transition-colors" value={form.description_km} onChange={update("description_km")} placeholder="ពណ៌នាជាភាសាខ្មែរ" />
        </div>
        <button type="submit" className="inline-block px-3 py-[6px] rounded-lg text-[12px] font-semibold border border-transparent bg-admin-green-bg text-admin-green hover:bg-emerald-100 transition-colors">Add</button>
      </form>

      {error && <div className="bg-white border border-admin-border rounded-2xl p-10 text-center text-admin-slate-600 text-[15px]"><p>Failed: {error}</p></div>}
      {!error && (
        <div className="bg-white border border-admin-border rounded-2xl overflow-hidden">
          <table className="w-full border-collapse text-[14px]">
            <thead>
              <tr>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Value</th>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Label (EN)</th>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Label (KM)</th>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Description</th>
                <th className="text-left px-5 py-3 bg-slate-50 text-admin-slate-600 font-semibold text-[12px] uppercase tracking-wider border-b border-admin-border-light">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={5} className="text-center text-admin-slate-600 py-8">Loading…</td></tr>}
              {!loading && categories.length === 0 && (
                <tr><td colSpan={5} className="text-center text-admin-slate-600 py-8">No categories yet.</td></tr>
              )}
              {!loading && categories.map((c) => (
                <tr key={c.id} className="border-b border-admin-border-light last:border-b-0 hover:bg-admin-surface-hover">
                  <td className="px-5 py-3 font-[IBM_Plex_Mono,monospace] font-variant-numeric-tabular-nums">{c.value}</td>
                  <td className="px-5 py-3 font-semibold text-admin-slate">
                    <Link className="text-admin-accent hover:underline" to={`/admin/reports?category=${c.value}`}>
                      {c.label_en}
                    </Link>
                  </td>
                  <td className="px-5 py-3">{c.label_km || "—"}</td>
                  <td className="px-5 py-3">{c.description_en || "—"}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2 flex-wrap">
                      <Link className="inline-block px-3 py-[6px] rounded-lg text-[12px] font-semibold border border-transparent bg-admin-blue-soft text-admin-info hover:bg-sky-400 hover:text-white transition-colors" to={`/admin/reports?category=${c.value}`}>View</Link>
                      <button type="button" className="inline-block px-3 py-[6px] rounded-lg text-[12px] font-semibold border border-transparent bg-admin-rose-bg text-admin-rose hover:bg-rose-100 transition-colors" onClick={() => handleDelete(c.id)}>Delete</button>
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
