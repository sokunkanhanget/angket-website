import supabase from "../services/supabaseClient.js"
import { requiredRule, validate } from "../utils/validators.js"

const COLUMNS = "category_id, name, value, label_en, label_km, description_en, description_km, sort_order"

function mapCategory(row) {
  if (!row) return null
  return {
    id: row.category_id,
    value: row.value || row.category_id,
    label_en: row.label_en || row.name,
    label_km: row.label_km || null,
    description_en: row.description_en || null,
    description_km: row.description_km || null,
    sort_order: row.sort_order || 0,
  }
}

export async function listCategories(_req, res, next) {
  try {
    const { data, error } = await supabase
      .from("category")
      .select(COLUMNS)
      .order("sort_order", { ascending: true })

    if (error) throw error
    return res.json({ categories: (data || []).map(mapCategory) })
  } catch (err) {
    next(err)
  }
}

export async function createCategory(req, res, next) {
  try {
    const { value, label_en, label_km, description_en, description_km, sort_order } = req.body

    const { valid, errors } = validate({
      value: () => requiredRule(value, "value is required"),
      label_en: () => requiredRule(label_en, "label_en is required"),
    })
    if (!valid) {
      return res.status(400).json({ error: "Validation failed", fields: errors })
    }

    const slug = String(value).trim().toLowerCase().replace(/\s+/g, "-")
    const { data, error } = await supabase
      .from("category")
      .insert({
        category_id: slug,
        name: label_en,
        value: slug,
        label_en,
        label_km: label_km || null,
        description_en: description_en || null,
        description_km: description_km || null,
        sort_order: Number.isFinite(sort_order) ? sort_order : 0,
      })
      .select(COLUMNS)
      .single()

    if (error) throw error
    return res.status(201).json({ category: mapCategory(data) })
  } catch (err) {
    if (err?.code === "23505") {
      return res.status(409).json({ error: "A category with this value already exists" })
    }
    next(err)
  }
}

export async function updateCategory(req, res, next) {
  try {
    const { id } = req.params
    const { value, label_en, label_km, description_en, description_km, sort_order } = req.body

    const { data, error } = await supabase
      .from("category")
      .update({
        ...(value ? { value: String(value).trim().toLowerCase().replace(/\s+/g, "-") } : {}),
        ...(label_en ? { name: label_en, label_en } : {}),
        ...(label_km !== undefined ? { label_km } : {}),
        ...(description_en !== undefined ? { description_en } : {}),
        ...(description_km !== undefined ? { description_km } : {}),
        ...(Number.isFinite(sort_order) ? { sort_order } : {}),
      })
      .eq("category_id", id)
      .select(COLUMNS)
      .maybeSingle()

    if (error) throw error
    if (!data) return res.status(404).json({ error: "Category not found" })
    return res.json({ category: mapCategory(data) })
  } catch (err) {
    next(err)
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const { id } = req.params
    const { data, error } = await supabase
      .from("report_form")
      .select("report_form_id")
      .eq("category_id", id)
      .limit(1)
    if (error) throw error

    if (data && data.length > 0) {
      return res.status(409).json({ error: "Category is in use and cannot be deleted" })
    }

    const { error: deleteError } = await supabase.from("category").delete().eq("category_id", id)
    if (deleteError) throw deleteError
    return res.status(204).end()
  } catch (err) {
    next(err)
  }
}