import { useLang } from "@/lib/i18n"
import { TELEGRAM_BOT_URL } from "@/lib/data"
import staySafeOnlineImg from "@/assets/stay-safe-online.png"
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
  OctagonAlert,
  Landmark,
  Camera,
  Megaphone,
  Pause,
  Link2Off,
  Gift,
  UserSearch,
  SearchCheck,
  BadgeCheck,
  Gauge,
  MessageSquareOff,
  BookOpen,
} from "lucide-react"
import { Reveal } from "./reveal"

function TipsHero() {
  const { t } = useLang()
  return (
    <section className="tips-hero" id="stay-safe">
      <div className="container tips-hero-grid">
        <div className="tips-hero-copy">
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
            <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              <Radar size={18} />
              <span>{t({ en: "Check with Angket", km: "ពិនិត្យ​ជាមួយ Angket" })}</span>
            </a>
          </Reveal>
        </div>

        <div className="tips-hero-illust">
          <img src={staySafeOnlineImg} alt="Staying safe online" className="tips-hero-img" />
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
      tagline: t({ en: "Don’t act too quickly. ", km: "កុំប្រញាប់ធ្វើសកម្មភាព" }),
      description: t({
        en: "Scammers often create a sense of urgency or pressure you to respond immediately. Take a moment before clicking a link, opening a file, sending money, or sharing personal information.",
        km: "អ្នកបោកប្រាស់តែងតែបង្កើតអារម្មណ៍បន្ទាន់ ឬដាក់សម្ពាធឱ្យអ្នកឆ្លើយតបភ្លាមៗ។ សូមចំណាយពេលបន្តិចមុនពេលចុចតំណភ្ជាប់ បើកឯកសារ ផ្ញើប្រាក់ ឬចែករំលែកព័ត៌មានផ្ទាល់ខ្លួន។",
      }),
      whatToDoLabel: t({ en: "What to do:", km: "អ្វីដែលត្រូវធ្វើ:" }),
      bullets: [
        {
          Icon: Pause,
          text: t({ en: "Stop and think before responding to an unexpected message.", km: "ឈប់ និងគិតឱ្យបានច្បាស់មុនពេលឆ្លើយតបសារដែលអ្នកមិនបានរំពឹងទុក។" }),
        },
        {
          Icon: Lock,
          text: t({ en: "Do not share personal or financial information under pressure.", km: "កុំចែករំលែកព័ត៌មានផ្ទាល់ខ្លួន ឬព័ត៌មានហិរញ្ញវត្ថុ នៅពេលមានការបង្ខិតបង្ខំ។" }),
        },
        {
          Icon: Link2Off,
          text: t({ en: "Do not click suspicious links or open unexpected files.", km: "កុំចុចលើតំណភ្ជាប់ដែលគួរឱ្យសង្ស័យ ឬបើកឯកសារដែលអ្នកមិនបានរំពឹងទុក។" }),
        },
        {
          Icon: Gift,
          text: t({ en: "Be careful with offers that seem too good to be true.", km: "ប្រុងប្រយ័ត្នចំពោះការផ្តល់ជូនដែលមើលទៅល្អហួសពីការពិត។" }),
        },
      ],
    },
    {
      icon: Search,
      accent: "#D97706",
      accentBg: "#FEF3C7",
      label: t({ en: "Check", km: "ត្រួតពិនិត្យ" }),
      tagline: t({ en: "Make sure it’s legitimate", km: "ប្រាកដថាវាជារបស់ពិត" }),
      description: t({
        en: "Before taking action, check the message, link, file, or offer carefully.",
        km: "មុនពេលធ្វើសកម្មភាពណាមួយ សូមពិនិត្យសារ តំណភ្ជាប់ ឯកសារ ឬការផ្តល់ជូននោះឱ្យបានប្រុងប្រយ័ត្ន។",
      }),
      whatToDoLabel: t({ en: "What to do:", km: "អ្វីដែលត្រូវធ្វើ:" }),
      bullets: [
        {
          Icon: UserSearch,
          text: t({ en: "Check who sent the message and whether the sender is trustworthy.", km: "ពិនិត្យថា តើអ្នកណាជាអ្នកផ្ញើសារ និងតើអ្នកផ្ញើនោះអាចទុកចិត្តបានឬទេ។" }),
        },
        {
          Icon: SearchCheck,
          text: t({ en: "Look for suspicious links, unusual requests, or pressure to act quickly.", km: "ស្វែងរកតំណភ្ជាប់ដែលគួរឱ្យសង្ស័យ សំណើមិនធម្មតា ឬការដាក់សម្ពាធឱ្យអ្នកធ្វើសកម្មភាពភ្លាមៗ។" }),
        },
        {
          Icon: BadgeCheck,
          text: t({ en: "Verify job offers, prizes, investments, and other unexpected opportunities through official sources.", km: "ផ្ទៀងផ្ទាត់ការផ្តល់ជូនការងារ រង្វាន់ ការវិនិយោគ និងឱកាសផ្សេងៗដែលមិនបានរំពឹងទុក តាមរយៈប្រភពផ្លូវការ។" }),
        },
        {
          Icon: Gauge,
          text: t({ en: "Review the risk score and reasons provided before deciding what to do.", km: "ពិនិត្យពិន្ទុហានិភ័យ និងមូលហេតុដែលបានបង្ហាញ មុនពេលសម្រេចចិត្តថាត្រូវធ្វើអ្វីបន្ត។" }),
        },
      ],
    },
    {
      icon: ShieldCheck,
      accent: "#0D9488",
      accentBg: "#CCFBF1",
      label: t({ en: "Protect", km: "ការពារ" }),
      tagline: t({ en: "Take action and help protect others", km: "ចាត់វិធានការ និងជួយការពារអ្នកដទៃ" }),
      description: t({
        en: "If you discover that something may be a scam, take steps to protect yourself and share useful information with others. ",
        km: "ប្រសិនបើអ្នករកឃើញថាអ្វីមួយអាចជាការបោកប្រាស់ សូមចាត់វិធានការដើម្បីការពារខ្លួន និងចែករំលែកព័ត៌មានដែលមានប្រយោជន៍ជាមួយអ្នកដទៃ។",
      }),
whatToDoLabel: t({ en: "What to do:", km: "អ្វីដែលត្រូវធ្វើ:" }),
      bullets: [
        {
          Icon: MessageSquareOff,
          text: t({ en: "Do not continue communicating with suspicious accounts or send money.", km: "កុំបន្តទាក់ទងជាមួយគណនីដែលគួរឱ្យសង្ស័យ និងកុំផ្ញើប្រាក់ទៅពួកគេ។" }),
        },
        {
          Icon: Lock,
          text: t({ en: "Secure your accounts if you have shared personal or login information.", km: "ការពារគណនីរបស់អ្នក ប្រសិនបើអ្នកបានចែករំលែកព័ត៌មានផ្ទាល់ខ្លួន ឬព័ត៌មានសម្រាប់ចូលគណនី។" }),
        },
        {
          Icon: Landmark,
          text: t({ en: "Contact your bank immediately if you believe your financial information or money has been compromised.", km: "ទាក់ទងធនាគាររបស់អ្នកភ្លាមៗ ប្រសិនបើអ្នកជឿថាព័ត៌មានហិរញ្ញវត្ថុ ឬប្រាក់របស់អ្នកអាចត្រូវបានលួច ឬរងផលប៉ះពាល់។" }),
        },
        {
          Icon: Flag,
          text: t({ en: "Report the scam to the relevant organization and platform.", km: "រាយការណ៍អំពីការបោកប្រាស់ទៅកាន់ស្ថាប័នដែលពាក់ព័ន្ធ និងវេទិកាដែលការបោកប្រាស់នោះកំពុងកើតឡើង។" }),
        },
        {
          Icon: Megaphone,
          text: t({ en: "Share your scam experience through Angket's community reporting system to help warn others.", km: "ចែករំលែកបទពិសោធន៍អំពីការបោកប្រាស់របស់អ្នកតាមរយៈប្រព័ន្ធរាយការណ៍របស់ Angket ដើម្បីជួយព្រមានអ្នកដទៃ។" }),
        },
        {
          Icon: BookOpen,
          text: t({ en: "Learn from community reports to recognize similar scams in the future.", km: "សិក្សាពីរបាយការណ៍របស់សហគមន៍ ដើម្បីអាចសម្គាល់ការបោកប្រាស់ដែលមានលក្ខណៈស្រដៀងគ្នានៅពេលអនាគត។" }),
        },
      ],
    },
  ]

  return (
    <section className="tips-stop" id="stop-check-protect">
      <div className="container">
        <Reveal className="section-head">
          <h2>{t({ en: "Stop, Check, Protect", km: "ឈប់ ត្រួតពិនិត្យ ការពារ" })}</h2>
          <p>
            {t({
              en: "Scams can happen to anyone. From suspicious messages, phishing links, and malicious files, scammers use different tactics to gain your trust and convince you to take action. Before you click, reply, send money, or share personal information, remember three simple steps: Stop. Check. Protect.",
              km: "ការបោកប្រាស់អាចកើតឡើងចំពោះអ្នកណាក៏បាន។ ចាប់ពីសារដែលគួរឱ្យសង្ស័យ តំណភ្ជាប់បន្លំ រហូតដល់ឯកសារដែលអាចបង្កគ្រោះថ្នាក់ អ្នកបោកប្រាស់ប្រើវិធីសាស្ត្រផ្សេងៗ ដើម្បីបង្កើតការជឿទុកចិត្ត និងបញ្ចុះបញ្ចូលអ្នកឱ្យធ្វើសកម្មភាពណាមួយ។ មុនពេលអ្នកចុច តបសារ ផ្ញើប្រាក់ ឬចែករំលែកព័ត៌មានផ្ទាល់ខ្លួន សូមចងចាំ ៣ ជំហានសាមញ្ញ៖ បញ្ឈប់ ពិនិត្យ ការពារ",
            })}
          </p>
        </Reveal>

        <div className="tips-stop-grid">
          {cards.map((c, i) => {
            const Icon = c.icon
            return (
              <Reveal key={i}>
                <article className="tip-card" style={{ borderTopColor: c.accent }}>
                  <div className="tip-head">
                  <div className="tip-ic" style={{ background: c.accentBg }}>
                    <Icon size={26} style={{ color: c.accent }} strokeWidth={2} />
                  </div>
                  <span className="tip-label" style={{ color: c.accent }}>{c.label}</span>
                </div>
                <h3>{c.tagline}</h3>
                  <p className="tip-desc">{c.description}</p>
                  <p className="tip-whattodo">{c.whatToDoLabel}</p>
                  <ul className="tip-bullets">
                    {c.bullets.map((b, j) => (
                      <li key={j}>
                        <b.Icon size={16} style={{ color: c.accent }} strokeWidth={2} />
                        <span>{b.text}</span>
                      </li>
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

function ProtectAccounts() {
  const { t } = useLang()

  const dos = [
    t({ en: "Use strong passwords.", km: "ប្រើ​ពាក្យសម្ងាត់​ដែលមិនអាចទាយដឹងបាន" }),
    t({ en: "Use different passwords for important accounts.", km: "ប្រើ​ពាក្យសម្ងាត់​ខុសៗ​គ្នា​សម្រាប់​គណនី​សំខាន់ៗ" }),
    t({ en: "Enable multi-factor authentication when it's available.", km: "បើក​ការ​ផ្ទៀងផ្ទាត់​ពហុកត្តា​នៅ​ពេល​ដែល​អាច​ប្រើបាន" }),
    t({ en: "Keep your devices and security software updated.", km: "ធ្វើ​ឱ្យ​ឧបករណ៍ និង​កម្មវិធី​សុវត្ថិភាព​របស់​អ្នក​ទាន់សម័យ​ជានិច្ច" }),
  ]
  const donts = [
    t({ en: "Share your passwords.", km: "ចែករំលែក​ពាក្យសម្ងាត់​របស់​អ្នក" }),
    t({ en: "Share security codes or sensitive information.", km: "ចែករំលែក​កូដ​សុវត្ថិភាព ឬ​ព័ត៌មាន​អាចបង្កហានិភ័យ" }),
    t({ en: "Click suspicious links.", km: "ចុច​តំណភ្ជាប់​ដែលគ្នានប្រភពច្បាស់លាស់" }),
    t({ en: "Download unexpected attachments.", km: "ទាញយក​ឯកសារ​ភ្ជាប់​ដែល​មិន​បាន​រំពឹង​ទុក" }),
  ]

  return (
    <section className="tips-protect" id="protect-accounts">
      <div className="tips-dark-panel">
        <div className="container">
          <Reveal className="d1">
            <h2>{t({ en: "Protect your accounts", km: "ការពារ​គណនី​របស់​អ្នក" })}</h2>
          </Reveal>
          <Reveal className="d2">
            <p className="lede">
              {t({
                en: "A few settings, kept up to date, do most of the work for you.",
                km: "ការ​កំណត់​តែ​ពីរបី ដែល​រក្សា​ទាន់សម័យ ធ្វើ​ការងារ​ភាគច្រើន​ជំនួស​អ្នកបាន",
              })}
            </p>
          </Reveal>

          <Reveal>
            <div className="tips-do-donts">
              <div className="tips-do-list">
                <span className="tips-do-label">
                  <CircleCheck size={20} />
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
                  <XCircle size={20} />
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

          </div>
        </div>
    </section>
  )
}

function ScammedSteps() {
  const { t } = useLang()
  const steps = [
    {
      Icon: OctagonAlert,
      title: t({ en: "Stop", km: "ឈប់" }),
      desc: t({
        en: "Stop the scam from going further. Stop communicating with the scammer and do not send any additional money or personal information.",
        km: "បញ្ឈប់ការបោកប្រាស់ កុំឲ្យបន្តទៅមុខទៀត។ ឈប់ទាក់ទងជាមួយអ្នកបោកប្រាស់ ហើយកុំផ្ញើប្រាក់ ឬព័ត៌មានផ្ទាល់ខ្លួនបន្ថែមទៀត។",
      }),
      actionLabel: t({ en: "Take action:", km: "ចាត់វិធានការ៖" }),
      actions: [
        t({ en: "Stop replying to the scammer.", km: "ឈប់តបសារទៅអ្នកបោកប្រាស់។" }),
        t({ en: "Do not click any more links or open additional files.", km: "កុំចុចតំណភ្ជាប់បន្ថែម ឬបើកឯកសារផ្សេងទៀត។" }),
        t({ en: "Do not send more money or share sensitive information.", km: "កុំផ្ញើប្រាក់បន្ថែម ឬចែករំលែកព័ត៌មានសម្ងាត់។" }),
      ],
    },
    {
      Icon: Landmark,
      title: t({ en: "Contact your bank", km: "ទាក់ទងធនាគាររបស់អ្នក" }),
      desc: t({
        en: "Act quickly if money or banking information is involved. If you have sent money or shared banking or financial information, contact your bank as soon as possible.",
        km: "ចាត់វិធានការឲ្យបានលឿន ប្រសិនបើមានការពាក់ព័ន្ធនឹងប្រាក់ ឬព័ត៌មានធនាគារ។ ប្រសិនបើអ្នកបានផ្ញើប្រាក់ ឬចែករំលែកព័ត៌មានធនាគារ ឬហិរញ្ញវត្ថុ សូមទាក់ទងធនាគាររបស់អ្នកឲ្យបានលឿនតាមដែលអាចធ្វើទៅបាន។",
      }),
      actionLabel: t({ en: "Take action:", km: "ចាត់វិធានការ៖" }),
      actions: [
        t({ en: "Contact your bank through its official channels.", km: "ទាក់ទងធនាគាររបស់អ្នកតាមឆានែលផ្លូវការ។" }),
        t({ en: "Explain what happened and provide the relevant transaction details.", km: "ពន្យល់ពីអ្វីដែលបានកើតឡើង និងផ្តល់ព័ត៌មានលម្អិតអំពីប្រតិបត្តិការពាក់ព័ន្ធ។" }),
        t({ en: "Ask what steps can be taken to protect your account or transaction.", km: "សួរថាតើមានវិធានការអ្វីខ្លះ ដើម្បីការពារគណនី ឬប្រតិបត្តិការរបស់អ្នក។" }),
      ],
    },
    {
      Icon: Camera,
      title: t({ en: "Save the evidence", km: "រក្សាទុកភស្តុតាង" }),
      desc: t({
        en: "Keep important information before deleting anything. Evidence can help you report the scam and may be useful when investigating what happened.",
        km: "រក្សាទុកព័ត៌មានសំខាន់ៗ មុនពេលលុបអ្វីទាំងអស់។ ភស្តុតាងអាចជួយអ្នករាយការណ៍ការបោកប្រាស់ និងអាចមានប្រយោជន៍ក្នុងការស៊ើបអង្កេតនូវអ្វីដែលបានកើតឡើង។",
      }),
      actionLabel: t({ en: "Save:", km: "រក្សាទុក៖" }),
      actions: [
        t({ en: "Screenshots of messages and conversations", km: "រូបថតអេក្រង់នៃសារ និងការសន្ទនា" }),
        t({ en: "Phone numbers and usernames", km: "លេខទូរស័ព្ទ និងឈ្មោះអ្នកប្រើ" }),
        t({ en: "Suspicious links or URLs", km: "តំណភ្ជាប់ ឬ URLs គួរឲ្យសង្ស័យ" }),
        t({ en: "Email addresses", km: "អាសយដ្ឋានអ៊ីមែល" }),
        t({ en: "Transaction and payment details", km: "ព័ត៌មានលម្អិតអំពីប្រតិបត្តិការ និងការទូទាត់" }),
        t({ en: "Any files or other information related to the scam", km: "ឯកសារ ឬព័ត៌មានផ្សេងទៀតដែលទាក់ទងនឹងការបោកប្រាស់" }),
      ],
    },
    {
      Icon: Lock,
      title: t({ en: "Secure your accounts", km: "ការពារគណនីរបស់អ្នក" }),
      desc: t({
        en: "Protect your accounts from further access. If you shared your password, login information, or other sensitive details, take steps to secure your accounts immediately.",
        km: "ការពារគណនីរបស់អ្នកពីការចូលប្រើបន្ថែមទៀត។ ប្រសិនបើអ្នកបានចែករំលែកពាក្យសម្ងាត់ ព័ត៌មានចូលគណនី ឬព័ត៌មានសម្ងាត់ផ្សេងទៀត សូមចាត់វិធានការការពារគណនីរបស់អ្នកភ្លាមៗ។",
      }),
      actionLabel: t({ en: "Take action:", km: "ចាត់វិធានការ៖" }),
      actions: [
        t({ en: "Change compromised passwords.", km: "ផ្លាស់ប្តូរពាក្យសម្ងាត់ដែលអាចត្រូវបានលួច។" }),
        t({ en: "Use strong, unique passwords.", km: "ប្រើពាក្យសម្ងាត់រឹងមាំ និងខុសគ្នាតែមួយគត់។" }),
        t({ en: "Enable two-factor authentication where available.", km: "បើកការផ្ទៀងផ្ទាត់ពីរជំហាន នៅពេលដែលអាចប្រើបាន។" }),
        t({ en: "Check your accounts for unusual activity.", km: "ពិនិត្យគណនីរបស់អ្នកចំពោះសកម្មភាពមិនប្រក្រតី។" }),
        t({ en: "Sign out of unfamiliar or unauthorized devices.", km: "ចេញពីឧបករណ៍ដែលអ្នកមិនស្គាល់ ឬមិនត្រូវបានអនុញ្ញាត។" }),
      ],
    },
    {
      Icon: Megaphone,
      title: t({ en: "Report it", km: "រាយការណ៍" }),
      desc: t({
        en: "Help stop the scam and protect others. Reporting a scam can help the relevant platform or organization take action and may help prevent others from becoming victims.",
        km: "ជួយបញ្ឈប់ការបោកប្រាស់ និងការពារអ្នកដទៃ។ ការរាយការណ៍ការបោកប្រាស់អាចជួយវេទិកា ឬស្ថាប័នពាក់ព័ន្ធចាត់វិធានការ និងអាចជួយទប់ស្កាត់អ្នកដទៃពីការក្លាយជាជនរងគ្រោះ។",
      }),
      actionLabel: t({ en: "Take action:", km: "ចាត់វិធានការ៖" }),
      actions: [
        t({ en: "Report the scam through the platform where it occurred.", km: "រាយការណ៍អំពីការបោកប្រាស់តាមរយៈវេទិកាដែលវាបានកើតឡើង។" }),
        t({ en: "Report impersonation to the organization being impersonated.", km: "រាយការណ៍អំពីការក្លែងបន្លំទៅកាន់ស្ថាប័នដែលត្រូវបានក្លែងបន្លំ។" }),
        t({ en: "Contact the appropriate authorities when necessary.", km: "ទាក់ទងអាជ្ញាធរសមស្រប នៅពេលចាំបាច់។" }),
        t({ en: "Share your experience through Angket's community reporting system to help warn others.", km: "ចែករំលែកបទពិសោធន៍របស់អ្នកតាមរយៈប្រព័ន្ធរាយការណ៍សហគមន៍របស់ Angket ដើម្បីជួយព្រមានអ្នកដទៃ។" }),
      ],
    },
  ]
  return (
    <section className="tips-steps" id="scammed-steps">
      <div className="container">
        <Reveal className="section-head">
          <h2>
            {t({ en: "Don't panic. Act quickly.", km: "កុំភ័យខ្លាច - ចាត់វិធានការភ្លាមៗ" })}
          </h2>
          <p>
            {t({
              en: "If you think you may have encountered a scam, don't panic. Acting quickly can help reduce the potential damage.",
              km: "ប្រសិនបើអ្នកគិតថាអ្នកអាចបានជួបប្រទះនឹងការបោកប្រាស់ សូមកុំភ័យខ្លាច។ ការចាត់វិធានការភ្លាមៗ អាចជួយកាត់បន្ថយការខូចខាតដែលអាចកើតមាន។",
            })}
          </p>
          <p>
            {t({
              en: "Follow these five steps in order to protect yourself, secure your information, and help prevent others from becoming victims.",
              km: "ធ្វើតាមជំហានទាំងប្រាំនេះតាមលំដាប់លំដោយ ដើម្បីការពារខ្លួនអ្នក រក្សាសុវត្ថិភាពព័ត៌មាន និងជួយទប់ស្កាត់អ្នកដទៃពីការក្លាយជាជនរងគ្រោះ។",
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
                    <s.Icon size={18} />
                    {s.title}
                  </h3>
                  <p>{s.desc}</p>
                  <p className="tip-whattodo">{s.actionLabel}</p>
                  <ul className="tips-step-list">
                    {s.actions.map((a, j) => (
                      <li key={j}>
                        <CircleCheck size={16} />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
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
      desc: t({ en: "Paste text or a screenshot", km: "ទម្លាក់​អត្ថបទ ឬ​រូបភាព" }),
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
      <div className="tips-cta-panel">
        <div className="container">
          <Reveal className="d1">
            <h2>{t({ en: "Something looks suspicious?", km: "មាន​អ្វី​មួយ​មើលទៅ​សង្ស័យ?" })}</h2>
          </Reveal>
          <Reveal className="d2">
            <p className="lede">
              {t({
                en: "Don't guess - check it. Send suspicious content to Angket and get help understanding the risk, in plain terms.",
                km: "កុំ​ទាយ - ពិនិត្យ​វា។ ផ្ញើ​មាតិកា​សង្ស័យ​ទៅកាន់ Angket ដើម្បី​ទទួល​បាន​ជំនួយ​ក្នុង​ការ​យល់​ពី​ហានិភ័យ​ជា​ភាសា​ធម្មតា។",
              })}
            </p>
          </Reveal>

          <Reveal>
            <div className="tips-action-grid">
              {options.map((o, i) => {
                const Icon = o.icon
                return (
                  <div key={i} className="tips-action-card">
                    <div className="tips-action-head">
                      <Icon size={20} />
                      <h3>{o.title}</h3>
                    </div>
                    <p>{o.desc}</p>
                  </div>
                )
              })}
            </div>
          </Reveal>

          <Reveal>
            <div className="tips-cta-actions">
              <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer" className="btn btn-white btn-lg">
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
      <ProtectAccounts />
      <ScammedSteps />
      <TipsFinalCTA />
    </>
  )
}
