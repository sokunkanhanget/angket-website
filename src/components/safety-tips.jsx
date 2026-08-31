import { useLang } from "@/lib/i18n"
import {
  AlertTriangle,
  Search,
  ShieldCheck,
  Flag,
  Lock,
  CircleCheck,
  XCircle,
  MessageSquareText,
  FileText,
  Link2,
  Radar,
} from "lucide-react"
import { Reveal } from "./reveal"

function TipsHero() {
  const { t } = useLang()
  return (
    <section className="tips-hero" id="stay-safe">
      <div className="container tips-hero-grid">
        <div className="tips-hero-copy">
          <Reveal>
            <span className="eyebrow">
              {t({ en: "Digital & Media Literacy", km: "អក្ខរកម្មឌីជីថល និងព័ត៌មាន" })}
            </span>
          </Reveal>
          <Reveal className="d1">
            <h1>{t({ en: "Stay Safe Online", km: "សុវត្ថិភាព​នៅ​​លើ​បណ្តាញសង្គម" })}</h1>
          </Reveal>
          <Reveal className="d2">
            <p className="lede">
              {t({
                en: "Learn simple ways to recognize scams, protect your information, and stay safer online.",
                km: "រៀនពីវិធីសាស្ត្រក្នុងការកត់សម្គាល់ពីវិធីក្លែង​បន្លំ, ការពារ​ព័ត៌មាន​របស់​អ្នក, និង​រក្សារ​សុវត្ថិភាព​លើ​បណ្តាញសង្គម",
              })}
            </p>
          </Reveal>
          <Reveal className="d3">
            <a href="#/check" className="btn btn-primary btn-lg">
              <Radar size={18} />
              <span>{t({ en: "Check with Angket", km: "ពិនិត្យ​ជាមួយ Angket" })}</span>
            </a>
          </Reveal>
        </div>

        <div className="tips-hero-illust" aria-hidden="true">
          <svg viewBox="0 0 440 480">
            <path d="M40 120 C10 180 30 260 90 290 C150 320 210 280 220 210 C230 140 180 70 110 70 C80 70 60 90 40 120 Z" fill="var(--blue-50)" opacity="0.55" />
            <path d="M300 300 C260 340 270 400 330 420 C390 440 430 400 420 340 C410 280 350 260 300 300 Z" fill="var(--blue-100)" opacity="0.6" />
            <path d="M330 34 C298 54 296 96 328 118 C360 140 402 118 402 78 C402 48 362 12 330 34 Z" fill="var(--amber-bg)" opacity="0.5" />
            <g transform="rotate(-5 220 250)">
              <rect x="130" y="60" width="190" height="380" rx="32" fill="#fff" stroke="var(--border)" strokeWidth="3" />
              <rect x="144" y="92" width="162" height="316" rx="16" fill="#fff" stroke="var(--border)" strokeWidth="1" />
              <rect x="200" y="72" width="40" height="8" rx="4" fill="var(--faint)" />
              <rect x="195" y="418" width="50" height="5" rx="2.5" fill="var(--faint)" />
              <rect x="158" y="112" width="110" height="32" rx="14" fill="var(--surface)" stroke="var(--border)" />
              <rect x="170" y="122" width="60" height="4" rx="2" fill="var(--faint)" />
              <rect x="170" y="131" width="40" height="4" rx="2" fill="var(--faint)" />
              <rect x="158" y="154" width="76" height="26" rx="13" fill="var(--surface)" stroke="var(--border)" />
              <rect x="170" y="163" width="48" height="4" rx="2" fill="var(--faint)" />
              <rect x="158" y="196" width="134" height="58" rx="16" fill="var(--amber-bg)" stroke="#D97706" strokeWidth="2" />
              <rect x="172" y="208" width="90" height="5" rx="2.5" fill="#92400e" />
              <rect x="172" y="219" width="70" height="5" rx="2.5" fill="#92400e" />
              <rect x="172" y="230" width="50" height="5" rx="2.5" fill="#92400e" />
              <path d="M270 202 L281 220 L259 220 Z" fill="#D97706" />
              <rect x="268.5" y="207" width="3" height="6" rx="1.5" fill="#fff" />
              <circle cx="270" cy="216.5" r="1.6" fill="#fff" />
            </g>
            <circle cx="322" cy="220" r="20" fill="#fff" stroke="var(--blue-600)" strokeWidth="5" />
            <line x1="336" y1="234" x2="357" y2="255" stroke="var(--blue-600)" strokeWidth="7" strokeLinecap="round" />
            <circle cx="118" cy="404" r="30" fill="var(--green-text, #0D9488)" stroke="#fff" strokeWidth="4" />
            <path d="M103 404 L113 414 L134 391" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  )
}

function StopCheckProtect() {
  const { t } = useLang()

  const cards = [
    {
      icon: AlertTriangle,
      accent: "#E05252",
      accentBg: "#FEE2E2",
      label: t({ en: "Stop", km: "ឈប់" }),
      tagline: t({ en: "Don't rush.", km: "កុំប្រញាប់" }),
      description: t({
        en: "Always take a moment before giving your money or personal information to anyone.",
        km: "គិតជាមុនសិនមុនពេលអ្នកឆ្លើយតប ភាពបន្ទាន់គឺជាវិធីសាស្រ្តដែលអ្នកបោកប្រាស់ចូលចិត្តប្រើ​ ",
      }),
      whatToDoLabel: t({ en: "What to do:", km: "អ្វីដែលត្រូវធ្វើ:" }),
      bullets: [
        t({ en: "Say no, hang up, or delete suspicious messages.", km: "និយាយ​ថាទេ​ ឬក៏លុបសារដែលគួរឲសង្ស័យ" }),
        t({ en: "Don't share personal information under pressure.", km: "កុំចែករំលែក​ព័ត៌មាន​ផ្ទាល់ខ្លួន​ក្នុងភាពបន្ទាន់" }),
        t({ en: "Take time to think before responding to unexpected requests.", km: "ចំណាយពេល​​ពិនិត្យ​ជាមុន​​ មុនពេលធ្វើការឆ្លើយតបទៅនឹងការស្នើរសុំណាមួយ" }),
      ],
    },
    {
      icon: Search,
      accent: "#D97706",
      accentBg: "#FEF3C7",
      label: t({ en: "Check", km: "ត្រួតពិនិត្យ" }),
      tagline: t({ en: "Make sure it's real.", km: "ត្រូវធ្វើឲ​ប្រាកដថាជាការពិត" }),
      description: t({
        en: "Confirm who you're dealing with, and whether the message, offer, or request is actually genuine.",
        km: "បញ្ជាក់ថាអ្នកកំពុងទាក់ទងជាមួយអ្នកណា និងថាតើសារ ការផ្តល់ជូន ឬសំណើនោះពិតប្រាកដដែរឬទេ",
      }),
      whatToDoLabel: t({ en: "What to do:", km: "អ្វីដែលត្រូវធ្វើ:" }),
      bullets: [
        t({ en: "Check who sent the message.", km: "ពិនិត្យ​លើអ្នកផ្ញើ​សារ" }),
        t({ en: "Look closely at the details.", km: "ពិនិត្យឲ​លម្អិត​ដោយ​ប្រុងប្រយ័ត្ន" }),
        t({ en: "Don't automatically trust links or requests.", km: "កុំ​ជឿ​ទុកចិត្តលើ​តំណ​ភ្ជាប់ ឬ​សំណើ​ដោយ​ស្វ័យប្រវត្តិណាមួយដែរគ្មានប្រភពច្បាស់លាស់" }),
        t({ en: "Verify through an official source.", km: "ផ្ទៀងផ្ទាត់​ជាមុនជាមួយ​ប្រភព​ផ្លូវការ" }),
      ],
    },
    {
      icon: ShieldCheck,
      accent: "#0D9488",
      accentBg: "#CCFBF1",
      label: t({ en: "Protect", km: "ការពារ" }),
      tagline: t({ en: "Take action to stay safe.", km: "ចាត់វិធាន​ការ​ដើម្បី​សុវត្ថិភាព" }),
      description: t({
        en: "Act quickly if something feels wrong.",
        km: "ត្រូវធ្វើសកម្មភាពភ្លាមៗ​ ប្រសិនបើមានអ្វីដែលខុសប្រក្រតី",
      }),
      whatToDoLabel: t({ en: "What to do:", km: "អ្វីដែលត្រូវធ្វើ:" }),
      bullets: [
        t({ en: "Contact your bank immediately if you think your money has been stolen or you've shared financial details.", km: "សូមទាក់ទងទៅធនាគារ​ភ្លាមៗ ប្រសិនបើអ្នកគិតថាប្រាក់របស់អ្នកត្រូវបានគេលួច ឬក៏អ្នកចៃដន្យចែករំលែកព័ត៍មានសម្ងាត់អំពីព័ត៍មានហិរញ្ញវត្ថុរបស់អ្នក" }),
        t({ en: "Secure your accounts.", km: "ធ្វើឲ្យ​គណនី​របស់​អ្នក​មាន​សុវត្ថិភាព។" }),
        t({ en: "Report the scam to the impersonated organisation and platform where the scam is happening.", km: "សូមធ្វើការរាយការណ៏ពីការបោកប្រាស់​ និង​ទីកន្លែងដែលបាន​កើតឡើង" }),
      ],
    },
  ]

  return (
    <section className="tips-stop" id="stop-check-protect">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">
            {t({ en: "The Framework", km: "ក្របខ័ណ្ឌ" })}
          </span>
          <h2>{t({ en: "Stop. Check. Protect.", km: "ឈប់។ ត្រួតពិនិត្យ។ ការពារ។" })}</h2>
          <p>
            {t({
              en: "Scams are everywhere, targeting people from all walks of life. Whether it’s fake emails, unexpected phone calls or online schemes, scammers always find new ways to gain your trust and steal your money or personal information. But 3 simple steps can help keep us all safe from scammers.",
              km: "ទម្លាប់​បី​ដែល​ឈរ​ចន្លោះ​អ្នក និង​ការ​បោកប្រាស់​ភាគច្រើន។ គ្មាន​មួយ​ណា​ត្រូវការ​ជំនាញ​ពិសេស​ទេ — គ្រាន់​តែ​ការ​ផ្អាក ការ​សម្លឹង​មើល និង​ការ​រៀបចំ​បន្តិចបន្តួច។",
            })}
          </p>
        </Reveal>

        <div className="tips-stop-grid">
          {cards.map((c, i) => {
            const Icon = c.icon
            return (
              <Reveal key={i}>
                <article className="tip-card" style={{ borderTopColor: c.accent }}>
                  <div className="tip-ic" style={{ background: c.accentBg }}>
                    <Icon size={26} style={{ color: c.accent }} strokeWidth={2} />
                  </div>
                  <span className="tip-label" style={{ color: c.accent }}>{c.label}</span>
                  <h3>{c.tagline}</h3>
                  <p>{c.description}</p>
                  <p className="tip-whattodo">{c.whatToDoLabel}</p>
                  <ul className="tip-bullets">
                    {c.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function SocialMediaScams() {
  const { t } = useLang()

  const flags = [
    t({ en: "Fake profiles", km: "ប្រវត្តិរូប​ក្លែងក្លាយ" }),
    t({ en: "Someone pretending to be someone you know", km: "អ្នកណា​ម្នាក់​ក្លែងធ្វើ​ជា​អ្នក​ស្គាល់គ្នា" }),
    t({ en: "Suspicious offers", km: "ការ​ផ្តល់​ជូនដែលគួរឲសង្ស័យ" }),
    t({ en: "Requests for money", km: "សំណើ​សុំ​ប្រាក់" }),
    t({ en: "Requests for personal information", km: "សំណើ​សុំ​ព័ត៌មាន​ផ្ទាល់ខ្លួន" }),
    t({ en: "Suspicious links", km: "តំណភ្ជាប់​គ្មានប្រភពច្បាស់លាស់" }),
  ]

  return (
    <section className="tips-social" id="social-media-scams">
      <div className="container tips-social-grid">
      <Reveal>
          <div className="tips-chat-card">
            <div className="tips-chat-msgs">
              <div className="tips-chat-bubble">
                {t({
                  en: "Hey! I'm Sreyneath, I lost my phone, this is my new number 😊",
                  km: "Hey! យើងស្រីនីតហាស ទូរស័ព្ទយើងបាត់ហើយ នេះលេខថ្មីយើង ",
                })}
              </div>
              <div className="tips-chat-bubble">
                {t({
                  en: "Can you send me $20 right now? I'll explain later, I'm in a rush",
                  km: "ហែងបាញ់លុយអោយយើង 20$ សិនបានអត់ ចាំស្អែកយើងអោយវិញ",
                })}
              </div>
            </div>

            <div className="tips-warning-banner">
              <Flag size={14} />
              {t({ en: "UNVERIFIED CONTACT · urgency + money request", km: "ទំនាក់ទំនង​មិន​ផ្ទៀងផ្ទាត់ · បន្ទាន់ + សុំ​ប្រាក់" })}
            </div>

            <div className="tips-reminder">
              <p className="tips-reminder-label">
                {t({ en: "Remember", km: "ចងចាំ" })}
              </p>
              <p>
                {t({
                  en: "Don't trust a message just because it looks familiar. Verify first, through a channel the sender doesn't control.",
                  km: "កុំ​ជឿ​ទុកចិត្តល់ើសារ​ ដោយគ្រាន់​តែ​ព្រោះ​វា​មើលទៅ​ដូចស្គាល់ ផ្ទៀងផ្ទាត់​ជា​មុន​សិន តាម​រយៈឆានែល​ដែល​អ្នក​ផ្ញើ​សារមិន​អាច​គ្រប់គ្រង​បាន",
                })}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="section-head">
            <span className="eyebrow">
              {t({ en: "Where It Starts", km: "កន្លែង​ដែល​វា​ចាប់ផ្តើម" })}
            </span>
            <h2>
              {t({ en: "Social media & messaging scams", km: "ការ​បោកប្រាស់​តាម​បណ្តាញ​សង្គម និង​ការ​ផ្ញើ​សារ" })}
            </h2>
            <p>
              {t({
                en: "Scammers reach people through the same apps they use every day — a friend request, a message. Most of it is harmless. Some of it isn't.",
                km: "អ្នក​បោកប្រាស់​ទាក់ទងមនុស្ស​តាម​រយៈ​កម្មវិធី​ដដែល​ដែល​ពួកគេ​ប្រើ​ជា​រៀងរាល់ថ្ងៃ — សំណើជា​មិត្ត សារ ភាគច្រើន​គ្មាន​គ្រោះថ្នាក់​ទេ ប៉ុន្តែ​ខ្លះ​ទៀត​មាន។",
              })}
            </p>
          </div>

          <div className="tips-flag-grid">
            {flags.map((f, i) => (
              <div key={i} className="tips-flag">
                <Flag size={14} />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ProtectAccounts() {
  const { t } = useLang()

  const dos = [
    t({ en: "Use strong passwords.", km: "ប្រើ​ពាក្យសម្ងាត់​ខ្លាំង។" }),
    t({ en: "Use different passwords for important accounts.", km: "ប្រើ​ពាក្យសម្ងាត់​ខុសៗ​គ្នា​សម្រាប់​គណនី​សំខាន់ៗ។" }),
    t({ en: "Enable multi-factor authentication when it's available.", km: "បើក​ការ​ផ្ទៀងផ្ទាត់​ពហុកត្តា​នៅ​ពេល​ដែល​អាច​ធ្វើបាន។" }),
    t({ en: "Keep your devices and security software updated.", km: "ធ្វើ​ឱ្យ​ឧបករណ៍ និង​កម្មវិធី​សុវត្ថិភាព​របស់​អ្នក​ទាន់សម័យ​ជានិច្ច។" }),
  ]
  const donts = [
    t({ en: "Share your passwords.", km: "ចែករំលែក​ពាក្យសម្ងាត់​របស់​អ្នក។" }),
    t({ en: "Share security codes or sensitive information.", km: "ចែករំលែក​កូដ​សុវត្ថិភាព ឬ​ព័ត៌មាន​រសើប។" }),
    t({ en: "Click suspicious links.", km: "ចុច​តំណភ្ជាប់​សង្ស័យ។" }),
    t({ en: "Download unexpected attachments.", km: "ទាញយក​ឯកសារ​ភ្ជាប់​ដែល​មិន​បាន​រំពឹង​ទុក។" }),
  ]

  return (
    <section className="tips-protect" id="protect-accounts">
      <div className="container">
        <div className="tips-dark-panel">
          <Reveal>
            <span className="eyebrow">
              {t({ en: "Housekeeping", km: "ការ​ថែទាំ" })}
            </span>
          </Reveal>
          <Reveal className="d1">
            <h2>{t({ en: "Protect your accounts", km: "ការពារ​គណនី​របស់​អ្នក" })}</h2>
          </Reveal>
          <Reveal className="d2">
            <p className="lede">
              {t({
                en: "A few settings, kept up to date, do most of the work for you.",
                km: "ការ​កំណត់​តែ​ពីរបី ដែល​រក្សា​ទាន់សម័យ ធ្វើ​ការងារ​ភាគច្រើន​ជំនួស​អ្នក។",
              })}
            </p>
          </Reveal>

          <Reveal>
            <div className="tips-do-donts">
              <div className="tips-do-list">
                <span className="tips-do-label">
                  {t({ en: "Do", km: "ធ្វើ" })}
                </span>
                <ul>
                  {dos.map((d, i) => (
                    <li key={i}>
                      <CircleCheck size={16} />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="tips-dont-list">
                <span className="tips-dont-label">
                  {t({ en: "Don't", km: "កុំ" })}
                </span>
                <ul>
                  {donts.map((d, i) => (
                    <li key={i}>
                      <XCircle size={16} />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="tips-dark-foot">
              <Lock size={14} />
              <span>
                {t({
                  en: "Your password and security codes are private — no legitimate service will ever ask you for them.",
                  km: "ពាក្យសម្ងាត់ និង​កូដ​សុវត្ថិភាព​របស់​អ្នក​គឺ​ជា​ការសម្ងាត់ — គ្មាន​សេវាកម្ម​ស្របច្បាប់​ណា​នឹង​សុំ​ព័ត៌មាន​នេះ​ពី​អ្នក​ទេ។",
                })}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function TechFakeContent() {
  const { t } = useLang()

  const pills = [
    { color: "#E05252", label: t({ en: "Stop – don't rush", km: "ឈប់ – កុំរហ័ស" }) },
    { color: "#D97706", label: t({ en: "Check – verify the information", km: "ត្រួតពិនិត្យ – ផ្ទៀងផ្ទាត់​ព័ត៌មាន" }) },
    { color: "#0D9488", label: t({ en: "Protect – don't share sensitive information", km: "ការពារ – កុំ​ចែករំលែក​ព័ត៌មាន​រសើប" }) },
  ]

  return (
    <section className="tips-tech" id="tech-fakes">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">
            {t({ en: "A Newer Problem", km: "បញ្ហា​ថ្មី​មួយ" })}
          </span>
          <h2>
            {t({ en: "Technology can make scams look real", km: "បច្ចេកវិទ្យា​អាច​ធ្វើ​ឲ្យ​ការ​បោកប្រាស់​មើលទៅ​ដូច​ជា​ពិត" })}
          </h2>
          <p>
            {t({
              en: "Messages, profiles, websites, and images can all be made to look convincing with today's tools.",
              km: "សារ ប្រវត្តិរូប វេបសាយ និង​រូបភាព​ទាំងអស់​អាច​ត្រូវ​បាន​ធ្វើ​ឲ្យ​មើលទៅ​គួរ​ឲ្យ​ជឿ​ជាមួយ​ឧបករណ៍​សព្វថ្ងៃ។",
            })}{" "}
            <strong>
              {t({ en: "Don't trust something just because it looks real.", km: "កុំ​ជឿ​អ្វី​មួយ​គ្រាន់​តែ​ព្រោះ​វា​មើលទៅ​ដូច​ជា​ពិត។" })}
            </strong>{" "}
            {t({ en: "The same three habits still apply:", km: "ទម្លាប់​បី​ដដែល​នៅ​តែ​អនុវត្ត៖" })}
          </p>
        </Reveal>

        <Reveal>
          <div className="tips-tech-pills">
            {pills.map((p, i) => (
              <span key={i} className="tips-pill">
                <span className="tips-pill-dot" style={{ background: p.color }} />
                {p.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ScammedSteps() {
  const { t } = useLang()
  const steps = [
    {
      icon: "🔴",
      title: t({ en: "Stop", km: "ឈប់" }),
      desc: t({
        en: "Stop communicating with the scammer, and don't send any more money.",
        km: "ឈប់​ទាក់ទង​ជាមួយ​អ្នក​បោកប្រាស់ ហើយ​កុំ​ផ្ញើ​ប្រាក់​បន្ថែម​ទៀត។",
      }),
    },
    {
      icon: "🏦",
      title: t({ en: "Contact your bank", km: "ទាក់ទង​ធនាគារ​របស់​អ្នក" }),
      desc: t({
        en: "If money or banking information was involved, contact your bank as soon as possible.",
        km: "ប្រសិន​បើ​មាន​ការ​ពាក់ព័ន្ធ​ប្រាក់ ឬ​ព័ត៌មាន​ធនាគារ សូម​ទាក់ទង​ធនាគារ​របស់​អ្នក​ឲ្យ​បាន​លឿន​តាម​ដែល​អាច​ធ្វើ​ទៅ​បាន។",
      }),
    },
    {
      icon: "📸",
      title: t({ en: "Save evidence", km: "រក្សា​ទុក​ភស្តុតាង" }),
      desc: t({
        en: "Keep screenshots, messages, phone numbers, usernames, links, and transaction details.",
        km: "រក្សា​ទុក​រូបថត​អេក្រង់ សារ លេខ​ទូរស័ព្ទ ឈ្មោះ​អ្នកប្រើ តំណភ្ជាប់ និង​ព័ត៌មាន​លម្អិត​អំពី​ប្រតិបត្តិការ។",
      }),
    },
    {
      icon: "🔓",
      title: t({ en: "Secure your accounts", km: "ការពារ​គណនី​របស់​អ្នក" }),
      desc: t({
        en: "Change passwords and secure any accounts that may have been compromised.",
        km: "ផ្លាស់ប្តូរ​ពាក្យសម្ងាត់ និង​ការពារ​គណនី​ណា​ដែល​អាច​ត្រូវ​បាន​ជ្រៀតជ្រែក។",
      }),
    },
    {
      icon: "📢",
      title: t({ en: "Report it", km: "រាយការណ៍" }),
      desc: t({
        en: "Report the scam through the appropriate platform or authority.",
        km: "រាយការណ៍​ការ​បោកប្រាស់​តាម​រយៈ​វេទិកា ឬ​អាជ្ញាធរ​ដែល​សមស្រប។",
      }),
    },
  ]
  return (
    <section className="tips-steps" id="scammed-steps">
      <div className="container">
        <Reveal className="section-head">
          <h2>
            {t({ en: "Don't panic. Act quickly.", km: "កុំ​ភ័យខ្លាច។ ចាត់វិធានការ​ភ្លាមៗ។" })}
          </h2>
          <p>
            {t({
              en: "Work through these five steps in order — each one limits the damage the next might otherwise do.",
              km: "ធ្វើ​តាម​ជំហាន​ទាំង​ប្រាំ​នេះ​តាម​លំដាប់ — នីមួយៗ​កាត់​បន្ថយ​ការ​ខូចខាត​ដែល​ជំហាន​បន្ទាប់​អាច​ធ្វើ​ឲ្យ​កាន់​តែ​អាក្រក់​ទៅ​ទៀត។",
            })}
          </p>
        </Reveal>

        <Reveal>
          <ol className="tips-timeline">
            {steps.map((s, i) => (
              <li key={i}>
                <span className="tips-step-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="tips-step-body">
                  <h3>
                    <span aria-hidden="true">{s.icon}</span>
                    {s.title}
                  </h3>
                  <p>{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}

function TipsFinalCTA() {
  const { t } = useLang()

  const options = [
    {
      icon: MessageSquareText,
      title: t({ en: "Check a message", km: "ពិនិត្យ​សារ" }),
      desc: t({ en: "Paste text or a screenshot", km: "បិទភ្ជាប់​អត្ថបទ ឬ​រូបថត​អេក្រង់" }),
    },
    {
      icon: FileText,
      title: t({ en: "Check a file", km: "ពិនិត្យ​ឯកសារ" }),
      desc: t({ en: "Documents, images, PDFs", km: "ឯកសារ រូបភាព PDF" }),
    },
    {
      icon: Link2,
      title: t({ en: "Check a URL", km: "ពិនិត្យ URL" }),
      desc: t({ en: "Any link before you click", km: "តំណភ្ជាប់​ណា​មួយ​មុន​ពេល​អ្នក​ចុច" }),
    },
  ]

  return (
    <section className="tips-cta-section" id="cta">
      <div className="container">
        <div className="tips-cta-panel">
          <Reveal>
            <span className="eyebrow">
              {t({ en: "Not Sure? Ask Before You Act", km: "មិន​ប្រាកដ? សួរ​មុន​ពេល​អ្នក​ធ្វើ" })}
            </span>
          </Reveal>
          <Reveal className="d1">
            <h2>{t({ en: "Something looks suspicious?", km: "មាន​អ្វី​មួយ​មើលទៅ​សង្ស័យ?" })}</h2>
          </Reveal>
          <Reveal className="d2">
            <p className="lede">
              {t({
                en: "Don't guess — check it. Send suspicious content to Angket and get help understanding the risk, in plain terms.",
                km: "កុំ​ទាយ — ពិនិត្យ​វា។ ផ្ញើ​មាតិកា​សង្ស័យ​ទៅ Angket ដើម្បី​ទទួល​បាន​ជំនួយ​ក្នុង​ការ​យល់​ពី​ហានិភ័យ​ជា​ភាសា​ធម្មតា។",
              })}
            </p>
          </Reveal>

          <Reveal>
            <div className="tips-action-grid">
              {options.map((o, i) => {
                const Icon = o.icon
                return (
                  <div key={i} className="tips-action-card">
                    <Icon size={20} />
                    <h3>{o.title}</h3>
                    <p>{o.desc}</p>
                  </div>
                )
              })}
            </div>
          </Reveal>

          <Reveal>
            <div className="tips-cta-actions">
              <a href="#/check" className="btn btn-white btn-lg">
                <Radar size={16} />
                {t({ en: "Check with Angket", km: "ពិនិត្យ​ជាមួយ Angket" })}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function SafetyTips() {
  return (
    <>
      <TipsHero />
      <StopCheckProtect />
      <SocialMediaScams />
      <ProtectAccounts />
      <TechFakeContent />
      <ScammedSteps />
      <TipsFinalCTA />
    </>
  )
}
