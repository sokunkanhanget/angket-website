const BASE_URL = "/api"
const ACCESS_TOKEN_KEY = "angket_token"
const REFRESH_TOKEN_KEY = "angket_refresh_token"
const PUBLIC_AUTH_PATHS = new Set([
  "/users/login",
  "/users/signup",
  "/users/forgot-password",
  "/users/resend-verification",
  "/users/verify",
  "/users/refresh",
])
let refreshInFlight = null

function getToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
}

function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY) || sessionStorage.getItem(REFRESH_TOKEN_KEY)
}

function setSession(session, persist = false) {
  clearToken()
  const storage = persist ? localStorage : sessionStorage
  if (session?.token) storage.setItem(ACCESS_TOKEN_KEY, session.token)
  if (session?.refreshToken) storage.setItem(REFRESH_TOKEN_KEY, session.refreshToken)
}

function clearToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  sessionStorage.removeItem(ACCESS_TOKEN_KEY)
  sessionStorage.removeItem(REFRESH_TOKEN_KEY)
}

async function refreshSession() {
  if (!refreshInFlight) {
    refreshInFlight = (async () => {
      const refreshToken = getRefreshToken()
      if (!refreshToken) return false
      const response = await fetch(`${BASE_URL}/users/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      })
      if (!response.ok) {
        clearToken()
        return false
      }
      const session = await response.json()
      const persist = Boolean(localStorage.getItem(REFRESH_TOKEN_KEY))
      setSession({ token: session.token, refreshToken: session.refreshToken }, persist)
      return Boolean(session.token && session.refreshToken)
    })().finally(() => {
      refreshInFlight = null
    })
  }
  return refreshInFlight
}

async function request(path, { method = "GET", body, formData } = {}, canRefresh = true) {
  const headers = {}
  const token = getToken()
  if (token && !PUBLIC_AUTH_PATHS.has(path)) headers.Authorization = `Bearer ${token}`

  let payload
  if (formData) {
    payload = formData
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json"
    payload = JSON.stringify(body)
  }

  let res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: payload,
  })

  if (res.status === 401 && canRefresh && !PUBLIC_AUTH_PATHS.has(path) && await refreshSession()) {
    return request(path, { method, body, formData }, false)
  }

  if (res.status === 204) return null

  let data = null
  const text = await res.text()
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  if (!res.ok) {
    const message = (data && (data.error || data.message)) || `Request failed (${res.status})`
    const error = new Error(message)
    error.status = res.status
    error.data = data
    throw error
  }

  return data
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
  del: (path) => request(path, { method: "DELETE" }),
  postForm: (path, formData) => request(path, { method: "POST", formData }),
  setSession,
  getToken,
  clearToken,
}
