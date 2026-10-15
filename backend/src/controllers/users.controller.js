import { createHmac, timingSafeEqual } from "node:crypto"
import { isAdminEmail } from "../config.js"
import supabase from "../services/supabaseClient.js"
import supabaseAuth from "../services/supabaseAuthClient.js"
import { uploadAvatar, deleteAvatar } from "../services/storageService.js"
import { emailRule, passwordRule, phoneRule, requiredRule, validate } from "../utils/validators.js"

const resetGrantSecret = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY

function createResetGrant(userId) {
  const payload = Buffer.from(JSON.stringify({ sub: userId, exp: Date.now() + 10 * 60 * 1000 })).toString("base64url")
  const signature = createHmac("sha256", resetGrantSecret).update(payload).digest("base64url")
  return `${payload}.${signature}`
}

function isValidResetGrant(grant, userId) {
  if (typeof grant !== "string") return false
  const [payload, signature, ...extra] = grant.split(".")
  if (!payload || !signature || extra.length) return false
  const expected = createHmac("sha256", resetGrantSecret).update(payload).digest()
  let provided
  try {
    provided = Buffer.from(signature, "base64url")
  } catch {
    return false
  }
  if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) return false
  try {
    const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"))
    return claims.sub === userId && Number.isFinite(claims.exp) && claims.exp > Date.now()
  } catch {
    return false
  }
}

function authError(error) {
  const message = String(error?.message || "").toLowerCase()
  if (message.includes("already registered") || message.includes("already exists") || error?.code === "user_already_exists") {
    return { status: 409, code: "EMAIL_ALREADY_EXISTS", error: "An account with this email already exists." }
  }
  if (message.includes("email not confirmed") || error?.code === "email_not_confirmed") {
    return { status: 403, code: "EMAIL_NOT_VERIFIED", error: "Please verify your email address before signing in." }
  }
  if (message.includes("invalid login credentials") || error?.code === "invalid_credentials") {
    return { status: 401, code: "INVALID_CREDENTIALS", error: "Email or password is incorrect." }
  }
  if (error?.status === 429 || String(error?.code || "").includes("rate_limit")) {
    return { status: 429, code: "RATE_LIMITED", error: "Too many attempts. Please wait and try again." }
  }
  if (
    error?.code === "otp_expired"
    || message.includes("email link is invalid")
    || /(?:invalid|expired).{0,20}(?:token|otp|link)|(?:token|otp|link).{0,20}(?:invalid|expired)/.test(message)
  ) {
    return { status: 400, code: "LINK_EXPIRED", error: "This link is invalid or has expired. Request a new one and try again." }
  }
  return { status: 400, code: error?.code || "AUTH_ERROR", error: error?.message || "Authentication failed." }
}

export async function signup(req, res, next) {
  try {
    const { full_name, email, password, phone } = req.body || {}
    const normalizedName = typeof full_name === "string" ? full_name.trim() : ""
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : ""
    const normalizedPhone = typeof phone === "string" ? phone.trim() : ""

    const { valid, errors } = validate({
      full_name: () => requiredRule(normalizedName, "Full name is required"),
      email: () => emailRule(normalizedEmail),
      password: () => passwordRule(password),
      ...(normalizedPhone ? { phone: () => phoneRule(normalizedPhone) } : {}),
    })

    if (!valid) {
      return res.status(400).json({ error: "Validation failed", fields: errors })
    }

    const { data, error } = await supabaseAuth.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        data: { full_name: normalizedName, name: normalizedName, phone: normalizedPhone || null },
      },
    })

    if (error) {
      const mapped = authError(error)
      return res.status(mapped.status).json(mapped)
    }

    if (data.user?.identities?.length === 0) {
      return res.status(409).json({
        error: "An account with this email already exists.",
        code: "EMAIL_ALREADY_EXISTS",
      })
    }

    if (!data.user) {
      return res.status(400).json({ error: "Unable to create account. Please try again.", code: "SIGNUP_FAILED" })
    }

    if (data.session) {
      const { error: rollbackError } = await supabase.auth.admin.deleteUser(data.user.id)
      if (rollbackError) console.error("signup verification rollback failed:", rollbackError.message)
      return res.status(503).json({
        error: "Email confirmation is disabled for this Supabase project. Enable email confirmations before allowing signups.",
        code: "EMAIL_CONFIRMATION_DISABLED",
      })
    }

    const { error: insertError } = await supabase
      .from("users")
      .upsert({
        user_id: data.user.id,
        name: normalizedName,
        email: normalizedEmail,
        role: isAdminEmail(normalizedEmail) ? "admin" : "user",
        phone: normalizedPhone || null,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id", ignoreDuplicates: true })

    if (insertError) {
      const { error: rollbackError } = await supabase.auth.admin.deleteUser(data.user.id)
      if (rollbackError) {
        console.error("signup profile rollback failed:", rollbackError.message)
      }
      throw insertError
    }

    return res.status(201).json({
      message: "Account created. Check your email for a verification code before signing in.",
      code: "VERIFICATION_REQUIRED",
      user: { id: data.user.id, email: data.user.email },
    })
  } catch (err) {
    next(err)
  }
}

export async function login(req, res, next) {
  try {
    const { email, phone, password } = req.body || {}
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : ""
    const normalizedPhone = typeof phone === "string" ? phone.trim() : ""

    if ((!normalizedEmail && !normalizedPhone) || typeof password !== "string" || !password) {
      return res.status(400).json({ error: "Email/phone and password are required" })
    }

    let loginEmail = normalizedEmail

    if (normalizedPhone || (normalizedEmail && !normalizedEmail.includes("@"))) {
      const inputDigits = (normalizedPhone || normalizedEmail).replace(/\D/g, "")
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

    const { data, error } = await supabaseAuth.auth.signInWithPassword({ email: loginEmail, password })

    if (error) {
      const mapped = authError(error)
      return res.status(mapped.status).json(mapped)
    }
    if (!data.user?.email_confirmed_at) {
      return res.status(403).json({
        error: "Please verify your email address before signing in.",
        code: "EMAIL_NOT_VERIFIED",
      })
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
      refreshToken: data.session.refresh_token,
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

export async function resendVerification(req, res, next) {
  try {
    const { email } = req.body || {}
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : ""
    const { valid } = validate({ email: () => emailRule(normalizedEmail) })
    if (!valid) {
      return res.status(400).json({ error: "A valid email is required.", code: "INVALID_EMAIL" })
    }

    const { error } = await supabaseAuth.auth.resend({
      type: "signup",
      email: normalizedEmail,
    })
    if (error) {
      const mapped = authError(error)
      return res.status(mapped.status).json(mapped)
    }
    return res.json({ message: "If this address has a pending account, a verification email has been sent." })
  } catch (err) {
    next(err)
  }
}

export async function forgotPassword(req, res, next) {
  try {
    const { email } = req.body || {}
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : ""
    const { valid } = validate({ email: () => emailRule(normalizedEmail) })
    if (!valid) {
      return res.status(400).json({ error: "A valid email is required.", code: "INVALID_EMAIL" })
    }

    const redirectTo = new URL("/auth/callback?next=%2Freset-password", process.env.CLIENT_ORIGIN || "http://localhost:5173").toString()
    const { error } = await supabaseAuth.auth.resetPasswordForEmail(normalizedEmail, { redirectTo })
    if (error) {
      const mapped = authError(error)
      return res.status(mapped.status).json(mapped)
    }
    return res.json({ message: "If an account exists for this email, a password reset link has been sent." })
  } catch (err) {
    next(err)
  }
}

export async function verifyEmailLink(req, res, next) {
  try {
    const { token_hash: tokenHash, type } = req.body || {}
    if (typeof tokenHash !== "string" || !["email", "recovery"].includes(type)) {
      return res.status(400).json({ error: "This verification link is invalid or has expired.", code: "LINK_EXPIRED" })
    }

    const { data, error } = await supabaseAuth.auth.verifyOtp({ token_hash: tokenHash, type })
    if (error) {
      const mapped = authError(error)
      return res.status(mapped.status).json(mapped)
    }
    if (!data.user?.id || !data.session?.access_token || !data.session.refresh_token) {
      return res.status(400).json({ error: "This verification link is invalid or has expired.", code: "LINK_EXPIRED" })
    }

    return res.json({
      token: data.session.access_token,
      refreshToken: data.session.refresh_token,
      type,
      ...(type === "recovery" ? { resetGrant: createResetGrant(data.user.id) } : {}),
    })
  } catch (err) {
    next(err)
  }
}

export async function verifySignupOtp(req, res, next) {
  try {
    const { email, token } = req.body || {}
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : ""
    const code = typeof token === "string" ? token.trim() : ""
    const { valid, errors } = validate({
      email: () => emailRule(normalizedEmail),
      token: () => (/^\d{6}$/.test(code)
        ? { valid: true }
        : { valid: false, message: "Enter the 6-digit verification code from your email." }),
    })
    if (!valid) {
      return res.status(400).json({ error: "Validation failed.", fields: errors, code: "INVALID_OTP" })
    }

    const { data, error } = await supabaseAuth.auth.verifyOtp({
      email: normalizedEmail,
      token: code,
      type: "signup",
    })
    if (error) {
      const mapped = authError(error)
      if (mapped.code === "LINK_EXPIRED") {
        return res.status(400).json({
          error: "This verification code is invalid or has expired. Request a new code and try again.",
          code: "INVALID_OR_EXPIRED_OTP",
        })
      }
      return res.status(mapped.status).json(mapped)
    }
    if (!data.user?.email_confirmed_at || !data.session?.access_token || !data.session.refresh_token) {
      return res.status(400).json({
        error: "This verification code is invalid or has expired. Request a new code and try again.",
        code: "INVALID_OR_EXPIRED_OTP",
      })
    }

    return res.json({
      token: data.session.access_token,
      refreshToken: data.session.refresh_token,
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    })
  } catch (err) {
    next(err)
  }
}

export async function refreshSession(req, res, next) {
  try {
    const { refreshToken } = req.body || {}
    if (typeof refreshToken !== "string" || !refreshToken) {
      return res.status(400).json({ error: "A refresh token is required.", code: "INVALID_REFRESH_TOKEN" })
    }

    const { data, error } = await supabaseAuth.auth.refreshSession({ refresh_token: refreshToken })
    if (error || !data.session?.access_token || !data.session.refresh_token) {
      return res.status(401).json({ error: "Your session has expired. Please sign in again.", code: "SESSION_EXPIRED" })
    }
    return res.json({
      token: data.session.access_token,
      refreshToken: data.session.refresh_token,
    })
  } catch (err) {
    next(err)
  }
}

export async function resetPassword(req, res, next) {
  try {
    const { password, resetGrant } = req.body || {}
    if (!isValidResetGrant(resetGrant, req.user.id)) {
      return res.status(403).json({
        error: "Use a valid, unexpired password reset link to update your password.",
        code: "RESET_LINK_REQUIRED",
      })
    }
    const { valid, errors } = validate({ password: () => passwordRule(password) })
    if (!valid) {
      return res.status(400).json({ error: "Validation failed.", fields: errors, code: "INVALID_PASSWORD" })
    }

    const { error } = await supabase.auth.admin.updateUserById(req.user.id, { password })
    if (error) throw error
    return res.json({ message: "Password updated. Please sign in with your new password." })
  } catch (err) {
    next(err)
  }
}

export async function logout(req, res, next) {
  try {
    const { error } = await supabase.auth.admin.signOut(req.token, "global")
    if (error) throw error
    return res.json({ message: "Signed out successfully." })
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