import supabase from "../services/supabaseClient.js"
import { emailRule, passwordRule, phoneRule, requiredRule, validate } from "../utils/validators.js"

export async function signup(req, res, next) {
  try {
    const { full_name, email, password, phone } = req.body

    const { valid, errors } = validate({
      full_name: () => requiredRule(full_name, "Full name is required"),
      email: () => emailRule(email),
      password: () => passwordRule(password),
      phone: () => phoneRule(phone),
    })

    if (!valid) {
      return res.status(400).json({ error: "Validation failed", fields: errors })
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name, name: full_name, phone },
    })

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    return res.status(201).json({
      message: "Account created",
      user: { id: data.user.id, email: data.user.email },
    })
  } catch (err) {
    next(err)
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return res.status(401).json({ error: error.message || "Invalid credentials" })
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("id, full_name, role")
      .eq("id", data.user.id)
      .maybeSingle()

    return res.json({
      token: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        full_name: profile?.full_name || data.user.user_metadata?.full_name || null,
        role: profile?.role || "user",
      },
    })
  } catch (err) {
    next(err)
  }
}

export async function me(req, res, next) {
  try {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, full_name, phone, role")
      .eq("id", req.user.id)
      .maybeSingle()

    res.json({
      user: {
        id: req.user.id,
        email: req.user.email,
        full_name: profile?.full_name || req.user.user_metadata?.full_name || null,
        phone: profile?.phone || null,
        role: profile?.role || "user",
      },
    })
  } catch (err) {
    next(err)
  }
}
