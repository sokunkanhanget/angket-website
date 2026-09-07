import supabase from "../services/supabaseClient.js"

export async function dashboardStats(_req, res, next) {
  try {
    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)

    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)

    const [users, reports, subscriptions, verifications, todayReports, weekUsers] =
      await Promise.all([
        supabase.from("users").select("user_id", { count: "exact", head: true }),
        supabase.from("report_form").select("report_form_id", { count: "exact", head: true }),
        supabase.from("user_subscription").select("sub_id", { count: "exact", head: true }).eq("status", "active"),
        supabase.from("verifications").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("report_form").select("report_form_id", { count: "exact", head: true }).gte("created_at", startOfToday.toISOString()).eq("status", "approved"),
        supabase.from("users").select("user_id", { count: "exact", head: true }).gte("created_at", weekAgo.toISOString()),
      ])

    return res.json({
      stats: {
        totalUsers: users.count ?? 0,
        totalReports: reports.count ?? 0,
        activeSubscriptions: subscriptions.count ?? 0,
        pendingVerifications: verifications.count ?? 0,
        reportsApprovedToday: todayReports.count ?? 0,
        newSignupsThisWeek: weekUsers.count ?? 0,
      },
    })
  } catch (err) {
    next(err)
  }
}

export async function listUsers(req, res, next) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("user_id, name, email, phone, role, created_at")
      .order("created_at", { ascending: false })

    if (error) throw error
    return res.json({
      users: (data || []).map((u) => ({
        id: u.user_id,
        full_name: u.name,
        email: u.email,
        phone: u.phone,
        role: u.role,
        created_at: u.created_at,
      })),
    })
  } catch (err) {
    next(err)
  }
}

const ADMIN_REPORT_COLUMNS =
  "report_form_id, user_id, category_id, title_en, title_km, description_en, category, platform, status, reported_count, created_at"

export async function listAdminReports(req, res, next) {
  try {
    const { status } = req.query
    let query = supabase
      .from("report_form")
      .select(ADMIN_REPORT_COLUMNS)
      .order("created_at", { ascending: false })

    if (status && status !== "all") query = query.eq("status", status)

    const { data, error } = await query
    if (error) throw error
    return res.json({ reports: data || [] })
  } catch (err) {
    next(err)
  }
}

export async function updateReportStatus(req, res, next) {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!["pending", "published", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" })
    }

    const { data, error } = await supabase
      .from("report_form")
      .update({ status })
      .eq("report_form_id", id)
      .select(ADMIN_REPORT_COLUMNS)
      .single()

    if (error) throw error
    if (!data) return res.status(404).json({ error: "Report not found" })
    return res.json({ report: data })
  } catch (err) {
    next(err)
  }
}