import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import InputField from '../components/InputField'
import { useAuth } from '../context/useAuth'
import { getApiErrorMessage } from '../services/api'

function Login() {
  const navigate = useNavigate()
  const { isAuthenticated, login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  const validate = () => {
    const nextErrors = {}
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (!form.password) nextErrors.password = 'Password is required.'
    return nextErrors
  }

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setServerError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    setLoading(true)
    setServerError('')
    try {
      await login({ email: form.email.trim(), password: form.password })
      navigate('/dashboard', { replace: true })
    } catch (error) {
      setServerError(error.message || getApiErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout mode="login">
      <div className="mb-9">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#3b9a64]">Welcome back</p>
        <h2 className="font-display text-4xl font-extrabold tracking-[-0.04em] text-[#17231f]">Sign in to pocketwise</h2>
        <p className="mt-3 text-base text-slate-500">Pick up where you left off.</p>
      </div>
      {serverError && <div role="alert" className="fixed right-5 top-5 z-20 max-w-sm rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 shadow-xl shadow-red-900/10">{serverError}</div>}
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <InputField id="email" label="Email address" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" icon={<span aria-hidden="true">@</span>} error={errors.email} />
        <InputField id="password" label="Password" type="password" value={form.password} onChange={updateField} placeholder="Enter your password" icon={<span aria-hidden="true">⌁</span>} error={errors.password} showPassword={showPassword} onTogglePassword={() => setShowPassword((value) => !value)} />
        <button type="submit" disabled={loading} className="flex h-12 w-full items-center justify-center rounded-xl bg-[#237748] text-sm font-bold text-white shadow-lg shadow-[#237748]/20 transition hover:bg-[#1b623b] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Signing you in…' : 'Sign in'}</button>
      </form>
      <p className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-400"><span className="h-px w-8 bg-slate-200" /> Secure access to your finances <span className="h-px w-8 bg-slate-200" /></p>
    </AuthLayout>
  )
}

export default Login
