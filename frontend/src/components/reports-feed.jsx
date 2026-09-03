import { useMemo, useState, useCallback } from "react"
import { useLang } from "@/lib/i18n"
import { DEMO_REPORTS, SCAM_TYPES, TYPE_LABELS } from "@/lib/data"
import { Reveal } from "./reveal"
import { ReportForm } from "./report-form"
import {
  IconGlobe, IconFacebook, IconTelegram, IconWhatsApp,
  IconTikTok, IconInstagram, IconSms, IconInfo, IconSearch,
  IconPlus, IconHeart, IconClose,
  IconBriefcase, IconGift, IconStore, IconChart, IconMail, IconShield,
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
      when: { en: "Just now", km: "ទើបតែបានរាយការណ៍" },
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
          <span className="eyebrow">{t({ en: "Learn from others", km: "រៀនពីអ្នកដទៃ" })}</span>
          <h2 id="reports-title">
            {t({ en: "Learn From Real Scam Experiences", km: "រៀនសូត្រពីបទពិសោធន៍បោកប្រាស់ជាក់ស្ដែង" })}
          </h2>
          <p>
            {t({
              en: "Have you encountered a scam? Share your experience to help others recognize similar attempts.",
              km: "តើអ្នកធ្លាប់ជួបប្រទះការបោកប្រាស់ដែរឬទេ? ចែករំលែកបទពិសោធន៍របស់អ្នក ដើម្បីជួយអ្នកដទៃស្គាល់ការព្យាយាមបោកប្រាស់ប្រភេទដូចគ្នា។",
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
          <span className="browse-result-count">
            {lang === "km"
              ? `${visibleReports.length} របាយការណ៍`
              : `${visibleReports.length} report${visibleReports.length !== 1 ? "s" : ""}`}
          </span>
          <button type="button" className="browse-report-btn" onClick={() => { setReportKey((k) => k + 1); setDrawerOpen(true) }}>
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

        {/* Category section header */}
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
          <aside className="popular" aria-labelledby="pop-title">
            <h3 id="pop-title">{t({ en: "Reported most often", km: "ត្រូវបានរាយការណ៍ច្រើនជាងគេ" })}</h3>
            <ul>
              {totals.slice(0, 4).map(({ cat: c, total }) => (
                <li key={c}>
                  <button type="button" className="pop-item" aria-pressed={cat === c} onClick={() => setCat(cat === c ? "all" : c)}>
                    <span className="pop-line">
                      <span className="pop-name">{t(TYPE_LABELS[c] ?? { en: c, km: c })}</span>
                      <span className="pop-count">
                        {lang === "km" ? `${total} ដង` : `${total} reports`}
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
                en: "Sample data for demonstration — based on the reports below.",
                km: "ទិន្នន័យគំរូសម្រាប់បង្ហាញ — ផ្អែកលើរបាយការណ៍ខាងក្រោម។",
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
                        ? t({ en: "Unsave report", km: "ដកចេញពីការរក្សាទុក" })
                        : t({ en: "Save report", km: "រក្សាទុករបាយការណ៍" })}
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
                        <PlatformIcon name={r.platform} />
                        <span>{r.platform}</span>
                      </span>
                      <button
                        type="button"
                        className="browse-card-btn"
                        onClick={() => setDetailReport(r)}
                      >
                        {t({ en: "View Details", km: "មើលលម្អិត" })}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
              {visibleReports.length === 0 && (
                <p className="empty-msg">{t({ en: "No reports match your search.", km: "រកមិនឃើញរបាយការណ៍ដែលត្រូវនឹងការស្វែងរករបស់អ្នកទេ។" })}</p>
              )}
            </div>
            <p className="reports-disclaimer">
              <IconInfo />
              <span>
                {t({
                  en: "Demo preview: these are sample reports for illustration. In the live version, reports are personal experiences shared anonymously — useful for awareness, but not verified facts.",
                  km: "ការបង្ហាញគំរូ៖ ទាំងនេះជារបាយការណ៍គំរូសម្រាប់ពិពណ៌នា។ ក្នុងកំណែពិត របាយការណ៍គឺជាបទពិសោធន៍ផ្ទាល់ខ្លួនដែលចែករំលែកដោយអនាមិក — មានប្រយោជន៍សម្រាប់បង្កើនការយល់ដឹង ប៉ុន្តែមិនមែនជាការផ្ទៀងផ្ទាត់ជាការពិតទេ។",
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
              <button type="button" className="detail-close" onClick={() => setDetailReport(null)} aria-label={t({ en: "Close", km: "បិទ" })}>
                <IconClose />
              </button>
            </div>
            <div className="detail-body">
              <span className="detail-type">{t(TYPE_LABELS[detailReport.cat] ?? { en: detailReport.cat, km: detailReport.cat })}</span>
              <h3 id="detail-title">{t(detailReport.title)}</h3>
              <p className="detail-desc">{t(detailReport.desc)}</p>
              <div className="detail-meta">
                <span className="browse-card-platform">
                  <PlatformIcon name={detailReport.platform} />
                  <span>{detailReport.platform}</span>
                </span>
                <span className="detail-when">{t(detailReport.when)}</span>
              </div>
              {detailReport.count > 0 && (
                <p className="detail-similar">
                  {lang === "km"
                    ? `+${detailReport.count} របាយការណ៍ស្រដៀងគ្នាបន្ថែមទៀត`
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
