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

const BTN =
  "inline-flex items-center justify-center gap-2 rounded-full border cursor-pointer px-5 py-[0.62rem] text-[0.95rem] font-semibold whitespace-nowrap transition-[background-color,box-shadow,transform] duration-[180ms] ease-out km:pt-[0.42rem] km:pb-[0.42rem]"
const BTN_OUTLINE = `${BTN} border-blue-200 bg-white text-blue-700 hover:bg-blue-50`

function FlagGB() {
  return <img className="h-auto w-[22px] flex-none rounded-[3px] shadow-[0_0_0_1px_rgba(255,255,255,0.2)] max-[640px]:w-6" src={flagEnImg} alt="English" />
}

function FlagKH() {
  return <img className="h-auto w-[22px] flex-none rounded-[3px] shadow-[0_0_0_1px_rgba(255,255,255,0.2)] max-[640px]:w-6" src={flagKhImg} alt="ខ្មែរ" />
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
    <header className="sticky top-0 z-[100] border-b border-[#e3e9f3] bg-white/[0.92] backdrop-blur-[10px]">
      <div className="mx-auto w-full max-w-[1440px]">
        <nav
          className="flex h-[70px] items-center px-[clamp(1rem,4vw,3rem)] max-[840px]:gap-3"
          aria-label="Main"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-[0.6rem] font-display text-[1.22rem] font-bold text-ink"
            aria-label="Angket — home"
          >
            <img src={logoImg} alt="Angket" className="block h-[48px] w-auto object-contain max-[600px]:h-[36px]" />
            <span>
              Ang<b className="text-blue-800">ket</b>
            </span>
          </Link>

          <ul className="ml-auto mr-24 flex flex-none gap-[2.9rem] p-0 max-[840px]:hidden">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  end={link.href === "/"}
                  className={({ isActive }) =>
                    `relative px-[0.1rem] py-[0.35rem] text-[16px] font-medium text-[#56657f] transition-colors duration-150 hover:text-blue-700 km:text-[18px]${
                      isActive
                        ? " text-blue-700 after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:rounded-full after:bg-[linear-gradient(90deg,var(--color-blue-500),var(--color-blue-700))] after:content-['']"
                        : ""
                    }`
                  }
                >
                  {t(link)}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-[0.65rem] max-[840px]:ml-auto max-[640px]:gap-[0.5rem]">
            <div className="relative inline-flex" ref={langRef}>
              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-[0.45rem] rounded-[10px] border border-[#e3e9f3] bg-surface px-[0.8rem] py-[0.45rem] text-[0.78rem] font-bold tracking-[0.06em] text-ink transition-[border-color,background] duration-150 hover:border-blue-600 max-[640px]:p-[0.45rem] km:pt-[0.42rem] km:pb-[0.42rem]"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                onClick={() => setLangOpen((v) => !v)}
              >
                {lang === "km" ? <FlagKH /> : <FlagGB />}
                <span className="max-[640px]:hidden">{lang === "km" ? "ខ្មែរ" : "ENGLISH"}</span>
                <svg
                  className={`h-[14px] w-[14px] transition-transform duration-150 max-[640px]:hidden${langOpen ? " rotate-180" : ""}`}
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {langOpen && (
                <ul
                  className="absolute right-0 top-[calc(100%+0.4rem)] z-50 m-0 min-w-[11rem] list-none rounded-[10px] border border-white/10 bg-[#10151f] p-[0.3rem] shadow-md"
                  role="listbox"
                  aria-label="Language / ភាសា"
                >
                  <li>
                    <button
                      type="button"
                      role="option"
                      aria-selected={lang === "en"}
                      className={`flex w-full cursor-pointer items-center gap-[0.6rem] rounded-[7px] border-none bg-transparent px-[0.65rem] py-[0.55rem] text-left text-[0.85rem] font-semibold tracking-[0.04em] text-[#e5e9f0] hover:bg-white/[0.08] hover:text-white${
                        lang === "en" ? " bg-blue-600 text-white" : ""
                      }`}
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
                      className={`flex w-full cursor-pointer items-center gap-[0.6rem] rounded-[7px] border-none bg-transparent px-[0.65rem] py-[0.55rem] text-left text-[0.85rem] font-semibold tracking-[0.04em] text-[#e5e9f0] hover:bg-white/[0.08] hover:text-white${
                        lang === "km" ? " bg-blue-600 text-white" : ""
                      }`}
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
                className="inline-flex items-center gap-2 rounded-full border border-[#e3e9f3] bg-white py-[0.28rem] pl-[0.28rem] pr-[0.9rem] no-underline transition-[border-color,background] duration-150 hover:border-teal hover:bg-teal-50"
                to="/profile"
                title={admin.name}
                aria-label={`${t({ en: "My profile", km: "ទម្រង់របស់ខ្ញុំ" })} — ${admin.name}`}
              >
                <span className="relative grid h-8 w-8 flex-none place-items-center overflow-hidden rounded-full bg-[linear-gradient(135deg,var(--color-teal),var(--color-teal-dim))] text-[0.74rem] font-bold tracking-[0.02em] text-white">
                  {admin.avatarUrl ? (
                    <img className="absolute inset-0 block h-full w-full object-cover" src={admin.avatarUrl} alt="" />
                  ) : (
                    <IconUser />
                  )}
                </span>
                <span className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-[0.85rem] font-semibold text-ink max-[640px]:hidden">
                  {admin.name}
                </span>
              </Link>
            ) : (
              <Link className={`${BTN_OUTLINE} max-[840px]:hidden`} to="/login" onClick={rememberAuthOrigin}>
                {t({ en: "Log in", km: "ចូលគណនី" })}
              </Link>
            )}

            <button
              type="button"
              className="hidden h-[42px] w-[42px] cursor-pointer place-items-center rounded-[10px] border border-[#e3e9f3] bg-white text-ink max-[840px]:grid"
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

      <div
        className={`border-t border-[#e3e9f3] bg-white pt-[0.9rem] pb-[1.1rem] ${open ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className="mx-auto w-full max-w-[1440px] px-[clamp(1rem,4vw,3rem)]">
          <nav className="grid gap-[0.15rem]" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === "/"}
                className={({ isActive }) =>
                  `rounded-[10px] px-[0.45rem] py-[0.72rem] font-medium text-ink hover:bg-blue-50 km:text-[18px]${
                    isActive ? " bg-blue-50 text-blue-700" : ""
                  }`
                }
                onClick={closeMenu}
              >
                {t(link)}
              </NavLink>
            ))}
          </nav>
          {admin ? (
            <Link
              className="mt-[0.7rem] box-border flex w-full items-center gap-2 rounded-full border border-[#e3e9f3] bg-white py-[0.28rem] pl-[0.28rem] pr-[0.9rem] no-underline transition-[border-color,background] duration-150 hover:border-teal hover:bg-teal-50"
              to="/profile"
              onClick={closeMenu}
              aria-label={`${t({ en: "My profile", km: "ទម្រង់របស់ខ្ញុំ" })} — ${admin.name}`}
            >
              <span className="relative grid h-8 w-8 flex-none place-items-center overflow-hidden rounded-full bg-[linear-gradient(135deg,var(--color-teal),var(--color-teal-dim))] text-[0.74rem] font-bold tracking-[0.02em] text-white">
                {admin.avatarUrl ? (
                  <img className="absolute inset-0 block h-full w-full object-cover" src={admin.avatarUrl} alt="" />
                ) : (
                  <IconUser />
                )}
              </span>
              <span className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-[0.85rem] font-semibold text-ink">
                {admin.name}
              </span>
            </Link>
          ) : (
            <Link
              className={`${BTN_OUTLINE} mt-[0.7rem] w-full`}
              to="/login"
              onClick={() => { rememberAuthOrigin(); closeMenu() }}
            >
              {t({ en: "Log in", km: "ចូលគណនី" })}
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
