import { useLang } from "@/lib/i18n"
import { TELEGRAM_BOT_URL } from "@/lib/data"
import { IconSend, IconShield, IconWarning, IconCheckDouble, IconFlag } from "./icons"

export function Hero() {
  const { t } = useLang()

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div>
          <span className="eyebrow rise">
            <IconShield style={{ width: "1em", height: "1em" }} />
            <span>{t({ en: "Safety bot on Telegram", km: "Bot សុវត្ថិភាពនៅលើ Telegram" })}</span>
          </span>
          <h1 id="hero-title" className="rise d1">
            {t({
              en: "Not Sure If It​ is a Scam? Check Before You Trust.",
              km: "មិនច្បាស់ថាវាជាការបោកប្រាស់មែនដែរឬទេ? ពិនិត្យមុនពេលធ្វើការសម្រេចចិត្ត",
            })}
          </h1>
          <p className="lede rise d2">
            {t({
              en: "Angket helps you identify suspicious messages, links, and online information through our Telegram chatbot. You will get an estimated scam risk percentage, understand suspicious patterns, and make safer decisions.",
              km: "Angket ជួយអ្នកកំណត់អត្តសញ្ញាណសារ តំណភ្ជាប់ និងព័ត៌មានគួរឲ្យសង្ស័យតាមអ៊ីនធឺណិត តាមរយៈ Chatbot Telegram របស់យើង។ អ្នកនឹងទទួលបានការពិនិត្យ​ និង​វិភាគពីហានិភ័យ ហើយយល់ពីលំនាំដែលគួរឲ្យសង្ស័យ និងធ្វើការសម្រេចចិត្តប្រកបដោយសុវត្ថិភាពជាងមុន។",
            })}
          </p>
          <div className="hero-ctas rise d3">
            <a className="btn btn-primary btn-lg" href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
              <IconSend />
              <span>{t({ en: "Check with Telegram", km: "ពិនិត្យតាម Telegram" })}</span>
            </a>
            <a className="btn btn-outline btn-lg" href="#/report">
              <IconFlag />
              <span>{t({ en: "Scam Report", km: "រាយការណ៍ការបោកប្រាស់" })}</span>
            </a>
          </div>
          <p className="hero-trust rise d3">
            {t({
              en: "Protection from any risky · Community-powered reports",
              km: "ការពារពីហានិភ័យណាមួយដែលមិនអាចដឹងទុកជាមុន · របាយការណ៍ពីសហគមន៍",
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
                    en: "Congratulations! You won a $500 cash prize. Pay a $15 processing fee​ now to claim your reward.",
                    km: "អបអរសាទរ! អ្នកបានទទួលរង្វាន់ជាសាច់ប្រាក់ 500 ដុល្លារ។ សូមបង់ថ្លៃ 15 ដុល្លារឥឡូវនេះ​ ដើម្បីទទួលបានរង្វាន់ភ្លាមៗ",
                  })}
                </span>
                <span className="stamp">12:03</span>
              </div>
              <div className="bubble bot">
                <div className="risk-head">
                  <h3>
                    <IconWarning style={{ width: 15, height: 15, color: "#b45309" }} />
                    <span>{t({ en: "Percentage of scam", km: "ភាគរយនៃការបោកប្រាស់" })}</span>
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
                        en: "This message shows several scam patterns.",
                        km: "ចំណុចចំនួននៃសារនេះបង្ហាញពីលំនាំនៃការបោកប្រាស់",
                      })}
                    </span>
                  </p>
                </div>
                <p className="why-title">{t({ en: "Why it may be suspicious", km: "មូលហេតុដែលវាគួរឲ្យសង្ស័យ" })}</p>
                <ul className="why-list">
                  <li>{t({ en: "Urgency pressure (“pay now”)", km: "សូមបង់ប្រាក់ឥឡូវនេះ" })}</li>
                  <li>{t({ en: "Asks for an upfront payment", km: "ទាមទារឲបង់ប្រាក់មុន" })}</li>
                  <li>{t({ en: "Rewards from Unknown Sources ​​​​​​​​​", km: "រង្វាន់ដែលគ្មានប្រភពច្បាស់លាស់" })}</li>
                </ul>
                <p className="reco">
                  <IconShield check />
                  <span>
                    {t({
                      en: "Suggested next step: don’t pay or share personal information. Verify first.",
                      km: "ជំហានបន្ទាប់ដែលផ្ដល់យោបល់៖ កុំបង់ប្រាក់ ឬចែករំលែកព័ត៌មានផ្ទាល់ខ្លួន។ ផ្ទៀងផ្ទាត់ជាមុនសិន។",
                    })}
                  </span>
                </p>
                <span className="stamp">
                  12:04 <IconCheckDouble style={{ width: 11, height: 11 }} />
                </span>
              </div>
            </div>
          </div>
          <p className="chat-note">
            {t({
              en: "Example reply. Every results are based on real data analysis​ to help you make decision — not a confirmation.",
              km: "ចម្លើយគំរូ។ លទ្ធផលទាំងអស់ជាការវិភាគផ្អែកលើទិន្នន័យជាក់ស្តែង ដើម្បីជួយដល់ការសម្រេចចិត្តរបស់អ្នក— មិនមែនជាការបញ្ជាក់ថាពិត​ឬមិនពិត​១០០%នោះទេ។",
            })}
          </p>
        </div>
      </div>
    </section>
  )
}
