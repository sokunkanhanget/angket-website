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

export async function getUserDetail(req, res, next) {
  try {
    const { id } = req.params

    const [userResult, reportsResult, subscriptionsResult, verificationsResult] =
      await Promise.all([
        supabase
          .from("users")
          .select("user_id, name, email, phone, role, avatar_url, created_at")
          .eq("user_id", id)
          .maybeSingle(),
        supabase
          .from("report_form")
          .select("report_form_id, title_en, category, platform, status, reported_count, created_at")
          .eq("user_id", id)
          .order("created_at", { ascending: false }),
        supabase
          .from("user_subscription")
          .select("*, subscription_plan(name)")
          .eq("user_id", id)
          .order("start_date", { ascending: false }),
        supabase
          .from("verifications")
          .select("id, type, status, submitted_at, reviewed_at")
          .eq("user_id", id)
          .order("submitted_at", { ascending: false }),
      ])

    if (userResult.error) throw userResult.error
    if (!userResult.data) return res.status(404).json({ error: "User not found" })
    if (reportsResult.error) throw reportsResult.error
    if (subscriptionsResult.error) throw subscriptionsResult.error
    if (verificationsResult.error) throw verificationsResult.error

    const user = userResult.data
    return res.json({
      user: {
        id: user.user_id,
        full_name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar_url: user.avatar_url,
        created_at: user.created_at,
      },
      reports: (reportsResult.data || []).map((r) => ({
        report_form_id: r.report_form_id,
        title: r.title_en,
        category: r.category,
        platform: r.platform,
        status: r.status,
        reported_count: r.reported_count,
        created_at: r.created_at,
      })),
      subscriptions: (subscriptionsResult.data || []).map((s) => ({
        id: s.sub_id,
        plan: s.subscription_plan?.name || s.sub_plan_id,
        status: s.status,
        started_at: s.start_date,
        expires_at: s.end_date,
      })),
      verifications: (verificationsResult.data || []).map((v) => ({
        id: v.id,
        type: v.type,
        status: v.status,
        submitted_at: v.submitted_at,
        reviewed_at: v.reviewed_at,
      })),
    })
  } catch (err) {
    next(err)
  }
}

const ADMIN_REPORT_COLUMNS =
  "report_form_id, user_id, category_id, title_en, title_km, description_en, category, platform, status, reported_count, created_at, users(name, email)"

function mapAdminReport(row) {
  return {
    report_form_id: row.report_form_id,
    user_id: row.user_id,
    user_name: row.users?.name || null,
    user_email: row.users?.email || null,
    category_id: row.category_id,
    title_en: row.title_en,
    title_km: row.title_km,
    description_en: row.description_en,
    category: row.category,
    platform: row.platform,
    status: row.status,
    reported_count: row.reported_count,
    created_at: row.created_at,
  }
}

export async function listAdminReports(req, res, next) {
  try {
    const { status, category } = req.query
    let query = supabase
      .from("report_form")
      .select(ADMIN_REPORT_COLUMNS)
      .order("created_at", { ascending: false })

    if (status && status !== "all") query = query.eq("status", status)
    if (category && category !== "all") {
      query = query.or(`category.eq.${category},category_id.eq.${category}`)
    }

    const { data, error } = await query
    if (error) throw error
    return res.json({ reports: (data || []).map(mapAdminReport) })
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
    return res.json({ report: mapAdminReport(data) })
  } catch (err) {
    next(err)
  }
}