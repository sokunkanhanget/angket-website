import { createContext, useContext, useCallback, useEffect, useMemo, useState } from "react"
import { api } from "./api"
import { authApi } from "./services"

const AuthContext = createContext(null)

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

  const login = useCallback(async ({ email, password }) => {
    const res = await authApi.login({ email, password })
    api.setToken(res.token)
    const user = {
      id: res.user.id,
      name: res.user.full_name || res.user.email,
      email: res.user.email,
      role: res.user.role,
    }
    setAdmin(user)
    return user
  }, [])

  const logout = useCallback(() => {
    api.clearToken()
    setAdmin(null)
  }, [])

  const value = useMemo(() => ({ admin, login, logout, loading }), [admin, login, logout, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
