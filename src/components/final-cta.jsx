import { useLang } from "@/lib/i18n"
import { TELEGRAM_BOT_URL } from "@/lib/data"
import { Reveal } from "./reveal"
import { IconSend } from "./icons"

export function FinalCta() {
  const { t } = useLang()

  return (
    <section id="cta" aria-labelledby="cta-title">
      <div className="container">
        <Reveal className="cta-box">
          <h2 id="cta-title">
            {t({
              en: "Think It Might Be a Scam? Check Before You Act.",
              km: "សង្ស័យថាជាការបោកប្រាស់? ពិនិត្យមុនពេលធ្វើសកម្មភាព។",
            })}
          </h2>
          <p>
            {t({
              en: "Send suspicious messages or links to Angket and get an estimated risk assessment in Telegram.",
              km: "ផ្ញើសារ ឬតំណគួរឲ្យសង្ស័យទៅ Angket ហើយទទួលបានការវាយតម្លៃហានិភ័យប៉ាន់ស្មានក្នុង Telegram។",
            })}
          </p>
          <div className="tg-ctas">
            <a className="btn btn-white btn-lg" href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
              <IconSend />
              <span>🛡️ {t({ en: "Open Angket on Telegram", km: "បើក Angket នៅលើ Telegram" })}</span>
            </a>
            <a className="btn btn-ghost-light btn-lg" href="#/safety-tips/reports">
              <span>{t({ en: "Explore Scam Reports", km: "មើលរបាយការណ៍បោកប្រាស់" })}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
