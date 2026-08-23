import { useState } from "react"
import { useLang } from "@/lib/i18n"
import { NAV_LINKS, TELEGRAM_BOT_URL } from "@/lib/data"
import { IconMenu, IconSend, IconShield } from "./icons"

export function SiteHeader() {
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="container">
        <nav className="nav" aria-label="Main">
          <a href="#home" className="brand" aria-label="Angket — home">
            <span className="brand-mark" aria-hidden="true">
              <IconShield check />
            </span>
            <span>
              Ang<b>ket</b>
            </span>
          </a>

          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{t(link)}</a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <div className="lang-switch" role="group" aria-label="Language / ភាសា">
              <button type="button" className="lang-btn" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
                EN
              </button>
              <button type="button" className="lang-btn" aria-pressed={lang === "km"} onClick={() => setLang("km")}>
                ខ្មែរ
              </button>
            </div>

            <a className="btn btn-primary" href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
              <IconSend />
              <span>{t({ en: "Try Angket", km: "សាកល្បង Angket" })}</span>
            </a>

            <button
              type="button"
              className="menu-btn"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={t({ en: "Open menu", km: "បើកម៉ឺនុយ" })}
              onClick={() => setOpen((v) => !v)}
            >
              <IconMenu />
            </button>
          </div>
        </nav>
      </div>

      <div className={`mobile-menu${open ? " open" : ""}`} id="mobile-menu">
        <div className="container">
          <nav aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a key={link.href} className="m-link" href={link.href} onClick={closeMenu}>
                {t(link)}
              </a>
            ))}
          </nav>
          <a className="btn btn-primary btn-lg" href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
            <IconSend />
            <span>{t({ en: "Try Angket", km: "សាកល្បង Angket" })}</span>
          </a>
        </div>
      </div>
    </header>
  )
}
