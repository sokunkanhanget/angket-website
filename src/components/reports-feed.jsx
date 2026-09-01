import { useMemo, useState } from "react"
import { useLang } from "@/lib/i18n"
import { DEMO_REPORTS, SCAM_TYPES, TYPE_LABELS } from "@/lib/data"
import { Reveal } from "./reveal"
import { ReportForm } from "./report-form"
import { IconGlobe, IconFacebook, IconTelegram, IconWhatsApp, IconTikTok, IconInstagram, IconSms, IconInfo, IconSearch, IconPlus } from "./icons"

const PLATFORM_ICONS = {
  facebook: IconFacebook,
  telegram: IconTelegram,
  whatsapp: IconWhatsApp,
  tiktok: IconTikTok,
  instagram: IconInstagram,
  sms: IconSms,
}

const PLATFORM_COLORS = {
  facebook: "#1877F2",
  telegram: "#229ED9",
  whatsapp: "#25D366",
  tiktok: "#010101",
  instagram: "#E1306C",
  sms: "#2563EB",
}

function PlatformIcon({ name }) {
  const key = (name || "").toLowerCase()
  const Icon = PLATFORM_ICONS[key] ?? IconGlobe
  return <Icon style={PLATFORM_ICONS[key] ? { color: PLATFORM_COLORS[key] } : undefined} />
}

export function ReportsFeed() {
  const { lang, t } = useLang()
  const [reports, setReports] = useState(DEMO_REPORTS)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [reportKey, setReportKey] = useState(0)
  const [q, setQ] = useState("")
  const [cat, setCat] = useState("all")
  const [sort, setSort] = useState("recent")

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
      const hay = [r.title.en, r.title.km, r.desc.en, r.desc.km, r.platform, TYPE_LABELS[r.cat]?.en, TYPE_LABELS[r.cat]?.km, TYPE_LABELS[r.cat]?.en ?? r.cat, r.cat]
        .join(" ")
        .toLowerCase()
      return hay.includes(needle)
    })
    if (sort === "top") list = [...list].sort((a, b) => b.count - a.count)
    return list
  }, [q, cat, sort, reports])

  const pickCategory = (value) => {
    setCat(value)
  }

  const togglePopular = (value) => {
    setCat(cat === value ? "all" : value)
  }

  const handleSubmitted = (form) => {
    const newReport = {
      id: Date.now(),
      cat: form.inPicture,
      platform: form.platform.trim(),
      count: 0,
      when: { en: "Just now", km: "ទើបតែបានរាយការណ៍" },
      title: {
        en: `Scam reported via ${form.platform.trim()}`,
        km: `របាយការណ៍ការបោកប្រាស់តាម ${form.platform.trim()}`,
      },
      desc: {
        en: `How they contacted you: ${form.contacted.trim()} What they asked for: ${form.askedFor.trim()}`,
        km: `របៀបទំនាក់ទំនងមកអ្នក៖ ${form.contacted.trim()} អ្វីដែលពួកគេសុំ៖ ${form.askedFor.trim()}`,
      },
      // Represents the anonymous reporter's db reference (user_id). Persisted
      // but intentionally never rendered on this public feed.
      user_id: null,
      status: "published",
    }
    // TODO: in production, persist to the API (status = 'published' by default,
    // no admin approval) then rely on the returned record here.
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

        <div className="report-tools">
          <div className="search-wrap">
            <IconSearch />
            <label className="sr-only" htmlFor="filter-q">
              {t({ en: "Search reports", km: "ស្វែងរករបាយការណ៍" })}
            </label>
            <input
              type="search"
              id="filter-q"
              className="control"
              autoComplete="off"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t({ en: "Search reports…", km: "ស្វែងរករបាយការណ៍…" })}
            />
          </div>

          <label className="sr-only" htmlFor="filter-cat">
            {t({ en: "Filter by category", km: "ត្រងតាមប្រភេទ" })}
          </label>
          <select className="control" id="filter-cat" value={cat} onChange={(e) => pickCategory(e.target.value)}>
            <option value="all">{t({ en: "All categories", km: "ប្រភេទទាំងអស់" })}</option>
            {SCAM_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {t(type)}
              </option>
            ))}
          </select>

          <div className="seg" role="group" aria-label="Sort reports">
            <button
              type="button"
              className="chip-btn"
              aria-pressed={sort === "recent"}
              onClick={() => setSort("recent")}
            >
              {t({ en: "Recent", km: "ថ្មីបំផុត" })}
            </button>
            <button type="button" className="chip-btn" aria-pressed={sort === "top"} onClick={() => setSort("top")}>
              {t({ en: "Most reported", km: "ច្រើនជាងគេ" })}
            </button>
          </div>

          <button type="button" className="btn btn-primary report-add" onClick={() => { setReportKey((k) => k + 1); setDrawerOpen(true) }}>
            <IconPlus />
            <span>{t({ en: "Report", km: "រាយការណ៍" })}</span>
          </button>
        </div>

        <div className="reports-layout">
          <aside className="popular" aria-labelledby="pop-title">
            <h3 id="pop-title">{t({ en: "Reported most often", km: "ត្រូវបានរាយការណ៍ច្រើនជាងគេ" })}</h3>
            <ul>
              {totals.slice(0, 4).map(({ cat: c, total }) => (
                <li key={c}>
                  <button type="button" className="pop-item" aria-pressed={cat === c} onClick={() => togglePopular(c)}>
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
            <div className="cards">
              {visibleReports.map((r) => (
                <article className="card" key={r.id}>
                  <div className="card-top">
                    <span className="type-badge">{t(TYPE_LABELS[r.cat] ?? { en: r.cat, km: r.cat })}</span>
                    <time className="when">{t(r.when)}</time>
                  </div>
                  <h3>{t(r.title)}</h3>
                  <p className="desc">{t(r.desc)}</p>
                  <div className="card-foot">
                    <span className="platform">
                      <PlatformIcon name={r.platform} />
                      <span>{r.platform}</span>
                    </span>
                    {r.count > 0 && (
                      <span className="sim-badge">
                        {lang === "km" ? `+${r.count} របាយការណ៍ស្រដៀងគ្នា` : `+${r.count} similar reports`}
                      </span>
                    )}
                  </div>
                </article>
              ))}
              {visibleReports.length === 0 && (
                <p className="empty-msg">{t({ en: "No reports match your search.", km: "រកមិនឃើញរបាយការណ៍ត្រូវនឹងការស្វែងរករបស់អ្នកទេ។" })}</p>
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

      <ReportForm key={reportKey} open={drawerOpen} onClose={() => setDrawerOpen(false)} onSubmitted={handleSubmitted} />
    </section>
  )
}
