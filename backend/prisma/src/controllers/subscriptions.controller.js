import supabase from "../services/supabaseClient.js"

function mapSubscription(row) {
  if (!row) return null
  return {
    id: row.sub_id,
    user_id: row.user_id,
    plan: row.subscription_plan?.name || row.sub_plan_id,
    plan_id: row.sub_plan_id,
    status: row.status,
    started_at: row.start_date,
    expires_at: row.end_date,
    payment_ref: row.payment_ref || null,
    email: row.user?.email || null,
    created_at: row.created_at,
  }
}

export async function listSubscriptions(req, res, next) {
  try {
    const { data, error } = await supabase
      .from("user_subscription")
      .select("*, subscription_plan(name), user(name, email)")
      .order("start_date", { ascending: false })

    if (error) throw error
    return res.json({ subscriptions: (data || []).map(mapSubscription) })
  } catch (err) {
    next(err)
  }
}

export async function listVerifications(req, res, next) {
  try {
    const { status } = req.query
    let query = supabase
      .from("verifications")
      .select("*, user(name, email)")
      .order("submitted_at", { ascending: false })

    if (status) query = query.eq("status", status)

    const { data, error } = await query
    if (error) throw error
    return res.json({
      verifications: (data || []).map((v) => ({
        id: v.id,
        user_id: v.user_id,
        user_name: v.user?.name || null,
        email: v.user?.email || null,
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

export async function updateVerification(req, res, next) {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "status must be approved or rejected" })
    }

    const { data, error } = await supabase
      .from("verifications")
      .update({ status, reviewed_at: new Date().toISOString() })
      .eq("id", id)
      .select("*, user(name, email)")
      .single()

    if (error) throw error
    if (!data) return res.status(404).json({ error: "Verification not found" })

    return res.json({
      verification: {
        id: data.id,
        user_id: data.user_id,
        user_name: data.user?.name || null,
        email: data.user?.email || null,
        type: data.type,
        status: data.status,
        submitted_at: data.submitted_at,
        reviewed_at: data.reviewed_at,
      },
    })
  } catch (err) {
    next(err)
  }
}