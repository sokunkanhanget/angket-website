import { useLang } from "@/lib/i18n"
import { TELEGRAM_BOT_URL } from "@/lib/data"
import { IconSend, IconShield, IconWarning } from "./icons"

export function Hero() {
  const { t } = useLang()

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div>
          <span className="eyebrow rise">
            <IconShield style={{ width: "1em", height: "1em" }} />
            <span>{t({ en: "Free safety bot on Telegram", km: "Bot សុវត្ថិភាពឥតគិតថ្លៃនៅលើ Telegram" })}</span>
          </span>
          <h1 id="hero-title" className="rise d1">
            {t({
              en: "Not Sure If It’s a Scam? Check Before You Trust.",
              km: "មិនច្បាស់ថាវាជាការបោកប្រាស់ឬទេ? ពិនិត្យមុនពេលជឿ។",
            })}
          </h1>
          <p className="lede rise d2">
            {t({
              en: "Angket helps you identify suspicious messages, links, and online information through our Telegram chatbot. Get an estimated scam risk percentage, understand suspicious patterns, and make safer decisions.",
              km: "Angket ជួយអ្នកកំណត់អត្តសញ្ញាណសារ តំណភ្ជាប់ និងព័ត៌មានគួរឲ្យសង្ស័យតាមអ៊ីនធឺណិត តាមរយៈ Chatbot Telegram របស់យើង។ ទទួលបានភាគរយហានិភ័យប៉ាន់ស្មាន យល់ពីលំនាំគួរឲ្យសង្ស័យ ហើយធ្វើការសម្រេចចិត្តប្រកបដោយសុវត្ថិភាពជាងមុន។",
            })}
          </p>
          <div className="hero-ctas rise d3">
            <a className="btn btn-primary btn-lg" href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
              <IconSend />
              <span>{t({ en: "Check with Telegram", km: "ពិនិត្យតាម Telegram" })}</span>
            </a>
            <a className="link-arrow" href="#/how-it-works">
              <span>{t({ en: "Learn How It Works ↓", km: "ស្វែងយល់ពីរបៀបដំណើរការ ↓" })}</span>
            </a>
          </div>
          <p className="hero-trust rise d3">
            {t({
              en: "Free to use · Results are estimates, not guarantees · Community-powered reports",
              km: "ប្រើប្រាស់ឥតគិតថ្លៃ · លទ្ធផលជាការប៉ាន់ស្មាន មិនមែនការធានា · របាយការណ៍ពីសហគមន៍",
            })}
          </p>
        </div>

        <div className="phone-wrap rise d2">
          <div
            className="phone"
            role="img"
            aria-label={t({
              en: "Example conversation: a forwarded prize message, and Angket replying with an estimated scam risk of 86 percent, the reasons it may be suspicious, and a safety recommendation.",
              km: "គំរូការសន្ទនា៖ សាររង្វាន់ដែលបានបញ្ជូនបន្ត ហើយ Angket ឆ្លើយតបដោយប៉ាន់ស្មានហានិភ័យបោកប្រាស់ ៨៦ ភាគរយ ជាមួយមូលហេតុ និងអនុសាសន៍សុវត្ថិភាព។",
            })}
          >
            <div className="chat-head" aria-hidden="true">
              <span className="avatar">
                <IconShield check style={{ width: 18, height: 18 }} />
              </span>
              <div>
                <strong>Angket Bot</strong>
                <small>{t({ en: "online", km: "លើបណ្ដាញ" })}</small>
              </div>
            </div>
            <div className="chat-body" aria-hidden="true">
              <div className="bubble user">
                <span className="tag">{t({ en: "Forwarded message", km: "សារបញ្ជូនបន្ត" })}</span>
                <span>
                  {t({
                    en: "Congratulations! You won a $500 cash prize. Pay a $15 processing fee within 2 hours to claim your reward.",
                    km: "អបអរសាទរ! អ្នកបានជាប់រង្វាន់សាច់ប្រាក់ 500 ដុល្លារ។ សូមបង់ថ្លៃដំណើរការ 15 ដុល្លារក្នុងរយៈពេល 2 ម៉ោង ដើម្បីទទួលរង្វាន់។",
                  })}
                </span>
                <span className="stamp">12:03</span>
              </div>
              <div className="bubble bot">
                <div className="risk-head">
                  <h3>
                    <IconWarning style={{ width: 15, height: 15, color: "#b45309" }} />
                    <span>{t({ en: "Estimated scam risk", km: "ហានិភ័យបោកប្រាស់ប៉ាន់ស្មាន" })}</span>
                  </h3>
                  <span className="risk-chip">{t({ en: "Potentially risky", km: "អាចមានហានិភ័យ" })}</span>
                </div>
                <div className="risk-row">
                  <div className="gauge">
                    <svg viewBox="0 0 80 80">
                      <circle className="track" cx="40" cy="40" r="34" />
                      <circle className="val" cx="40" cy="40" r="34" transform="rotate(-90 40 40)" />
                    </svg>
                    <div className="pct">
                      <strong>86%</strong>
                      <span>{t({ en: "estimate", km: "ប៉ាន់ស្មាន" })}</span>
                    </div>
                  </div>
                  <p className="risk-meta">
                    <span>
                      {t({
                        en: "This message shows several common scam patterns.",
                        km: "សារនេះបង្ហាញលំនាំបោកប្រាស់ច្រើនយ៉ាងធម្មតា។",
                      })}
                    </span>
                  </p>
                </div>
                <p className="why-title">{t({ en: "Why it may be suspicious:", km: "ហេតុអ្វីវាអាចគួរឲ្យសង្ស័យ៖" })}</p>
                <ul className="why-list">
                  <li>{t({ en: "Urgency pressure (“within 2 hours”)", km: "ការបង្ខំឲ្យប្រញាប់ («ក្នុងរយៈពេល 2 ម៉ោង»)" })}</li>
                  <li>{t({ en: "Asks for an upfront payment", km: "សុំបង់ប្រាក់មុន" })}</li>
                  <li>{t({ en: "Unfamiliar link destination", km: "តំណភ្ជាប់ទៅកាន់អាសយដ្ឋានមិនស្គាល់" })}</li>
                  <li>{t({ en: "A prize you never entered for", km: "រង្វាន់ដែលអ្នកមិនបានចូលរួម" })}</li>
                </ul>
                <p className="reco">
                  <IconShield check />
                  <span>
                    {t({
                      en: "Suggested next step: don’t pay or share personal information. Verify through official channels first.",
                      km: "ជំហានបន្ទាប់ដែលផ្ដល់យោបល់៖ កុំបង់ប្រាក់ ឬចែករំលែកព័ត៌មានផ្ទាល់ខ្លួន។ ផ្ទៀងផ្ទាត់តាមបណ្ដាញផ្លូវការជាមុនសិន។",
                    })}
                  </span>
                </p>
                <span className="stamp">12:04 ✓✓</span>
              </div>
            </div>
          </div>
          <p className="chat-note">
            {t({
              en: "Example reply. Every result is an estimate to help you decide — not a confirmation.",
              km: "ចម្លើយគំរូ។ លទ្ធផលទាំងអស់ជាការប៉ាន់ស្មាន ដើម្បីជួយការសម្រេចចិត្ត — មិនមែនជាការបញ្ជាក់ទេ។",
            })}
          </p>
        </div>
      </div>
    </section>
  )
}
