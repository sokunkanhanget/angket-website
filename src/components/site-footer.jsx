import { useRef, useState } from "react"
import { useLang } from "@/lib/i18n"
import { INFO_PAGES, TELEGRAM_BOT_URL } from "@/lib/data"
import { IconClose, IconSend, IconShield } from "./icons"

const FOOTER_NAV = [
  { href: "#home", en: "Home", km: "ទំព័រដើម" },
  { href: "#how", en: "How It Works", km: "របៀបដំណើរការ" },
  { href: "#reports", en: "Scam Reports", km: "របាយការណ៍បោកប្រាស់" },
  { href: "#tips", en: "Safety Tips", km: "គន្លឹះសុវត្ថិភាព" },
  { href: "#about", en: "About", km: "អំពីយើង" },
]

export function SiteFooter() {
  const { t } = useLang()
  const dialogRef = useRef(null)
  const [pageKey, setPageKey] = useState(null)

  const openPage = (key) => {
    setPageKey(key)
    dialogRef.current?.showModal()
  }

  const page = pageKey ? INFO_PAGES[pageKey] : null

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <a href="#home" className="brand" aria-label="Angket — home">
              <span className="brand-mark" aria-hidden="true">
                <IconShield check />
              </span>
              <span>
                Ang<b>ket</b>
              </span>
            </a>
            <p>
              {t({
                en: "Helping people recognize suspicious online information and make safer decisions.",
                km: "ជួយមនុស្សឱ្យស្គាល់ព័ត៌មានគួរឲ្យសង្ស័យតាមអ៊ីនធឺណិត និងធ្វើការសម្រេចចិត្តប្រកបដោយសុវត្ថិភាព។",
              })}
            </p>
            <div className="socials">
              <a
                className="soc-btn"
                href={TELEGRAM_BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <IconSend />
              </a>
              <a className="soc-btn" href="#" aria-label="Facebook (placeholder link)">
                <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a className="soc-btn" href="mailto:hello@angket.example" aria-label="Email (placeholder address)">
                <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <h3>{t({ en: "Explore", km: "ទំព័រ" })}</h3>
            <ul>
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{t(link)}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3>{t({ en: "Legal & Contact", km: "ច្បាប់ និងទំនាក់ទំនង" })}</h3>
            <ul>
              <li>
                <button type="button" className="foot-link-btn" onClick={() => openPage("privacy")}>
                  {t({ en: "Privacy Policy", km: "គោលការណ៍ឯកជនភាព" })}
                </button>
              </li>
              <li>
                <button type="button" className="foot-link-btn" onClick={() => openPage("terms")}>
                  {t({ en: "Terms of Use", km: "លក្ខខណ្ឌនៃការប្រើប្រាស់" })}
                </button>
              </li>
              <li>
                <a className="tg-link" href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
                  <IconSend />
                  <span>{t({ en: "Try Angket on Telegram", km: "សាកល្បង Angket នៅលើ Telegram" })}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-bottom">
          <span>
            © {new Date().getFullYear()} Angket
          </span>
          <span>
            {t({
              en: "Angket gives estimated risk assessments — always verify important information through trusted, official sources.",
              km: "Angket ផ្ដល់តែការប៉ាន់ស្មានហានិភ័យប៉ុណ្ណោះ — សូមផ្ទៀងផ្ទាត់ព័ត៌មានសំខាន់ៗតាមប្រភពផ្លូវការដែលទុកចិត្តបានជានិច្ច។",
            })}
          </span>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="info-modal"
        aria-labelledby="im-title"
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current.close()
        }}
      >
        <div className="modal-head">
          <h3 id="im-title">{page ? t(page.title) : ""}</h3>
          <button
            type="button"
            className="modal-close"
            aria-label={t({ en: "Close", km: "បិទ" })}
            onClick={() => dialogRef.current?.close()}
          >
            <IconClose />
          </button>
        </div>
        <div className="modal-body">{page ? t(page.body) : ""}</div>
      </dialog>
    </footer>
  )
}
