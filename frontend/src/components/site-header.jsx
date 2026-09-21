import { useEffect, useRef, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useLang } from "@/lib/i18n"
import { useAuth } from "@/lib/auth"
import { NAV_LINKS } from "@/lib/data"
import { rememberAuthOrigin } from "@/lib/authBack"
import { IconMenu, IconUser } from "./icons"
import logoImg from "@/assets/logo.png"
import flagEnImg from "@/assets/flags/flag-en.webp"
import flagKhImg from "@/assets/flags/flag-kh.svg"

function FlagGB() {
  return <img className="flag" src={flagEnImg} alt="English" />
}

function FlagKH() {
  return <img className="flag" src={flagKhImg} alt="ខ្មែរ" />
}

export function SiteHeader() {
  const { lang, setLang, t } = useLang()
  const { admin } = useAuth()
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef(null)
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
          <Link to="/" className="brand" aria-label="Angket — home">
            <img src={logoImg} alt="Angket" className="brand-img" />
            <span>
              Ang<b>ket</b>
            </span>
          </Link>

          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  end={link.href === "/"}
                  className={({ isActive }) => (isActive ? "active" : undefined)}
                >
                  {t(link)}
                </NavLink>
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
                <span className="lang-label">{lang === "km" ? "ខ្មែរ" : "ENGLISH"}</span>
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

            {admin ? (
              <Link
                className="nav-user"
                to="/profile"
                title={admin.name}
                aria-label={`${t({ en: "My profile", km: "ទម្រង់របស់ខ្ញុំ" })} — ${admin.name}`}
              >
                <span className="nav-user-avatar">
                  {admin.avatarUrl ? (
                    <img className="nav-user-img" src={admin.avatarUrl} alt="" />
                  ) : (
                    <IconUser />
                  )}
                </span>
                <span className="nav-user-name">{admin.name}</span>
              </Link>
            ) : (
              <Link className="btn btn-outline" to="/login" onClick={rememberAuthOrigin}>
                {t({ en: "Log in", km: "ចូលគណនី" })}
              </Link>
            )}

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
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === "/"}
                className={(props) => `m-link${props.isActive ? " active" : ""}`}
                onClick={closeMenu}
              >
                {t(link)}
              </NavLink>
            ))}
          </nav>
          {admin ? (
            <Link
              className="nav-user m-user"
              to="/profile"
              onClick={closeMenu}
              aria-label={`${t({ en: "My profile", km: "ទម្រង់របស់ខ្ញុំ" })} — ${admin.name}`}
            >
              <span className="nav-user-avatar">
                {admin.avatarUrl ? (
                  <img className="nav-user-img" src={admin.avatarUrl} alt="" />
                ) : (
                  <IconUser />
                )}
              </span>
              <span className="nav-user-name">{admin.name}</span>
            </Link>
          ) : (
            <Link className="btn btn-outline btn-lg" to="/login" onClick={() => { rememberAuthOrigin(); closeMenu() }}>
              {t({ en: "Log in", km: "ចូលគណនី" })}
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
