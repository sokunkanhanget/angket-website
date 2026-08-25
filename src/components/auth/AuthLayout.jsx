import { useLang } from "@/lib/i18n"

export function AuthLayout({ children }) {
  const { t } = useLang()

  return (
    <div className="auth-split">
      <div className="auth-split__left">
        <div className="auth-split__logo" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L2 28h28L16 2z" stroke="#0F5C73" strokeWidth="2.5" fill="none" />
            <path d="M16 10L8 26h16L16 10z" fill="#0F5C73" opacity="0.15" />
          </svg>
          <span className="auth-split__wordmark">ANGKET</span>
        </div>

        {/* Placeholder illustration — swap for final designer asset */}
        <div className="auth-split__illustration">
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {/* Skyline silhouette */}
            <rect x="20" y="200" width="360" height="80" rx="4" fill="#D8DEE4" opacity="0.3" />
            <rect x="40" y="170" width="30" height="110" rx="2" fill="#D8DEE4" opacity="0.2" />
            <rect x="80" y="150" width="25" height="130" rx="2" fill="#D8DEE4" opacity="0.2" />
            <rect x="115" y="180" width="35" height="100" rx="2" fill="#D8DEE4" opacity="0.2" />
            <rect x="300" y="160" width="28" height="120" rx="2" fill="#D8DEE4" opacity="0.2" />
            <rect x="340" y="175" width="32" height="105" rx="2" fill="#D8DEE4" opacity="0.2" />

            {/* Desk */}
            <rect x="120" y="220" width="160" height="8" rx="3" fill="#0F5C73" opacity="0.7" />
            <rect x="140" y="228" width="6" height="40" rx="2" fill="#0F5C73" opacity="0.5" />
            <rect x="254" y="228" width="6" height="40" rx="2" fill="#0F5C73" opacity="0.5" />

            {/* Monitor */}
            <rect x="165" y="170" width="70" height="50" rx="4" fill="#0F5C73" opacity="0.85" />
            <rect x="170" y="175" width="60" height="38" rx="2" fill="#F5F8FA" />
            <rect x="193" y="220" width="14" height="6" rx="1" fill="#0F5C73" opacity="0.6" />

            {/* Person silhouette */}
            <circle cx="155" cy="155" r="14" fill="#0F5C73" opacity="0.6" />
            <path d="M140 185 Q140 170 155 170 Q170 170 170 185 L170 210 L140 210Z" fill="#0F5C73" opacity="0.5" />

            {/* Ghosted sign-in card behind */}
            <rect x="270" y="130" width="90" height="110" rx="8" fill="#ffffff" opacity="0.25" stroke="#D8DEE4" strokeWidth="1" />
            <rect x="282" y="148" width="66" height="8" rx="2" fill="#D8DEE4" opacity="0.3" />
            <rect x="282" y="164" width="66" height="14" rx="3" fill="#D8DEE4" opacity="0.2" />
            <rect x="282" y="186" width="66" height="8" rx="2" fill="#D8DEE4" opacity="0.3" />
            <rect x="282" y="202" width="66" height="14" rx="3" fill="#D8DEE4" opacity="0.2" />
            <rect x="282" y="224" width="66" height="10" rx="4" fill="#E0A63A" opacity="0.25" />

            {/* Bookshelf */}
            <rect x="50" y="160" width="40" height="4" rx="1" fill="#0F5C73" opacity="0.2" />
            <rect x="52" y="140" width="8" height="20" rx="1" fill="#E0A63A" opacity="0.2" />
            <rect x="62" y="144" width="6" height="16" rx="1" fill="#0F5C73" opacity="0.15" />
            <rect x="70" y="142" width="7" height="18" rx="1" fill="#E0A63A" opacity="0.15" />
            <rect x="79" y="145" width="5" height="15" rx="1" fill="#0F5C73" opacity="0.2" />

            {/* Cactus */}
            <rect x="55" y="205" width="12" height="14" rx="3" fill="#E0A63A" opacity="0.25" />
            <rect x="59" y="190" width="4" height="18" rx="2" fill="#0F5C73" opacity="0.2" />
            <rect x="53" y="196" width="4" height="8" rx="2" fill="#0F5C73" opacity="0.15" transform="rotate(-20 53 196)" />
            <rect x="63" y="194" width="4" height="7" rx="2" fill="#0F5C73" opacity="0.15" transform="rotate(20 63 194)" />

            {/* Wastebasket */}
            <rect x="330" y="255" width="18" height="22" rx="3" fill="#D8DEE4" opacity="0.25" />
            <line x1="334" y1="260" x2="334" y2="272" stroke="#D8DEE4" strokeWidth="1" opacity="0.3" />
            <line x1="339" y1="260" x2="339" y2="272" stroke="#D8DEE4" strokeWidth="1" opacity="0.3" />
            <line x1="344" y1="260" x2="344" y2="272" stroke="#D8DEE4" strokeWidth="1" opacity="0.3" />
          </svg>
        </div>
      </div>

      <div className="auth-split__right">
        <div className="auth-split__form-wrap">
          {children}
        </div>
      </div>
    </div>
  )
}
