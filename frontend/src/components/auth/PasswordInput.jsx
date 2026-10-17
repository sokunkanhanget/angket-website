import { useState } from "react"
import { useLang } from "@/lib/i18n"

const CONTROL =
  "rounded-[10px] border border-[#e3e9f3] bg-white px-[0.9rem] py-[0.68rem] text-ink transition-[border-color,box-shadow] duration-150 placeholder:text-faint focus:border-blue-500 focus:shadow-[0_0_0_3px_var(--color-blue-100)] focus:outline-none"

export function PasswordInput({ id, name, value, onChange, placeholder, autoComplete, required, minLength, errorId }) {
  const { t } = useLang()
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative flex items-center">
      <input
        id={id}
        name={name}
        className={`w-full pr-12 ${CONTROL}${errorId ? " !border-red-600" : ""}`}
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-describedby={errorId || undefined}
        aria-invalid={errorId ? "true" : undefined}
      />
      <button
        type="button"
        className="absolute right-[0.4rem] grid cursor-pointer place-items-center rounded-[6px] border-none bg-transparent p-[0.3rem] text-[#56657f] transition-[color,background] duration-150 hover:bg-surface hover:text-blue-700"
        onClick={() => setVisible((v) => !v)}
        aria-label={
          visible
            ? t({ en: "Hide password", km: "លាក់ពាក្យសម្ងាត់" })
            : t({ en: "Show password", km: "បង្ហាញពាក្យសម្ងាត់" })
        }
        aria-pressed={visible}
      >
        {visible ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
            <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        )}
      </button>
    </div>
  )
}
