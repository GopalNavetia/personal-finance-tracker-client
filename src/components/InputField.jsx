function InputField({
  id, label, type = 'text', value, onChange, placeholder, error, icon, showPassword, onTogglePassword,
}) {
  const isPassword = type === 'password'

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative">
        {icon && <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>}
        <input
          id={id}
          name={id}
          type={isPassword && showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3fa66b] focus:ring-4 focus:ring-[#3fa66b]/10 ${icon ? 'pl-11' : ''} ${isPassword ? 'pr-12' : ''} ${error ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-slate-200'}`}
        />
        {isPassword && (
          <button type="button" onClick={onTogglePassword} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-xs font-semibold text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label={showPassword ? 'Hide password' : 'Show password'}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      {error && <p id={`${id}-error`} className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  )
}

export default InputField
