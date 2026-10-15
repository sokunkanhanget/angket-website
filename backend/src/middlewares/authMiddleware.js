import supabase from "../services/supabaseClient.js"

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid Authorization header" })
  }

  const token = authHeader.slice("Bearer ".length).trim()
  if (!token) {
    return res.status(401).json({ error: "Missing or invalid Authorization header", code: "INVALID_TOKEN" })
  }

  try {
    const { data, error } = await supabase.auth.getUser(token)
    if (error || !data.user) {
      return res.status(401).json({ error: "Invalid or expired token", code: "INVALID_TOKEN" })
    }
    if (!data.user.email_confirmed_at) {
      return res.status(403).json({
        error: "Please verify your email address before accessing this feature.",
        code: "EMAIL_NOT_VERIFIED",
      })
    }

    req.user = data.user
    req.token = token
    return next()
  } catch (error) {
    return next(error)
  }
}
