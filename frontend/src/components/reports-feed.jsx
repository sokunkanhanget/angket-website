import { useEffect, useMemo, useState, useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"
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
  return <Icon style={PLATFORM_ICONS[key] ? { color: PLATFORM_COLORS[key] } : undefined} />
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
    <div className="card-img-placeholder">
      <span className="card-img-emoji"><Icon /></span>
      <span className="card-img-label">{catLabel(cat, lang)}</span>
    </div>
  )
}

function ReportsHero() {
  const { t } = useLang()
  return (
    <section className="rp-hero" id="reports" aria-labelledby="reports-title">
      <div className="container rp-hero-grid">
        <div className="rp-hero-copy">
          <h1 id="reports-title" className="rp-hero-title">
            <span className="rp-hero-title-line">{t({ en: "Learn From", km: "ស្វែងយល់ពី" })}</span>
            <span className="rp-hero-title-line rp-hero-title-accent">{t({ en: "Scam Reports", km: "របាយការណ៍ការបោកប្រាស់" })}</span>
          </h1>
          <p className="rp-hero-body">
            {t({
              en: "See real examples from our community. Discover how scams work, what to watch for, and how others stayed safe.",
              km: "សូមមើលឧទាហរណ៍ពិតពីសហគមន៍របស់យើង។ ស្វែងយល់ពីរបៀបដែលការបោកប្រាស់ដំណើរការ អ្វីដែលត្រូវប្រុងប្រយ័ត្ន និងរបៀបដែលអ្នកដទៃរក្សាសុវត្ថិភាព។",
            })}
          </p>
        </div>

        <div className="rp-ill" aria-hidden="true">


          <span className="rp-script">
            <span>See it.</span>
            <span>Learn it.</span>
            <span>Avoid it.</span>
            <svg className="rp-script-swoosh" viewBox="0 0 120 18" fill="none">
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
    <article className="rp-card">
      <div className="rp-card-img">
        {r.image ? (
          <img src={r.image} alt="" loading="lazy" />
        ) : (
          placeholderHeader(r.cat, lang)
        )}
        <span className="rp-card-badge" style={badgeStyle}>
          {catLabel(r.cat, lang)}
        </span>
        <button
          type="button"
          className={`rp-card-save${saved ? " saved" : ""}`}
          aria-label={saved
            ? t({ en: "Unsave report", km: "ដកចេញពីការរក្សាទុក" })
            : t({ en: "Save report", km: "រក្សាទុករបាយការណ៍" })}
          onClick={(e) => { e.stopPropagation(); onToggleSave(r.id) }}
        >
          <IconSave filled={saved} />
        </button>
        {r.label && <span className="rp-card-bubble">{r.label}</span>}
      </div>

      <div className="rp-card-body">
        <div className="rp-card-author">
          <span className={`rp-card-avatar${r.is_anonymous ? " anon" : ""}`} style={!r.is_anonymous ? { background: avatarColor(r.author_name || "u") } : undefined}>
            {r.is_anonymous
              ? <User className="icon" />
              : r.author_avatar_url
                ? <img src={r.author_avatar_url} alt="" />
                : <span>{aliasInitials(r.author_name) || "U"}</span>}
          </span>
          <span className="rp-card-name">
            {r.is_anonymous ? t({ en: "Anonymous", km: "អនាមិក" }) : r.author_name || "Angket User"}
          </span>
          <span className="rp-card-date">{t(r.when)}</span>
        </div>
        <h3 className="rp-card-title">{t(r.title)}</h3>
        <p className="rp-card-desc">{t(r.desc)}</p>
        <div className="rp-card-foot">
          <span className="rp-platform">
            <PlatformIcon name={r.platform} />
            <span>{r.platform}</span>
          </span>
          <button type="button" className="rp-more" onClick={() => onSeeMore(r)}>
            {t({ en: "See More", km: "មើលច្រើនទៀត" })}
            <IconArrowRight />
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
      <div className="zoom-overlay" role="presentation" onClick={onClose} />
      <div className="zoom-modal" role="dialog" aria-modal="true">
        {r.image && (
          <div className="zoom-img-area">
            <img src={r.image} alt="" />
          </div>
        )}
        <div className="zoom-body rp-detail-body">
          <div className="rp-detail-top">
            <span className="rp-card-badge" style={badgeStyle}>
              {catLabel(r.cat, lang)}
            </span>
            <button type="button" className="rp-detail-close" aria-label={t({ en: "Close", km: "បិទ" })} onClick={onClose}>
              <IconClose />
            </button>
          </div>
          <h3>{t(r.title)}</h3>
          <p className="rp-detail-desc">{t(r.desc)}</p>
          <dl className="detail-meta">
            <div>
              <dt>{t({ en: "Platform", km: "ប្រព័ន្ធផ្សព្វផ្សាយ" })}</dt>
              <dd className="rp-platform">
                <PlatformIcon name={r.platform} />
                <span>{r.platform}</span>
              </dd>
            </div>
            <div>
              <dt>{t({ en: "Posted", km: "បានប្រកាស" })}</dt>
              <dd className="detail-when">{t(r.when)}</dd>
            </div>
            <div>
              <dt>{t({ en: "Author", km: "អ្នកចែករំលែក" })}</dt>
              <dd>{r.is_anonymous ? t({ en: "Anonymous", km: "អនាមិក" }) : r.author_name || "Angket User"}</dd>
            </div>
          </dl>
          <p className="rd-note">
            <IconCheck />
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

  return (
    <>
      <ReportsHero />

      <section className="rp-section">
        <div className="container">
          <div className="rp-toolbar">
            <div className="rp-search">
              <IconSearch />
              <label className="sr-only" htmlFor="rp-q">
                {t({ en: "Search reports", km: "ស្វែងរករបាយការណ៍" })}
              </label>
              <input
                type="search"
                id="rp-q"
                className="rp-search-input"
                autoComplete="off"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t({ en: "Search reports…", km: "ស្វែងរករបាយការណ៍…" })}
              />
            </div>

            <div className="rp-pills" role="group" aria-label={t({ en: "Filter by category", km: "ត្រងតាមប្រភេទ" })}>
              <button
                type="button"
                className={`rp-pill${cat === "all" ? " active" : ""}`}
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
                    className={`rp-pill${cat === type.value ? " active" : ""}`}
                    aria-pressed={cat === type.value}
                    onClick={() => setCat(type.value)}
                  >
                    {CatIcon && <CatIcon />}
                    {t(type)}
                  </button>
                )
              })}
            </div>

            <button type="button" className="rp-report-btn" onClick={openReportForm}>
              <IconPlus />
              <span>{t({ en: "Report", km: "រាយការណ៍" })}</span>
            </button>
          </div>

          <div className="rp-cards">
            {loading && Array.from({ length: 6 }).map((_, i) => (
              <div className="skeleton-card" key={`skel-${i}`}>
                <div className="skeleton-img" />
                <div className="skeleton-body">
                  <div className="skeleton skeleton-line w80" />
                  <div className="skeleton skeleton-line w60" />
                  <div className="skeleton skeleton-line w40" style={{ marginTop: "0.5rem" }} />
                </div>
              </div>
            ))}
            {!loading && visibleReports.map((r) => (
              <ReportCard key={r.id} r={r} lang={lang} saved={saved.has(r.id)} onToggleSave={toggleSave} onSeeMore={setSelected} />
            ))}
            {!loading && visibleReports.length === 0 && (
              <p className="empty-msg">{t({ en: "No reports match your search.", km: "រកមិនឃើញរបាយការណ៍ដែលត្រូវនឹងការស្វែងរករបស់អ្នកទេ។" })}</p>
            )}
          </div>

          <p className="reports-disclaimer">
            <IconInfo />
            <span>
              {t({
                en: "Reports are personal experiences shared anonymously - useful for awareness, but not verified facts.",
                km: "របាយការណ៍គឺជាបទពិសោធន៍ផ្ទាល់ខ្លួនដែលចែករំលែកដោយអនាមិក - មានប្រយោជន៍សម្រាប់បង្កើនការយល់ដឹង ប៉ុន្តែមិនមែនជាការផ្ទៀងផ្ទាត់ជាការពិតទេ។",
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