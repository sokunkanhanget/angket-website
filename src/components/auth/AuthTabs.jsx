export function AuthTabs({ activeTab, onChange, tabs = ["email", "phone"] }) {
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
          {tab === "email" ? "Email" : "Phone"}
        </button>
      ))}
    </div>
  )
}
