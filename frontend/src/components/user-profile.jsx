import { useCallback, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { User } from "lucide-react"
import { useLang } from "@/lib/i18n"
import { useAuth } from "@/lib/auth"
import { TYPE_LABELS } from "@/lib/data"
import { authApi, reportsApi, usersApi } from "@/lib/services"
import { ReportForm } from "./report-form"
import { PasswordInput } from "@/components/auth/PasswordInput"
import {
  IconBriefcase, IconCamera, IconChart, IconCheck, IconClose, IconEdit,
  IconFacebook, IconFile, IconGift, IconGlobe, IconInfo,
  IconInstagram, IconLogOut, IconMail, IconSave, IconSettings, IconShield,
  IconSms, IconStore, IconTelegram, IconTikTok, IconTrash, IconUser,
  IconWhatsApp,
} from "./icons"

const PASSWORD_RULES = [
  { key: "length", test: (v) => v.length >= 8, en: "At least 8 characters", km: "យ៉ាងតិច ៨ តួអក្សរ" },
  { key: "upper", test: (v) => /[A-Z]/.test(v), en: "One uppercase letter (A-Z)", km: "អក្សរធំមួយ (A-Z)" },
  { key: "lower", test: (v) => /[a-z]/.test(v), en: "One lowercase letter (a-z)", km: "អក្សរតូចមួយ (a-z)" },
  { key: "number", test: (v) => /[0-9]/.test(v), en: "One number (0-9)", km: "លេខមួយ (0-9)" },
  { key: "special", test: (v) => /[^A-Za-z0-9]/.test(v), en: "One special character (!@#…)", km: "តួអក្សរពិសេសមួយ (!@#…)" },
]

function passwordStrength(v) {
  if (!v) return 0
  const passed = PASSWORD_RULES.reduce((n, r) => n + (r.test(v) ? 1 : 0), 0)
  if (passed <= 2) return 1
  if (passed === 3 || passed === 4) return passed < 5 && v.length < 12 ? 2 : 3
  return v.length >= 12 ? 4 : 3
}

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

// ------------------------------------------------------------------
// Small helpers
// ------------------------------------------------------------------
// Postgres timestamps without a timezone come back with no "Z"/offset; treat them as UTC.
function parseServerDate(value) {
  if (!value) return new Date(NaN)
  if (typeof value === "string" && !/[zZ]|[+-]\d{2}:?\d{2}$/.test(value)) {
    return new Date(`${value}Z`)
  }
  return new Date(value)
}

function relTime(ts, lang) {
  if (!ts) return ""
  const diffMs = Date.now() - ts
  const minutes = Math.floor(diffMs / (60 * 1000))
  if (minutes < 1) return lang === "km" ? "ទើបតែ" : "Just now"
  if (minutes < 60) {
    return lang === "km" ? `${minutes} នាទីមុន` : `${minutes} min${minutes === 1 ? "" : "s"} ago`
  }
  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return lang === "km" ? `${hours} ម៉ងមុន` : `${hours} hour${hours === 1 ? "" : "s"} ago`
  }
  const days = Math.floor(hours / 24)
  if (days === 1) return lang === "km" ? "1 ថ្ងៃមុន" : "1 day ago"
  if (days < 7) return lang === "km" ? `${days} ថ្ងៃមុន` : `${days} days ago`
  const date = new Date(ts)
  const dd = String(date.getDate()).padStart(2, "0")
  const mm = String(date.getMonth() + 1).padStart(2, "0")
  const yy = String(date.getFullYear()).slice(-2)
  const hh = String(date.getHours()).padStart(2, "0")
  const min = String(date.getMinutes()).padStart(2, "0")
  return `${dd}/${mm}/${yy} ${hh}:${min}`
}

function initials(name) {
  return String(name || "")
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
  const [mineReloadKey, setMineReloadKey] = useState(0)
  const [editingReport, setEditingReport] = useState(null)
  const [editDrawerOpen, setEditDrawerOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [infoEditing, setInfoEditing] = useState(false)
  const [draft, setDraft] = useState(null)
  const [toast, setToast] = useState(null)
  const [detailReport, setDetailReport] = useState(null)
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" })
  const [pwdErrs, setPwdErrs] = useState({})
  const [avatarUploading, setAvatarUploading] = useState(false)
  const [avatarDeleting, setAvatarDeleting] = useState(false)
  const [avatarOptionsOpen, setAvatarOptionsOpen] = useState(false)
  const [avatarView, setAvatarView] = useState(null)
  const avatarInputRef = useRef(null)
  const avatarOptionsRef = useRef(null)

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
            ts: r.created_at ? parseServerDate(r.created_at).getTime() : 0,
            reason: null,
            cat: r.category,
            category: r.category,
            platform: r.platform,
            image: r.screenshot_url || (Array.isArray(r.images) ? r.images[0] : null) || null,
            screenshot_url: r.screenshot_url || (Array.isArray(r.images) ? r.images[0] : null) || null,
            title: { en: r.title_en, km: r.title_km || r.title_en },
            title_en: r.title_en,
            title_km: r.title_km,
            desc: { en: r.description_en, km: r.description_km || r.description_en },
            description_en: r.description_en,
            description_km: r.description_km,
            date_occurred: r.date_occurred || null,
            is_anonymous: r.is_anonymous ?? false,
            author_name: r.author_name || null,
            author_avatar_url: r.author_avatar_url || null,
          }))
        setMyReports(mine)
      })
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [user?.id, mineReloadKey])

  useEffect(() => {
    if (!user?.id || tab !== "saved") return
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
          ts: r.created_at ? parseServerDate(r.created_at).getTime() : 0,
          image: r.screenshot_url || null,
          title: { en: r.title_en, km: r.title_km || r.title_en },
          desc: { en: r.description_en, km: r.description_km || r.description_en },
          is_anonymous: r.is_anonymous ?? false,
          display_name: r.display_name || null,
          display_avatar_seed: r.display_avatar_seed || null,
          author_name: r.author_name || null,
          author_avatar_url: r.author_avatar_url || null,
        }))
        setSavedReports(list)
      })
      .catch(() => {})
      .finally(() => { if (mounted) setSavedLoading(false) })
    return () => { mounted = false }
  }, [user?.id, tab])

  useEffect(() => {
    if (!avatarOptionsOpen) return
    const onDown = (e) => {
      if (avatarOptionsRef.current && !avatarOptionsRef.current.contains(e.target)) setAvatarOptionsOpen(false)
    }
    const onKey = (e) => { if (e.key === "Escape") setAvatarOptionsOpen(false) }
    document.addEventListener("mousedown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [avatarOptionsOpen])

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
          ts: r.created_at ? parseServerDate(r.created_at).getTime() : 0,
          image: r.screenshot_url || null,
          title: { en: r.title_en, km: r.title_km || r.title_en },
          desc: { en: r.description_en, km: r.description_km || r.description_en },
          is_anonymous: r.is_anonymous ?? false,
          display_name: r.display_name || null,
          display_avatar_seed: r.display_avatar_seed || null,
          author_name: r.author_name || null,
          author_avatar_url: r.author_avatar_url || null,
        }))
        setSavedReports(list)
      }).catch(() => {})
    })
  }, [])
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
    setAvatarOptionsOpen(false)
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

  const openAvatarOptions = () => setAvatarOptionsOpen((v) => !v)
  const openAvatarView = () => {
    if (user?.avatarUrl) setAvatarView(user.avatarUrl)
    setAvatarOptionsOpen(false)
  }
  const triggerAvatarUpload = () => {
    setAvatarOptionsOpen(false)
    avatarInputRef.current?.click()
  }
  const deleteAvatar = async () => {
    setAvatarOptionsOpen(false)
    setAvatarDeleting(true)
    try {
      await usersApi.removeAvatar()
      setUser((prev) => ({ ...prev, avatarUrl: null }))
      showToast(t({ en: "Profile photo removed", km: "រូបថតទម្រង់ត្រូវបានលុប" }))
    } catch (err) {
      showToast(err.message || t({ en: "Could not remove profile photo", km: "មិនអាចលុបរូបថតទម្រង់បានទេ" }))
    } finally {
      setAvatarDeleting(false)
    }
  }

  const submitPassword = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!passwords.current.trim()) {
      errs.current = t({ en: "Enter your current password.", km: "បញ្ចូលពាក្យសម្ងាត់បច្ចុប្បន្ន។" })
    }
    if (PASSWORD_RULES.some((r) => !r.test(passwords.next))) {
      errs.next = t({ en: "New password does not meet all requirements.", km: "ពាក្យសម្ងាត់ថ្មីមិនគ្រប់តាមលក្ខខណ្ឌទាំងអស់។" })
    }
    if (passwords.next !== passwords.confirm || !passwords.confirm) {
      errs.confirm = t({ en: "New passwords do not match.", km: "ពាក្យសម្ងាត់ថ្មីមិនត្រូវគ្នាទេ។" })
    }
    setPwdErrs(errs)
    if (Object.keys(errs).length > 0) return

    try {
      await usersApi.changePassword({ currentPassword: passwords.current, newPassword: passwords.next })
      setPasswords({ current: "", next: "", confirm: "" })
      setPwdErrs({})
      showToast(t({ en: "Password updated", km: "ពាក្យសម្ងាត់ត្រូវបានធ្វើបច្ចុប្បន្នភាព" }))
    } catch (err) {
      const fields = err.data?.fields
      if (fields && (fields.currentPassword || fields.newPassword)) {
        const mapped = {}
        if (fields.currentPassword) mapped.current = fields.currentPassword
        if (fields.newPassword) mapped.next = fields.newPassword
        setPwdErrs(mapped)
      } else if (err.message && /incorrect/i.test(err.message)) {
        setPwdErrs((p) => ({ ...p, current: err.message }))
      } else {
        showToast(err.message || t({ en: "Could not update password", km: "មិនអាចធ្វើបច្ចុប្បន្នភាពពាក្យសម្ងាត់បានទេ" }))
      }
    }
  }

  const setPwdField = (key) => (e) => {
    const value = e.target.value
    setPasswords((p) => ({ ...p, [key]: value }))
    setPwdErrs((p) => {
      const next = { ...p }
      delete next[key]
      if (key === "next" && p.confirm) {
        if (value !== p.confirm) next.confirm = t({ en: "New passwords do not match.", km: "ពាក្យសម្ងាត់ថ្មីមិនត្រូវគ្នាទេ។" })
        else delete next.confirm
      }
      return next
    })
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const openReportPanel = () => navigate("/report", { state: { openReport: true } })

  const openEdit = (report) => {
    setEditingReport(report)
    setEditDrawerOpen(true)
  }

  const closeEdit = () => {
    setEditDrawerOpen(false)
    setEditingReport(null)
  }

  const handleEditSubmitted = () => {
    setEditDrawerOpen(false)
    setEditingReport(null)
    setMineReloadKey((k) => k + 1)
    showToast(t({ en: "Report updated", km: "របាយការណ៍ត្រូវបានធ្វើបច្ចុប្បន្នភាព" }))
  }

  const confirmDelete = (report) => setDeleteTarget(report)

  const cancelDelete = () => {
    setDeleteTarget(null)
    setDeleting(false)
  }

  const handleDelete = async () => {
    if (!deleteTarget || deleting) return
    setDeleting(true)
    try {
      await reportsApi.remove(deleteTarget.id)
      setDeleteTarget(null)
      setDeleting(false)
      setMineReloadKey((k) => k + 1)
      showToast(t({ en: "Report deleted", km: "របាយការណ៍ត្រូវបានលុប" }))
    } catch (err) {
      setDeleting(false)
      showToast(err.message || t({ en: "Could not delete report", km: "មិនអាចលុបរបាយការណ៍បានទេ" }))
    }
  }

  const pwdMismatch = Boolean(passwords.next && passwords.confirm && passwords.next !== passwords.confirm)
  const strength = passwordStrength(passwords.next)
  const strengthLabel = ["", 
    { en: "Weak", km: "ខ្សោយ" },
    { en: "Fair", km: "មធ្យម" },
    { en: "Strong", km: "រឹងមាំ" },
    { en: "Very Strong", km: "រឹងមាំខ្លាំង" },
  ][strength]
  const rulesMet = PASSWORD_RULES.reduce((acc, r) => ({ ...acc, [r.key]: r.test(passwords.next) }), {})

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
                <div className="prof-avatar-zone">
                  <div className="prof-avatar">
                    {user.avatarUrl ? (
                      <img
                        className="prof-avatar-img"
                        src={user.avatarUrl}
                        alt={t({ en: "Profile photo", km: "រូបថតទម្រង់" })}
                        onClick={openAvatarOptions}
                      />
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
                      onClick={openAvatarOptions}
                      disabled={avatarUploading || avatarDeleting}
                      aria-label={t({ en: "Profile photo options", km: "ជម្រើសរូបថតទម្រង់" })}
                      aria-expanded={avatarOptionsOpen}
                    >
                      <IconCamera />
                    </button>

                    {avatarOptionsOpen && (
                      <div className="avatar-options" ref={avatarOptionsRef} role="menu" aria-label={t({ en: "Profile photo options", km: "ជម្រើសរូបថតទម្រង់" })}>
                        {user.avatarUrl && (
                          <button type="button" role="menuitem" onClick={openAvatarView}>
                            {t({ en: "View current profile photo", km: "មើលរូបថតទម្រង់បច្ចុប្បន្ន" })}
                          </button>
                        )}
                        <button type="button" role="menuitem" onClick={triggerAvatarUpload}>
                          {t({ en: "Change profile photo", km: "ផ្លាស់ប្តូររូបថតទម្រង់" })}
                        </button>
                        {user.avatarUrl && (
                          <button
                            type="button"
                            role="menuitem"
                            className="avatar-option--danger"
                            onClick={deleteAvatar}
                            disabled={avatarDeleting}
                          >
                            {avatarDeleting
                              ? t({ en: "Removing…", km: "កំពុងលុប…" })
                              : t({ en: "Delete profile photo", km: "លុបរូបថតទម្រង់" })}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="prof-head-text">
                  <span className="prof-head-name">{user.name}</span>
                </div>
                <button type="button" className="btn prof-head-logout" onClick={handleLogout}>
                  <IconLogOut />
                  {t({ en: "Log Out", km: "ចេញពីគណនី" })}
                </button>
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
                                  ? <User className="icon" />
                                  : r.author_avatar_url
                                    ? <img src={r.author_avatar_url} alt="" />
                                    : <span>{initials(r.author_name) || "U"}</span>}
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
                                  <ProfPlatformIcon name={r.platform} />
                                  <span>{r.platform}</span>
                                </span>
                                <span className="browse-card-date">{relTime(r.ts, lang)}</span>
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
                    <div className="browse-cards prof-saved-grid">
                      {myReports.map((r) => (
                        <article className="browse-card" key={r.id}>
                          <div className="browse-card-img">
                            {r.image ? (
                              <img src={r.image} alt="" loading="lazy" />
                            ) : (
                              <ProfPlaceholder cat={r.cat} lang={lang} />
                            )}
                            <span className={`prof-status prof-status--${r.status}`}>
                              {t(STATUS_META[r.status] ?? { en: r.status, km: r.status })}
                            </span>
                          </div>
                          <div className="browse-card-body">
                            <div className="browse-card-author mine-actions">
                              <button
                                type="button"
                                className="mine-action mine-action--edit"
                                onClick={() => openEdit(r)}
                              >
                                <IconEdit />
                                {t({ en: "Edit", km: "កែសម្រួល" })}
                              </button>
                              <button
                                type="button"
                                className="mine-action mine-action--delete"
                                onClick={() => confirmDelete(r)}
                              >
                                <IconTrash />
                                {t({ en: "Delete", km: "លុប" })}
                              </button>
                            </div>
                            <h3 className="browse-card-title">{t(r.title)}</h3>
                            <p className="browse-card-desc">{t(r.desc)}</p>
                            <div className="browse-card-foot">
                              <span className="browse-card-meta">
                                <span className="browse-card-platform">
                                  <ProfPlatformIcon name={r.platform} />
                                  <span>{r.platform}</span>
                                </span>
                                <span className="browse-card-date">{relTime(r.ts, lang)}</span>
                              </span>
                              <button
                                type="button"
                                className="browse-card-btn"
                                onClick={() => setDetailReport(r)}
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
                        <PasswordInput
                          id="pw-current"
                          name="current"
                          value={passwords.current}
                          onChange={setPwdField("current")}
                          autoComplete="current-password"
                          placeholder={t({ en: "Current password", km: "ពាក្យសម្ងាត់បច្ចុប្បន្ន" })}
                          errorId={pwdErrs.current ? "pw-current-err" : undefined}
                        />
                        {pwdErrs.current && (
                          <p className="set-error" id="pw-current-err" role="alert">{pwdErrs.current}</p>
                        )}
                      </div>
                      <div className="set-field">
                        <label className="set-label" htmlFor="pw-new">
                          {t({ en: "New Password", km: "ពាក្យសម្ងាត់ថ្មី" })}
                        </label>
                        <PasswordInput
                          id="pw-new"
                          name="next"
                          value={passwords.next}
                          onChange={setPwdField("next")}
                          autoComplete="new-password"
                          placeholder={t({ en: "New password", km: "ពាក្យសម្ងាត់ថ្មី" })}
                          errorId={pwdErrs.next ? "pw-new-err" : undefined}
                        />
                        {pwdErrs.next && (
                          <p className="set-error" id="pw-new-err" role="alert">{pwdErrs.next}</p>
                        )}
                      </div>
                      <div className="set-field">
                        <label className="set-label" htmlFor="pw-confirm">
                          {t({ en: "Confirm New Password", km: "បញ្ជាក់ពាក្យសម្ងាត់ថ្មី" })}
                        </label>
                        <PasswordInput
                          id="pw-confirm"
                          name="confirm"
                          value={passwords.confirm}
                          onChange={setPwdField("confirm")}
                          autoComplete="new-password"
                          placeholder={t({ en: "Re-enter new password", km: "បញ្ចូលពាក្យសម្ងាត់ថ្មីម្តងទៀត" })}
                          errorId={pwdErrs.confirm ? "pw-confirm-err" : undefined}
                        />
                        {pwdErrs.confirm && (
                          <p className="set-error" id="pw-confirm-err" role="alert">{pwdErrs.confirm}</p>
                        )}
                      </div>

                      {passwords.next && (
                        <>
                          <div className="pwd-strength" aria-label={`${t({ en: "Password strength", km: "កម្រិតពាក្យសម្ងាត់" })}: ${t(strengthLabel)}`}>
                            <div className="pwd-strength__bars">
                              {[1, 2, 3, 4].map((i) => (
                                <span key={i} className={`pwd-strength__bar${i <= strength ? ` level-${strength}` : ""}`} />
                              ))}
                            </div>
                            <span className={`pwd-strength__label level-${strength}`}>{t(strengthLabel)}</span>
                          </div>
                          <ul className="pwd-rules" aria-label={t({ en: "Password requirements", km: "លក្ខខណ្ឌពាក្យសម្ងាត់" })}>
                            {PASSWORD_RULES.map((r) => (
                              <li key={r.key} className={rulesMet[r.key] ? "met" : ""}>
                                <IconCheck className="icon" />
                                <span>{t(r)}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      {pwdMismatch && (
                        <p className="set-error" role="alert">
                          {t({ en: "New passwords do not match.", km: "ពាក្យសម្ងាត់ថ្មីមិនត្រូវគ្នាទេ។" })}
                        </p>
                      )}
                      <div className="set-pwd-actions">
                        <button
                          type="submit"
                          className="btn btn--teal"
                          disabled={!passwords.current || !passwords.next || pwdMismatch || strength < 2}
                        >
                          {t({ en: "Update Password", km: "ធ្វើបច្ចុប្បន្នភាពពាក្យសម្ងាត់" })}
                        </button>
                      </div>
                    </form>
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

      {avatarView && (
        <div className="avatar-view-overlay" onClick={() => setAvatarView(null)} aria-hidden="true" />
      )}
      {avatarView && (
        <div className="avatar-view-modal" role="dialog" aria-modal="true" aria-label={t({ en: "Profile photo", km: "រូបថតទម្រង់" })} onClick={() => setAvatarView(null)}>
          <img src={avatarView} alt={t({ en: "Profile photo", km: "រូបថតទម្រង់" })} />
          <button
            type="button"
            className="avatar-view-close detail-close"
            onClick={() => setAvatarView(null)}
            aria-label={t({ en: "Close", km: "បិទ" })}
          >
            <IconClose />
          </button>
        </div>
      )}

      <ReportForm
        open={editDrawerOpen}
        onClose={closeEdit}
        onSubmitted={handleEditSubmitted}
        editReport={editingReport}
      />
      {deleteTarget && (
        <div className="confirm-overlay" role="dialog" aria-modal="true" aria-labelledby="delete-title">
          <div className="confirm-modal">
            <h3 id="delete-title">{t({ en: "Delete Report", km: "លុបរបាយការណ៍" })}</h3>
            <p>
              {t({
                en: "Are you sure you want to delete this report? This action cannot be undone.",
                km: "តើអ្នកប្រាកដថាចង់លុបរបាយការណ៍នេះទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។",
              })}
            </p>
            <div className="confirm-actions">
              <button type="button" className="btn btn-outline" onClick={cancelDelete} disabled={deleting}>
                {t({ en: "Cancel", km: "បោះបង់" })}
              </button>
              <button type="button" className="btn confirm-delete" onClick={handleDelete} disabled={deleting}>
                {deleting
                  ? t({ en: "Deleting…", km: "កំពុងលុប…" })
                  : t({ en: "Delete", km: "លុប" })}
              </button>
            </div>
          </div>
        </div>
      )}
      <Toast message={toast} onDone={clearToast} />
    </>
  )
}