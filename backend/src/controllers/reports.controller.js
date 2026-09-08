import supabase from "../services/supabaseClient.js"
import { uploadScreenshots } from "../services/storageService.js"
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

async function loadUsers(userIds) {
  const ids = [...new Set((userIds || []).filter(Boolean))]
  if (ids.length === 0) return new Map()
  const { data, error } = await supabase
    .from("users")
    .select("user_id, name, avatar_url")
    .in("user_id", ids)
  if (error) throw error

  const map = new Map()
  for (const row of data || []) map.set(row.user_id, row)
  return map
}

function mapReport(row, categoryMap, imageMap, userMap) {
  const categoryId = row.category_id
  const categoryValue = row.category || categoryMap.get(categoryId) || null
  const images = imageMap?.get(row.report_form_id) || []
  const screenshot = row.screenshot_url || images[0] || null
  const author = userMap?.get(row.user_id) || null
  const isAnonymous = row.is_anonymous ?? false

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
    is_anonymous: isAnonymous,
    display_name: row.display_name || null,
    display_avatar_seed: row.display_avatar_seed || null,
    author_name: isAnonymous ? null : author?.name || null,
    author_avatar_url: isAnonymous ? null : author?.avatar_url || null,
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

    const [imageMap, userMap] = await Promise.all([
      loadImages(rows.map((r) => r.report_form_id)),
      loadUsers(rows.map((r) => r.user_id)),
    ])
    return res.json({ reports: rows.map((row) => mapReport(row, categoryMap, imageMap, userMap)) })
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
    const [imageMap, userMap] = await Promise.all([
      loadImages([data.report_form_id]),
      loadUsers([data.user_id]),
    ])
    return res.json({ report: mapReport(data, categoryMap, imageMap, userMap) })
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
      const { error: imageError } = await supabase
        .from("report_image")
        .insert({ report_form_id: data.report_form_id, image_url: screenshotUrl })
      if (imageError) console.warn("report_image insert failed:", imageError.message)
    }

    const categoryMap = await loadCategoryMap()
    const userMap = await loadUsers([data.user_id])
    return res.status(201).json({ report: mapReport(data, categoryMap, new Map(), userMap) })
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

export async function updateReport(req, res, next) {
  try {
    const reportId = req.params.id

    const { data: existing, error: existingError } = await supabase
      .from("report_form")
      .select("report_form_id, user_id")
      .eq("report_form_id", reportId)
      .maybeSingle()

    if (existingError) throw existingError
    if (!existing) return res.status(404).json({ error: "Report not found" })
    if (existing.user_id !== req.user?.id) {
      return res.status(403).json({ error: "You do not have access to this report" })
    }

    const {
      title, description, category, platform, contactMethod,
      amountLost, dateOccurred, screenshotUrl,
      isAnonymous, displayName, displayAvatarSeed,
    } = req.body

    const payload = {}

    if (title !== undefined && String(title).trim()) payload.title_en = title
    if (description !== undefined && String(description).trim()) {
      payload.description = description
      payload.description_en = description
    }
    if (platform !== undefined) payload.platform = platform || null
    if (contactMethod !== undefined) payload.contact_method = contactMethod || null
    if (amountLost !== undefined) payload.amount_lost = amountLost || null
    if (dateOccurred !== undefined) {
      payload.date_occurred = dateOccurred || null
    }
    if (screenshotUrl !== undefined) payload.screenshot_url = screenshotUrl || null
    if (isAnonymous !== undefined) payload.is_anonymous = Boolean(isAnonymous)
    if (displayName !== undefined) payload.display_name = displayName || null
    if (displayAvatarSeed !== undefined) payload.display_avatar_seed = displayAvatarSeed || null

    if (category !== undefined && String(category).trim()) {
      const categoryValue = String(category).trim()
      const { data: catRow } = await supabase
        .from("category")
        .select("category_id")
        .eq("value", categoryValue)
        .maybeSingle()
      const categoryId = catRow?.category_id || (await categoryIdFallback(categoryValue))
      if (!categoryId) {
        return res.status(400).json({ error: `Unknown category: ${categoryValue}` })
      }
      payload.category_id = categoryId
      payload.category = categoryValue
    }

    if (Object.keys(payload).length === 0) {
      return res.status(400).json({ error: "No fields to update" })
    }

    const { data, error } = await supabase
      .from("report_form")
      .update(payload)
      .eq("report_form_id", reportId)
      .select(REPORT_COLUMNS)
      .single()

    if (error) throw error

    const categoryMap = await loadCategoryMap()
    const userMap = await loadUsers([data.user_id])
    return res.json({ report: mapReport(data, categoryMap, new Map(), userMap) })
  } catch (err) {
    next(err)
  }
}

export async function deleteReport(req, res, next) {
  try {
    const reportId = req.params.id

    const { data: existing, error: existingError } = await supabase
      .from("report_form")
      .select("report_form_id, user_id")
      .eq("report_form_id", reportId)
      .maybeSingle()

    if (existingError) throw existingError
    if (!existing) return res.status(404).json({ error: "Report not found" })
    if (existing.user_id !== req.user?.id) {
      return res.status(403).json({ error: "You do not have access to this report" })
    }

    const { error } = await supabase
      .from("report_form")
      .delete()
      .eq("report_form_id", reportId)

    if (error) throw error

    return res.json({ deleted: true })
  } catch (err) {
    next(err)
  }
}

export async function addReportImages(req, res, next) {
  try {
    const files = req.files || []
    if (files.length === 0) {
      return res.status(400).json({ error: "No images provided" })
    }

    const { data: report, error: reportError } = await supabase
      .from("report_form")
      .select("report_form_id, user_id")
      .eq("report_form_id", req.params.id)
      .maybeSingle()

    if (reportError) throw reportError
    if (!report) return res.status(404).json({ error: "Report not found" })
    if (report.user_id !== req.user?.id) {
      return res.status(403).json({ error: "You do not have access to this report" })
    }

    const imageUrls = await uploadScreenshots(files, report.report_form_id)

    const { data: inserted, error: insertError } = await supabase
      .from("report_image")
      .insert(imageUrls.map((imageUrl) => ({ report_form_id: report.report_form_id, image_url: imageUrl })))
      .select("report_image_id, image_url")

    if (insertError) {
      const err = new Error("Images uploaded but could not be saved")
      err.status = 502
      throw err
    }

    return res.status(201).json({ images: inserted })
  } catch (err) {
    next(err)
  }
}