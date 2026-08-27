import { useLang } from "@/lib/i18n"
import {
  AlertTriangle,
  Search,
  ShieldCheck,
  Flag,
  Lock,
  Unlock,
  CircleCheck,
  XCircle,
  Camera,
  Building2,
  Megaphone,
  MessageSquareText,
  FileText,
  Link2,
  ArrowUp,
  Radar,
} from "lucide-react"
 
// Minimal theme placeholder to avoid runtime ReferenceErrors
const T = {
  paper: "#fff",
  ink: "#000",
  inkSoft: "#666",
  angket: "#1d4ed8",
  ket2: "#1e40af",
  panel: "#fff",
  protectSoft: "#f0f9ff",
  checkSoft: "#e0f2fe",
  stopSoft: "#fee2e2",
  stop: "#ef4444",
  line: "#d1d5db",
  inkFaint: "#C9C4B6",
  paper2: "#F6F4EE",
  stopText: "#7F1D1D",
  check: "#2563EB",
  protect: "#0D9488",
  cream: "#F2EFE6",
  creamLine: "#E4DFD1",
  dark: "#17150F",
  darkCard: "#211E17",
  darkLine: "#3A3629",
  navy: "#1B2158",
  navyCard: "#262C68",
  navyLine: "#3B4290",
}
const display = ""
const mono = ""
 
// 1. Hero Section — unchanged
function Hero() {
  const { t } = useLang()
  return (
    <section className="relative overflow-hidden" style={{ background: T.paper }}>
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 py-20 px-6">
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <span className="eyebrow" style={{ color: T.inkSoft }}>
            {t({ en: "Digital & Media Literacy", km: "អក្ខរកម្មឌីជីថល និងព័ត៌មាន" })}
          </span>
          <h1
            className={`${display} text-4xl md:text-6xl font-semibold leading-[1.05]`}
            style={{ color: T.ink }}
          >
            {t({ en: "Stay Safe Online", km: "មានសុវត្ថិភាព​នៅ​​លើ​បណ្តាញ" })}
          </h1>
          <p className="text-lg max-w-md mx-auto md:mx-0" style={{ color: T.inkSoft }}>
            {t({
              en: "Learn simple ways to recognize scams, protect your information, and stay safer online.",
              km: "រៀនវិធីសាស្ត្រងាយៗក្នុងការទស្សនាវិធី​បន្លំ, ការពារ​ព័ត៌មាន​របស់​អ្នក, និង​មាន​សុវត្ថិភាព​លើ​បណ្តាញ។",
            })}
          </p>
          <a
            href="#/check"
            className={`${mono} inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm transition-colors`}
            style={{ background: T.angket, color: T.panel }}
            onMouseOver={(e) => (e.currentTarget.style.background = T.ket2)}
            onMouseOut={(e) => (e.currentTarget.style.background = T.angket)}
          >
            🔍 {t({ en: "Check with Angket", km: "ពិនិត្យ​ជាមួយ Angket" })}
          </a>
        </div>
 
        <div className="md:w-1/2 flex justify-center" aria-hidden="true">
          <svg viewBox="0 0 440 480" className="w-full max-w-95">
            <path
              d="M40 120 C10 180 30 260 90 290 C150 320 210 280 220 210 C230 140 180 70 110 70 C80 70 60 90 40 120 Z"
              fill={T.protectSoft}
              opacity="0.55"
            />
            <path
              d="M300 300 C260 340 270 400 330 420 C390 440 430 400 420 340 C410 280 350 260 300 300 Z"
              fill={T.checkSoft}
              opacity="0.6"
            />
            <path
              d="M330 34 C298 54 296 96 328 118 C360 140 402 118 402 78 C402 48 362 12 330 34 Z"
              fill={T.stopSoft}
              opacity="0.5"
            />
            <g transform="rotate(-5 220 250)">
              <rect x="130" y="60" width="190" height="380" rx="32" fill={T.panel} stroke={T.ink} strokeWidth="3" />
              <rect x="144" y="92" width="162" height="316" rx="16" fill={T.panel} stroke={T.line} strokeWidth="1" />
              <rect x="200" y="72" width="40" height="8" rx="4" fill={T.inkFaint} />
              <rect x="195" y="418" width="50" height="5" rx="2.5" fill={T.inkFaint} />
 
              <rect x="158" y="112" width="110" height="32" rx="14" fill={T.paper2} stroke={T.line} />
              <rect x="170" y="122" width="60" height="4" rx="2" fill={T.inkFaint} />
              <rect x="170" y="131" width="40" height="4" rx="2" fill={T.inkFaint} />
 
              <rect x="158" y="154" width="76" height="26" rx="13" fill={T.paper2} stroke={T.line} />
              <rect x="170" y="163" width="48" height="4" rx="2" fill={T.inkFaint} />
 
              <rect x="158" y="196" width="134" height="58" rx="16" fill={T.stopSoft} stroke={T.stop} strokeWidth="2" />
              <rect x="172" y="208" width="90" height="5" rx="2.5" fill={T.stopText} />
              <rect x="172" y="219" width="70" height="5" rx="2.5" fill={T.stopText} />
              <rect x="172" y="230" width="50" height="5" rx="2.5" fill={T.stopText} />
              <path d="M270 202 L281 220 L259 220 Z" fill={T.stop} />
              <rect x="268.5" y="207" width="3" height="6" rx="1.5" fill={T.panel} />
              <circle cx="270" cy="216.5" r="1.6" fill={T.panel} />
            </g>
 
            <circle cx="322" cy="220" r="20" fill={T.panel} stroke={T.check} strokeWidth="5" />
            <line x1="336" y1="234" x2="357" y2="255" stroke={T.check} strokeWidth="7" strokeLinecap="round" />
            <line x1="313" y1="220" x2="331" y2="220" stroke={T.check} strokeWidth="2" opacity="0.5" />
 
            <circle cx="118" cy="404" r="30" fill={T.protect} stroke={T.panel} strokeWidth="4" />
            <path
              d="M103 404 L113 414 L134 391"
              fill="none"
              stroke={T.panel}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
 
// 2. STOP • CHECK • PROTECT cards
function StopCheckProtect() {
  const { t } = useLang()
 
  const cards = [
    {
      icon: AlertTriangle,
      accent: "#E05252",
      accentBg: "#FEE2E2",
      title: t({ en: "Stop", km: "ឈប់" }),
      label: t({ en: "Don't rush.", km: "កុំរហ័ស។" }),
      description: t({
        en: "Take a moment before you respond. Urgency is the scammer's favorite tool — don't let it make the decision for you.",
        km: "ផ្អាកមួយភ្លែតមុនពេលឆ្លើយតប។ ភាពបន្ទាន់គឺជាឧបករណ៍ដែលអ្នកបោកប្រាស់ចូលចិត្តប្រើ — កុំឲ្យវាធ្វើការសម្រេចចិត្តជំនួសអ្នក។",
      }),
      bullets: [
        t({ en: "Don't rush into making a payment.", km: "កុំរហ័ស​ក្នុងការបង់ប្រាក់។" }),
        t({ en: "Don't share personal information under pressure.", km: "កុំចែករំលែក​ព័ត៌មាន​ផ្ទាល់ខ្លួន​ក្នុងភាពបន្ទាន់។" }),
        t({ en: "Give yourself time to check first.", km: "ឲ្យ​ពេលវេលា​ខ្លួន​ឯង​សម្រាប់​ពិនិត្យ​មុន។" }),
      ],
    },
    {
      icon: Search,
      accent: "#D97706",
      accentBg: "#FEF3C7",
      title: t({ en: "Check", km: "ត្រួតពិនិត្យ" }),
      label: t({ en: "Make sure it's real.", km: "ធានាវា​ពិតប្រាកដ។" }),
      description: t({
        en: "Confirm who you're dealing with, and whether the message, offer, or request is actually genuine.",
        km: "បញ្ជាក់ថាអ្នកកំពុងទាក់ទងជាមួយអ្នកណា និងថាតើសារ ការផ្តល់ជូន ឬសំណើនោះពិតប្រាកដដែរឬទេ។",
      }),
      bullets: [
        t({ en: "Check who sent the message.", km: "ពិនិត្យ​អ្នកផ្ញើ​សារ។" }),
        t({ en: "Look closely at the details.", km: "ពិនិត្យ​លម្អិត​ដោយ​ប្រុងប្រយ័ត្ន។" }),
        t({ en: "Don't automatically trust links or requests.", km: "កុំ​ជឿ​ទុកចិត្ត​តំណ​ភ្ជាប់ ឬ​សំណើ​ដោយ​ស្វ័យប្រវត្តិ។" }),
        t({ en: "Verify through an official source.", km: "ផ្ទៀងផ្ទាត់​តាម​ប្រភព​ផ្លូវការ។" }),
      ],
    },
    {
      icon: ShieldCheck,
      accent: "#0D9488",
      accentBg: "#CCFBF1",
      title: t({ en: "Protect", km: "ការពារ" }),
      label: t({ en: "Take action to stay safe.", km: "ចាត់វិធាន​ការ​ដើម្បី​សុវត្ថិភាព។" }),
      description: t({
        en: "Look after your accounts, your money, and your personal information — before and after the fact.",
        km: "ថែរក្សា​គណនី ប្រាក់ និង​ព័ត៌មាន​ផ្ទាល់ខ្លួន​របស់​អ្នក — ទាំង​មុន និង​ក្រោយ​ព្រឹត្តិការណ៍។",
      }),
      bullets: [
        t({ en: "Protect your personal information.", km: "ការពារ​ព័ត៌មាន​ផ្ទាល់ខ្លួន​របស់​អ្នក។" }),
        t({ en: "Secure your accounts.", km: "ធ្វើឲ្យ​គណនី​របស់​អ្នក​មាន​សុវត្ថិភាព។" }),
        t({ en: "If something goes wrong, act quickly.", km: "ប្រសិន​បើ​មាន​អ្វី​ខុស​ប្រក្រតី ចូរ​ចាត់វិធានការ​ភ្លាមៗ។" }),
      ],
    },
  ]
 
  return (
    <section className="py-20 px-6" style={{ background: T.cream }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">
            {t({ en: "The Framework", km: "ក្របខ័ណ្ឌ" })}
          </span>
          <h2
            className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {t({ en: "Stop. Check. Protect.", km: "ឈប់។ ត្រួតពិនិត្យ។ ការពារ។" })}
          </h2>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {t({
              en: "Three habits stand between you and most scams. None of them require special skill — just a pause, a look, and a bit of housekeeping.",
              km: "ទម្លាប់​បី​ដែល​ឈរ​ចន្លោះ​អ្នក និង​ការ​បោកប្រាស់​ភាគច្រើន។ គ្មាន​មួយ​ណា​ត្រូវការ​ជំនាញ​ពិសេស​ទេ — គ្រាន់​តែ​ការ​ផ្អាក ការ​សម្លឹង​មើល និង​ការ​រៀបចំ​បន្តិចបន្តួច។",
            })}
          </p>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c, i) => {
            const Icon = c.icon
            return (
              <article
                key={i}
                className="relative flex flex-col bg-white rounded-r-2xl overflow-hidden"
                style={{
                  border: "1px solid #E8E5DC",
                  borderLeftWidth: "4px",
                  borderLeftColor: c.accent,
                }}
              >
                <div className="p-6 flex flex-col h-full">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                    style={{ background: c.accentBg }}
                  >
                    <Icon size={26} style={{ color: c.accent }} strokeWidth={2} />
                  </div>
 
                  <span className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: c.accent }}>
                    {c.label}
                  </span>
 
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{c.title}</h3>
 
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{c.description}</p>
 
                  <div className="mt-auto space-y-0">
                    {c.bullets.map((b, j) => (
                      <div key={j}>
                        {j > 0 && <hr className="border-gray-200" />}
                        <div className="flex items-start gap-2.5 py-3 text-sm text-gray-600">
                          <span className="text-gray-400 select-none" aria-hidden="true">—</span>
                          <span>{b}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
 
// 3. Social Media & Messaging Scams
function SocialMediaScams() {
  const { t } = useLang()
 
  const flags = [
    t({ en: "Fake profiles", km: "ប្រវត្តិរូប​ក្លែងក្លាយ" }),
    t({ en: "Someone pretending to be someone you know", km: "អ្នកណា​ម្នាក់​ក្លែងធ្វើ​ជា​អ្នក​ស្គាល់" }),
    t({ en: "Suspicious offers", km: "ការ​ផ្តល់​ជូន​សង្ស័យ" }),
    t({ en: "Requests for money", km: "សំណើ​សុំ​ប្រាក់" }),
    t({ en: "Requests for personal information", km: "សំណើ​សុំ​ព័ត៌មាន​ផ្ទាល់ខ្លួន" }),
    t({ en: "Suspicious links", km: "តំណភ្ជាប់​សង្ស័យ" }),
  ]
 
  return (
    <section className="py-20 px-6" style={{ background: T.cream }}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Chat mockup */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "#E9E4D6", border: `1px solid ${T.creamLine}` }}
        >
          <div className="space-y-2 mb-3">
            <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-gray-800 shadow-sm max-w-[85%]">
              {t({
                en: "Hi! It's your cousin — I lost my phone, this is my new number 😊",
                km: "សួស្តី! ខ្ញុំ​ជា​ប្អូន​ជីដូនមួយ​របស់​អ្នក — ខ្ញុំ​បាត់​ទូរស័ព្ទ នេះ​ជា​លេខ​ថ្មី​របស់​ខ្ញុំ 😊",
              })}
            </div>
            <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-gray-800 shadow-sm max-w-[85%]">
              {t({
                en: "Can you send me $50 right now? I'll explain later, I'm in a rush",
                km: "តើ​អ្នក​អាច​ផ្ញើ​ប្រាក់ $50 ឲ្យ​ខ្ញុំ​ឥឡូវ​នេះ​បាន​ទេ? ខ្ញុំ​នឹង​ពន្យល់​នៅ​ក្រោយ ខ្ញុំ​កំពុង​ប្រញាប់",
              })}
            </div>
          </div>
 
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wide mb-4"
            style={{ background: "#FEE2E2", color: "#B91C1C", border: "1px solid #FCA5A5" }}
          >
            <Flag size={14} />
            {t({ en: "UNVERIFIED CONTACT · urgency + money request", km: "ទំនាក់ទំនង​មិន​ផ្ទៀងផ្ទាត់ · បន្ទាន់ + សុំ​ប្រាក់" })}
          </div>
 
          <div
            className="rounded-lg px-4 py-3 border-l-4"
            style={{ background: "#FDF3D9", borderLeftColor: "#D97706" }}
          >
            <p className="text-xs font-bold uppercase tracking-wide text-amber-700 mb-1">
              {t({ en: "Remember", km: "ចងចាំ" })}
            </p>
            <p className="text-sm text-gray-700">
              {t({
                en: "Don't trust a message just because it looks familiar. Verify first, through a channel the sender doesn't control.",
                km: "កុំ​ជឿ​សារ​គ្រាន់​តែ​ព្រោះ​វា​មើលទៅ​ស្គាល់។ ផ្ទៀងផ្ទាត់​ជា​មុន​សិន តាម​ឆានែល​ដែល​អ្នក​ផ្ញើ​មិន​អាច​គ្រប់គ្រង​បាន។",
              })}
            </p>
          </div>
        </div>
 
        {/* Copy + flag grid */}
        <div>
          <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">
            {t({ en: "Where It Starts", km: "កន្លែង​ដែល​វា​ចាប់ផ្តើម" })}
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {t({ en: "Social media & messaging scams", km: "ការ​បោកប្រាស់​តាម​បណ្តាញ​សង្គម និង​ការ​ផ្ញើ​សារ" })}
          </h2>
          <p className="text-gray-500 leading-relaxed mb-6">
            {t({
              en: "Scammers reach people through the same apps they use every day — a friend request, a message, a comment. Most of it is harmless. Some of it isn't.",
              km: "អ្នក​បោកប្រាស់​ចូល​ដល់​មនុស្ស​តាម​រយៈ​កម្មវិធី​ដដែល​ដែល​ពួកគេ​ប្រើ​ជា​រៀងរាល់ថ្ងៃ — សំណើ​ជា​មិត្ត សារ មតិយោបល់។ ភាគច្រើន​គ្មាន​គ្រោះថ្នាក់​ទេ ប៉ុន្តែ​ខ្លះ​ទៀត​មាន។",
            })}
          </p>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {flags.map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-2 rounded-lg px-4 py-3 text-sm text-gray-700"
                style={{ background: "#E9E4D6" }}
              >
                <Flag size={14} className="mt-0.5 shrink-0" style={{ color: "#B91C1C" }} />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
 
// 4. Protect Your Accounts
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
    <section className="py-20 px-6" style={{ background: T.cream }}>
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl p-8 md:p-12" style={{ background: T.dark }}>
          <span className="block text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#8A8577" }}>
            {t({ en: "Housekeeping", km: "ការ​ថែទាំ" })}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            {t({ en: "Protect your accounts", km: "ការពារ​គណនី​របស់​អ្នក" })}
          </h2>
          <p className="text-gray-400 mb-8">
            {t({
              en: "A few settings, kept up to date, do most of the work for you.",
              km: "ការ​កំណត់​តែ​ពីរបី ដែល​រក្សា​ទាន់សម័យ ធ្វើ​ការងារ​ភាគច្រើន​ជំនួស​អ្នក។",
            })}
          </p>
 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "#34D399" }}>
                {t({ en: "Do", km: "ធ្វើ" })}
              </span>
              <div className="mt-3">
                {dos.map((d, i) => (
                  <div key={i}>
                    {i > 0 && <hr style={{ borderColor: T.darkLine }} />}
                    <div className="flex items-start gap-2.5 py-3 text-sm text-gray-200">
                      <CircleCheck size={16} className="mt-0.5 shrink-0" style={{ color: "#34D399" }} />
                      <span>{d}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
 
            <div>
              <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "#F87171" }}>
                {t({ en: "Don't", km: "កុំ" })}
              </span>
              <div className="mt-3">
                {donts.map((d, i) => (
                  <div key={i}>
                    {i > 0 && <hr style={{ borderColor: T.darkLine }} />}
                    <div className="flex items-start gap-2.5 py-3 text-sm text-gray-200">
                      <XCircle size={16} className="mt-0.5 shrink-0" style={{ color: "#F87171" }} />
                      <span>{d}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
 
          <hr className="my-6" style={{ borderColor: T.darkLine }} />
 
          <div className="flex items-center gap-2 text-xs" style={{ color: "#8A8577" }}>
            <Lock size={14} />
            <span className="font-mono">
              {t({
                en: "Your password and security codes are private — no legitimate service will ever ask you for them.",
                km: "ពាក្យសម្ងាត់ និង​កូដ​សុវត្ថិភាព​របស់​អ្នក​គឺ​ជា​ការសម្ងាត់ — គ្មាន​សេវាកម្ម​ស្របច្បាប់​ណា​នឹង​សុំ​ព័ត៌មាន​នេះ​ពី​អ្នក​ទេ។",
              })}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
 
// 5. Technology & Fake Content
function TechFakeContent() {
  const { t } = useLang()
 
  const pills = [
    { color: "#E05252", label: t({ en: "Stop – don't rush", km: "ឈប់ – កុំរហ័ស" }) },
    { color: "#D97706", label: t({ en: "Check – verify the information", km: "ត្រួតពិនិត្យ – ផ្ទៀងផ្ទាត់​ព័ត៌មាន" }) },
    { color: "#0D9488", label: t({ en: "Protect – don't share sensitive information", km: "ការពារ – កុំ​ចែករំលែក​ព័ត៌មាន​រសើប" }) },
  ]
 
  return (
    <section className="py-20 px-6" style={{ background: T.cream }}>
      <div className="max-w-3xl mx-auto">
        <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">
          {t({ en: "A Newer Problem", km: "បញ្ហា​ថ្មី​មួយ" })}
        </span>
        <h2
          className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {t({ en: "Technology can make scams look real", km: "បច្ចេកវិទ្យា​អាច​ធ្វើ​ឲ្យ​ការ​បោកប្រាស់​មើលទៅ​ដូច​ជា​ពិត" })}
        </h2>
        <p className="text-gray-500 leading-relaxed mb-8">
          {t({
            en: "Messages, profiles, websites, and images can all be made to look convincing with today's tools.",
            km: "សារ ប្រវត្តិរូប វេបសាយ និង​រូបភាព​ទាំងអស់​អាច​ត្រូវ​បាន​ធ្វើ​ឲ្យ​មើលទៅ​គួរ​ឲ្យ​ជឿ​ជាមួយ​ឧបករណ៍​សព្វថ្ងៃ។",
          })}{" "}
          <strong className="text-gray-900">
            {t({ en: "Don't trust something just because it looks real.", km: "កុំ​ជឿ​អ្វី​មួយ​គ្រាន់​តែ​ព្រោះ​វា​មើលទៅ​ដូច​ជា​ពិត។" })}
          </strong>{" "}
          {t({ en: "The same three habits still apply:", km: "ទម្លាប់​បី​ដដែល​នៅ​តែ​អនុវត្ត៖" })}
        </p>
 
        <div className="flex flex-col sm:flex-row gap-3">
          {pills.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-full px-5 py-3 text-sm font-mono"
              style={{ background: "#fff", border: `1px solid ${T.creamLine}`, color: "#374151" }}
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
              {p.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
 
// 6. What To Do If You Get Scammed
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
    <section className="py-20 px-6" style={{ background: T.cream }}>
      <div className="max-w-2xl mx-auto">
        <h2
          className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {t({ en: "Don't panic. Act quickly.", km: "កុំ​ភ័យខ្លាច។ ចាត់វិធានការ​ភ្លាមៗ។" })}
        </h2>
        <p className="text-gray-500 leading-relaxed mb-10">
          {t({
            en: "Work through these five steps in order — each one limits the damage the next might otherwise do.",
            km: "ធ្វើ​តាម​ជំហាន​ទាំង​ប្រាំ​នេះ​តាម​លំដាប់ — នីមួយៗ​កាត់​បន្ថយ​ការ​ខូចខាត​ដែល​ជំហាន​បន្ទាប់​អាច​ធ្វើ​ឲ្យ​កាន់​តែ​អាក្រក់​ទៅ​ទៀត។",
          })}
        </p>
 
        <ol className="relative">
          {steps.map((s, i) => (
            <li key={i} className="relative flex gap-5 pb-10 last:pb-0">
              {i < steps.length - 1 && (
                <span
                  className="absolute left-[23px] top-12 bottom-0 w-px"
                  style={{ background: T.creamLine }}
                  aria-hidden="true"
                />
              )}
              <div
                className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ background: T.navy }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="pt-1.5">
                <h3 className="flex items-center gap-2 font-bold text-gray-900 text-lg mb-1">
                  <span aria-hidden="true">{s.icon}</span>
                  {s.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
 
// 7. Final CTA
function FinalCTA() {
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
    <section className="py-20 px-6" style={{ background: T.cream }}>
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl p-8 md:p-14 text-center" style={{ background: T.navy }}>
          <span className="block text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: "#8B90C4" }}>
            {t({ en: "Not Sure? Ask Before You Act", km: "មិន​ប្រាកដ? សួរ​មុន​ពេល​អ្នក​ធ្វើ" })}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            {t({ en: "Something looks suspicious?", km: "មាន​អ្វី​មួយ​មើលទៅ​សង្ស័យ?" })}
          </h2>
          <p className="max-w-xl mx-auto mb-10" style={{ color: "#C7CAE8" }}>
            {t({
              en: "Don't guess — check it. Send suspicious content to Angket and get help understanding the risk, in plain terms.",
              km: "កុំ​ទាយ — ពិនិត្យ​វា។ ផ្ញើ​មាតិកា​សង្ស័យ​ទៅ Angket ដើម្បី​ទទួល​បាន​ជំនួយ​ក្នុង​ការ​យល់​ពី​ហានិភ័យ​ជា​ភាសា​ធម្មតា។",
            })}
          </p>
 
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
            {options.map((o, i) => {
              const Icon = o.icon
              return (
                <div
                  key={i}
                  className="rounded-xl p-5"
                  style={{ background: T.navyCard, border: `1px solid ${T.navyLine}` }}
                >
                  <Icon size={20} style={{ color: "#A5AAE0" }} className="mb-3" />
                  <h3 className="text-white font-semibold mb-1">{o.title}</h3>
                  <p className="text-sm" style={{ color: "#9DA1CC" }}>
                    {o.desc}
                  </p>
                </div>
              )
            })}
          </div>
 
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#/check"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium bg-white text-gray-900"
            >
              <Radar size={16} style={{ color: T.angket }} />
              {t({ en: "Check with Angket", km: "ពិនិត្យ​ជាមួយ Angket" })}
            </a>
            <a
              href="#/safety-tips"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white"
              style={{ border: "1px solid #4A50A0" }}
            >
              {t({ en: "Back to the basics", km: "ត្រឡប់​ទៅ​មូលដ្ឋាន" })}
              <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
 
export function SafetyTips() {
  return (
    <>
      <Hero />
      <StopCheckProtect />
      <SocialMediaScams />
      <ProtectAccounts />
      <TechFakeContent />
      <ScammedSteps />
      <FinalCTA />
    </>
  )
}