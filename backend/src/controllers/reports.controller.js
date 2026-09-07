import supabase from "../services/supabaseClient.js"
import { requiredRule, validate } from "../utils/validators.js"

const REPORT_COLUMNS =
  "report_form_id, user_id, category_id, title_en, title_km, description_en, description_km, " +
  "category, platform, contact_method, amount_lost, date_occurred, screenshot_url, status, " +
  "reported_count, created_at, is_anonymous, display_name, display_avatar_seed"

async function loadCategoryMap() {
  const { data, error } = await supabase.from("category").select("category_id, value")
  if (error) throw error
  const map = new Map()
  for (const row of data || []) map.set(row.category_id, row.value || row.category_id)
  return map
}

async function loadImages(reportIds) {
  if (!reportIds || reportIds.length === 0) return new Map()
  const { data, error } = await supabase
    .from("report_image")
    .select("report_form_id, image_url")
    .in("report_form_id", reportIds)
  if (error) throw error

  const map = new Map()
  for (const row of data || []) {
    if (!map.has(row.report_form_id)) map.set(row.report_form_id, [])
    map.get(row.report_form_id).push(row.image_url)
  }
  return map
}

function mapReport(row, categoryMap, imageMap) {
  const categoryId = row.category_id
  const categoryValue = row.category || categoryMap.get(categoryId) || null
  const images = imageMap?.get(row.report_form_id) || []
  const screenshot = row.screenshot_url || images[0] || null

  return {
    id: row.report_form_id,
    user_id: row.user_id,
    category: categoryValue,
    platform: row.platform || null,
    contact_method: row.contact_method || null,
    amount_lost: row.amount_lost || null,
    date_occurred: row.date_occurred || null,
    screenshot_url: screenshot,
    status: row.status,
    reported_count: row.reported_count ?? 1,
    created_at: row.created_at,
    title_en: row.title_en || "",
    title_km: row.title_km || null,
    description_en: row.description_en || row.description || "",
    description_km: row.description_km || null,
    is_anonymous: row.is_anonymous ?? false,
    display_name: row.display_name || null,
    display_avatar_seed: row.display_avatar_seed || null,
    images,
  }
}

export async function listReports(req, res, next) {
  try {
    const { category, status, q, limit = 50, offset = 0 } = req.query

    const [categoryMapResult, reportResult] = await Promise.all([
      loadCategoryMap(),
      (async () => {
        let query = supabase
          .from("report_form")
          .select(REPORT_COLUMNS)
          .order("created_at", { ascending: false })
          .range(Number(offset), Number(offset) + Number(limit) - 1)
        if (status) query = query.eq("status", status)
        return query
      })(),
    ])

    const categoryMap = categoryMapResult
    let { data, error } = reportResult
    if (error) throw error

    let rows = data || []

    if (category && category !== "all") {
      const catTarget = categoryMap.get(category) || category
      rows = rows.filter((r) => {
        const value = r.category || categoryMap.get(r.category_id)
        return value === catTarget || r.category_id === catTarget
      })
    }

    if (q) {
      const needle = String(q).toLowerCase()
      rows = rows.filter((r) =>
        [r.title_en, r.title_km, r.description_en, r.description_km, r.platform, r.category]
          .join(" ")
          .toLowerCase()
          .includes(needle),
      )
    }

    const imageMap = await loadImages(rows.map((r) => r.report_form_id))
    return res.json({ reports: rows.map((row) => mapReport(row, categoryMap, imageMap)) })
  } catch (err) {
    next(err)
  }
}

export async function getReport(req, res, next) {
  try {
    const { data, error } = await supabase
      .from("report_form")
      .select(REPORT_COLUMNS)
      .eq("report_form_id", req.params.id)
      .maybeSingle()

    if (error) throw error
    if (!data) return res.status(404).json({ error: "Report not found" })

    const categoryMap = await loadCategoryMap()
    const imageMap = await loadImages([data.report_form_id])
    return res.json({ report: mapReport(data, categoryMap, imageMap) })
  } catch (err) {
    next(err)
  }
}

export async function createReport(req, res, next) {
  try {
    const {
      title, description, category, platform, contactMethod,
      amountLost, dateOccurred, screenshotUrl,
      isAnonymous, displayName, displayAvatarSeed,
    } = req.body

    const { valid, errors } = validate({
      title: () => requiredRule(title, "Title is required"),
      description: () => requiredRule(description, "Description is required"),
      category: () => requiredRule(category, "Category is required"),
      contactMethod: () => requiredRule(contactMethod, "Contact method is required"),
    })

    if (!valid) {
      return res.status(400).json({ error: "Validation failed", fields: errors })
    }

    const { data: catRow } = await supabase
      .from("category")
      .select("category_id")
      .eq("value", category)
      .maybeSingle()

    const categoryId = catRow?.category_id || (await categoryIdFallback(category))
    if (!categoryId) {
      return res.status(400).json({ error: `Unknown category: ${category}` })
    }

    if (typeof dateOccurred === "string" && dateOccurred && /^\d{4}-\d{2}-\d{2}$/.test(dateOccurred) === false) {
      return res.status(400).json({ error: "dateOccurred must be YYYY-MM-DD" })
    }

    const payload = {
      user_id: req.user?.id || null,
      category_id: categoryId,
      title_en: title,
      title_km: null,
      description: description,
      description_en: description,
      description_km: null,
      category,
      place: platform || "",
      platform: platform || null,
      contact_method: contactMethod || null,
      amount_lost: amountLost || null,
      date_occurred: dateOccurred || null,
      screenshot_url: screenshotUrl || null,
      status: "published",
      reported_count: 1,
      is_anonymous: Boolean(isAnonymous),
      display_name: displayName || null,
      display_avatar_seed: displayAvatarSeed || null,
    }

    const { data, error } = await supabase.from("report_form").insert(payload).select(REPORT_COLUMNS).single()
    if (error) throw error

    if (screenshotUrl) {
      await supabase
        .from("report_image")
        .insert({ report_form_id: data.report_form_id, image_url: screenshotUrl })
        .catch(() => {})
    }

    const categoryMap = await loadCategoryMap()
    return res.status(201).json({ report: mapReport(data, categoryMap) })
  } catch (err) {
    next(err)
  }
}

async function categoryIdFallback(category) {
  const { data } = await supabase
    .from("category")
    .select("category_id")
    .eq("category_id", category)
    .maybeSingle()
  return data?.category_id || null
}