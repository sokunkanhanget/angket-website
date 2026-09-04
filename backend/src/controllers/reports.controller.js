import supabase from "../services/supabaseClient.js"
import { requiredRule, validate } from "../utils/validators.js"

export async function listReports(req, res, next) {
  try {
    const { category, status, q, limit = 50, offset = 0 } = req.query

    let query = supabase
      .from("reports")
      .select("id, user_id, title_en, title_km, description_en, description_km, category, platform, contact_method, amount_lost, date_occurred, screenshot_url, status, reported_count, created_at")
      .order("created_at", { ascending: false })
      .range(Number(offset), Number(offset) + Number(limit) - 1)

    if (category && category !== "all") query = query.eq("category", category)
    if (status) query = query.eq("status", status)

    let { data, error } = await query
    if (error) throw error

    if (q) {
      const needle = String(q).toLowerCase()
      data = (data || []).filter((r) =>
        [r.title_en, r.title_km, r.description_en, r.description_km, r.platform, r.category]
          .join(" ")
          .toLowerCase()
          .includes(needle),
      )
    }

    return res.json({ reports: data || [] })
  } catch (err) {
    next(err)
  }
}

export async function getReport(req, res, next) {
  try {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("id", req.params.id)
      .maybeSingle()

    if (error) throw error
    if (!data) return res.status(404).json({ error: "Report not found" })

    return res.json({ report: data })
  } catch (err) {
    next(err)
  }
}

export async function createReport(req, res, next) {
  try {
    const {
      title, description, category, platform, contactMethod,
      amountLost, dateOccurred, screenshotUrl,
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

    const payload = {
      user_id: req.user?.id || null,
      title_en: title,
      title_km: title,
      description_en: description,
      description_km: description,
      category,
      platform: platform || null,
      contact_method: contactMethod || null,
      amount_lost: amountLost || null,
      date_occurred: dateOccurred || null,
      screenshot_url: screenshotUrl || null,
      status: "published",
      reported_count: 1,
    }

    const { data, error } = await supabase.from("reports").insert(payload).select().single()

    if (error) throw error

    if (req.user?.id) {
      await supabase.rpc("increment_report_count", { report_id: data.id }).catch(() => {})
    }

    return res.status(201).json({ report: data })
  } catch (err) {
    next(err)
  }
}
