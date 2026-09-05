import { useEffect, useMemo, useState, useCallback } from "react"
import { useLang } from "@/lib/i18n"
import { SCAM_TYPES, TYPE_LABELS } from "@/lib/data"
import { reportsApi } from "@/lib/services"
import { Reveal } from "./reveal"
import { ReportForm } from "./report-form"
import {
  IconGlobe, IconFacebook, IconTelegram, IconWhatsApp,
  IconTikTok, IconInstagram, IconSms, IconInfo, IconSearch,
  IconPlus, IconHeart, IconClose,
  IconBriefcase, IconGift, IconStore, IconChart, IconMail, IconShield,
} from "./icons"

function normalize(report) {
  return {
    id: report.id,
    cat: report.category,
    platform: report.platform,
    count: report.reported_count || 0,
    ts: report.created_at ? new Date(report.created_at).getTime() : 0,
    image: report.screenshot_url || null,
    when: { en: timeAgo(report.created_at), km: timeAgo(report.created_at) },
    title: { en: report.title_en, km: report.title_km || report.title_en },
    desc: { en: report.description_en, km: report.description_km || report.description_en },
    user_id: report.user_id,
    status: report.status,
  }
}

function timeAgo(iso) {
  if (!iso) return ""
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / (24 * 60 * 60 * 1000))
  if (days <= 0) return "Just now"
  if (days === 1) return "1 day ago"
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  return months === 1 ? "1 month ago" : `${months} months ago`
}

const daysAgo = (n) => new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString()

const SAMPLE_REPORTS = [
  {
    id: 1,
    category: "prize",
    platform: "telegram",
    reported_count: 86,
    created_at: daysAgo(2),
    title_en: "Fake cash prize message asks for a fee",
    title_km: "សាររង្វាន់លុយក្លែងក្លាយសុំថ្លៃសេវា",
    description_en:
      "A forwarded message claimed the receiver won a $500 cash prize but had to pay a $15 processing fee first. Asking for an upfront payment is a common scam sign.",
    description_km:
      "សារបញ្ជូនបន្តបានអះអាងថាអ្នកទទួលបានឈ្នះរង្វាន់សាច់ប្រាក់ 500 ដុល្លារ ប៉ុន្តែត្រូវបង់ថ្លៃសេវា 15 ដុល្លារមុន។ ការសុំបង់ប្រាក់ជាមុនគឺជាសញ្ញានៃការបោកប្រាស់។",
  },
  {
    id: 2,
    category: "fake-job",
    platform: "facebook",
    reported_count: 54,
    created_at: daysAgo(4),
    title_en: "Job offer that asks you to pay for training",
    title_km: "ការផ្ដល់ការងារសុំឱ្យអ្នកបង់ថ្លៃហ្វឹកហាត់",
    description_en:
      "A recruiter posted a high-paying remote job but required a payment for 'training materials' before starting. Legitimate employers never ask for money.",
    description_km:
      "អ្នកជ្រើសរើសបុគ្គលិកបានប្រកាសការងារពីចម្ងាយដែលមានប្រាក់ខែខ្ពស់ ប៉ុន្តែទាមទារបង់ប្រាក់សម្រាប់ 'ឯកសារហ្វឹកហាត់' មុនពេលចាប់ផ្ដើម។ និយោជកពិតប្រាកដមិនដែលសុំលុយទេ។",
  },
  {
    id: 3,
    category: "investment",
    platform: "whatsapp",
    reported_count: 41,
    created_at: daysAgo(6),
    title_en: "'Guaranteed' trading group disappears with deposits",
    title_km: "ក្រុមវិនិយោគ 'ចំណេញប្រាកដ' បាត់ខ្លួនជាមួយប្រាក់បញ្ញើ",
    description_en:
      "An WhatsApp group promised guaranteed daily returns on a trading app. After members deposited money, the group and app stopped responding.",
    description_km:
      "ក្រុម WhatsApp មួយបានសន្យាផ្តល់ប្រាក់ចំណេញប្រចាំថ្ងៃប្រាកដលើកម្មវិធីវិនិយោគ។ បន្ទាប់ពីសមាជិកបានដាក់ប្រាក់ ក្រុម និងកម្មវិធីបានឈប់ឆ្លើយតប។",
  },
  {
    id: 4,
    category: "phishing",
    platform: "sms",
    reported_count: 23,
    created_at: daysAgo(8),
    title_en: "Bank SMS with a fake login link",
    title_km: "SMS ពីធនាគារដែលមានតំណភ្ជាប់ចូលគណនីក្លែងក្លាយ",
    description_en:
      "An SMS pretending to be a bank warned of unusual activity and asked to verify the account through a link. The link led to a fake login page that steals credentials.",
    description_km:
      "SMS ក្លែងធ្វើជាធនាគារបានព្រមានពីសកម្មភាពមិនប្រក្រតី ហើយសុំឱ្យផ្ទៀងផ្ទាត់គណនីតាមតំណភ្ជាប់។ តំណភ្ជាប់នាំទៅរកទំព័រចូលក្លែងក្លាយដែលលួចព័ត៌មានគណនី។",
  },
  {
    id: 5,
    category: "fake-seller",
    platform: "instagram",
    reported_count: 17,
    created_at: daysAgo(10),
    title_en: "Online seller vanished after payment",
    title_km: "អ្នកលក់តាមអ៊ីនធឺណិតបាត់ខ្លួនបន្ទាប់ពីទទួលប្រាក់",
    description_en:
      "A user sent money for a phone from an Instagram store with thousands of followers. After payment, the store blocked them and deleted its account.",
    description_km:
      "អ្នកប្រើម្នាក់បានផ្ញើប្រាក់ទិញទូរស័ព្ទពីហាង Instagram ដែលមានអ្នកតាមរាប់ពាន់។ បន្ទាប់ពីបង់ប្រាក់ ហាងបានរារាំងពួកគេ និងលុបគណនីរបស់ខ្លួន។",
  },
  {
    id: 6,
    category: "impersonation",
    platform: "telegram",
    reported_count: 9,
    created_at: daysAgo(12),
    title_en: "Scammer impersonates a friend asking for money",
    title_km: "អ្នកបោកប្រាស់ក្លែងធ្វើជាមិត្តភក្តិសុំលុយ",
    description_en:
      "A scammer used a friend's name and profile photo to ask for an urgent money transfer. The real friend's account had been cloned.",
    description_km:
      "អ្នកបោកប្រាស់បានប្រើឈ្មោះ និងរូបភាពទម្រង់របស់មិត្តភក្តិដើម្បីសុំផ្ញើប្រាក់ជាបន្ទាន់។ គណនីពិតរបស់មិត្តភក្តិត្រូវបានក្លូន។",
  },
]

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
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [usingSample, setUsingSample] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [reportKey, setReportKey] = useState(0)
  const [q, setQ] = useState("")
  const [cat, setCat] = useState("all")
  const [saved, setSaved] = useState(() => new Set())
  const [detailReport, setDetailReport] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    reportsApi
      .list({ limit: 100 })
      .then((res) => {
        if (mounted) setReports((res.reports || []).map(normalize))
      })
      .catch((err) => {
        console.warn("Reports unavailable, using sample data:", err.message)
        if (mounted) {
          setReports(SAMPLE_REPORTS.map(normalize))
          setUsingSample(true)
        }
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  const toggleSave = useCallback((id) => {
    setSaved((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

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
      title: { en: form.title.trim(), km: form.title.trim() },
      desc: { en: form.description.trim(), km: form.description.trim() },
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

        {usingSample && (
          <p className="sample-notice">
            <IconInfo />
            <span>
              {t({
                en: "Live reports are unavailable right now — showing sample reports for preview.",
                km: "របាយការណ៍ផ្ទាល់មិនអាចប្រើបានទេនៅពេលនេះ — កំពុងបង្ហាញរបាយការណ៍គំរូសម្រាប់មើលជាមុន។",
              })}
            </span>
          </p>
        )}

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
          <div>
            <div className="browse-cards">
              {loading && (
                <p className="empty-msg">{t({ en: "Loading reports…", km: "កំពុងផ្ទុករបាយការណ៍…" })}</p>
              )}
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
