import supabase from "../services/supabaseClient.js"

export async function listSubscriptions(req, res, next) {
  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .order("started_at", { ascending: false })

    if (error) throw error
    return res.json({ subscriptions: data || [] })
  } catch (err) {
    next(err)
  }
}

export async function listVerifications(req, res, next) {
  try {
    const { status } = req.query
    let query = supabase.from("verifications").select("*").order("submitted_at", { ascending: false })
    if (status) query = query.eq("status", status)

    const { data, error } = await query
    if (error) throw error
    return res.json({ verifications: data || [] })
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
      .select()
      .single()

    if (error) throw error
    if (!data) return res.status(404).json({ error: "Verification not found" })
    return res.json({ verification: data })
  } catch (err) {
    next(err)
  }
}
