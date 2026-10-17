import { useLang } from "@/lib/i18n"
import { TELEGRAM_BOT_URL } from "@/lib/data"
import staySafeBg from "@/assets/Stay safe-3.png"
import stopImg from "@/assets/STOP!-1.png"
import checkImg from "@/assets/CHECK-1.png"
import protectImg from "@/assets/PROTECT-1.png"
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

const CONTAINER = "mx-auto w-full max-w-[1440px] px-[clamp(1rem,4vw,3rem)]"
const BTN =
  "inline-flex items-center justify-center gap-2 rounded-full border cursor-pointer font-semibold whitespace-nowrap transition-[background-color,box-shadow,transform] duration-[180ms] ease-out"
const BTN_LG = "px-[1.7rem] py-[0.88rem] text-[1.03rem] km:pt-[0.62rem] km:pb-[0.62rem]"
const BTN_PRIMARY = "border-transparent bg-blue-800 text-white shadow-sm hover:bg-blue-700 hover:-translate-y-px"

function TipsHero() {
  const { t } = useLang()
  return (
    <section
      className="flex flex-col justify-center bg-blue-50 bg-cover bg-center pt-[4.75rem] pb-[5.25rem] min-[1025px]:min-h-[680px]"
      id="stay-safe"
      style={{ backgroundImage: `url(${staySafeBg})` }}
    >
      <div className={`${CONTAINER} grid grid-cols-2 items-center gap-[3rem] max-[1020px]:grid-cols-1 max-[1020px]:gap-[2rem]`}>
        <div className="flex flex-col gap-[1.4rem]">
          <Reveal className="d1">
            <h1 className="text-[clamp(2rem,4.4vw,3rem)] leading-[1.12] font-bold text-white">{t({ en: "Stay Safe Online", km: "សុវត្ថិភាព​នៅ​​លើ​បណ្តាញសង្គម" })}</h1>
          </Reveal>
          <Reveal className="d2">
            <p className="text-white text-[clamp(1rem,1.6vw,1.1rem)]">
              {t({
                en: "Learn simple ways to recognize scams, protect your information, and stay safer online.",
                km: "រៀនពីវិធីសាស្ត្រក្នុងការកត់សម្គាល់ពីវិធីក្លែង​បន្លំ, ការពារ​ព័ត៌មាន​របស់​អ្នក, និង​រក្សារ​សុវត្ថិភាព​លើ​បណ្តាញសង្គម",
              })}
            </p>
          </Reveal>
          <Reveal className="d3">
            <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer" className={`${BTN} ${BTN_LG} ${BTN_PRIMARY}`}>
              <Radar size={18} />
              <span>{t({ en: "Check with Angket", km: "ពិនិត្យ​ជាមួយ Angket" })}</span>
            </a>
          </Reveal>
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
      image: stopImg,
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
      image: checkImg,
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
      image: protectImg,
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
    <section className="bg-white border-y border-[#e3e9f3]" id="stop-check-protect">
      <div className={CONTAINER}>
        <Reveal className="mb-10">
          <h2 className="text-[clamp(1.6rem,3.4vw,2.15rem)] font-bold mt-[0.9rem] mb-[0.6rem]">{t({ en: "Stop, Check, Protect", km: "ឈប់ ត្រួតពិនិត្យ ការពារ" })}</h2>
          <p className="text-[#56657f] text-[1.02rem]">
            {t({
              en: "Scams can happen to anyone. From suspicious messages, phishing links, and malicious files, scammers use different tactics to gain your trust and convince you to take action. Before you click, reply, send money, or share personal information, remember three simple steps: Stop. Check. Protect.",
              km: "ការបោកប្រាស់អាចកើតឡើងចំពោះអ្នកណាក៏បាន។ ចាប់ពីសារដែលគួរឱ្យសង្ស័យ តំណភ្ជាប់បន្លំ រហូតដល់ឯកសារដែលអាចបង្កគ្រោះថ្នាក់ អ្នកបោកប្រាស់ប្រើវិធីសាស្ត្រផ្សេងៗ ដើម្បីបង្កើតការជឿទុកចិត្ត និងបញ្ចុះបញ្ចូលអ្នកឱ្យធ្វើសកម្មភាពណាមួយ។ មុនពេលអ្នកចុច តបសារ ផ្ញើប្រាក់ ឬចែករំលែកព័ត៌មានផ្ទាល់ខ្លួន សូមចងចាំ ៣ ជំហានសាមញ្ញ៖ បញ្ឈប់ ពិនិត្យ ការពារ",
            })}
          </p>
        </Reveal>

        <div className="grid grid-cols-3 gap-[1.2rem] items-stretch max-[1020px]:grid-cols-2 max-[720px]:grid-cols-1">
          {cards.map((c, i) => {
            const Icon = c.icon
            return (
              <Reveal key={i} className="h-full">
                <article
                  className="h-full flex flex-col rounded-[20px] bg-surface border border-[#e3e9f3] border-t-[3px] border-t-transparent p-[1.5rem_1.4rem] transition-[box-shadow,transform] duration-200 hover:shadow-md hover:-translate-y-[3px]"
                  style={{ borderTopColor: c.accent }}
                >
                  {c.image && <img src={c.image} alt={c.label} className="w-full h-auto rounded-[14px] mb-4 object-contain" />}
                  <div className="flex items-center gap-3 mb-[0.9rem]">
                  <div className="w-[46px] h-[46px] rounded-[13px] grid place-items-center" style={{ background: c.accentBg }}>
                    <Icon size={26} style={{ color: c.accent }} strokeWidth={2} />
                  </div>
                  <span className="text-[1.15rem] font-bold uppercase tracking-[0.02em]" style={{ color: c.accent }}>{c.label}</span>
                </div>
                <h3 className="text-[1.15rem] mb-[0.3rem]">{c.tagline}</h3>
                  <p className="text-[#56657f] text-[0.92rem] leading-[1.55] mb-[0.8rem] min-h-[6.5rem] min-[1440px]:min-h-[4.6rem] max-[1020px]:min-h-[4.6rem] max-[720px]:min-h-0">{c.description}</p>
                  <p className="text-[0.92rem] leading-[1.55] font-semibold text-[#56657f] mt-[0.8rem] mb-[0.8rem]">{c.whatToDoLabel}</p>
                  <ul className="list-none p-0 mt-auto">
                    {c.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-[0.88rem] text-text py-[0.4rem] border-t border-[#e3e9f3] first:border-t-0">
                        <b.Icon size={16} style={{ color: c.accent }} strokeWidth={2} className="shrink-0 mt-[2px]" />
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
    <section className="bg-[linear-gradient(135deg,#0d1730,#1e40af)]" id="protect-accounts">
      <div className="text-white">
        <div className={CONTAINER}>
          <Reveal className="d1">
            <h2 className="text-white text-[clamp(1.7rem,3.6vw,2.35rem)] font-bold tracking-[-0.02em] mt-0 mb-[0.6rem]">{t({ en: "Protect your accounts", km: "ការពារ​គណនី​របស់​អ្នក" })}</h2>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-2 gap-[2.5rem] max-[1020px]:gap-[1.5rem] max-[720px]:grid-cols-1">
              <div className="flex flex-col">
                <span className="text-[1.15rem] font-bold uppercase tracking-[0.02em] mb-[0.75rem] flex items-center gap-2 text-[#34D399]">
                  <CircleCheck size={20} />
                  {t({ en: "Do", km: "ធ្វើ" })}
                </span>
                <ul>
                  {dos.map((d, i) => (
                    <li key={i} className="flex items-start gap-[0.55rem] text-[0.88rem] text-[#e5e7eb] py-[0.6rem] border-t border-[rgba(255,255,255,0.08)] first:border-t-0">
                      <CircleCheck size={16} className="shrink-0 mt-[0.12rem] text-[#34D399]" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col">
                <span className="text-[1.15rem] font-bold uppercase tracking-[0.02em] mb-[0.75rem] flex items-center gap-2 text-[#F87171]">
                  <XCircle size={20} />
                  {t({ en: "Don't", km: "កុំ" })}
                </span>
                <ul>
                  {donts.map((d, i) => (
                    <li key={i} className="flex items-start gap-[0.55rem] text-[0.88rem] text-[#e5e7eb] py-[0.6rem] border-t border-[rgba(255,255,255,0.08)] first:border-t-0">
                      <XCircle size={16} className="shrink-0 mt-[0.12rem] text-[#F87171]" />
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
    <section className="bg-white border-y border-[#e3e9f3]" id="scammed-steps">
      <div className={CONTAINER}>
        <Reveal className="mb-10">
          <h2 className="text-[clamp(1.6rem,3.4vw,2.15rem)] font-bold mt-[0.9rem] mb-[0.6rem]">
            {t({ en: "Don't panic. Act quickly.", km: "កុំភ័យខ្លាច - ចាត់វិធានការភ្លាមៗ" })}
          </h2>
          <p className="text-[#56657f] text-[1.02rem]">
            {t({
              en: "If you think you may have encountered a scam, don't panic. Acting quickly can help reduce the potential damage.",
              km: "ប្រសិនបើអ្នកគិតថាអ្នកអាចបានជួបប្រទះនឹងការបោកប្រាស់ សូមកុំភ័យខ្លាច។ ការចាត់វិធានការភ្លាមៗ អាចជួយកាត់បន្ថយការខូចខាតដែលអាចកើតមាន។",
            })}
          </p>
          <p className="text-[#56657f] text-[1.02rem]">
            {t({
              en: "Follow these five steps in order to protect yourself, secure your information, and help prevent others from becoming victims.",
              km: "ធ្វើតាមជំហានទាំងប្រាំនេះតាមលំដាប់លំដោយ ដើម្បីការពារខ្លួនអ្នក រក្សាសុវត្ថិភាពព័ត៌មាន និងជួយទប់ស្កាត់អ្នកដទៃពីការក្លាយជាជនរងគ្រោះ។",
            })}
          </p>
        </Reveal>

        <Reveal>
          <ol className="relative">
            {steps.map((s, i) => (
              <li
                key={i}
                className="relative flex gap-[1.25rem] pb-8 last:pb-0 max-[720px]:gap-[0.85rem] before:content-[''] before:absolute before:left-[19px] before:top-[40px] before:bottom-0 before:w-[2px] before:bg-[#e3e9f3] last:before:hidden"
              >
                <span className="w-10 h-10 rounded-full shrink-0 bg-blue-600 text-white grid place-items-center text-[0.82rem] font-bold font-display shadow-sm relative z-[1]">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[1.05rem] mb-[0.2rem] flex items-center gap-[0.4rem]">
                    <s.Icon size={18} />
                    {s.title}
                  </h3>
                  <p className="text-[#56657f] text-[0.92rem] leading-[1.55]">{s.desc}</p>
                  <p className="mt-[0.8rem] mb-[0.4rem] text-[0.92rem] leading-[1.55] font-semibold text-[#56657f]">{s.actionLabel}</p>
                  <ul className="list-none p-0 m-0">
                    {s.actions.map((a, j) => (
                      <li key={j} className="flex items-start gap-2 text-[0.88rem] text-text py-[0.4rem]">
                        <CircleCheck size={16} className="text-blue-600 shrink-0 mt-[0.15rem]" />
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


export function SafetyTips() {
  return (
    <>
      <TipsHero />
      <StopCheckProtect />
      <ProtectAccounts />
      <ScammedSteps />
    </>
  )
}
