import { useCallback, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLang } from "@/lib/i18n"
import { useAuth } from "@/lib/auth"
import { TYPE_LABELS } from "@/lib/data"
import { authApi, reportsApi, usersApi } from "@/lib/services"
import {
  IconBriefcase, IconCamera, IconChart, IconCheck, IconClose, IconEdit,
  IconEye, IconFacebook, IconFile, IconGift, IconGlobe, IconInfo,
  IconInstagram, IconLogOut, IconMail, IconSave, IconSettings, IconShield,
  IconSms, IconStore, IconTelegram, IconTikTok, IconTrash, IconUser,
  IconWhatsApp,
} from "./icons"

const DAY_MS = 24 * 60 * 60 * 1000

const STATUS_META = {
  published: { en: "Published", km: "បានផ្សព្វផ្សាយ" },
  pending: { en: "Under Review", km: "កំពុងពិនិត្យ" },
  review: { en: "Under Review", km: "កំពុងពិនិត្យ" },
  rejected: { en: "Rejected", km: "មិនត្រូវបានអនុម័ត" },
}

const TABS = [
  { id: "saved", label: { en: "Saved Reports", km: "របាយការណ៍ដែលបានរក្សាទុក" }, Icon: IconSave },
  { id: "mine", label: { en: "My Reports", km: "របាយការណ៍របស់ខ្ញុំ" }, Icon: IconFile },
  { id: "settings", label: { en: "Settings", km: "ការកំណត់" }, Icon: IconSettings },
]

const CATEGORY_ICONS = {
  "fake-job": IconBriefcase,
  investment: IconChart,
  prize: IconGift,
  phishing: IconMail,
  "fake-seller": IconStore,
  impersonation: IconShield,
}

const PLATFORM_ICONS = {
  Facebook: IconFacebook,
  Telegram: IconTelegram,
  Whatsapp: IconWhatsApp,
  Tiktok: IconTikTok,
  Instagram: IconInstagram,
  SMS: IconSms,
  "telephone call": IconSms,
  other: IconGlobe,
}

const PLATFORM_COLORS = {
  Facebook: "#1877F2",
  Telegram: "#229ED9",
  Whatsapp: "#25D366",
  Tiktok: "#010101",
  Instagram: "#E1306C",
  SMS: "#2563EB",
  "telephone call": "#2563EB",
  other: "#6b7280",
}

// ------------------------------------------------------------------
// Small helpers
// ------------------------------------------------------------------
function relTime(ts, lang) {
  if (!ts) return ""
  const diff = Date.now() - ts
  const days = Math.floor(diff / DAY_MS)
  if (days <= 0) return lang === "km" ? "ទើបតែ" : "Just now"
  if (days === 1) return lang === "km" ? "1 ថ្ងៃមុន" : "1 day ago"
  if (days < 30) return lang === "km" ? `${days} ថ្ងៃមុន` : `${days} days ago`
  const months = Math.floor(days / 30)
  if (months === 1) return lang === "km" ? "1 ខែមុន" : "1 month ago"
  return lang === "km" ? `${months} ខែមុន` : `${months} months ago`
}

function initials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("")
}

function ProfPlaceholder({ cat, lang }) {
  const Icon = CATEGORY_ICONS[cat] ?? IconInfo
  const label = TYPE_LABELS[cat]
  return (
    <div className="card-img-placeholder">
      <span className="card-img-emoji"><Icon /></span>
      <span className="card-img-label">{label ? (lang === "km" ? label.km : label.en) : cat}</span>
    </div>
  )
}

function ProfPlatformIcon({ name }) {
  const key = (name || "").toLowerCase()
  const Icon = PLATFORM_ICONS[key] ?? IconGlobe
  return <Icon style={PLATFORM_ICONS[key] ? { color: PLATFORM_COLORS[key] } : undefined} />
}

function Toast({ message, onDone }) {
  useEffect(() => {
    if (!message) return undefined
    const id = setTimeout(onDone, 3000)
    return () => clearTimeout(id)
  }, [message, onDone])
  if (!message) return null
  return (
    <div className="prof-toast" role="status" aria-live="polite">
      <IconCheck />
      <span>{message}</span>
    </div>
  )
}

// ------------------------------------------------------------------
// Page
// ------------------------------------------------------------------
export function UserProfile() {
  const { lang, t } = useLang()
  const navigate = useNavigate()
  const { admin, logout, loading } = useAuth()
  const [tab, setTab] = useState("saved")
  const [user, setUser] = useState(() =>
    admin
      ? { id: admin.id, name: admin.name, email: admin.email, phone: admin.phone || null, avatarUrl: admin.avatarUrl || null, createdAt: null }
      : null,
  )
  const [myReports, setMyReports] = useState([])
  const [savedReports, setSavedReports] = useState([])
  const [savedLoading, setSavedLoading] = useState(true)
  const [infoEditing, setInfoEditing] = useState(false)
  const [draft, setDraft] = useState(null)
  const [toast, setToast] = useState(null)
  const [detailReport, setDetailReport] = useState(null)
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" })
  const [avatarUploading, setAvatarUploading] = useState(false)
  const avatarInputRef = useRef(null)

  useEffect(() => {
    let mounted = true
    authApi
      .me()
      .then((res) => {
        if (!mounted) return
        const u = res.user || {}
        setUser({
          id: u.id || admin?.id,
          name: u.name || admin?.name || "",
          email: u.email || admin?.email || "",
          phone: u.phone || null,
          avatarUrl: u.avatarUrl || null,
          createdAt: u.createdAt || null,
        })
      })
      .catch(() => {
        if (!mounted) return
        setUser(admin ? { id: admin.id, name: admin.name, email: admin.email, phone: admin.phone || null, avatarUrl: admin.avatarUrl || null, createdAt: null } : null)
      })
    return () => {
      mounted = false
    }
  }, [admin])

  useEffect(() => {
    const uid = user?.id
    if (!uid) return
    let mounted = true
    reportsApi
      .list({ limit: 100 })
      .then((res) => {
        if (!mounted) return
        const mine = (res.reports || [])
          .filter((r) => r.user_id === uid)
          .map((r) => ({
            id: r.id,
            status: r.status,
            ts: r.created_at ? new Date(r.created_at).getTime() : 0,
            reason: null,
            title: { en: r.title_en, km: r.title_km || r.title_en },
          }))
        setMyReports(mine)
      })
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [user?.id])

  useEffect(() => {
    if (!user?.id) return
    let mounted = true
    setSavedLoading(true)
    reportsApi
      .listSaved()
      .then((res) => {
        if (!mounted) return
        const list = (res.reports || []).map((r) => ({
          id: r.id,
          cat: r.category,
          platform: r.platform,
          ts: r.created_at ? new Date(r.created_at).getTime() : 0,
          image: r.screenshot_url || null,
          title: { en: r.title_en, km: r.title_km || r.title_en },
          desc: { en: r.description_en, km: r.description_km || r.description_en },
          is_anonymous: r.is_anonymous ?? false,
          display_name: r.display_name || null,
          display_avatar_seed: r.display_avatar_seed || null,
        }))
        setSavedReports(list)
      })
      .catch(() => {})
      .finally(() => { if (mounted) setSavedLoading(false) })
    return () => { mounted = false }
  }, [user?.id])
  const showToast = useCallback((message) => setToast(message), [])
  const clearToast = useCallback(() => setToast(null), [])

  const unsaveReport = useCallback((reportId) => {
    setSavedReports((prev) => prev.filter((r) => r.id !== reportId))
    reportsApi.unsave(reportId).catch(() => {
      reportsApi.listSaved().then((res) => {
        const list = (res.reports || []).map((r) => ({
          id: r.id,
          cat: r.category,
          platform: r.platform,
          ts: r.created_at ? new Date(r.created_at).getTime() : 0,
          image: r.screenshot_url || null,
          title: { en: r.title_en, km: r.title_km || r.title_en },
          desc: { en: r.description_en, km: r.description_km || r.description_en },
          is_anonymous: r.is_anonymous ?? false,
          display_name: r.display_name || null,
          display_avatar_seed: r.display_avatar_seed || null,
        }))
        setSavedReports(list)
      }).catch(() => {})
    })
  }, [])
  const comingSoon = () =>
    showToast(t({ en: "This action is coming soon.", km: "សកម្មភាពនេះនឹងមានក្នុងពេលឆាប់ៗនេះ។" }))

  const startEditing = () => {
    setDraft({ ...user })
    setInfoEditing(true)
  }
  const cancelEditing = () => {
    setDraft(null)
    setInfoEditing(false)
  }
  const saveInfo = async (e) => {
    e.preventDefault()
    if (!draft) return
    if (!draft.name || !String(draft.name).trim()) {
      showToast(t({ en: "Full name is required.", km: "ត្រូវការឈ្មោះពេញ។" }))
      return
    }
    if (draft.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(draft.email).trim())) {
      showToast(t({ en: "Please enter a valid email address.", km: "សូមបញ្ចូលអ៊ីមែលដែលមានសុពលភាព។" }))
      return
    }
    if (!draft.phone || !String(draft.phone).trim()) {
      showToast(t({ en: "Phone number is required.", km: "ត្រូវការលេខទូរស័ព្ទ។" }))
      return
    }
    try {
      const res = await usersApi.updateMe({ name: draft.name, phone: draft.phone })
      const u = res.user
      setUser((prev) => ({
        ...prev,
        name: u.name,
        phone: u.phone || null,
        email: u.email || prev.email,
        avatarUrl: u.avatarUrl || prev.avatarUrl,
      }))
      setDraft(null)
      setInfoEditing(false)
      showToast(t({ en: "Profile updated", km: "ទម្រង់ត្រូវបានធ្វើបច្ចុប្បន្នភាព" }))
    } catch (err) {
      showToast(err.message || t({ en: "Could not update profile", km: "មិនអាចធ្វើបច្ចុប្បន្នភាពទម្រង់បានទេ" }))
    }
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    setAvatarUploading(true)
    try {
      const res = await usersApi.avatar(file)
      setUser((prev) => ({ ...prev, avatarUrl: res.user.avatarUrl }))
      showToast(t({ en: "Profile photo updated", km: "រូបថតទម្រង់ត្រូវបានធ្វើបច្ចុប្បន្នភាព" }))
    } catch (err) {
      showToast(err.message || t({ en: "Could not update profile photo", km: "មិនអាចធ្វើបច្ចុប្បន្នភាពរូបថតទម្រង់បានទេ" }))
    } finally {
      setAvatarUploading(false)
      if (avatarInputRef.current) avatarInputRef.current.value = ""
    }
  }

  const submitPassword = async (e) => {
    e.preventDefault()
    if (passwords.next !== passwords.confirm) {
      showToast(t({ en: "New passwords do not match", km: "ពាក្យសម្ងាត់ថ្មីមិនត្រូវគ្នាទេ" }))
      return
    }
    try {
      await usersApi.changePassword({ currentPassword: passwords.current, newPassword: passwords.next })
      setPasswords({ current: "", next: "", confirm: "" })
      showToast(t({ en: "Password updated", km: "ពាក្យសម្ងាត់ត្រូវបានធ្វើបច្ចុប្បន្នភាព" }))
    } catch (err) {
      showToast(err.message || t({ en: "Could not update password", km: "មិនអាចធ្វើបច្ចុប្បន្នភាពពាក្យសម្ងាត់បានទេ" }))
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const openReportPanel = () => navigate("/report", { state: { openReport: true } })

  const pwdMismatch = Boolean(passwords.next && passwords.confirm && passwords.next !== passwords.confirm)

  if (loading) return null

  if (!user) {
    return (
      <section className="profile" id="profile">
        <div className="container">
          <div className="prof-empty">
            <span className="prof-empty-ic"><IconUser /></span>
            <p>{t({ en: "Please log in to view your profile.", km: "សូមចូលគណនីដើម្បីមើលទម្រង់របស់អ្នក។" })}</p>
            <Link className="btn btn--teal" to="/login">
              {t({ en: "Log in", km: "ចូលគណនី" })}
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="profile" id="profile" aria-labelledby="profile-title">
        <div className="container">
          <h1 className="sr-only" id="profile-title">{t({ en: "My Profile", km: "ទម្រង់របស់ខ្ញុំ" })}</h1>

          <div className="prof-card">
            <div className="prof-card-head">
              <div className="prof-head">
                <div className="prof-avatar">
                  {user.avatarUrl ? (
                    <img className="prof-avatar-img" src={user.avatarUrl} alt="" />
                  ) : (
                    <span className="prof-avatar-init">{initials(user.name)}</span>
                  )}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    ref={avatarInputRef}
                    onChange={handleAvatarChange}
                    className="prof-avatar-input"
                    aria-hidden="true"
                    tabIndex={-1}
                  />
                  <button
                    type="button"
                    className={`prof-avatar-cam${avatarUploading ? " uploading" : ""}`}
                    onClick={() => avatarInputRef.current?.click()}
                    disabled={avatarUploading}
                    aria-label={t({ en: "Change profile photo", km: "ផ្លាស់ប្តូររូបថតទម្រង់" })}
                  >
                    <IconCamera />
                  </button>
                </div>
                <div className="prof-head-text">
                  <span className="prof-head-name">{user.name}</span>
                </div>
              </div>

              <nav className="prof-nav" aria-label={t({ en: "Profile sections", km: "ផ្នែកនៃទម្រង់" })}>
                {TABS.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    className={`prof-nav-btn${tab === id ? " active" : ""}`}
                    aria-current={tab === id ? "true" : undefined}
                    onClick={() => setTab(id)}
                  >
                    <Icon />
                    <span>{t(label)}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="prof-panel" key={tab} aria-live="polite">
              {tab === "saved" && (
                <>
                  <div className="prof-panel-head">
                    <div>
                      <h2>{t({ en: "Saved Reports", km: "របាយការណ៍ដែលបានរក្សាទុក" })}</h2>
                    </div>
                  </div>
                  {savedLoading ? (
                    <div className="browse-cards prof-saved-grid">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div className="skeleton-card" key={`skel-${i}`}>
                          <div className="skeleton-img" />
                          <div className="skeleton-body">
                            <div className="skeleton skeleton-line w80" />
                            <div className="skeleton skeleton-line w60" />
                            <div className="skeleton skeleton-line w40" style={{ marginTop: "0.5rem" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : savedReports.length === 0 ? (
                    <div className="prof-empty">
                      <span className="prof-empty-ic"><IconSave /></span>
                      <p>{t({ en: "You haven't saved any reports yet.", km: "អ្នកមិនទាន់បានរក្សាទុករបាយការណ៍ណាមួយនៅឡើយទេ។" })}</p>
                      <Link className="prof-empty-link" to="/report">
                        {t({ en: "Browse Scam Reports", km: "មើលរបាយការណ៍អំពីការបោកប្រាស់" })}
                      </Link>
                    </div>
                  ) : (
                    <div className="browse-cards prof-saved-grid">
                      {savedReports.map((r) => (
                        <article
                          className="browse-card prof-saved-card"
                          key={r.id}
                          onClick={() => setDetailReport(r)}
                        >
                          <div className="browse-card-img">
                            {r.image ? (
                              <img src={r.image} alt="" loading="lazy" />
                            ) : (
                              <ProfPlaceholder cat={r.cat} lang={lang} />
                            )}
                            <span className="browse-card-save saved" onClick={(e) => { e.stopPropagation(); unsaveReport(r.id) }} aria-label={t({ en: "Unsave report", km: "ដកចេញពីការរក្សាទុក" })}>
                              <IconSave filled />
                            </span>
                            <span className="prof-cat-pill">
                              {t(TYPE_LABELS[r.cat] ?? { en: r.cat, km: r.cat })}
                            </span>
                          </div>
                          <div className="browse-card-body">
                            <div className="browse-card-author">
                              <span className={`browse-card-avatar ${r.is_anonymous ? "anon" : ""}`} aria-hidden="true">
                                {r.is_anonymous
                                  ? <IconInfo />
                                  : <span>{initials(r.display_name) || "U"}</span>}
                              </span>
                              <span className="browse-card-authorname">
                                {r.is_anonymous ? r.display_name : r.display_name || "Angket User"}
                              </span>
                              {r.is_anonymous && (
                                <span className="browse-card-anonbadge">{t({ en: "Anonymous", km: "អនាមិក" })}</span>
                              )}
                            </div>
                            <h3 className="browse-card-title">{t(r.title)}</h3>
                            <p className="browse-card-desc">{t(r.desc)}</p>
                            <div className="browse-card-foot">
                              <span className="browse-card-platform">
                                <ProfPlatformIcon name={r.platform} />
                                <span>{r.platform}</span>
                              </span>
                              <button
                                type="button"
                                className="browse-card-btn"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setDetailReport(r)
                                }}
                              >
                                {t({ en: "See More", km: "មើលច្រើនទៀត" })}
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </>
              )}

              {tab === "mine" && (
                <>
                  <div className="prof-panel-head">
                    <div>
                      <h2>{t({ en: "My Reports", km: "របាយការណ៍របស់ខ្ញុំ" })}</h2>
                    </div>
                  </div>
                  {myReports.length === 0 ? (
                    <div className="prof-empty">
                      <span className="prof-empty-ic"><IconFile /></span>
                      <p>{t({ en: "You haven't posted any reports yet.", km: "អ្នកមិនទាន់បានបង្ហោះរបាយការណ៍ណាមួយនៅឡើយទេ។" })}</p>
                      <button type="button" className="prof-empty-link" onClick={openReportPanel}>
                        {t({ en: "Post a report", km: "បង្ហោះរបាយការណ៍" })}
                      </button>
                    </div>
                  ) : (
                    <ul className="prof-mine-list">
                      {myReports.map((r) => (
                        <li className="prof-mine-row" key={r.id}>
                          <div className="prof-mine-main">
                            <span className="prof-mine-title">{t(r.title)}</span>
                            <span
                              className={`prof-status prof-status--${r.status}`}
                              title={r.status === "rejected" ? t(r.reason) : undefined}
                            >
                              {t(STATUS_META[r.status] ?? { en: r.status, km: r.status })}
                            </span>
                            <span className="prof-mine-date">{relTime(r.ts, lang)}</span>
                          </div>
                          <div className="prof-mine-actions">
                            <button type="button" onClick={comingSoon}>
                              <IconEye />
                              {t({ en: "View", km: "មើល" })}
                            </button>
                            <button type="button" onClick={comingSoon}>
                              <IconEdit />
                              {t({ en: "Edit", km: "កែសម្រួល" })}
                            </button>
                            <button type="button" className="prof-danger" onClick={comingSoon}>
                              <IconTrash />
                              {t({ en: "Delete", km: "លុប" })}
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}

              {tab === "settings" && (
                <>
                  {infoEditing ? (
                    <form className="set-section" id="prof-edit-form" onSubmit={saveInfo} noValidate>
                      <div className="set-section-head">
                        <h2>{t({ en: "Profile", km: "ទម្រង់" })}</h2>
                        <div className="set-edit-actions">
                          <button type="submit" className="btn btn--teal">
                            {t({ en: "Save", km: "រក្សាទុក" })}
                          </button>
                          <button type="button" className="set-cancel-btn" onClick={cancelEditing}>
                            {t({ en: "Cancel", km: "បោះបង់" })}
                          </button>
                        </div>
                      </div>
                      <div className="set-fields">
                        <div className="set-field">
                          <label className="set-label" htmlFor="pf-name">
                            {t({ en: "Full Name", km: "ឈ្មោះពេញ" })}
                          </label>
                          <input
                            id="pf-name"
                            className="control"
                            type="text"
                            value={draft.name}
                            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                          />
                        </div>
                        <div className="set-field">
                          <label className="set-label" htmlFor="pf-email">Email</label>
                          <input
                            id="pf-email"
                            className="control"
                            type="email"
                            value={draft.email}
                            readOnly
                          />
                        </div>
                        <div className="set-field">
                          <label className="set-label" htmlFor="pf-phone">
                            {t({ en: "Phone", km: "លេខទូរស័ព្ទ" })}
                          </label>
                          <input
                            id="pf-phone"
                            className="control"
                            type="tel"
                            value={draft.phone}
                            onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
                          />
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className="set-section">
                      <div className="set-section-head">
                        <h2>{t({ en: "Profile", km: "ទម្រង់" })}</h2>
                        <button type="button" className="set-edit-btn" onClick={startEditing}>
                          <IconEdit />
                          {t({ en: "Edit", km: "កែសម្រួល" })}
                        </button>
                      </div>

                      <div className="set-fields">
                        <div className="set-field">
                          <span className="set-label">{t({ en: "Full Name", km: "ឈ្មោះពេញ" })}</span>
                          <span className="set-value">{user.name}</span>
                        </div>
                        <div className="set-field">
                          <span className="set-label">Email</span>
                          <span className="set-value">{user.email}</span>
                        </div>
                        <div className="set-field">
                          <span className="set-label">{t({ en: "Phone", km: "លេខទូរស័ព្ទ" })}</span>
                          <span className="set-value">{user.phone || "—"}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <hr className="set-divider" />

                  <div className="set-section">
                    <div className="set-section-head">
                      <h2>{t({ en: "Password", km: "ពាក្យសម្ងាត់" })}</h2>
                    </div>
                    <p className="set-sub">{t({ en: "Choose a strong password you don't use elsewhere.", km: "ជ្រើសរើសពាក្យសម្ងាត់ដ៏រឹងមាំដែលអ្នកមិនប្រើនៅកន្លែងផ្សេង។" })}</p>
                    <form className="set-fields set-fields--pwd" onSubmit={submitPassword} noValidate>
                      <div className="set-field">
                        <label className="set-label" htmlFor="pw-current">
                          {t({ en: "Current Password", km: "ពាក្យសម្ងាត់បច្ចុប្បន្ន" })}
                        </label>
                        <input
                          id="pw-current"
                          className="control"
                          type="password"
                          autoComplete="current-password"
                          value={passwords.current}
                          onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))}
                        />
                      </div>
                      <div className="set-field">
                        <label className="set-label" htmlFor="pw-new">
                          {t({ en: "New Password", km: "ពាក្យសម្ងាត់ថ្មី" })}
                        </label>
                        <input
                          id="pw-new"
                          className="control"
                          type="password"
                          autoComplete="new-password"
                          value={passwords.next}
                          onChange={(e) => setPasswords((p) => ({ ...p, next: e.target.value }))}
                        />
                      </div>
                      <div className="set-field">
                        <label className="set-label" htmlFor="pw-confirm">
                          {t({ en: "Confirm New Password", km: "បញ្ជាក់ពាក្យសម្ងាត់ថ្មី" })}
                        </label>
                        <input
                          id="pw-confirm"
                          className="control"
                          type="password"
                          autoComplete="new-password"
                          value={passwords.confirm}
                          onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
                        />
                      </div>
                      {pwdMismatch && (
                        <p className="set-error" role="alert">
                          {t({ en: "New passwords do not match.", km: "ពាក្យសម្ងាត់ថ្មីមិនត្រូវគ្នាទេ។" })}
                        </p>
                      )}
                      <div className="set-pwd-actions">
                        <button
                          type="submit"
                          className="btn btn--teal"
                          disabled={!passwords.next || pwdMismatch}
                        >
                          {t({ en: "Update Password", km: "ធ្វើបច្ចុប្បន្នភាពពាក្យសម្ងាត់" })}
                        </button>
                      </div>
                    </form>
                  </div>

                  <hr className="set-divider" />

                  <div className="set-account">
                    <div className="set-account-info">
                      <span className="set-label">{t({ en: "Signed in as", km: "បានចូលគណនីជា" })}</span>
                      <strong>{user.email}</strong>
                    </div>
                    <button type="button" className="btn set-logout-btn" onClick={handleLogout}>
                      <IconLogOut />
                      {t({ en: "Log Out", km: "ចេញពីគណនី" })}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {detailReport && (
          <>
            <div className="detail-overlay" onClick={() => setDetailReport(null)} />
            <div className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="prof-detail-title">
              <div className="detail-img-area">
                {detailReport.image ? (
                  <img src={detailReport.image} alt="" />
                ) : (
                  <ProfPlaceholder cat={detailReport.cat} lang={lang} />
                )}
                <button
                  type="button"
                  className="detail-close"
                  onClick={() => setDetailReport(null)}
                  aria-label={t({ en: "Close", km: "បិទ" })}
                >
                  <IconClose />
                </button>
              </div>
              <div className="detail-body">
                <span className="detail-type">{t(TYPE_LABELS[detailReport.cat] ?? { en: detailReport.cat, km: detailReport.cat })}</span>
                <h3 id="prof-detail-title">{t(detailReport.title)}</h3>
                <p className="detail-desc">{t(detailReport.desc)}</p>
                <div className="detail-meta">
                  <span className="browse-card-platform">
                    <ProfPlatformIcon name={detailReport.platform} />
                    <span>{detailReport.platform}</span>
                  </span>
                  <span className="detail-when">{relTime(detailReport.ts, lang)}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
      <Toast message={toast} onDone={clearToast} />
    </>
  )
}