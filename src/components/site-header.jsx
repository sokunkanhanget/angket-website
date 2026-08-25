import { useEffect, useRef, useState } from "react"
import { useLang } from "@/lib/i18n"
import { NAV_LINKS, TELEGRAM_BOT_URL } from "@/lib/data"
import { IconMenu, IconSend, IconShield } from "./icons"

function FlagGB() {
  return (
    <svg className="flag" viewBox="0 0 60 30" aria-hidden="true">
      <clipPath id="gb-clip"><rect width="60" height="30" /></clipPath>
      <g clipPath="url(#gb-clip)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 60,30 M60,0 0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 60,30 M60,0 0,30" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  )
}

function FlagKH() {
  return (
    <svg className="flag" viewBox="0 0 60 30" aria-hidden="true">
      <rect width="60" height="30" fill="#032ea1" />
      <rect y="7.5" width="60" height="15" fill="#e00025" />
      <g fill="#fff">
        <path d="M26 9 h8 v2 l1 1 v3 l-1 1 h-8 l-1 -1 v-3 l1 -1 z" />
        <rect x="24.5" y="16" width="11" height="2" />
      </g>
    </svg>
  )
}

export function SiteHeader() {
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef(null)
  const [route, setRoute] = useState(() => window.location.hash)
  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash)
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])
  const isActive = (href) =>
    href === "#/home"
      ? !route ||
        route === "#" ||
        route.startsWith("#home") ||
        route.startsWith("#/home")
      : route.startsWith(href)
  const closeMenu = () => setOpen(false)

  useEffect(() => {
    if (!langOpen) return
    const onClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [langOpen])

  const pickLang = (code) => {
    setLang(code)
    setLangOpen(false)
  }

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
                <a href={link.href} className={isActive(link.href) ? "active" : undefined}>{t(link)}</a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <div className="lang-switch" ref={langRef}>
              <button
                type="button"
                className="lang-toggle"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                onClick={() => setLangOpen((v) => !v)}
              >
                {lang === "km" ? <FlagKH /> : <FlagGB />}
                {lang === "km" ? "ខ្មែរ" : "ENGLISH"}
                <svg
                  className={`lang-caret${langOpen ? " up" : ""}`}
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {langOpen && (
                <ul className="lang-dropdown" role="listbox" aria-label="Language / ភាសា">
                  <li>
                    <button
                      type="button"
                      role="option"
                      aria-selected={lang === "en"}
                      className={`lang-option${lang === "en" ? " active" : ""}`}
                      onClick={() => pickLang("en")}
                    >
                      <FlagGB />
                      ENGLISH
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      role="option"
                      aria-selected={lang === "km"}
                      className={`lang-option${lang === "km" ? " active" : ""}`}
                      onClick={() => pickLang("km")}
                    >
                      <FlagKH />
                      ខ្មែរ
                    </button>
                  </li>
                </ul>
              )}
            </div>

            <a className="btn btn-outline" href="#/login">
              {t({ en: "Log in", km: "ចូលគណនី" })}
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
              <a
                key={link.href}
                className={`m-link${isActive(link.href) ? " active" : ""}`}
                href={link.href}
                onClick={closeMenu}
              >
                {t(link)}
              </a>
            ))}
          </nav>
          <a className="btn btn-primary btn-lg" href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
            <IconSend />
            <span>{t({ en: "Try Angket", km: "សាកល្បង Angket" })}</span>
          </a>
          <a className="btn btn-outline btn-lg" href="#/login" onClick={closeMenu}>
            {t({ en: "Log in", km: "ចូលគណនី" })}
          </a>
        </div>
      </div>
    </header>
  )
}
