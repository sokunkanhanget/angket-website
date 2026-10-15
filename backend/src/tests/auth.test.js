import { after, before, test } from "node:test"
import assert from "node:assert/strict"

process.env.SUPABASE_URL = "https://supabase.test"
process.env.SUPABASE_ANON_KEY = "test-anon-key"
process.env.SUPABASE_SECRET_KEY = "test-service-key"

const originalFetch = globalThis.fetch
let signupRequest
let profileInsert
let otpRequest

globalThis.fetch = async (input, init = {}) => {
  const url = new URL(typeof input === "string" ? input : input.url)
  const method = init.method || "GET"
  const jsonResponse = (body, status = 200) => new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  })

  if (url.hostname !== "supabase.test") return originalFetch(input, init)

  if (url.pathname === "/auth/v1/signup" && method === "POST") {
    signupRequest = { url, body: JSON.parse(init.body) }
    return jsonResponse({
      user: {
        id: "test-user-id",
        email: signupRequest.body.email,
        user_metadata: signupRequest.body.data,
        identities: [{ id: "test-identity" }],
        confirmation_sent_at: new Date().toISOString(),
      },
      session: null,
    })
  }
  if (url.pathname === "/rest/v1/users" && method === "POST") {
    profileInsert = JSON.parse(init.body)
    return new Response(null, { status: 201 })
  }
  if (url.pathname === "/auth/v1/verify" && method === "POST") {
    otpRequest = JSON.parse(init.body)
    if (otpRequest.token !== "123456") {
      return jsonResponse({ code: "otp_expired", message: "Token has expired or is invalid" }, 422)
    }
    return jsonResponse({
      user: {
        id: "test-user-id",
        email: "person@example.com",
        email_confirmed_at: new Date().toISOString(),
        user_metadata: { full_name: "Test User" },
      },
      access_token: "verified-access-token",
      refresh_token: "verified-refresh-token",
      expires_in: 3600,
      token_type: "bearer",
    })
  }
  if (url.pathname === "/auth/v1/user" && method === "GET") {
    return jsonResponse({
      id: "test-user-id",
      email: "person@example.com",
      email_confirmed_at: new Date().toISOString(),
      user_metadata: { full_name: "Test User" },
    })
  }
  if (url.pathname === "/rest/v1/users" && method === "GET") {
    return jsonResponse({
      user_id: "test-user-id",
      name: "Test User",
      email: "person@example.com",
      phone: null,
      role: "user",
      avatar_url: null,
      created_at: new Date().toISOString(),
    })
  }
  return jsonResponse({ message: `Unexpected Supabase request: ${method} ${url.pathname}` }, 500)
}

const { default: app } = await import("../app.js")

let server
let baseUrl

before(() => {
  server = app.listen(0)
  const { port } = server.address()
  baseUrl = `http://127.0.0.1:${port}`
})

after(() => {
  server.close()
  globalThis.fetch = originalFetch
})

test("sign-up validates required account fields", async () => {
  const response = await fetch(`${baseUrl}/api/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  })

  assert.equal(response.status, 400)
  assert.deepEqual(Object.keys((await response.json()).fields).sort(), ["email", "full_name", "password"])
})

test("login rejects missing credentials before contacting Supabase Auth", async () => {
  const response = await fetch(`${baseUrl}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  })

  assert.equal(response.status, 400)
  assert.match((await response.json()).error, /required/i)
})

test("password recovery validates the email address", async () => {
  const response = await fetch(`${baseUrl}/api/users/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "not-an-email" }),
  })

  assert.equal(response.status, 400)
  assert.equal((await response.json()).code, "INVALID_EMAIL")
})

test("one-time verification rejects missing token data", async () => {
  const response = await fetch(`${baseUrl}/api/users/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  })

  assert.equal(response.status, 400)
  assert.equal((await response.json()).code, "LINK_EXPIRED")
})

test("signup OTP verification rejects malformed codes before contacting Supabase Auth", async () => {
  const response = await fetch(`${baseUrl}/api/users/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "person@example.com", token: "12x" }),
  })

  assert.equal(response.status, 400)
  const body = await response.json()
  assert.equal(body.code, "INVALID_OTP")
  assert.match(body.fields.token, /6-digit/i)
})

test("signup OTP verification gives a clear error for an expired code", async () => {
  const response = await originalFetch(`${baseUrl}/api/users/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "person@example.com", token: "000000" }),
  })

  assert.equal(response.status, 400)
  const body = await response.json()
  assert.equal(body.code, "INVALID_OR_EXPIRED_OTP")
  assert.match(body.error, /invalid or has expired/i)
  assert.equal(otpRequest.type, "signup")
})

test("registration, signup OTP verification, and protected profile access complete", async () => {
  const signupResponse = await originalFetch(`${baseUrl}/api/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      full_name: "Test User",
      email: "person@example.com",
      password: "SecurePass1!",
    }),
  })
  assert.equal(signupResponse.status, 201)
  assert.equal((await signupResponse.json()).code, "VERIFICATION_REQUIRED")
  assert.equal(signupRequest.body.password, "SecurePass1!")
  assert.equal(signupRequest.url.searchParams.has("redirect_to"), false)
  assert.equal("password" in profileInsert, false)
  assert.equal("token" in profileInsert, false)

  const verifyResponse = await originalFetch(`${baseUrl}/api/users/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "PERSON@example.com", token: "123456" }),
  })
  const session = await verifyResponse.json()
  assert.equal(verifyResponse.status, 200, session.error)
  assert.equal(session.token, "verified-access-token")
  assert.equal(otpRequest.email, "person@example.com")
  assert.equal(otpRequest.token, "123456")
  assert.equal(otpRequest.type, "signup")

  const profileResponse = await originalFetch(`${baseUrl}/api/users/me`, {
    headers: { Authorization: `Bearer ${session.token}` },
  })
  assert.equal(profileResponse.status, 200)
  assert.equal((await profileResponse.json()).user.id, "test-user-id")
})

test("private profile API rejects requests without a bearer token", async () => {
  const response = await fetch(`${baseUrl}/api/users/me`)

  assert.equal(response.status, 401)
})
