import { useEffect, useMemo, useState, useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import ScamReportHero from "@/assets/Scam-Report-hero.png"
import { useLang } from "@/lib/i18n"
import { useAuth } from "@/lib/auth"
import { rememberAuthOrigin } from "@/lib/authBack"
import { SCAM_TYPES, TYPE_LABELS } from "@/lib/data"
import { reportsApi } from "@/lib/services"
import { User } from "lucide-react"
import { ReportForm } from "./report-form"
import {
  IconGlobe, IconFacebook, IconTelegram, IconWhatsApp,
  IconTikTok, IconInstagram, IconSms, IconSearch,
  IconPlus, IconSave, IconShield, IconCheck, IconInfo,
  IconBriefcase, IconGift, IconStore, IconChart, IconMail,
  IconWarning, IconArrowRight, IconUser, IconClose,
} from "./icons"

const CONTAINER = "mx-auto w-full max-w-[1440px] px-[clamp(1rem,4vw,3rem)]"
const BADGE = "rounded-full px-[0.8rem] py-[0.32rem] text-[0.7rem] font-bold tracking-[0.02em] text-white shadow-[0_6px_14px_rgba(15,23,42,0.18)]"
const SKEL = "bg-[linear-gradient(90deg,var(--border)_25%,#eef1f7_37%,var(--border)_63%)] bg-[length:800px_100%] animate-[shimmer_1.5s_ease-in-out_infinite]"

function normalize(report) {
  return {
    id: report.id,
    cat: report.category,
    platform: report.platform,
    count: report.reported_count || 0,
    ts: report.created_at ? parseServerDate(report.created_at).getTime() : 0,
    image: report.screenshot_url || null,
    when: { en: timeAgo(report.created_at), km: timeAgo(report.created_at) },
    title: { en: report.title_en, km: report.title_km || report.title_en },
    desc: { en: report.description_en, km: report.description_km || report.description_en },
    user_id: report.user_id,
    status: report.status,
    is_anonymous: report.is_anonymous ?? false,
    display_name: report.display_name || null,
    display_avatar_seed: report.display_avatar_seed || null,
    author_name: report.author_name || null,
    author_avatar_url: report.author_avatar_url || null,
  }
}

function aliasInitials(name) {
  return String(name || "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("")
}

function formatDate(date) {
  const dd = String(date.getDate()).padStart(2, "0")
  const mm = String(date.getMonth() + 1).padStart(2, "0")
  const yy = String(date.getFullYear()).slice(-2)
  const hh = String(date.getHours()).padStart(2, "0")
  const min = String(date.getMinutes()).padStart(2, "0")
  return `${dd}/${mm}/${yy} ${hh}:${min}`
}

// Postgres timestamps without a timezone come back with no "Z"/offset; treat them as UTC.
function parseServerDate(value) {
  if (!value) return new Date(NaN)
  if (typeof value === "string" && !/[zZ]|[+-]\d{2}:?\d{2}$/.test(value)) {
    return new Date(`${value}Z`)
  }
  return new Date(value)
}

function timeAgo(iso) {
  if (!iso) return ""
  const date = parseServerDate(iso)
  const diffMs = Date.now() - date.getTime()
  const minutes = Math.floor(diffMs / (60 * 1000))
  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes} min${minutes === 1 ? "" : "s"} ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return "1 day ago"
  if (days < 7) return `${days} days ago`
  return formatDate(date)
}

const PLATFORM_ICONS = {
  facebook: IconFacebook,
  telegram: IconTelegram,
  whatsapp: IconWhatsApp,
  tiktok: IconTikTok,
  instagram: IconInstagram,
  sms: IconSms,
  email: IconMail,
  "telephone call": IconSms,
  other: IconGlobe,
}

const PLATFORM_COLORS = {
  facebook: "#1877F2",
  telegram: "#229ED9",
  whatsapp: "#25D366",
  tiktok: "#010101",
  instagram: "#E1306C",
  sms: "#2563EB",
  email: "#EA4335",
  "telephone call": "#2563EB",
  other: "#6b7280",
}

function PlatformIcon({ name }) {
  const key = (name || "").toLowerCase()
  const Icon = PLATFORM_ICONS[key] ?? IconGlobe
  return <Icon style={{ width: 15, height: 15, ...(PLATFORM_ICONS[key] ? { color: PLATFORM_COLORS[key] } : {}) }} />
}

const CATEGORY_META = {
  "fake-job": {
    icon: IconBriefcase,
    desc: {
      en: "Recognize job offers designed to take your money, not give you work.",
      km: "ស្គាល់ការផ្ដល់ការងារដែលរៀបចំដើម្បីយកលុយរបស់អ្នក មិនមែនឱ្យអ្នកធ្វើការទេ។",
    },
  },
  investment: {
    icon: IconChart,
    desc: {
      en: "Spot fake trading schemes and guaranteed-return promises before you invest.",
      km: "ស្គាល់ក្រុមវិនិយោគក្លែងក្លាយ និងការសន្យាផ្ដល់ការត្រឡប់មកវិញ។",
    },
  },
  prize: {
    icon: IconGift,
    desc: {
      en: "Free prizes are never free — learn how giveaway scams trick you.",
      km: "រង្វាន់ឥតគិតថ្លៃមិនដែលឥតគិតថ្លៃទេ — ស្វែងយល់ពីរបៀបបោកប្រាស់រង្វាន់។",
    },
  },
  phishing: {
    icon: IconMail,
    desc: {
      en: "Protect your passwords and personal data from fake emails and messages.",
      km: "ការពារពាក្យសម្ងាត់ និងទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នកពីអ៊ីមែល និងសារក្លែងក្លាយ។",
    },
  },
  "fake-seller": {
    icon: IconStore,
    desc: {
      en: "Verify online sellers before paying — disappearing storefronts are a red flag.",
      km: "ផ្ទៀងផ្ទាត់អ្នកលក់តាមអ៊ីនធឺណិតមុនពេលបង់ប្រាក់។",
    },
  },
  impersonation: {
    icon: IconShield,
    desc: {
      en: "Scammers pretend to be people you trust — always verify through another channel.",
      km: "ក្រុមបោកប្រាស់ក្លែងធ្វើជាអ្នកដែលអ្នកជឿជាក់។",
    },
  },
}

// Category badge colors shared across hero, filters, cards and detail page.
const CATEGORY_BADGES = {
  "fake-job": "#ef4444",
  investment: "#f59e0b",
  prize: "#16a34a",
  phishing: "#8b5cf6",
  "fake-seller": "#ec4899",
  impersonation: "#2563eb",
}

const HERO_AVATARS = [
  { initials: "SB", bg: "#3b82f6" },
  { initials: "KK", bg: "#f97316" },
  { initials: "JD", bg: "#8b5cf6" },
  { initials: "MN", bg: "#10b981" },
]

function avatarColor(name) {
  const s = String(name || "")
  let h = 0
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) % 360
  return `hsl(${h} 65% 52%)`
}

function catLabel(cat, lang) {
  const meta = TYPE_LABELS[cat]
  if (!meta) return cat
  return lang === "km" ? meta.km : meta.en
}

function placeholderHeader(cat, lang) {
  const meta = CATEGORY_META[cat]
  const Icon = meta?.icon ?? IconInfo
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-ink">
      <span className="grid h-14 w-14 place-items-center rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] opacity-90"><Icon className="text-[rgba(255,255,255,0.75)]" style={{ width: 28, height: 28 }} /></span>
      <span className="text-[0.72rem] font-bold uppercase tracking-[0.06em] text-[rgba(255,255,255,0.5)]">{catLabel(cat, lang)}</span>
    </div>
  )
}

function ReportsHero() {
  const { t } = useLang()
  return (
    <section className="relative flex flex-col justify-center overflow-hidden border-b border-[#e3e9f3] bg-blue-50 bg-cover bg-center pb-[5.25rem] pt-[4.75rem]" id="reports" aria-labelledby="reports-title" style={{ backgroundImage: `url(${ScamReportHero})` }}>
      <div className={`${CONTAINER} grid grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-center gap-[3rem] max-[1024px]:grid-cols-1 max-[1024px]:gap-[2.4rem]`}>
        <div className="grid animate-[rp-hero-copy-in_0.7s_ease_both] justify-items-start gap-[1.15rem]">
          <h1 id="reports-title" className="m-0 animate-[rp-hero-title-in_0.8s_ease_both] text-[clamp(2.3rem,4.6vw,3.3rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white max-[640px]:text-[clamp(2rem,8vw,2.6rem)]">
            <span className="block">{t({ en: "Learn From", km: "ស្វែងយល់ពី" })}</span>
            <span className="block text-blue-600">{t({ en: "Scam Reports", km: "របាយការណ៍ការបោកប្រាស់" })}</span>
          </h1>
          <p className="m-0 max-w-none animate-[rp-hero-body-in_0.9s_ease_both] text-[1.06rem] leading-[1.7] text-white">
            {t({
              en: "See real examples from our community. Discover how scams work, what to watch for, and how others stayed safe.",
              km: "មើលឧទាហរណ៍ពិតពីសហគមន៍របស់យើង។ ស្វែងយល់ពីរបៀបដែលការបោកប្រាស់ដំណើរការ អ្វីដែលត្រូវប្រុងប្រយ័ត្ន និងរបៀបដែលអ្នកដទៃរក្សាសុវត្ថិភាព។",
            })}
          </p>
        </div>

        <div className="relative min-h-[430px] max-[1024px]:h-[330px] max-[1024px]:min-h-0 max-[640px]:h-[300px]" aria-hidden="true">
          <span className="absolute -top-1 right-[3%] z-[2] grid rotate-[-4deg] animate-[rp-script-float_5s_ease-in-out_infinite] gap-[0.1rem] font-['Caveat','Segoe_Script','Comic_Sans_MS',cursive] text-[1.7rem] leading-[1.05] text-[#3b82f6] max-[640px]:text-[1.35rem]">
            <span>See it.</span>
            <span>Learn it.</span>
            <span>Avoid it.</span>
            <svg className="mt-[0.2rem] w-[104px] text-[#60a5fa] opacity-85" viewBox="0 0 120 18" fill="none">
              <path d="M4 13C32 4 72 3 114 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  )
}

function ReportCard({ r, lang, saved, onToggleSave, onSeeMore }) {
  const { t } = useLang()
  const badgeStyle = CATEGORY_BADGES[r.cat] ? { background: CATEGORY_BADGES[r.cat] } : undefined
  return (
    <article className="group flex flex-col overflow-hidden rounded-[18px] border border-[#e3e9f3] bg-white shadow-sm transition-[box-shadow,transform] duration-[200ms] ease hover:-translate-y-1 hover:shadow-lg">
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#f1f5f9_0%,#e2e8f0_100%)]">
        {r.image ? (
          <img className="block h-full w-full object-contain object-center transition-transform duration-[350ms] ease group-hover:scale-[1.03]" src={r.image} alt="" loading="lazy" />
        ) : (
          placeholderHeader(r.cat, lang)
        )}
        <span className={`absolute left-3 top-3 z-[1] ${BADGE}`} style={badgeStyle}>
          {catLabel(r.cat, lang)}
        </span>
        <button
          type="button"
          className={`absolute right-3 top-3 z-[1] grid h-[34px] w-[34px] cursor-pointer place-items-center rounded-full border-0 bg-[rgba(15,23,42,0.5)] text-white transition-[transform,background] duration-150 hover:bg-[rgba(15,23,42,0.7)] hover:[transform:scale(1.08)] ${saved ? "text-blue-300" : ""}`}
          aria-label={saved
            ? t({ en: "Unsave report", km: "ដកចេញពីការរក្សាទុក" })
            : t({ en: "Save report", km: "រក្សាទុករបាយការណ៍" })}
          onClick={(e) => { e.stopPropagation(); onToggleSave(r.id) }}
        >
          <IconSave filled={saved} style={{ width: 17, height: 17 }} />
        </button>
        {r.label && <span className="absolute bottom-3 left-3 z-[1] rounded-full border border-[#e3e9f3] bg-white px-[0.7rem] py-[0.3rem] text-[0.7rem] font-bold text-blue-700 shadow-[0_6px_14px_rgba(15,23,42,0.12)]">{r.label}</span>}
      </div>

      <div className="flex flex-1 flex-col gap-[0.6rem] p-[1.25rem_1.3rem_1.35rem]">
        <div className="flex items-center gap-[0.55rem]">
          <span className={`relative grid h-[30px] w-[30px] flex-none place-items-center overflow-hidden rounded-full text-[0.72rem] font-bold text-white ${r.is_anonymous ? "bg-[#6b7280]" : ""}`} style={!r.is_anonymous ? { background: avatarColor(r.author_name || "u") } : undefined}>
            {r.is_anonymous
              ? <User className="icon text-white" style={{ width: 14, height: 14 }} />
              : r.author_avatar_url
                ? <img className="absolute inset-0 h-full w-full rounded-full object-cover" src={r.author_avatar_url} alt="" />
                : <span>{aliasInitials(r.author_name) || "U"}</span>}
          </span>
          <span className="truncate text-[0.88rem] font-bold text-ink">
            {r.is_anonymous ? t({ en: "Anonymous", km: "អនាមិក" }) : r.author_name || "Angket User"}
          </span>
          <span className="ml-auto flex-none text-[0.78rem] text-faint">{t(r.when)}</span>
        </div>
        <h3 className="m-0 line-clamp-2 text-[1.08rem] font-bold leading-[1.35] tracking-[-0.01em] text-ink">{t(r.title)}</h3>
        <p className="m-0 line-clamp-3 text-[0.9rem] leading-[1.6] text-[#56657f]">{t(r.desc)}</p>
        <div className="mt-auto flex items-center justify-between gap-[0.8rem] border-t border-[#e3e9f3] pt-[0.7rem]">
          <span className="inline-flex items-center gap-[0.45rem] text-[0.85rem] font-semibold text-ink">
            <PlatformIcon name={r.platform} />
            <span>{r.platform}</span>
          </span>
          <button type="button" className="inline-flex cursor-pointer items-center gap-[0.4rem] whitespace-nowrap rounded-full border-[1.5px] border-blue-500 bg-transparent px-4 py-[0.45rem] text-[0.85rem] font-bold text-blue-600 transition-all duration-150 hover:bg-blue-600 hover:text-white" onClick={() => onSeeMore(r)}>
            {t({ en: "See More", km: "មើលច្រើនទៀត" })}
            <IconArrowRight style={{ width: 15, height: 15 }} />
          </button>
        </div>
      </div>
    </article>
  )
}

function ReportDetailModal({ r, onClose }) {
  const { lang, t } = useLang()
  if (!r) return null
  const badgeStyle = CATEGORY_BADGES[r.cat] ? { background: CATEGORY_BADGES[r.cat] } : undefined
  return (
    <>
      <div className="fixed inset-0 z-[600] animate-[fadeIn_0.2s_ease] bg-[rgba(15,23,42,0.6)]" role="presentation" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 z-[610] flex max-h-[92vh] w-[min(1000px,calc(100vw-1.5rem))] flex-row overflow-hidden rounded-lg bg-white shadow-lg [transform:translate(-50%,-50%)] animate-[modalIn_0.2s_ease]" role="dialog" aria-modal="true">
        {r.image && (
          <div className="relative flex max-w-[38%] flex-[0_0_38%] items-center justify-center overflow-hidden bg-ink">
            <img className="block h-auto max-h-[92vh] w-full object-contain" src={r.image} alt="" />
          </div>
        )}
        <div className="relative grid min-w-0 flex-[1_1_62%] gap-[0.85rem] overflow-y-auto p-[1.6rem_1.8rem_1.8rem] max-[640px]:p-[1.2rem_1.2rem_1.4rem]">
          <div className="flex items-center justify-between gap-4">
            <span className={`static ${BADGE}`} style={badgeStyle}>
              {catLabel(r.cat, lang)}
            </span>
            <button type="button" className="grid h-9 w-9 flex-none cursor-pointer place-items-center rounded-full border border-[#e3e9f3] bg-surface text-ink transition-all duration-150 hover:border-current hover:bg-blue-50 hover:text-blue-600" aria-label={t({ en: "Close", km: "បិទ" })} onClick={onClose}>
              <IconClose style={{ width: 18, height: 18 }} />
            </button>
          </div>
          <h3 className="m-0 text-[1.6rem] leading-[1.35]">{t(r.title)}</h3>
          <p className="m-0 text-[1.02rem] leading-[1.7] text-[#56657f]">{t(r.desc)}</p>
          <dl className="m-0 mt-[0.4rem] grid gap-[0.7rem] border-t border-[#e3e9f3] pt-4">
            <div className="flex items-baseline gap-[0.9rem]">
              <dt className="min-w-[90px] text-[0.82rem] font-semibold text-faint">{t({ en: "Platform", km: "ប្រព័ន្ធផ្សព្វផ្សាយ" })}</dt>
              <dd className="m-0 inline-flex items-center gap-[0.45rem] text-[0.92rem] font-semibold text-ink">
                <PlatformIcon name={r.platform} />
                <span>{r.platform}</span>
              </dd>
            </div>
            <div className="flex items-baseline gap-[0.9rem]">
              <dt className="min-w-[90px] text-[0.82rem] font-semibold text-faint">{t({ en: "Posted", km: "បានប្រកាស" })}</dt>
              <dd className="m-0 font-medium text-[#56657f]">{t(r.when)}</dd>
            </div>
            <div className="flex items-baseline gap-[0.9rem]">
              <dt className="min-w-[90px] text-[0.82rem] font-semibold text-faint">{t({ en: "Author", km: "អ្នកចែករំលែក" })}</dt>
              <dd className="m-0 text-[0.92rem] font-semibold text-ink">{r.is_anonymous ? t({ en: "Anonymous", km: "អនាមិក" }) : r.author_name || "Angket User"}</dd>
            </div>
          </dl>
          <p className="mt-[0.3rem] flex items-start gap-[0.55rem] rounded-[12px] border border-blue-100 bg-blue-50 p-[0.7rem_0.9rem] text-[0.85rem] leading-[1.55] text-blue-800">
            <IconCheck className="mt-[0.15rem] flex-none text-blue-600" style={{ width: 17, height: 17 }} />
            <span>{t({ en: "Community reports are personal experiences shared for awareness. Always verify before you act.", km: "របាយការណ៍សហគមន៍គឺជាបទពិសោធន៍ផ្ទាល់ខ្លួនដែលចែករំលែកសម្រាប់ការយល់ដឹង។ តែងតែផ្ទៀងផ្ទាត់មុននឹងធ្វើសកម្មភាព។" })}</span>
          </p>
        </div>
      </div>
    </>
  )
}

export function ReportsFeed() {
  const { lang, t } = useLang()
  const navigate = useNavigate()
  const location = useLocation()
  const { admin } = useAuth()
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [reportKey, setReportKey] = useState(0)
  const [reloadKey, setReloadKey] = useState(0)
  const [q, setQ] = useState("")
  const [cat, setCat] = useState("all")
  const [saved, setSaved] = useState(() => new Set())
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    reportsApi
      .list({ limit: 100 })
      .then((res) => {
        if (mounted) setReports((res.reports || []).map(normalize))
      })
      .catch((err) => {
        console.warn("Failed to load reports:", err.message)
        if (mounted) setReports([])
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [reloadKey])

  useEffect(() => {
    if (admin && location.state?.openReport) {
      navigate(location.pathname, { replace: true, state: null })
      setReportKey((k) => k + 1)
      setDrawerOpen(true)
    }
  }, [admin, location.state, location.pathname, navigate])

  useEffect(() => {
    if (!admin) return
    let mounted = true
    reportsApi
      .listSaved()
      .then((res) => {
        if (mounted) setSaved(new Set(res.savedIds || []))
      })
      .catch(() => {})
    return () => { mounted = false }
  }, [admin, reloadKey])

  const toggleSave = useCallback((id) => {
    if (!admin) {
      rememberAuthOrigin()
      navigate("/login", { state: { from: { pathname: "/report" } } })
      return
    }
    const wasSaved = saved.has(id)
    setSaved((prev) => {
      const next = new Set(prev)
      if (wasSaved) next.delete(id)
      else next.add(id)
      return next
    })
    if (wasSaved) {
      reportsApi.unsave(id).catch(() => {
        setSaved((prev) => { const next = new Set(prev); next.add(id); return next })
      })
    } else {
      reportsApi.save(id).catch(() => {
        setSaved((prev) => { const next = new Set(prev); next.delete(id); return next })
      })
    }
  }, [admin, saved, navigate])

  const visibleReports = useMemo(() => {
    const needle = q.trim().toLowerCase()
    let list = reports.filter((r) => {
      if (cat !== "all" && r.cat !== cat) return false
      if (!needle) return true
      const hay = [r.title.en, r.title.km, r.desc.en, r.desc.km, r.platform,
        TYPE_LABELS[r.cat]?.en, TYPE_LABELS[r.cat]?.km, r.cat]
        .join(" ")
        .toLowerCase()
      return hay.includes(needle)
    })
    list = [...list].sort((a, b) => b.ts - a.ts)
    return list
  }, [q, cat, reports])

  const handleSubmitted = () => {
    setDrawerOpen(false)
    setCat("all")
    setQ("")
    setReloadKey((k) => k + 1)
  }

  const openReportForm = () => {
    if (!admin) {
      rememberAuthOrigin()
      navigate("/login", { state: { from: { pathname: "/report" } } })
      return
    }
    setReportKey((k) => k + 1)
    setDrawerOpen(true)
  }

  const pillClass = (isActive) =>
    `inline-flex flex-none cursor-pointer items-center gap-[0.45rem] whitespace-nowrap rounded-full border px-[0.95rem] py-[0.55rem] text-[0.85rem] font-semibold transition-all duration-150 ${isActive ? "border-blue-600 bg-blue-600 text-white" : "border-[#e3e9f3] bg-white text-ink hover:border-current hover:text-blue-700"}`

  return (
    <>
      <ReportsHero />

      <section className="bg-surface">
        <div className={CONTAINER}>
          <div className="mb-[1.7rem] mt-[2.6rem] flex flex-col gap-[0.85rem]">
            <div className="flex flex-wrap items-center gap-[0.85rem]">
              <div className="relative flex-[1_1_auto]">
                <IconSearch className="pointer-events-none absolute left-[1.1rem] top-1/2 -translate-y-1/2 text-faint" style={{ width: 18, height: 18 }} />
                <label className="sr-only" htmlFor="rp-q">
                  {t({ en: "Search reports", km: "ស្វែងរករបាយការណ៍" })}
                </label>
                <input
                  type="search"
                  id="rp-q"
                  className="w-full rounded-full border border-[#e3e9f3] bg-white py-[0.78rem] pl-[2.7rem] pr-[1.1rem] text-[0.95rem] text-ink shadow-sm outline-none placeholder:text-faint focus:border-blue-500 focus:shadow-[0_0_0_3px_var(--color-blue-100)]"
                  autoComplete="off"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={t({ en: "Search reports…", km: "ស្វែងរករបាយការណ៍…" })}
                />
              </div>

              <button type="button" className="inline-flex flex-none cursor-pointer items-center gap-2 rounded-full border border-blue-600 bg-blue-600 px-[1.15rem] py-[0.62rem] text-[0.9rem] font-bold text-white shadow-[0_8px_18px_rgba(37,99,235,0.25)] transition-all duration-150 hover:border-blue-700 hover:bg-blue-700" onClick={openReportForm}>
                <IconPlus style={{ width: 16, height: 16 }} />
                <span>{t({ en: "Report", km: "រាយការណ៍" })}</span>
              </button>
            </div>

            <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-[0.55rem] overflow-x-auto px-0 pb-[0.2rem] pt-[0.15rem] [scrollbar-width:thin]" role="group" aria-label={t({ en: "Filter by category", km: "ត្រងតាមប្រភេទ" })}>
              <button
                type="button"
                className={pillClass(cat === "all")}
                aria-pressed={cat === "all"}
                onClick={() => setCat("all")}
              >
                {t({ en: "All", km: "ទាំងអស់" })}
              </button>
              {SCAM_TYPES.map((type) => {
                const CatIcon = CATEGORY_META[type.value]?.icon
                return (
                  <button
                    key={type.value}
                    type="button"
                    className={pillClass(cat === type.value)}
                    aria-pressed={cat === type.value}
                    onClick={() => setCat(type.value)}
                  >
                    {CatIcon && <CatIcon className={cat === type.value ? "text-white" : "text-faint"} style={{ width: 15, height: 15 }} />}
                    {t(type)}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-[1.4rem] max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
            {loading && Array.from({ length: 6 }).map((_, i) => (
              <div className="overflow-hidden rounded-lg border border-[#e3e9f3] bg-white" key={`skel-${i}`}>
                <div className={`aspect-[16/10] ${SKEL}`} />
                <div className="flex flex-col gap-[0.6rem] p-[1rem_1.15rem_1.1rem]">
                  <div className={`h-[14px] w-4/5 rounded-[4px] ${SKEL}`} />
                  <div className={`h-[14px] w-3/5 rounded-[4px] ${SKEL}`} />
                  <div className={`mt-2 h-[14px] w-2/5 rounded-[4px] ${SKEL}`} />
                </div>
              </div>
            ))}
            {!loading && visibleReports.map((r) => (
              <ReportCard key={r.id} r={r} lang={lang} saved={saved.has(r.id)} onToggleSave={toggleSave} onSeeMore={setSelected} />
            ))}
            {!loading && visibleReports.length === 0 && (
              <p className="col-span-full py-[2.4rem] text-center text-faint">{t({ en: "No reports match your search.", km: "រកមិនឃើញរបាយការណ៍ដែលត្រូវនឹងការស្វែងរករបស់អ្នកទេ។" })}</p>
            )}
          </div>

          <p className="mt-[1.7rem] flex items-baseline gap-[0.55rem] text-[0.83rem] text-faint">
            <IconInfo className="flex-none translate-y-[2px] text-blue-300" />
            <span>
              {t({
                en: "Reports are personal experiences shared by users, with the option to remain anonymous or share their identity, helping raise awareness of scam patterns.",
                km: "ការរាយការណ៍គឺជាបទពិសោធន៍ផ្ទាល់ខ្លួនដែលបានចែករំលែកដោយអ្នកប្រើប្រាស់ ដោយអាចជ្រើសរើសរក្សាអនាមិក ឬបង្ហាញអត្តសញ្ញាណរបស់ខ្លួន ដើម្បីជួយបង្កើនការយល់ដឹងអំពីល្បិចបោកប្រាស់ផ្សេងៗ។",
              })}
            </span>
          </p>
        </div>
      </section>

      <ReportForm key={reportKey} open={drawerOpen} onClose={() => setDrawerOpen(false)} onSubmitted={handleSubmitted} />
      <ReportDetailModal r={selected} onClose={() => setSelected(null)} />
    </>
  )
}
