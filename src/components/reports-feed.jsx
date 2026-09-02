import { useMemo, useState, useCallback } from "react"
import { useLang } from "@/lib/i18n"
import { DEMO_REPORTS, SCAM_TYPES, TYPE_LABELS } from "@/lib/data"
import { Reveal } from "./reveal"
import { ReportForm } from "./report-form"
import {
  IconGlobe, IconFacebook, IconTelegram, IconWhatsApp,
  IconTikTok, IconInstagram, IconSms, IconInfo, IconSearch,
  IconPlus, IconHeart, IconClose, IconMapPin,
} from "./icons"

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
    emoji: "\uD83D\uDCBC",
    desc: {
      en: "Recognize job offers designed to take your money, not give you work.",
      km: "ស្គាល់ការផ្ដល់ការងារដែលរ计រចនាដើម្បីយកប្រាក់របស់អ្នក មិនមែនឱ្យអ្នកធ្វើការទេ។",
    },
  },
  investment: {
    emoji: "\uD83D\uDCC8",
    desc: {
      en: "Spot fake trading schemes and guaranteed-return promises before you invest.",
      km: "ស្គាល់ក្រុមវិនិយោគក្លែងក្លាយ និងការសន្យាផ្ដល់ការត្រឡប់មកវិញ។",
    },
  },
  prize: {
    emoji: "\uD83C\uDF81",
    desc: {
      en: "Free prizes are never free — learn how giveaway scams trick you.",
      km: "រង្វាន់ឥតគិតថ្លៃមិនដែលឥតគិតថ្លៃទេ — ស្វែងយល់ពីរបៀបបោកប្រាស់រង្វាន់។",
    },
  },
  phishing: {
    emoji: "\uD83D\uDCE7",
    desc: {
      en: "Protect your passwords and personal data from fake emails and messages.",
      km: "ការពារពាក្យសម្ងាត់ និងទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នកពីអ៊ីមែល និងសារក្លែងក្លាយ។",
    },
  },
  "fake-seller": {
    emoji: "\uD83D\uDED2",
    desc: {
      en: "Verify online sellers before paying — disappearing storefronts are a red flag.",
      km: "ផ្ទៀងផ្ទាត់អ្នកលក់តាមអ៊ីនធឺណិតមុនពេលបង់ប្រាក់។",
    },
  },
  impersonation: {
    emoji: "\uD83D\uDEE1\uFE0F",
    desc: {
      en: "Scammers pretend to be people you trust — always verify through another channel.",
      km: "ក្រុមបោកប្រាស់ក្លែងធ្វើជាអ្នកដែលអ្នកជឿជាក់។",
    },
  },
}

function placeholderHeader(cat, lang) {
  const meta = CATEGORY_META[cat]
  const label = TYPE_LABELS[cat]
  return (
    <div className="card-img-placeholder">
      <span className="card-img-emoji">{meta?.emoji ?? "\u2753"}</span>
      <span className="card-img-label">{label ? (lang === "km" ? label.km : label.en) : cat}</span>
    </div>
  )
}

export function ReportsFeed() {
  const { lang, t } = useLang()
  const [reports, setReports] = useState(DEMO_REPORTS)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [reportKey, setReportKey] = useState(0)
  const [q, setQ] = useState("")
  const [cat, setCat] = useState("all")
  const [saved, setSaved] = useState(() => new Set())
  const [detailReport, setDetailReport] = useState(null)

  const toggleSave = useCallback((id) => {
    setSaved((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const totals = useMemo(() => {
    const byCat = {}
    reports.forEach((r) => {
      byCat[r.cat] = (byCat[r.cat] || 0) + r.count
    })
    return Object.entries(byCat)
      .map(([c, total]) => ({ cat: c, total }))
      .sort((a, b) => b.total - a.total)
  }, [reports])

  const maxTotal = totals[0]?.total ?? 1

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

  const handleSubmitted = (form) => {
    const newReport = {
      id: Date.now(),
      cat: form.category,
      platform: form.sourcePlatform,
      contactMethod: form.contactMethod,
      count: 0,
      ts: Date.now(),
      when: { en: "Just now", km: "\u1794\u17B6\u1793\u179C\u17B7\u1793\u17D2\u1793\u1798\u17B6\u1793" },
      title: {
        en: form.title.trim(),
        km: form.title.trim(),
      },
      desc: {
        en: form.description.trim(),
        km: form.description.trim(),
      },
      user_id: null,
      status: "published",
    }
    setReports((prev) => [newReport, ...prev])
    setDrawerOpen(false)
    setCat("all")
    setQ("")
  }

  return (
    <section className="reports" id="reports" aria-labelledby="reports-title">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">{t({ en: "Learn from others", km: "\u17E0\u17A2\u1793\u17CB\u179F\u17B6\u17A0\u17D2\u1793\u1780\u1798\u17D2\u179A\u17B6\u1785\u1784\u17CB" })}</span>
          <h2 id="reports-title">
            {t({ en: "Learn From Real Scam Experiences", km: "\u17E0\u17A2\u1793\u17CB\u179F\u17B8\u17D4\u179F\u17D2\u179F\u17B7\u1785\u179A\u17B6\u1793\u17CB\u1797\u17D2\u179A\u17D2\u1787\u17B6\u1784\u17CB\u1797\u179A\u179F\u17CB\u1798\u17D2\u179A\u17B6\u1785\u1784\u17CB\u179B\u1789\u17CB\u1785\u1784\u17CB\u178F\u1798\u17B6\u1793\u179A\u17D2\u1797\u17CB\u1784\u17CB" })}
          </h2>
          <p>
            {t({
              en: "Have you encountered a scam? Share your experience to help others recognize similar attempts.",
              km: "\u179F\u17D2\u17A2\u17B6\u1793\u17CB\u17A2\u17D2\u1793\u17CB\u1797\u179A\u179F\u17CB\u1791\u17D2\u1798\u179F\u17B6\u1793\u179F\u17D2\u179A\u17B6\u1793\u17CB\u1797\u179A\u179F\u17CB\u1780\u17B6\u17C6\u179F\u1798\u17D2\u179A\u17B6\u1785\u1784\u17CB\u1780\u17B6\u1798\u17CB\u1795\u17B6\u1784\u17CB\u1791\u17D2\u179F\u1798\u17B6\u1793\u179F\u17D2\u179A\u17B6\u1793\u17CB \u1780\u17B6\u1798\u17CB \u17A0\u17D2\u1793\u17CB \u1791\u17D2\u179F\u1798\u17B6\u1793\u1787\u1797\u17D2\u179A\u17D2\u1797\u17B6\u1784\u17CB\u1780\u17B6\u1798\u17CB \u1791\u17D2\u1798\u179F\u17B6\u1793 \u179A\u17D2\u1797\u17CB\u1784\u17CB\u1795\u17B6\u1784\u17CB \u179A\u17D2\u179F\u17D2\u1793\u17D4\u1793\u17CB\u1797\u17D2\u179A\u17B6\u1793\u17CB \u178A\u17B7\u1793\u1798\u17D2\u1793\u179A\u17CB\u1791\u179A\u17CB\u1785\u17D2\u1791\u179A\u17B6\u1793\u17CB\u1787\u17D2\u1793\u179F\u17CB\u17A2\u17D2\u1793\u17CB\u1797\u179A\u179F\u17CB\u1791\u17D2\u1798\u179F\u17B6\u1793\u1780\u17B6\u17C6\u179F\u1798\u17D2\u179A\u17B6\u1785\u1784\u17CB\u1797\u179A\u179F\u17CB \u1780\u1798\u17D2\u1793\u17CB\u1784\u17D4.",
            })}
          </p>
        </Reveal>

        {/* Search bar with result count */}
        <div className="browse-search-row">
          <div className="browse-search-wrap">
            <IconSearch />
            <label className="sr-only" htmlFor="filter-q">
              {t({ en: "Search reports", km: "\u179F\u17D2\u17A2\u17B6\u1793\u17CB\u1780\u17B6\u17C6\u179F\u1798\u17D2\u179A\u17B6\u1785\u1784\u17CB" })}
            </label>
            <input
              type="search"
              id="filter-q"
              className="browse-search-input"
              autoComplete="off"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t({ en: "Search reports\u2026", km: "\u179F\u17D2\u17A2\u17B6\u1793\u17CB\u1780\u17B6\u17C6\u179F\u1798\u17D2\u179A\u17B6\u1785\u1784\u17CB\u2026" })}
            />
          </div>
          <span className="browse-result-count">
            {lang === "km"
              ? `${visibleReports.length} \u179A\u17B6\u1793\u17CB\u1797\u179A\u179F\u17CB`
              : `${visibleReports.length} report${visibleReports.length !== 1 ? "s" : ""}`}
          </span>
          <button type="button" className="browse-report-btn" onClick={() => { setReportKey((k) => k + 1); setDrawerOpen(true) }}>
            <IconPlus />
            <span>{t({ en: "Report", km: "\u179A\u17B6\u1793\u17CB\u1797\u179A\u179F\u17CB" })}</span>
          </button>
        </div>

        {/* Category filter pills */}
        <div className="browse-pills" role="group" aria-label={t({ en: "Filter by category", km: "\u179F\u17D2\u17A2\u17B6\u1793\u17CB\u179F\u17D2\u179A\u179F\u17B6\u1793\u17CB\u179F\u17D2\u1794\u17D2\u179A\u1780\u17B6\u17C6\u179F\u17D2\u179A\u17B6\u1793\u17CB" })}>
          <button
            type="button"
            className={`browse-pill${cat === "all" ? " active" : ""}`}
            aria-pressed={cat === "all"}
            onClick={() => setCat("all")}
          >
            {t({ en: "All", km: "\u1797\u1798\u17D2\u1793\u17CB\u178F\u1798\u17D2\u1793\u17CB" })}
          </button>
          {SCAM_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              className={`browse-pill${cat === type.value ? " active" : ""}`}
              aria-pressed={cat === type.value}
              onClick={() => setCat(type.value)}
            >
              <span className="pill-emoji">{CATEGORY_META[type.value]?.emoji ?? ""}</span>
              {t(type)}
            </button>
          ))}
        </div>

        {/* Category section header */}
        {cat !== "all" && activeCatMeta && activeCatLabel && (
          <div className="browse-cat-header">
            <span className="browse-cat-icon">{activeCatMeta.emoji}</span>
            <div className="browse-cat-text">
              <h3>
                {t(activeCatLabel)}
                <span className="browse-cat-count">
                  {lang === "km"
                    ? `${visibleReports.length} \u179A\u17B6\u1793\u17CB\u1797\u179A\u179F\u17CB`
                    : `${visibleReports.length} report${visibleReports.length !== 1 ? "s" : ""}`}
                </span>
              </h3>
              <p>{t(activeCatMeta.desc)}</p>
            </div>
          </div>
        )}

        <div className="reports-layout">
          <aside className="popular" aria-labelledby="pop-title">
            <h3 id="pop-title">{t({ en: "Reported most often", km: "\u1797\u179A\u179F\u17CB\u1791\u17D2\u1798\u179F\u17B6\u1793\u1797\u17D2\u179A\u17D2\u1797\u17B6\u1784\u17CB\u1780\u17D2\u1793\u17CB\u1797\u179A\u179F\u17CB\u1791\u17D2\u179F\u179A\u17B6\u17A0\u17D2\u1793\u17CB\u1787\u1797\u17D2\u179A\u17D2\u1797\u17B6\u1784\u17CB" })}</h3>
            <ul>
              {totals.slice(0, 4).map(({ cat: c, total }) => (
                <li key={c}>
                  <button type="button" className="pop-item" aria-pressed={cat === c} onClick={() => setCat(cat === c ? "all" : c)}>
                    <span className="pop-line">
                      <span className="pop-name">{t(TYPE_LABELS[c] ?? { en: c, km: c })}</span>
                      <span className="pop-count">
                        {lang === "km" ? `${total} \u1791\u17BC\u1793` : `${total} reports`}
                      </span>
                    </span>
                    <span className="pop-bar" aria-hidden="true">
                      <i style={{ width: `${Math.round((total / maxTotal) * 100)}%` }} />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="pop-note">
              {t({
                en: "Sample data for demonstration \u2014 based on the reports below.",
                km: "\u1797\u1789\u17D2\u1791\u17B7\u1793\u179F\u17D2\u179F\u17B6\u17A0\u17D2\u1793\u17CB\u1787\u1797\u17D2\u179A\u17D2\u1797\u17B6\u1784\u17CB\u179F\u17B8\u179A\u17CB\u179F\u17CB\u1785\u17D2\u1791\u179A\u17B6\u1793\u17CB\u179F\u17D2\u17A2\u17B6\u1793\u17CB \u1791\u17B6\u1791\u17CB \u1787\u1797\u17D2\u179A\u17D2\u1797\u17B6\u1784\u17CB\u1797\u17D2\u179A\u1798\u17B6\u1793\u17CB\u1791\u17D2\u179F\u1798\u17B6\u1793\u1797\u17D2\u179A\u17D2\u1797\u17B6\u1784\u17CB\u179B\u1789\u17CB\u1785\u1784\u17CB\u1780\u17B6\u1798\u17CB\u1793\u179A\u17CB\u1797\u179A\u179F\u17CB\u1787\u17D2\u1793\u179F\u17CB\u1780\u17B6\u1798\u17CB\u1791\u17D2\u1798\u179F\u17B6\u1793\u1797\u17D2\u179A\u17D2\u1797\u17B6\u1784\u17CB\u179B\u1789\u17CB\u1785\u1784\u17CB\u1787\u17D2\u1793\u179F\u17CB\u1793\u17D2\u1791\u1793\u17D2\u1791\u1793\u17D4",
              })}
            </p>
          </aside>

          <div>
            <div className="browse-cards">
              {visibleReports.map((r) => (
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
                        ? t({ en: "Unsave report", km: "\u1785\u17B6\u17A0\u17D2\u1799\u1797\u179A\u179F\u17CB\u1791\u17D2\u1798\u179F\u17B6\u1793" })
                        : t({ en: "Save report", km: "\u179F\u17D2\u17A2\u17B6\u1793\u17CB\u1797\u179A\u179F\u17CB\u1791\u17D2\u1798\u179F\u17B6\u1793" })}
                      onClick={(e) => { e.stopPropagation(); toggleSave(r.id) }}
                    >
                      <IconHeart filled={saved.has(r.id)} />
                    </button>
                  </div>

                  {/* Card body */}
                  <div className="browse-card-body">
                    <h3 className="browse-card-title">{t(r.title)}</h3>
                    <p className="browse-card-desc">{t(r.desc)}</p>
                    <div className="browse-card-foot">
                      <span className="browse-card-platform">
                        <IconMapPin />
                        <span>{r.platform}</span>
                      </span>
                      <button
                        type="button"
                        className="browse-card-btn"
                        onClick={() => setDetailReport(r)}
                      >
                        {t({ en: "View Details", km: "\u17E0\u17D2\u17A2\u17B6\u1793\u17CB\u1797\u1798\u17D2\u1793\u17D4\u1793\u17CB\u1795\u179A\u17D2\u1787\u17B6\u1784\u17D2\u1793\u17CB" })}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
              {visibleReports.length === 0 && (
                <p className="empty-msg">{t({ en: "No reports match your search.", km: "\u179A\u17C4\u1793\u1780\u17B6\u17C6\u179F\u1798\u17D2\u179A\u17B6\u1785\u1784\u17CB\u1793\u179A\u17CB\u1797\u179A\u179F\u17CB\u1787\u17D2\u1793\u179F\u17CB\u1797\u17D2\u179A\u17B6\u1793\u17CB\u1791\u17D2\u1798\u179F\u17B6\u1793\u179F\u17D2\u17A2\u17B6\u1793\u17CB\u1797\u179A\u179F\u17CB\u1791\u17D2\u1798\u179F\u17B6\u1793\u17A2\u17D2\u1793\u17CB\u1780\u17B6\u17C6\u179F\u17D2\u179A\u17B6\u1793\u17CB\u1791\u17D2\u1798\u179F\u17B6\u1793\u17D4" })}
              </p>
              )}
            </div>
            <p className="reports-disclaimer">
              <IconInfo />
              <span>
                {t({
                  en: "Demo preview: these are sample reports for illustration. In the live version, reports are personal experiences shared anonymously \u2014 useful for awareness, but not verified facts.",
                  km: "\u1785\u17B6\u17A0\u17D2\u1799\u179F\u17D2\u17A2\u17B6\u1793\u17CB\u1787\u17D2\u1793\u179F\u17CB \u179F\u17D2\u17A2\u17B6\u1793\u17CB\u1795\u17B6\u1784\u17CB \u1797\u17D2\u179A\u17D2\u1797\u17B6\u1784\u17CB\u179F\u17D2\u17A2\u17B6\u1793\u17CB\u1791\u17D2\u1798\u179F\u17B6\u1793\u1797\u17D2\u179A\u17D2\u1797\u17B6\u1784\u17CB \u1791\u17B6\u1791\u17CB \u1787\u1797\u17D2\u179A\u17D2\u1797\u17B6\u1784\u17CB \u1797\u17D2\u179A\u1798\u17B6\u1793\u17CB \u1791\u17D2\u179F\u1798\u17B6\u1793\u1797\u17D2\u179A\u17D2\u1797\u17B6\u1784\u17CB\u179B\u1789\u17CB\u1785\u1784\u17CB\u1780\u17B6\u1798\u17CB\u1793\u179A\u17CB\u1797\u179A\u179F\u17CB\u1787\u17D2\u1793\u179F\u17CB\u1780\u17B6\u1798\u17CB\u1791\u17D2\u1798\u179F\u17B6\u1793\u1797\u17D2\u179A\u17D2\u1797\u17B6\u1784\u17CB\u179B\u1789\u17CB\u1785\u1784\u17CB\u1787\u17D2\u1793\u179F\u17CB\u1793\u17D2\u1791\u1793\u17D2\u1791\u1793\u17D4 \u1793\u179A\u17CB\u1797\u179A\u179F\u17CB\u1787\u17D2\u1793\u179F\u17CB\u1795\u179A\u17D2\u1787\u17B6\u1784\u17D2\u1793\u17CB \u1797\u17D2\u179A\u17D2\u1797\u17B6\u1784\u17CB \u1791\u17D2\u179F\u1798\u17B6\u1793\u1797\u17D2\u179A\u17D2\u1797\u17B6\u1784\u17CB\u1797\u17D2\u179A\u1798\u17B6\u1793\u17CB \u178F\u17D2\u1793\u179F\u17CB \u1791\u17D2\u179F\u1798\u17B6\u1793\u1797\u17D2\u179A\u17D2\u1797\u17B6\u1784\u17CB \u1791\u17D2\u1793\u179A\u17D4\u1793\u17CB\u1780\u17B6\u17C6\u179F\u17D2\u179A\u17B6\u1793\u17CB\u1791\u17D2\u1798\u179F\u17B6\u1793\u1795\u179A\u17D2\u179A\u17B6\u1793\u17D2\u1793\u179A\u17D4 \u17A0\u17D2\u1793\u17CB \u179F\u17D2\u17A2\u17B6\u1793\u17CB\u1797\u17D2\u179A\u17D2\u1797\u17B6\u1784\u17CB \u1780\u17D2\u1793\u17CB\u179A\u17CB\u1797\u17D2\u179A\u17D2\u1793\u17D4 \u1787\u17D2\u1793\u179F\u17CB \u1795\u179A\u17D2\u179A\u17B6\u1793\u17D2\u1793\u179A\u17D4",
                })}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Detail modal */}
      {detailReport && (
        <>
          <div className="detail-overlay" onClick={() => setDetailReport(null)} />
          <div className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title">
            <div className="detail-img-area">
              {detailReport.image ? (
                <img src={detailReport.image} alt="" />
              ) : (
                placeholderHeader(detailReport.cat, lang)
              )}
              <button type="button" className="detail-close" onClick={() => setDetailReport(null)} aria-label={t({ en: "Close", km: "\u1794\u1793\u179A\u17CB\u1797\u1793\u179A" })}>
                <IconClose />
              </button>
            </div>
            <div className="detail-body">
              <span className="detail-type">{t(TYPE_LABELS[detailReport.cat] ?? { en: detailReport.cat, km: detailReport.cat })}</span>
              <h3 id="detail-title">{t(detailReport.title)}</h3>
              <p className="detail-desc">{t(detailReport.desc)}</p>
              <div className="detail-meta">
                <span className="browse-card-platform">
                  <IconMapPin />
                  <span>{detailReport.platform}</span>
                </span>
                <span className="detail-when">{t(detailReport.when)}</span>
              </div>
              {detailReport.count > 0 && (
                <p className="detail-similar">
                  {lang === "km"
                    ? `+${detailReport.count} \u179A\u17B6\u1793\u17CB\u1797\u179A\u179F\u17CB\u1791\u17D2\u1798\u179F\u17B6\u1793\u179F\u17D2\u17A2\u17B6\u1793\u17CB\u1797\u17D2\u179A\u17B6\u1793\u17CB\u1791\u17D2\u1798\u179F\u17B6\u1793\u1795\u179A\u17D2\u179A\u17B6\u1793\u17D2\u1793\u179A\u17CB`
                    : `+${detailReport.count} similar reports`}
                </p>
              )}
            </div>
          </div>
        </>
      )}

      <ReportForm key={reportKey} open={drawerOpen} onClose={() => setDrawerOpen(false)} onSubmitted={handleSubmitted} />
    </section>
  )
}