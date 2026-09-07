import supabase from "../services/supabaseClient.js"

const REPORT_COLUMNS =
  "report_form_id, user_id, category_id, title_en, title_km, description_en, description_km, " +
  "category, platform, contact_method, amount_lost, date_occurred, screenshot_url, status, " +
  "reported_count, created_at, is_anonymous, display_name, display_avatar_seed"

export async function saveReport(req, res, next) {
  try {
    const userId = req.user.id
    const { reportId } = req.params

    const { data: existing } = await supabase
      .from("saved_reports")
      .select("id")
      .eq("user_id", userId)
      .eq("report_form_id", reportId)
      .maybeSingle()

    if (existing) {
      return res.json({ saved: true })
    }

    const { error } = await supabase
      .from("saved_reports")
      .insert({ user_id: userId, report_form_id: reportId })

    if (error) throw error
    return res.json({ saved: true })
  } catch (err) {
    next(err)
  }
}

export async function unsaveReport(req, res, next) {
  try {
    const userId = req.user.id
    const { reportId } = req.params

    const { error } = await supabase
      .from("saved_reports")
      .delete()
      .eq("user_id", userId)
      .eq("report_form_id", reportId)

    if (error) throw error
    return res.json({ saved: false })
  } catch (err) {
    next(err)
  }
}

export async function listSavedReports(req, res, next) {
  try {
    const userId = req.user.id

    const { data: savedRows, error: savedErr } = await supabase
      .from("saved_reports")
      .select("report_form_id, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (savedErr) throw savedErr

    if (!savedRows || savedRows.length === 0) {
      return res.json({ reports: [], savedIds: [] })
    }

    const reportIds = savedRows.map((r) => r.report_form_id)

    const [reportResult, imageResult] = await Promise.all([
      supabase
        .from("report_form")
        .select(REPORT_COLUMNS)
        .in("report_form_id", reportIds),
      supabase
        .from("report_image")
        .select("report_form_id, image_url")
        .in("report_form_id", reportIds),
    ])

    const { data: reportRows, error: reportErr } = reportResult
    if (reportErr) throw reportErr

    const { data: imageRows } = imageResult

    const imageMap = new Map()
    for (const row of imageRows || []) {
      if (!imageMap.has(row.report_form_id)) imageMap.set(row.report_form_id, [])
      imageMap.get(row.report_form_id).push(row.image_url)
    }

    const reportMap = new Map()
    for (const row of reportRows || []) {
      const images = imageMap.get(row.report_form_id) || []
      const screenshot = row.screenshot_url || images[0] || null
      reportMap.set(row.report_form_id, {
        id: row.report_form_id,
        user_id: row.user_id,
        category: row.category || null,
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
      })
    }

    const reports = savedRows
      .map((s) => reportMap.get(s.report_form_id))
      .filter(Boolean)

    return res.json({ reports, savedIds: reportIds })
  } catch (err) {
    next(err)
  }
}
