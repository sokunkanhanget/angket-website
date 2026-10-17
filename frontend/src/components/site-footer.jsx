import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useLang } from "@/lib/i18n"
import { INFO_PAGES, NAV_LINKS, TELEGRAM_BOT_URL } from "@/lib/data"
import { IconClose, IconSend } from "./icons"
import logoImg from "@/assets/logo.png"

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
    <footer className="bg-white border-t border-[#e3e9f3] pt-12 pb-[1.6rem]">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-[2.5rem] px-[clamp(1rem,4vw,3rem)] max-[600px]:grid-cols-1 max-[600px]:gap-[1.8rem]">
          <div>
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
            <p className="mt-[0.8rem] text-[0.92rem] text-[#56657f]">
              {t({
                en: "Angket is a digital safety platform designed to help people identify potential online scams, understand digital threats, and take informed action. By combining scam detection with community reporting and safety resources, we aim to make the digital environment safer for everyone.",
                km: "Angket គឺជាវេទិកាសុវត្ថិភាពឌីជីថល ដែលត្រូវបានបង្កើតឡើងដើម្បីជួយមនុស្សឱ្យកំណត់អត្តសញ្ញាណការបោកប្រាស់តាមអ៊ីនធឺណិតដែលអាចកើតមាន ស្វែងយល់ពីការគំរាមកំហែងឌីជីថល និងចាត់វិធានការដោយផ្អែកលើព័ត៌មាន។ ដោយការរួមបញ្ចូលការរកឃើញការបោកប្រាស់ ជាមួយការរាយការណ៍ពីសហគមន៍ និងធនធានសុវត្ថិភាព យើងមានគោលបំណងធ្វើឱ្យបរិស្ថានឌីជីថលកាន់តែមានសុវត្ថិភាពសម្រាប់មនុស្សគ្រប់គ្នា។",
              })}
            </p>
            <div className="mt-4 flex gap-[0.55rem]">
              <a
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#e3e9f3] bg-surface text-[#56657f] transition-all duration-150 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                href={TELEGRAM_BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <IconSend />
              </a>
              <a
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#e3e9f3] bg-surface text-[#56657f] transition-all duration-150 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                href="https://www.facebook.com/profile.php?id=61594053519400"
                aria-label="Facebook (placeholder link)"
              >
                <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#e3e9f3] bg-surface text-[#56657f] transition-all duration-150 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                href="mailto:angket.bot12@gmail.com"
                aria-label="Email (placeholder address)"
              >
                <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <h3 className="mb-[0.9rem] text-[1.05rem] font-bold tracking-[0.07em] text-blue-700 km:text-[0.9em] km:normal-case km:tracking-[0]">
              {t({ en: "Explore", km: "ទំព័រ" })}
            </h3>
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="py-[0.22rem]">
                  <Link className="text-[0.92rem] text-text hover:text-blue-700" to={link.href}>
                    {t(link)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-[0.9rem] text-[1.05rem] font-bold tracking-[0.07em] text-blue-700 km:text-[0.9em] km:normal-case km:tracking-[0]">
              {t({ en: "Legal & Contact", km: "ច្បាប់ និងទំនាក់ទំនង" })}
            </h3>
            <ul>
              <li className="py-[0.22rem]">
                <button
                  type="button"
                  className="cursor-pointer p-0 py-[0.22rem] text-left text-[0.92rem] text-text hover:text-blue-700"
                  onClick={() => openPage("privacy")}
                >
                  {t({ en: "Privacy Policy", km: "គោលការណ៍ឯកជនភាព" })}
                </button>
              </li>
              <li className="py-[0.22rem]">
                <button
                  type="button"
                  className="cursor-pointer p-0 py-[0.22rem] text-left text-[0.92rem] text-text hover:text-blue-700"
                  onClick={() => openPage("terms")}
                >
                  {t({ en: "Terms of Use", km: "លក្ខខណ្ឌនៃការប្រើប្រាស់" })}
                </button>
              </li>
              <li className="py-[0.22rem]">
                <a
                  className="inline-flex items-center gap-[0.45rem] font-semibold"
                  href={TELEGRAM_BOT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconSend />
                  <span>{t({ en: "Try Angket on Telegram", km: "សាកល្បង Angket នៅលើ Telegram" })}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-[2.2rem] flex flex-wrap justify-between gap-[0.5rem_2rem] border-t border-[#e3e9f3] px-[clamp(1rem,4vw,3rem)] pt-[1.2rem] text-[0.8rem] text-faint">
          <span>
            © {new Date().getFullYear()} Angket
          </span>
          <span>
            {t({
              en: "Angket provides risk analysis for awareness and education.",
              km: "Angket ផ្តល់ការវិភាគហានិភ័យសម្រាប់ការយល់ដឹង និងការអប់រំ។",
            })}
          </span>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="w-[min(560px,calc(100vw-2rem))] rounded-[20px] border-0 p-[1.6rem] text-ink shadow-lg backdrop:bg-[rgba(15,23,42,0.45)]"
        aria-labelledby="im-title"
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current.close()
        }}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 id="im-title" className="text-[1.15rem]">{page ? t(page.title) : ""}</h3>
          <button
            type="button"
            className="grid h-9 w-9 flex-none cursor-pointer place-items-center rounded-[10px] border border-[#e3e9f3] bg-surface text-[#56657f] hover:bg-blue-50 hover:text-blue-700"
            aria-label={t({ en: "Close", km: "បិទ" })}
            onClick={() => dialogRef.current?.close()}
          >
            <IconClose />
          </button>
        </div>
        <div className="text-[0.94rem] text-text">{page ? t(page.body) : ""}</div>
      </dialog>
    </footer>
  )
}
