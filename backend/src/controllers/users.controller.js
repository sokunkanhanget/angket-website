import { isAdminEmail } from "../config.js"
import supabase from "../services/supabaseClient.js"
import { uploadAvatar, deleteAvatar } from "../services/storageService.js"
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

    const { error: insertError } = await supabase
      .from("users")
      .insert({ user_id: data.user.id, name: full_name, email, role: isAdminEmail(email) ? "admin" : "user", phone })

    if (insertError) {
      return res.status(400).json({ error: "Account created but could not be saved", detail: insertError.message })
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
    const { email, phone, password } = req.body

    if ((!email && !phone) || !password) {
      return res.status(400).json({ error: "Email/phone and password are required" })
    }

    let loginEmail = email

    if (phone || (email && !email.includes("@"))) {
      const inputDigits = (phone || email || "").replace(/\D/g, "")
      const localInput = (inputDigits.startsWith("855") ? inputDigits.slice(3) : inputDigits).replace(/^0/, "")
      const { data: candidates } = await supabase
        .from("users")
        .select("email, phone")
        .not("phone", "is", null)
      const matched = (candidates || []).find((u) => {
        const d = (u.phone || "").replace(/\D/g, "")
        const local = (d.startsWith("855") ? d.slice(3) : d).replace(/^0/, "")
        return d === inputDigits || local === localInput
      })
      loginEmail = matched?.email
      if (!loginEmail) {
        return res.status(401).json({ error: "No account found for this phone number" })
      }
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email: loginEmail, password })

    if (error) {
      return res.status(401).json({ error: error.message || "Invalid credentials" })
    }

    let { data: profile } = await supabase
      .from("users")
      .select("user_id, name, email, phone, role, avatar_url")
      .eq("user_id", data.user.id)
      .maybeSingle()

    if (!loginEmail) loginEmail = profile?.email || data.user.email

    if (isAdminEmail(loginEmail) && profile?.role !== "admin") {
      if (profile) {
        const { error: promoteError } = await supabase
          .from("users")
          .update({ role: "admin" })
          .eq("user_id", data.user.id)
        if (promoteError) throw promoteError
      } else {
        const { error: insertError } = await supabase
          .from("users")
          .insert({
            user_id: data.user.id,
            name: data.user.user_metadata?.full_name || null,
            email: loginEmail,
            role: "admin",
            phone: data.user.user_metadata?.phone || null,
          })
        if (insertError) throw insertError
      }
      profile = { ...(profile || {}), role: "admin", email: loginEmail }
    }

    return res.json({
      token: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        full_name: profile?.name || data.user.user_metadata?.full_name || null,
        phone: profile?.phone || data.user.user_metadata?.phone || null,
        avatarUrl: profile?.avatar_url || null,
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
      .from("users")
      .select("user_id, name, email, phone, role, avatar_url, created_at")
      .eq("user_id", req.user.id)
      .maybeSingle()

    res.json({
      user: {
        id: req.user.id,
        name: profile?.name || req.user.user_metadata?.full_name || null,
        email: req.user.email || profile?.email || null,
        phone: profile?.phone || req.user.user_metadata?.phone || null,
        avatarUrl: profile?.avatar_url || null,
        role: profile?.role || "user",
        createdAt: profile?.created_at || null,
      },
    })
  } catch (err) {
    next(err)
  }
}

export async function updateMe(req, res, next) {
  try {
    const { name, phone } = req.body

    const { valid, errors } = validate({
      name: () => requiredRule(name, "Name is required"),
      phone: () => phoneRule(phone),
    })
    if (!valid) {
      return res.status(400).json({ error: "Validation failed", fields: errors })
    }

    const patch = {
      name: String(name).trim(),
      phone: String(phone).trim(),
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from("users")
      .update(patch)
      .eq("user_id", req.user.id)
      .select("user_id, name, email, phone, role, avatar_url, created_at")
      .maybeSingle()

    if (error) throw error
    if (!data) return res.status(404).json({ error: "User not found" })

    return res.json({
      user: {
        id: data.user_id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        avatarUrl: data.avatar_url,
        role: data.role,
        createdAt: data.created_at,
      },
    })
  } catch (err) {
    next(err)
  }
}

export async function avatar(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image provided" })
    }

    const avatarUrl = await uploadAvatar(req.file, req.user.id)

    const { error: profileImageError } = await supabase
      .from("profile_image")
      .insert({ user_id: req.user.id, image_url: avatarUrl })
    if (profileImageError) console.warn("profile_image insert failed:", profileImageError.message)

    const { data, error } = await supabase
      .from("users")
      .update({ avatar_url: avatarUrl, updated_at: new Date().toISOString() })
      .eq("user_id", req.user.id)
      .select("user_id, name, email, phone, role, avatar_url, created_at")
      .maybeSingle()

    if (error) throw error
    if (!data) return res.status(404).json({ error: "User not found" })

    return res.json({
      user: {
        id: data.user_id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        avatarUrl: data.avatar_url,
        role: data.role,
        createdAt: data.created_at,
      },
    })
  } catch (err) {
    next(err)
  }
}

export async function removeAvatar(req, res, next) {
  try {
    await deleteAvatar(req.user.id)

    const { error: imageError } = await supabase
      .from("profile_image")
      .delete()
      .eq("user_id", req.user.id)
    if (imageError) console.warn("profile_image delete failed:", imageError.message)

    const { data, error } = await supabase
      .from("users")
      .update({ avatar_url: null, updated_at: new Date().toISOString() })
      .eq("user_id", req.user.id)
      .select("user_id, name, email, phone, role, avatar_url, created_at")
      .maybeSingle()

    if (error) throw error
    if (!data) return res.status(404).json({ error: "User not found" })

    return res.json({
      user: {
        id: data.user_id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        avatarUrl: data.avatar_url,
        role: data.role,
        createdAt: data.created_at,
      },
    })
  } catch (err) {
    next(err)
  }
}

export async function changePassword(req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body

    const { valid, errors } = validate({
      currentPassword: () => requiredRule(currentPassword, "Current password is required"),
      newPassword: () => passwordRule(newPassword),
    })
    if (!valid) {
      return res.status(400).json({ error: "Validation failed", fields: errors })
    }

    const email = req.user.email || (await lookupEmailWithoutUser(req.user.id))
    if (email) {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password: currentPassword })
      if (signInError) {
        return res.status(400).json({ error: "Current password is incorrect" })
      }
    }

    const { error } = await supabase.auth.admin.updateUserById(req.user.id, { password: newPassword })
    if (error) throw error

    return res.json({ message: "Password updated" })
  } catch (err) {
    next(err)
  }
}

async function lookupEmailWithoutUser(userId) {
  const { data } = await supabase.from("users").select("email").eq("user_id", userId).maybeSingle()
  return data?.email || null
}