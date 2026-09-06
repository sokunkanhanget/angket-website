import supabase from "../services/supabaseClient.js"

export async function listCategories(_req, res, next) {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true })

    if (error) throw error
    return res.json({ categories: data || [] })
  } catch (err) {
    next(err)
  }
}

export async function createCategory(req, res, next) {
  try {
    const { value, label_en, label_km, description_en, description_km } = req.body

    if (!value || !label_en) {
      return res.status(400).json({ error: "value and label_en are required" })
    }

    const { data, error } = await supabase
      .from("categories")
      .insert({ value, label_en, label_km, description_en, description_km })
      .select()
      .single()

    if (error) throw error
    return res.status(201).json({ category: data })
  } catch (err) {
    next(err)
  }
}

export async function updateCategory(req, res, next) {
  try {
    const { id } = req.params
    const { value, label_en, label_km, description_en, description_km, sort_order } = req.body

    const { data, error } = await supabase
      .from("categories")
      .update({ value, label_en, label_km, description_en, description_km, sort_order })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    if (!data) return res.status(404).json({ error: "Category not found" })
    return res.json({ category: data })
  } catch (err) {
    next(err)
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const { id } = req.params
    const { error } = await supabase.from("categories").delete().eq("id", id)
    if (error) throw error
    return res.status(204).end()
  } catch (err) {
    next(err)
  }
}
