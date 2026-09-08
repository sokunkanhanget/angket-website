import { useEffect, useMemo, useState, useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useLang } from "@/lib/i18n"
import { useAuth } from "@/lib/auth"
import { rememberAuthOrigin } from "@/lib/authBack"
import { SCAM_TYPES, TYPE_LABELS } from "@/lib/data"
import { reportsApi } from "@/lib/services"
import { Reveal } from "./reveal"
import { ReportForm } from "./report-form"
import {
  IconGlobe, IconFacebook, IconTelegram, IconWhatsApp,
  IconTikTok, IconInstagram, IconSms, IconInfo, IconSearch,
  IconPlus, IconSave, IconClose,
  IconBriefcase, IconGift, IconStore, IconChart, IconMail, IconShield,
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

function placeholderHeader(cat, lang) {
  const meta = CATEGORY_META[cat]
  const label = TYPE_LABELS[cat]
  const Icon = meta?.icon ?? IconInfo
  return (
    <div className="card-img-placeholder">
      <span className="card-img-emoji"><Icon /></span>
      <span className="card-img-label">{label ? (lang === "km" ? label.km : label.en) : cat}</span>
    </div>
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
  const [zoomReport, setZoomReport] = useState(null)

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
        setSaved((prev) => {
          const next = new Set(prev)
          next.add(id)
          return next
        })
      })
    } else {
      reportsApi.save(id).catch(() => {
        setSaved((prev) => {
          const next = new Set(prev)
          next.delete(id)
          return next
        })
      })
    }
  }, [admin, saved, navigate])

  const visibleReports = useMemo(() => {
    const needle = q.trim().toLowerCase()
    let list = reports.filter((r) => {
      if (cat !== "all" && r.cat !== cat) return false
      if (!needle) return true
      const hay = [r.title.en, r.title.km, r.desc.en, r.desc.km, r.platform,
        TYPE_LABELS[r.cat]?.en, TYPE_LABELS[r.cat]?.km, TYPE_LABELS[r.cat]?.en ?? r.cat, r.cat]
        .join(" ")
        .toLowerCase()
      return hay.includes(needle)
    })
    list = [...list].sort((a, b) => b.ts - a.ts)
    return list
  }, [q, cat, reports])

  const activeCatMeta = cat !== "all" ? CATEGORY_META[cat] : null
  const activeCatLabel = cat !== "all" ? TYPE_LABELS[cat] : null

  const handleSubmitted = () => {
    setDrawerOpen(false)
    setCat("all")
    setQ("")
    setReloadKey((k) => k + 1)
  }

  return (
    <section className="reports" id="reports" aria-labelledby="reports-title">
      <div className="container">
        <Reveal className="section-head">
          
          <h2 id="reports-title">
            {t({ en: "Learn From Scam Reports", km: "ស្វែងយល់តាមរយៈរបាយការណ៍អំពីការបោកប្រាស់" })}
          </h2>
          <p>
            {t({
              en: "Scammers use different methods to trick people, and the same type of scam can target many others. Explore scam reports shared by the other people to understand how these scams happen and what warning signs to look out for.",
              km: "អ្នកបោកប្រាស់ប្រើវិធីសាស្ត្រផ្សេងៗ ដើម្បីបញ្ឆោតមនុស្ស ហើយការបោកប្រាស់ប្រភេទដូចគ្នាអាចកើតឡើងចំពោះមនុស្សជាច្រើន។ ស្វែងយល់ពីរបាយការណ៍អំពីការបោកប្រាស់ដែលបានចែករំលែកដោយអ្នកដទៃ ដើម្បីយល់ពីរបៀបដែលការបោកប្រាស់ទាំងនេះកើតឡើង និងស្គាល់សញ្ញាដែលគួរប្រុងប្រយ័ត្ន។",
            })}
          </p>
          <p className="about-sub">
            {t({
              en: "Have you experienced a scam? Share your experience with the Angket to help others recognize and avoid similar scams.",
              km: "តើអ្នកធ្លាប់ជួបការបោកប្រាស់ដែរឬទេ? ចែករំលែកបទពិសោធន៍របស់អ្នកជាមួយ Angket ដើម្បីជួយអ្នកដទៃឱ្យអាចសម្គាល់ និងជៀសវាងការបោកប្រាស់ដែលមានលក្ខណៈស្រដៀងគ្នា។",
            })}
          </p>
        </Reveal>

        {/* Search bar with result count */}
        <div className="browse-search-row">
          <div className="browse-search-wrap">
            <IconSearch />
            <label className="sr-only" htmlFor="filter-q">
              {t({ en: "Search reports", km: "ស្វែងរករបាយការណ៍" })}
            </label>
            <input
              type="search"
              id="filter-q"
              className="browse-search-input"
              autoComplete="off"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t({ en: "Search reports…", km: "ស្វែងរករបាយការណ៍…" })}
            />
          </div>
          <button
            type="button"
            className="browse-report-btn"
            onClick={() => {
              if (!admin) {
                rememberAuthOrigin()
                navigate("/login", { state: { from: { pathname: "/report" } } })
                return
              }
              setReportKey((k) => k + 1)
              setDrawerOpen(true)
            }}
          >
            <IconPlus />
            <span>{t({ en: "Report", km: "រាយការណ៍" })}</span>
          </button>
        </div>

        {/* Category filter pills */}
        <div className="browse-pills" role="group" aria-label={t({ en: "Filter by category", km: "ត្រងតាមប្រភេទ" })}>
          <button
            type="button"
            className={`browse-pill${cat === "all" ? " active" : ""}`}
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
                className={`browse-pill${cat === type.value ? " active" : ""}`}
                aria-pressed={cat === type.value}
                onClick={() => setCat(type.value)}
              >
                {CatIcon && (
                  <span className="pill-emoji"><CatIcon /></span>
                )}
                {t(type)}
              </button>
            )
          })}
        </div>

{cat !== "all" && activeCatMeta && activeCatLabel && (
          <div className="browse-cat-header">
            <span className="browse-cat-icon">
              <activeCatMeta.icon />
            </span>
            <div className="browse-cat-text">
              <h3>
                {t(activeCatLabel)}
                <span className="browse-cat-count">
                  {lang === "km"
                    ? `${visibleReports.length} របាយការណ៍`
                    : `${visibleReports.length} report${visibleReports.length !== 1 ? "s" : ""}`}
                </span>
              </h3>
              <p>{t(activeCatMeta.desc)}</p>
            </div>
          </div>
        )}

        <div className="reports-layout">
          <div>
            <div className="browse-cards">
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
                <article className="browse-card" key={r.id}>
                  {/* Image area */}
                  <div className="browse-card-img">
                    {r.image ? (
                      <img src={r.image} alt="" loading="lazy" />
                    ) : (
                      placeholderHeader(r.cat, lang)
                    )}
                    <button
                      type="button"
                      className={`browse-card-save${saved.has(r.id) ? " saved" : ""}`}
                      aria-label={saved.has(r.id)
                        ? t({ en: "Unsave report", km: "ដកចេញពីការរក្សាទុក" })
                        : t({ en: "Save report", km: "រក្សាទុករបាយការណ៍" })}
                      onClick={(e) => { e.stopPropagation(); toggleSave(r.id) }}
                    >
                      <IconSave filled={saved.has(r.id)} />
                    </button>
                  </div>

                  {/* Card body */}
                  <div className="browse-card-body">
                    <div className="browse-card-author">
                      <span className={`browse-card-avatar ${r.is_anonymous ? "anon" : ""}`} aria-hidden="true">
                        {r.is_anonymous
                          ? <IconInfo />
                          : r.author_avatar_url
                            ? <img src={r.author_avatar_url} alt="" />
                            : <span>{aliasInitials(r.author_name) || "U"}</span>}
                      </span>
                      <span className="browse-card-authorname">
                        {r.is_anonymous ? t({ en: "Anonymous", km: "អនាមិក" }) : r.author_name || "Angket User"}
                      </span>
                    </div>
                    <h3 className="browse-card-title">{t(r.title)}</h3>
                    <p className="browse-card-desc">{t(r.desc)}</p>
                    <div className="browse-card-foot">
                      <span className="browse-card-meta">
                        <span className="browse-card-platform">
                          <PlatformIcon name={r.platform} />
                          <span>{r.platform}</span>
                        </span>
                        <span className="browse-card-date">{t(r.when)}</span>
                      </span>
                      <button
                        type="button"
                        className="browse-card-btn"
                        onClick={() => setZoomReport(r)}
                      >
                        {t({ en: "See More", km: "មើលច្រើនទៀត" })}
                      </button>
                    </div>
                  </div>
                </article>
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
        </div>
      </div>

      {/* Enlarged view popup */}
      {zoomReport && (
        <>
          <div className="zoom-overlay" onClick={() => setZoomReport(null)} />
          <div className="zoom-modal" role="dialog" aria-modal="true" aria-labelledby="zoom-title">
            <div className="zoom-img-area">
              {zoomReport.image ? (
                <img src={zoomReport.image} alt="" />
              ) : (
                placeholderHeader(zoomReport.cat, lang)
              )}
              <button type="button" className="detail-close" onClick={() => setZoomReport(null)} aria-label={t({ en: "Close", km: "បិទ" })}>
                <IconClose />
              </button>
            </div>
            <div className="detail-body zoom-body">
              <span className="detail-type">{t(TYPE_LABELS[zoomReport.cat] ?? { en: zoomReport.cat, km: zoomReport.cat })}</span>
              <h3 id="zoom-title">{t(zoomReport.title)}</h3>
              <p className="detail-desc zoom-desc">{t(zoomReport.desc)}</p>
              <div className="detail-meta">
                <span className="browse-card-platform">
                  <PlatformIcon name={zoomReport.platform} />
                  <span>{zoomReport.platform}</span>
                </span>
                <span className="detail-when">{t(zoomReport.when)}</span>
              </div>
            </div>
          </div>
        </>
      )}

      <ReportForm key={reportKey} open={drawerOpen} onClose={() => setDrawerOpen(false)} onSubmitted={handleSubmitted} />
    </section>
  )
}
