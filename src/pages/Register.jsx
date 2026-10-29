import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import InputField from '../components/InputField'
import { useAuth } from '../context/useAuth'
import { getApiErrorMessage } from '../services/api'

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [feedback, setFeedback] = useState({ type: '', message: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Full name is required.'
    else if (form.name.trim().length < 2) nextErrors.name = 'Enter at least 2 characters.'
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (!form.password) nextErrors.password = 'Password is required.'
    else if (form.password.length < 8) nextErrors.password = 'Use at least 8 characters.'
    return nextErrors
  }

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setFeedback({ type: '', message: '' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    setLoading(true)
    try {
      const response = await register({ name: form.name.trim(), email: form.email.trim(), password: form.password })
      setFeedback({ type: 'success', message: response.message || 'Account created successfully.' })
      window.setTimeout(() => navigate('/login', { replace: true }), 900)
    } catch (error) {
      setFeedback({ type: 'error', message: getApiErrorMessage(error) })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout mode="register">
      <div className="mb-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#3b9a64]">Start fresh</p>
        <h2 className="font-display text-4xl font-extrabold tracking-[-0.04em] text-[#17231f]">Create your account</h2>
        <p className="mt-3 text-base text-slate-500">A clearer view of your money starts here.</p>
      </div>
      {feedback.message && <div role="alert" className={`fixed right-5 top-5 z-20 max-w-sm rounded-xl border px-4 py-3 text-sm font-medium shadow-xl ${feedback.type === 'success' ? 'border-[#b9e8c8] bg-[#effbf2] text-[#237748] shadow-[#237748]/10' : 'border-red-200 bg-red-50 text-red-700 shadow-red-900/10'}`}>{feedback.message}</div>}
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <InputField id="name" label="Full name" value={form.name} onChange={updateField} placeholder="Alex Morgan" error={errors.name} icon={<span aria-hidden="true">✦</span>} />
        <InputField id="email" label="Email address" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" error={errors.email} icon={<span aria-hidden="true">@</span>} />
        <InputField id="password" label="Password" type="password" value={form.password} onChange={updateField} placeholder="At least 8 characters" error={errors.password} icon={<span aria-hidden="true">⌁</span>} showPassword={showPassword} onTogglePassword={() => setShowPassword((value) => !value)} />
        <p className="pt-1 text-xs leading-5 text-slate-400">By continuing, you agree to keep your account details accurate and secure.</p>
        <button type="submit" disabled={loading} className="flex h-12 w-full items-center justify-center rounded-xl bg-[#237748] text-sm font-bold text-white shadow-lg shadow-[#237748]/20 transition hover:bg-[#1b623b] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Creating your account…' : 'Create account'}</button>
      </form>
    </AuthLayout>
  )
}

export default Register
