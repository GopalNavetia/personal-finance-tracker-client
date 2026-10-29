import { Link } from 'react-router-dom'

function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#a7e8b9] text-[#12251b] shadow-lg shadow-black/10"><span className="font-display text-xl font-extrabold">p</span></div>
      <span className="font-display text-lg font-extrabold tracking-tight text-white">pocketwise</span>
    </div>
  )
}

function AuthLayout({ children, mode = 'login' }) {
  const isRegister = mode === 'register'
  return (
    <main className="min-h-screen bg-[#f5f7f6] lg:grid lg:grid-cols-[minmax(380px,0.9fr)_1.1fr]">
      <aside className="relative hidden overflow-hidden bg-[#10251d] px-10 py-10 lg:flex lg:flex-col lg:justify-between xl:px-16">
        <div className="absolute -bottom-36 -left-20 h-96 w-96 rounded-full border border-[#a7e8b9]/10" />
        <div className="absolute -bottom-24 -left-8 h-64 w-64 rounded-full border border-[#a7e8b9]/10" />
        <BrandMark />
        <div className="relative z-10 max-w-md pb-10">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#a7e8b9]">Your money, clearer</p>
          <h1 className="font-display text-5xl font-extrabold leading-[1.08] tracking-[-0.04em] text-white">Build a better relationship with your money.</h1>
          <p className="mt-6 max-w-sm text-base leading-7 text-slate-300">One calm, considered space for your spending, saving, and everything in between.</p>
          <div className="mt-10 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#a7e8b9] text-sm font-bold text-[#10251d]">84%</div>
            <div><p className="text-sm font-semibold text-white">Financial clarity</p><p className="mt-0.5 text-xs text-slate-400">Your progress this month</p></div>
            <span className="ml-auto text-[#a7e8b9]">↗</span>
          </div>
        </div>
      </aside>
      <section className="flex min-h-screen flex-col px-5 py-7 sm:px-10 lg:px-16 lg:py-12 xl:px-28">
        <div className="mb-12 lg:hidden"><BrandMark /></div>
        <div className="my-auto w-full max-w-[440px] self-center">
          {children}
          <p className="mt-8 text-center text-sm text-slate-500">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <Link to={isRegister ? '/login' : '/register'} className="font-bold text-[#237748] transition hover:text-[#175b35]">{isRegister ? 'Sign in' : 'Create one'}</Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default AuthLayout
