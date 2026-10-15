import { createContext, useContext, useCallback, useEffect, useMemo, useState } from "react"
import { api } from "./api"
import { authApi } from "./services"

const AuthContext = createContext(null)

function mapUser(user) {
  return {
    id: user.id,
    name: user.name || user.full_name || user.email,
    email: user.email,
    phone: user.phone || null,
    avatarUrl: user.avatarUrl || null,
    role: user.role || "user",
  }
}

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function hydrate() {
      setLoading(true)
      try {
        if (api.getToken()) {
          const res = await authApi.me()
          if (mounted) setAdmin(res.user)
        }
      } catch {
        api.clearToken()
      } finally {
        if (mounted) setLoading(false)
      }
    }
    hydrate()
    return () => {
      mounted = false
    }
  }, [])

  const login = useCallback(async ({ email, phone, password, keepSignedIn = true }) => {
    const res = await authApi.login({ email, phone, password })
    api.setSession({ token: res.token, refreshToken: res.refreshToken }, keepSignedIn)
    const user = mapUser(res.user)
    setAdmin(user)
    return user
  }, [])

  const completeSession = useCallback(async ({ token, refreshToken }, persist = false) => {
    api.setSession({ token, refreshToken }, persist)
    try {
      const res = await authApi.me()
      const user = mapUser(res.user)
      setAdmin(user)
      return user
    } catch (error) {
      api.clearToken()
      throw error
    }
  }, [])

  const logout = useCallback(() => {
    const revocation = authApi.logout()
    api.clearToken()
    setAdmin(null)
    return revocation.catch((error) => {
      console.error("logout token revocation failed:", error)
    })
  }, [])

  const value = useMemo(
    () => ({ admin, login, completeSession, logout, loading }),
    [admin, login, completeSession, logout, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
