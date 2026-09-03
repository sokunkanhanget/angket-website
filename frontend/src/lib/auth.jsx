import { createContext, useContext, useMemo, useState } from "react"

const AuthContext = createContext(null)

// Placeholder admin credentials — swap for a real auth API / session check.
const ADMIN_EMAIL = "admin@angket.kh"
const ADMIN_PASSWORD = "angket-admin"

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)

  const value = useMemo(() => {
    const login = ({ email, password }) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const user = { name: "Dara Sok", role: "Super Admin", email }
            setAdmin(user)
            resolve(user)
          } else {
            reject(new Error("Invalid admin credentials"))
          }
        }, 250)
      })
    }

    const logout = () => {
      setAdmin(null)
    }

    return { admin, login, logout }
  }, [admin])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
