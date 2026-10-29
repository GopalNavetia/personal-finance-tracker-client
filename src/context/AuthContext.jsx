import { useCallback, useMemo, useState } from 'react'
import { loginUser, registerUser } from '../services/api'
import { AuthContext } from './contextValue'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(null)

  const login = useCallback(async (credentials) => {
    const response = await loginUser(credentials)
    const nextToken = response.data.token
    if (!nextToken) throw new Error('The server did not return an authentication token.')
    localStorage.setItem('token', nextToken)
    setToken(nextToken)
    setUser({ email: credentials.email })
    return response.data
  }, [])

  const register = useCallback(async (details) => {
    const response = await registerUser(details)
    return response.data
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ token, user, isAuthenticated: Boolean(token), login, logout, register }),
    [login, logout, register, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
