// Placeholder bot link — swap for the real one before launch.
export const TELEGRAM_BOT_URL = "https://t.me/AngketBot"

export const NAV_LINKS = [
  { href: "/", en: "Home", km: "ទំព័រដើម" },
  { href: "/report", en: "Scam Report", km: "រាយការណ៍ការបោកប្រាស់" },
  { href: "/safety-tips", en: "Stay Safe Online", km: "គន្លឹះសុវត្ថិភាព" },
  { href: "/how-it-works", en: "Learn How It Works", km: "ស្វែងយល់ពីរបៀបដំណើរការ" },
  { href: "/about", en: "About Us", km: "អំពីយើង" },
]

export const SCAM_TYPES = [
  { value: "fake-job", en: "Fake Job", km: "ការងារក្លែងក្លាយ" },
  { value: "investment", en: "Investment Scam", km: "ការវិនិយោគក្លែងក្លាយ" },
  { value: "prize", en: "Prize / Giveaway", km: "រង្វាន់ក្លែងក្លាយ" },
  { value: "phishing", en: "Phishing", km: "ការបញ្ឆោតយកព័ត៌មាន" },
  { value: "fake-seller", en: "Fake Seller", km: "អ្នកលក់ក្លែងក្លាយ" },
  { value: "impersonation", en: "Impersonation", km: "ការក្លែងបន្លំអត្តសញ្ញាណ" },
]

export const SCAM_CHANNELS = [
  { value: "message", en: "Message / Text", km: "សារ / អត្ថបទ" },
  { value: "file", en: "File", km: "ឯកសារ" },
  { value: "link", en: "Link URL", km: "តំណ URL" },
]

export const IN_PICTURE_TYPES = [
  { value: "fake-opportunity", en: "Fake opportunity", km: "ឱកាសក្លែងក្លាយ" },
  { value: "investment", en: "Investment", km: "ការវិនិយោគក្លែងក្លាយ" },
  { value: "salary-check", en: "Salary checking in file", km: "ពិនិត្យប្រាក់ខែក្នុងឯកសារ" },
  { value: "lottery-prize", en: "Lottery / Prize", km: "ឆ្នោត / រង្វាន់ក្លែងក្លាយ" },
  { value: "impersonation", en: "Impersonation", km: "ការក្លែងបន្លំអត្តសញ្ញាណ" },
]

export const TYPE_LABELS = Object.fromEntries(SCAM_TYPES.map((x) => [x.value, x]))

const DAY = 24 * 60 * 60 * 1000
const now = Date.now()

// Local SVG placeholder used only for demo screenshots — no network, no real files.
// Each scene is a small "phone screen" illustration themed to the report's context:
// a platform-colored header, a central category icon, message bars, and a warn badge.
function scene({ header = "#229ED9", ink = "#1e293b", bars = ["#cbd5e1", "#94a3b8"], badge = "#ef4444", icon = "chat" }) {
  const sh =
    '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200" viewBox="0 0 320 200" font-family="Inter, system-ui, sans-serif">' +
    '<rect width="320" height="200" fill="#eef2f7"/>' +
    '<rect x="14" y="12" width="292" height="176" rx="16" fill="#ffffff"/>' +
    '<rect x="14" y="12" width="292" height="34" rx="16" fill="' + header + '"/>' +
    '<rect x="14" y="30" width="292" height="16" fill="' + header + '"/>' +
    '<circle cx="42" cy="29" r="9" fill="rgba(255,255,255,0.35)"/>' +
    '<rect x="58" y="22" width="74" height="7" rx="3.5" fill="rgba(255,255,255,0.7)"/>' +
    '<rect x="58" y="32" width="46" height="5" rx="2.5" fill="rgba(255,255,255,0.45)"/>' +
    iconShape(icon, ink) +
    '<circle cx="286" cy="27" r="7" fill="#ef4444"/>' +
    '<rect x="30" y="118" width="168" height="9" rx="4.5" fill="' + bars[0] + '"/>' +
    '<rect x="30" y="136" width="132" height="9" rx="4.5" fill="' + bars[0] + '"/>' +
    '<rect x="150" y="154" width="140" height="12" rx="6" fill="' + ink + '" opacity="0.12"/>' +
    '<rect x="30" y="154" width="90" height="12" rx="6" fill="' + badge + '" opacity="0.85"/>' +
    '</svg>'
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(sh)}`
}

function iconShape(icon, color) {
  switch (icon) {
    case "money":
      return '<g fill="' + color + '" opacity="0.9"><circle cx="140" cy="82" r="24" fill="none" stroke="' + color + '" stroke-width="4"/><circle cx="140" cy="82" r="10" fill="' + color + '"/><rect x="118" y="72" width="44" height="4" rx="2"/><rect x="118" y="90" width="44" height="4" rx="2"/></g>'
    case "chart":
      return '<path d="M108 92 L126 74 L142 88 L168 60" fill="none" stroke="' + color + '" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><rect x="118" y="40" width="6" height="14" rx="3" fill="' + color + '"/>'
    case "gift":
      return '<g fill="' + color + '" opacity="0.9"><rect x="120" y="78" width="40" height="26" rx="5"/><rect x="136" y="62" width="8" height="46" rx="4" fill="#fff"/><path d="M132 68c-3-8-14-10-14-2 0 8 14 8 14 2zm16 0c3-8 14-10 14-2 0 8-14 8-14 2z" fill="#fff" opacity="0.85"/></g>'
    case "mail":
      return '<g fill="' + color + '" opacity="0.9"><rect x="112" y="66" width="56" height="34" rx="6"/><path d="M112 72l28 16 28-16" fill="none" stroke="#fff" stroke-width="4"/></g>'
    case "shop":
      return '<g fill="' + color + '" opacity="0.9"><path d="M118 88l6-22h32l6 22z"/><circle cx="126" cy="98" r="4"/><circle cx="146" cy="98" r="4"/><path d="M128 66c0-6 3-9 8-9s8 3 8 9" fill="none" stroke="' + color + '" stroke-width="4"/></g>'
    case "mask":
      return '<g fill="' + color + '" opacity="0.9"><circle cx="140" cy="78" r="20"/><rect x="124" y="90" width="32" height="10" rx="5"/></g>'
    case "passport":
      return '<g fill="' + color + '" opacity="0.9"><rect x="112" y="64" width="56" height="40" rx="6"/><circle cx="132" cy="78" r="9"/><rect x="116" y="94" width="48" height="4" rx="2"/><circle cx="160" cy="74" r="4" fill="#fff" opacity="0.7"/></g>'
    default:
      return '<circle cx="140" cy="82" r="26" fill="' + color + '" opacity="0.8"/><path d="M132 92V76l8-6 8 6v16l-8 6z" fill="#fff" opacity="0.85"/>'
  }
}

export const DEMO_REPORTS = [
  {
    id: 1,
    cat: "fake-job",
    platform: "Telegram",
    count: 34,
    ts: now - 2 * DAY,
    image: scene({ header: "#229ED9", icon: "money" }),
    when: { en: "2 days ago", km: "2 ថ្ងៃមុន" },
    title: { en: "Data-entry job asking for a “registration fee”", km: "ការងារសរសេរទិន្នន័យ ដែលសុំ «ថ្លៃចុះឈ្មោះ»" },
    desc: {
      en: "Someone offered me an online data-entry job paying $50 per day. Before I could start, they asked for a $30 “registration fee”. A real job never asks you to pay first.",
      km: "មានគេផ្ដល់ការងារសរសេរទិន្នន័យតាមអ៊ីនធឺណិតឲ្យខ្ញុំ ថ្ងៃមួយ 50 ដុល្លារ។ មុនពេលចាប់ផ្ដើមធ្វើការ ពួកគេសុំ «ថ្លៃចុះឈ្មោះ» 30 ដុល្លារ។ ការងារពិតមិនដែលសុំឱ្យបង់ប្រាក់មុនទេ។",
    },
  },
  {
    id: 2,
    cat: "prize",
    platform: "Facebook",
    count: 21,
    ts: now - 3 * DAY,
    image: scene({ header: "#1877F2", icon: "gift", badge: "#eab308" }),
    when: { en: "3 days ago", km: "3 ថ្ងៃមុន" },
    title: { en: "You won! Just pay the delivery fee…", km: "អ្នកឈ្នះរង្វាន់! គ្រាន់តែបង់ថ្លៃដឹកជញ្ជូន…" },
    desc: {
      en: "A page said I won a lottery I never entered. To claim it, I had to pay a “delivery fee” through a link that looked almost identical to a real courier website.",
      km: "ទំព័រមួយប្រាប់ថាខ្ញុំជាប់ឆ្នោតដែលខ្ញុំមិនបានចូលរួម។ ដើម្បីទទួលរង្វាន់ ខ្ញុំត្រូវបង់ «ថ្លៃដឹកជញ្ជូន» តាមតំណមួយដែលមើលទៅស្ទើរតែដូចគេហទំព័រដឹកជញ្ជូនពិត។",
    },
  },
  {
    id: 3,
    cat: "investment",
    platform: "Facebook",
    count: 27,
    ts: now - 5 * DAY,
    image: scene({ header: "#1877F2", icon: "chart" }),
    when: { en: "5 days ago", km: "5 ថ្ងៃមុន" },
    title: { en: "Trading group froze my account", km: "ក្រុមវិនិយោគបានបិទគណនីខ្ញុំ" },
    desc: {
      en: "A “trading mentor” posted daily profit screenshots and invited me into a group. My first small withdrawal worked, but after I invested more, my account was frozen and they disappeared.",
      km: "«គ្រូវិនិយោគ»ម្នាក់បានផ្សាយរូបភាពចំណេញប្រចាំថ្ងៃ ហើយអញ្ជើញខ្ញុំចូលក្រុម។ ការដកប្រាក់តូចលើកដំបូងធ្វើបាន ប៉ុន្តែពេលខ្ញុំវិនិយោគបន្ថែម គណនីរបស់ខ្ញុំត្រូវបានបិទ ហើយពួកគេបានបាត់ខ្លួនទៅវិញ។",
    },
  },
  {
    id: 4,
    cat: "phishing",
    platform: "SMS",
    count: 18,
    ts: now - 7 * DAY,
    image: scene({ header: "#64748b", icon: "mail", badge: "#dc2626" }),
    when: { en: "1 week ago", km: "1 សប្ដាហ៍មុន" },
    title: { en: "Fake bank security alert", km: "ការជូនដំណឹងសុវត្ថិភាពធនាគារក្លែងក្លាយ" },
    desc: {
      en: "An SMS claimed my bank account would be suspended and told me to “verify” it on a link. The site copied my bank’s logo and asked for my password and OTP.",
      km: "សារ SMS ប្រាប់ថាគណនីធនាគារខ្ញុំនឹងត្រូវបិទ ហើយឲ្យ «ផ្ទៀងផ្ទាត់» តាមតំណមួយ។ គេហទំព័រនោះចម្លងសញ្ញាសម្គាល់របស់ធនាគារខ្ញុំ ហើយសុំពាក្យសម្ងាត់ និងលេខកូដ OTP របស់ខ្ញុំ។",
    },
  },
  {
    id: 5,
    cat: "fake-seller",
    platform: "TikTok",
    count: 15,
    ts: now - 8 * DAY,
    image: scene({ header: "#0f172a", icon: "shop" }),
    when: { en: "1 week ago", km: "1 សប្ដាហ៍មុន" },
    title: { en: "Seller vanished after payment", km: "អ្នកលក់បានបាត់ខ្លួនបន្ទាប់ពីទទួលប្រាក់" },
    desc: {
      en: "I paid for sneakers after seeing their videos. The next day the account deleted every post and blocked me.",
      km: "ខ្ញុំបង់ប្រាក់ទិញស្បែកជើង បន្ទាប់ពីមើលវីដេអូរបស់ពួកគេ។ ថ្ងៃបន្ទាប់ គណនីបានលុបការផ្សាយទាំងអស់ ហើយបាន block ខ្ញុំ។",
    },
  },
  {
    id: 6,
    cat: "impersonation",
    platform: "WhatsApp",
    count: 12,
    ts: now - 14 * DAY,
    image: scene({ header: "#25D366", icon: "mask" }),
    when: { en: "2 weeks ago", km: "2 សប្ដាហ៍មុន" },
    title: { en: "My friend’s photo, someone else’s words", km: "រូបភាពមិត្តខ្ញុំ តែពាក្យសម្ដីរបស់អ្នកដទៃ" },
    desc: {
      en: "Someone used my friend’s profile photo, saying he lost his phone and urgently needed money. I called the real friend and found out it was fake.",
      km: "មានគេប្រើរូបភាពរបស់មិត្តខ្ញុំ ដោយអះអាងថាបានបាត់ទូរស័ព្ទ ហើយត្រូវការប្រាក់ជាបន្ទាន់។ ខ្ញុំហៅសួរមិត្តពិត ទើបដឹងថាវាជាការក្លែងក្លាយ។",
    },
  },
  {
    id: 7,
    cat: "fake-job",
    platform: "Telegram",
    count: 31,
    ts: now - 13 * DAY,
    image: scene({ header: "#229ED9", icon: "passport", badge: "#ef4444" }),
    when: { en: "2 weeks ago", km: "2 សប្ដាហ៍មុន" },
    title: { en: "“High salary, no experience” job abroad", km: "ការងារ «ប្រាក់ខែខ្ពស់ មិនត្រូវការបទពិសោធន៍» នៅបរទេស" },
    desc: {
      en: "They promised a high-paid job overseas with free accommodation, then asked for “visa processing” fees. After I paid, they stopped replying.",
      km: "ពួកគេសន្យាការងារចំណូលខ្ពស់នៅបរទេស ជាមួយទីស្នាក់ការឥតគិតថ្លៃ បន្ទាប់មកសុំ «ថ្លៃវីសា»។ បន្ទាប់ពីខ្ញុំបង់ ពួកគេឈប់ឆ្លើយតប។",
    },
  },
  {
    id: 8,
    cat: "prize",
    platform: "Instagram",
    count: 20,
    ts: now - 21 * DAY,
    image: scene({ header: "#E1306C", icon: "gift", badge: "#eab308" }),
    when: { en: "3 weeks ago", km: "3 សប្ដាហ៍មុន" },
    title: { en: "Lucky draw from a group I never joined", km: "ឆ្នោតពីក្រុមដែលខ្ញុំមិនបានចូលរួម" },
    desc: {
      en: "I was added to a group announcing that I won a lucky draw. To release the prize, I had to send a “tax deposit” in cryptocurrency first.",
      km: "ខ្ញុំត្រូវបានបន្ថែមចូលក្រុមមួយដែលប្រកាសថាខ្ញុំជាប់ឆ្នោត។ ដើម្បីទទួលរង្វាន់ ខ្ញុំត្រូវផ្ញើ «ថ្លៃពន្ធ» ជារូបិយប័ណ្ណគ្រិបតូជាមុនសិន។",
    },
  },
]

export const INFO_PAGES = {
  privacy: {
    title: { en: "Privacy Policy", km: "គោលការណ៍ឯកជនភាព" },
    body: {
      en: "This is placeholder content for the demo. The full policy will be published before launch. In short: Angket never asks for passwords or payment details, and community reports are shared anonymously by default.",
      km: "នេះជាអត្ថបទគំរូសម្រាប់ការបង្ហាញប៉ុណ្ណោះ។ ឯកសារពេញលេញនឹងផ្សាយមុនពេលចេញផ្សាយពិតប្រាកដ។ ជាសេចក្ដីសង្ខេប៖ Angket មិនដែលសុំពាក្យសម្ងាត់ ឬព័ត៌មានទូទាត់ទេ ហើយរបាយការណ៍ពីសហគមន៍គឺជាអនាមិកតាមលំនាំដើម។",
    },
  },
  terms: {
    title: { en: "Terms of Use", km: "លក្ខខណ្ឌនៃការប្រើប្រាស់" },
    body: {
      en: "This is placeholder content for the demo. The full terms will be published before launch. Angket provides estimated risk assessments only — it is not a guarantee, and users remain responsible for verifying important information through official sources.",
      km: "នេះជាអត្ថបទគំរូសម្រាប់ការបង្ហាញប៉ុណ្ណោះ។ លក្ខខណ្ឌពេញលេញនឹងផ្សាយមុនពេលចេញផ្សាយពិតប្រាកដ។ Angket ផ្ដល់តែការប៉ាន់ស្មានហានិភ័យប៉ុណ្ណោះ — មិនមែនជាការធានាទេ ហើយអ្នកប្រើប្រាស់មានតួនាទីផ្ទៀងផ្ទាត់ព័ត៌មានសំខាន់ៗតាមប្រភពផ្លូវការ។",
    },
  },
}
