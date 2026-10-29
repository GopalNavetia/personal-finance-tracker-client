import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import Login from '../pages/Login'
import Register from '../pages/Register'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function Dashboard() {
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  return (
    <main className="min-h-screen bg-[#f5f7f6] px-5 py-6 sm:px-10 lg:px-16">
      <header className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10251d] font-display text-xl font-extrabold text-[#a7e8b9]">p</div><span className="font-display font-extrabold text-[#17231f]">pocketwise</span></div>
        <button onClick={() => { logout(); navigate('/login', { replace: true }) }} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-white hover:text-[#237748]">Sign out</button>
      </header>
      <section className="mx-auto mt-16 max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#3b9a64]">Dashboard</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.04em] text-[#17231f]">
          Welcome{user?.email ? `, ${user.email.split('@')[0]}` : ''}.
        </h1>
      </section>
    </main>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AppRoutes
