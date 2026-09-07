const ORIGIN_KEY = "angket_auth_origin"

export function rememberAuthOrigin(pathname) {
  if (!pathname) return
  const value = window.location.pathname + window.location.search + window.location.hash
  sessionStorage.setItem(ORIGIN_KEY, value === "/login" || value === "/signup" ? "/" : value)
}

export function consumeAuthOrigin() {
  const origin = sessionStorage.getItem(ORIGIN_KEY)
  if (origin) sessionStorage.removeItem(ORIGIN_KEY)
  return origin
}

export function goAuthBack(navigate) {
  const origin = consumeAuthOrigin()
  if (origin) {
    navigate(origin, { replace: true })
    return
  }
  if (window.history.length > 1) {
    navigate(-1)
    return
  }
  navigate("/")
}