export function Checkbox({ id, checked, onChange, children }) {
  return (
    <label className="auth-check" htmlFor={id}>
      <span className="auth-check__box">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="auth-check__input"
        />
        <svg className="auth-check__icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M3 7.5L5.5 10L11 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="auth-check__label">{children}</span>
    </label>
  )
}
