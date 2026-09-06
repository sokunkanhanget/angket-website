import supabase from "../services/supabaseClient.js"

export default async function adminMiddleware(req, res, next) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", req.user?.id)
      .maybeSingle()

    if (error) {
      console.error("adminMiddleware: query error", error)
      return res.status(500).json({ error: "Internal server error" })
    }

    if (!data || data.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" })
    }

    next()
  } catch (err) {
    console.error("adminMiddleware: unexpected error", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
