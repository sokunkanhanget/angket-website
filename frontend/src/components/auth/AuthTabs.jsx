import { useLang } from "@/lib/i18n"
import { IconMail } from "@/components/icons"

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

export function AuthTabs({ activeTab, onChange, tabs = ["email", "phone"] }) {
  const { t } = useLang()
  return (
    <div className="auth-tabs" role="tablist" aria-label="Authentication method">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          role="tab"
          aria-selected={activeTab === tab}
          className={`auth-tabs__tab ${activeTab === tab ? "auth-tabs__tab--active" : ""}`}
          onClick={() => onChange(tab)}
        >
          {tab === "email" ? <IconMail /> : <PhoneIcon />}
          <span>
            {tab === "email"
              ? t({ en: "Email", km: "អ៊ីមែល" })
              : t({ en: "Phone number", km: "លេខទូរស័ព្ទ" })}
          </span>
        </button>
      ))}
    </div>
  )
}