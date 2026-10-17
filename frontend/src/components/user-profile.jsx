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

const CONTAINER = "mx-auto w-full max-w-[1440px] px-[clamp(1rem,4vw,3rem)]"
const BTN =
  "inline-flex items-center justify-center gap-2 rounded-full border cursor-pointer font-semibold whitespace-nowrap transition-[background-color,box-shadow,transform] duration-[180ms] ease-out"
const BTN_MD = "px-[1.25rem] py-[0.62rem] text-[0.95rem] km:pt-[0.42rem] km:pb-[0.42rem]"
const BTN_TEAL = "border-transparent bg-teal text-white hover:bg-teal-dim hover:-translate-y-px"
const BTN_OUTLINE = "border-blue-200 bg-white text-blue-700 hover:bg-blue-50"
const BTN_RED = "border-transparent bg-red-600 text-white hover:bg-[#b91c1c] disabled:opacity-60"
const CONTROL =
  "w-full rounded-[10px] border border-[#e3e9f3] bg-white px-[0.9rem] py-[0.68rem] text-ink outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-faint focus:border-blue-500 focus:shadow-[0_0_0_3px_var(--color-blue-100)]"
const GRID_CARDS =
  "grid grid-cols-3 gap-[1.5rem] max-[1020px]:grid-cols-2 max-[720px]:grid-cols-1 max-[600px]:gap-[1.3rem] max-[380px]:gap-[1rem]"
const SKEL_BG =
  "bg-[linear-gradient(90deg,#e3e9f3_25%,#eef1f7_37%,#e3e9f3_63%)] bg-[length:800px_100%] animate-[shimmer_1.5s_ease-in-out_infinite]"
const CARD =
  "flex flex-col overflow-hidden rounded-[20px] border border-[#e3e9f3] bg-white shadow-sm transition-[box-shadow,transform] duration-200 hover:-translate-y-[3px] hover:shadow-md"
const EMPTY =
  "rounded-[20px] border border-dashed border-[#e3e9f3] bg-surface px-[1rem] py-[3rem] text-center"
const EMPTY_IC =
  "mx-auto mb-[1rem] grid h-[60px] w-[60px] place-items-center rounded-full border border-teal-100 bg-teal-50 text-teal"
const EMPTY_LINK =
  "inline-flex cursor-pointer items-center justify-center rounded-full border-[1.5px] border-teal bg-white px-[1.2rem] py-[0.5rem] text-[0.95rem] font-bold text-teal no-underline transition-[background,color] duration-150 hover:bg-teal hover:text-white"
const DETAIL_CLOSE =
  "absolute right-[0.65rem] top-[0.65rem] grid h-9 w-9 cursor-pointer place-items-center rounded-[10px] border-none bg-[rgba(15,23,42,0.4)] text-white [backdrop-filter:blur(4px)] transition-[background] duration-150 hover:bg-[rgba(15,23,42,0.65)]"
const STRENGTH_BAR = ["", "bg-[#ef4444]", "bg-[#f59e0b]", "bg-[#22c55e]", "bg-[#16a34a]"]
const STRENGTH_LABEL = ["", "text-[#ef4444]", "text-[#b45309]", "text-[#15803d]", "text-[#15803d]"]

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

function statusClass(status) {
  if (status === "published") return "bg-teal text-white"
  if (status === "review" || status === "pending") return "bg-amber-bg text-amber-text border border-amber-border"
  return "bg-surface text-[#56657f] border border-[#e3e9f3]"
}

function ProfPlaceholder({ cat, lang }) {
  const Icon = CATEGORY_ICONS[cat] ?? IconInfo
  const label = TYPE_LABELS[cat]
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-ink">
      <span className="grid h-14 w-14 place-items-center rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.08)] opacity-90">
        <Icon style={{ width: 28, height: 28, color: "rgba(255,255,255,0.75)" }} />
      </span>
      <span className="text-[0.72rem] font-bold uppercase tracking-[0.06em] text-white/50">{label ? (lang === "km" ? label.km : label.en) : cat}</span>
    </div>
  )
}

function ProfPlatformIcon({ name }) {
  const key = (name || "").toLowerCase()
  const Icon = PLATFORM_ICONS[key] ?? IconGlobe
  return <Icon style={{ width: 14, height: 14, color: PLATFORM_ICONS[key] ? PLATFORM_COLORS[key] : "#7d8aa3" }} />
}

function Toast({ message, onDone }) {
  useEffect(() => {
    if (!message) return undefined
    const id = setTimeout(onDone, 3000)
    return () => clearTimeout(id)
  }, [message, onDone])
  if (!message) return null
  return (
    <div className="fixed left-1/2 bottom-[1.6rem] z-[600] flex items-center gap-2 rounded-full bg-ink px-[1.2rem] py-[0.7rem] text-[0.9rem] font-semibold text-white shadow-lg [transform:translateX(-50%)] animate-[profToastIn_0.25s_ease]" role="status" aria-live="polite">
      <IconCheck style={{ width: 17, height: 17, color: "var(--color-teal-200)", flexShrink: 0 }} />
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
    window.location.replace("/")
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
      <section className="bg-surface pt-[4.5rem] pb-[6rem] max-[600px]:pt-[3.2rem] max-[600px]:pb-[5rem]" id="profile">
        <div className={CONTAINER}>
          <div className={EMPTY}>
            <span className={EMPTY_IC}>
              <IconUser style={{ width: 26, height: 26 }} />
            </span>
            <p className="mb-[1.1rem] text-[1.05rem] text-[#56657f]">{t({ en: "Please log in to view your profile.", km: "សូមចូលគណនីដើម្បីមើលទម្រង់របស់អ្នក។" })}</p>
            <Link className={`${BTN} ${BTN_MD} ${BTN_TEAL}`} to="/login">
              {t({ en: "Log in", km: "ចូលគណនី" })}
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="bg-surface pt-[4.5rem] pb-[6rem] max-[600px]:pt-[3.2rem] max-[600px]:pb-[5rem]" id="profile" aria-labelledby="profile-title">
        <div className={CONTAINER}>
          <h1 className="sr-only" id="profile-title">{t({ en: "My Profile", km: "ទម្រង់របស់ខ្ញុំ" })}</h1>

          <div className="overflow-hidden rounded-[20px] border border-[#e3e9f3] bg-white shadow-md">
            <div className="p-[1.5rem] max-[600px]:px-[1rem] max-[600px]:py-[1.2rem]">
              <div className="flex items-center gap-[1.15rem]">
                <div className="relative flex-none">
                  <div className="relative grid h-[76px] w-[76px] flex-none place-items-center rounded-full bg-[linear-gradient(135deg,#2563eb_0%,#1d4ed8_100%)] shadow-md max-[600px]:h-16 max-[600px]:w-16">
                    {user.avatarUrl ? (
                      <img
                        className="block h-full w-full min-h-full min-w-full cursor-pointer rounded-full object-cover"
                        src={user.avatarUrl}
                        alt={t({ en: "Profile photo", km: "រូបថតទម្រង់" })}
                        onClick={openAvatarOptions}
                      />
                    ) : (
                      <span className="font-display text-[1.75rem] font-bold tracking-[0.02em] text-white max-[600px]:text-[1.45rem]">{initials(user.name)}</span>
                    )}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      ref={avatarInputRef}
                      onChange={handleAvatarChange}
                      className="absolute m-0 h-px w-px overflow-hidden p-0 opacity-0"
                      aria-hidden="true"
                      tabIndex={-1}
                    />
                    <button
                      type="button"
                      className={`absolute -right-[2px] -bottom-[2px] grid h-[30px] w-[30px] cursor-pointer place-items-center rounded-full border-2 border-white bg-teal p-0 text-white transition-[background,opacity] duration-150 hover:bg-teal-dim ${avatarUploading ? "cursor-wait opacity-70" : ""}`}
                      onClick={openAvatarOptions}
                      disabled={avatarUploading || avatarDeleting}
                      aria-label={t({ en: "Profile photo options", km: "ជម្រើសរូបថតទម្រង់" })}
                      aria-expanded={avatarOptionsOpen}
                    >
                      <IconCamera style={{ width: 13, height: 13 }} />
                    </button>

                    {avatarOptionsOpen && (
                      <div className="absolute left-0 top-[calc(100%+10px)] z-40 flex min-w-[220px] flex-col gap-[0.15rem] rounded-[14px] border border-[#e3e9f3] bg-white p-[0.4rem] shadow-lg animate-[fadeIn_0.15s_ease] before:content-[''] before:absolute before:-top-[5px] before:left-[44px] before:h-[10px] before:w-[10px] before:rotate-45 before:border-l before:border-t before:border-[#e3e9f3] before:bg-white" ref={avatarOptionsRef} role="menu" aria-label={t({ en: "Profile photo options", km: "ជម្រើសរូបថតទម្រង់" })}>
                        {user.avatarUrl && (
                          <button type="button" role="menuitem" className="flex w-full cursor-pointer items-center gap-2 rounded-[10px] border-none bg-none px-[0.7rem] py-[0.5rem] text-left text-[0.88rem] font-semibold text-ink transition-[background] duration-150 hover:bg-teal-50 disabled:cursor-wait disabled:opacity-60" onClick={openAvatarView}>
                            {t({ en: "View current profile photo", km: "មើលរូបថតទម្រង់បច្ចុប្បន្ន" })}
                          </button>
                        )}
                        <button type="button" role="menuitem" className="flex w-full cursor-pointer items-center gap-2 rounded-[10px] border-none bg-none px-[0.7rem] py-[0.5rem] text-left text-[0.88rem] font-semibold text-ink transition-[background] duration-150 hover:bg-teal-50 disabled:cursor-wait disabled:opacity-60" onClick={triggerAvatarUpload}>
                          {t({ en: "Change profile photo", km: "ផ្លាស់ប្តូររូបថតទម្រង់" })}
                        </button>
                        {user.avatarUrl && (
                          <button
                            type="button"
                            role="menuitem"
                            className="flex w-full cursor-pointer items-center gap-2 rounded-[10px] border-none bg-none px-[0.7rem] py-[0.5rem] text-left text-[0.88rem] font-semibold text-red-600 transition-[background] duration-150 hover:bg-[rgba(220,38,38,0.08)] disabled:cursor-wait disabled:opacity-60"
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
                <div className="flex flex-col gap-[0.15rem]">
                  <span className="font-display text-[1.7rem] font-bold leading-[1.2] text-ink max-[600px]:text-[1.4rem]">{user.name}</span>
                </div>
                <button type="button" className={`${BTN} ${BTN_MD} ml-auto flex-none border-red-600 bg-white text-red-600 hover:bg-red-600 hover:text-white`} onClick={handleLogout}>
                  <IconLogOut style={{ width: 17, height: 17 }} />
                  {t({ en: "Log Out", km: "ចេញពីគណនី" })}
                </button>
              </div>

              <nav className="mt-[1.35rem] flex flex-row gap-[0.3rem] overflow-x-auto border-b border-[#e3e9f3]" aria-label={t({ en: "Profile sections", km: "ផ្នែកនៃទម្រង់" })}>
                {TABS.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    className={`flex flex-none cursor-pointer items-center gap-[0.65rem] whitespace-nowrap rounded-[10px] border-none px-[0.85rem] py-[0.65rem] text-base font-semibold transition-[background,color] duration-150 ${tab === id ? "bg-teal text-white hover:bg-teal-dim focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal" : "bg-transparent text-[#56657f] hover:bg-surface hover:text-ink"}`}
                    aria-current={tab === id ? "true" : undefined}
                    onClick={() => setTab(id)}
                  >
                    <Icon style={{ width: 18, height: 18, flex: "none" }} />
                    <span>{t(label)}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="min-w-0 p-[1.5rem] max-[600px]:px-[1rem] max-[600px]:py-[1.2rem] animate-[profTabIn_0.22s_ease]" key={tab} aria-live="polite">
              {tab === "saved" && (
                <>
                  <div className="mb-[1.6rem] flex items-start justify-between gap-4 max-[600px]:flex-col">
                    <div>
                      <h2 className="font-display text-[1.5rem] font-bold text-ink">{t({ en: "Saved Reports", km: "របាយការណ៍ដែលបានរក្សាទុក" })}</h2>
                    </div>
                  </div>
                  {savedLoading ? (
                    <div className={GRID_CARDS}>
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div className="overflow-hidden rounded-[20px] border border-[#e3e9f3] bg-white" key={`skel-${i}`}>
                          <div className={`aspect-[16/10] ${SKEL_BG}`} />
                          <div className="flex flex-col gap-[0.6rem] px-[1.15rem] pt-[1rem] pb-[1.1rem]">
                            <div className={`h-[14px] rounded-[4px] w-4/5 ${SKEL_BG}`} />
                            <div className={`h-[14px] rounded-[4px] w-3/5 ${SKEL_BG}`} />
                            <div className={`h-[14px] rounded-[4px] w-2/5 ${SKEL_BG}`} style={{ marginTop: "0.5rem" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : savedReports.length === 0 ? (
                    <div className={EMPTY}>
                      <span className={EMPTY_IC}><IconSave style={{ width: 26, height: 26 }} /></span>
                      <p className="mb-[1.1rem] text-[1.05rem] text-[#56657f]">{t({ en: "You haven't saved any reports yet.", km: "អ្នកមិនទាន់បានរក្សាទុករបាយការណ៍ណាមួយនៅឡើយទេ។" })}</p>
                      <Link className={EMPTY_LINK} to="/report">
                        {t({ en: "Browse Scam Reports", km: "មើលរបាយការណ៍អំពីការបោកប្រាស់" })}
                      </Link>
                    </div>
                  ) : (
                    <div className={GRID_CARDS}>
                      {savedReports.map((r) => (
                        <article
                          className={`${CARD} cursor-pointer`}
                          key={r.id}
                          onClick={() => setDetailReport(r)}
                        >
                          <div className="relative aspect-[16/10] overflow-hidden rounded-t-[20px] bg-ink">
                            {r.image ? (
                              <img className="block h-full w-full object-cover" src={r.image} alt="" loading="lazy" />
                            ) : (
                              <ProfPlaceholder cat={r.cat} lang={lang} />
                            )}
                            <span className="absolute right-[0.65rem] top-[0.65rem] grid h-10 w-10 cursor-pointer place-items-center rounded-full border-none bg-[rgba(15,23,42,0.35)] text-blue-500 [backdrop-filter:blur(4px)] transition-[background,transform] duration-150 hover:bg-[rgba(15,23,42,0.55)] hover:[transform:scale(1.1)]" onClick={(e) => { e.stopPropagation(); unsaveReport(r.id) }} aria-label={t({ en: "Unsave report", km: "ដកចេញពីការរក្សាទុក" })}>
                              <IconSave filled style={{ width: 21, height: 21 }} />
                            </span>
                            <span className="absolute bottom-[0.65rem] left-[0.65rem] whitespace-nowrap rounded-full bg-[rgba(15,23,42,0.6)] px-[0.6rem] py-[0.22rem] text-[0.78rem] font-bold text-white [backdrop-filter:blur(4px)]">
                              {t(TYPE_LABELS[r.cat] ?? { en: r.cat, km: r.cat })}
                            </span>
                          </div>
                          <div className="flex flex-1 flex-col gap-[0.4rem] px-[1.15rem] pt-[1rem] pb-[1.1rem]">
                            <div className="mb-[0.2rem] flex items-center gap-[0.45rem]">
                              <span className={`grid h-[26px] w-[26px] flex-none place-items-center overflow-hidden rounded-full text-[0.62rem] font-bold text-white ${r.is_anonymous ? "bg-[#6b7280]" : "bg-[linear-gradient(135deg,#2563eb,#1d4ed8)]"}`} aria-hidden="true">
                                {r.is_anonymous
                                  ? <User style={{ width: 14, height: 14, color: "#fff" }} />
                                  : r.author_avatar_url
                                    ? <img className="h-full w-full object-cover" src={r.author_avatar_url} alt="" />
                                    : <span>{initials(r.author_name) || "U"}</span>}
                              </span>
                              <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[0.78rem] font-medium text-[#56657f]">
                                {r.is_anonymous ? t({ en: "Anonymous", km: "អនាមិក" }) : r.author_name || "Angket User"}
                              </span>
                            </div>
                            <h3 className="line-clamp-2 text-base font-bold leading-[1.4] tracking-[-0.01em] text-ink">{t(r.title)}</h3>
                            <p className="line-clamp-2 flex-1 text-[0.88rem] leading-[1.55] text-[#56657f]">{t(r.desc)}</p>
                            <div className="mt-[0.5rem] flex items-center justify-between gap-2 border-t border-[#e3e9f3] pt-[0.65rem]">
                              <span className="inline-flex min-w-0 items-center gap-[0.55rem]">
                                <span className="inline-flex items-center gap-[0.3rem] text-[0.78rem] text-[#56657f]">
                                  <ProfPlatformIcon name={r.platform} />
                                  <span>{r.platform}</span>
                                </span>
                                <span className="whitespace-nowrap text-[0.76rem] text-faint">{relTime(r.ts, lang)}</span>
                              </span>
                              <button
                                type="button"
                                className="cursor-pointer whitespace-nowrap rounded-full border-[1.5px] border-teal bg-transparent px-[0.85rem] py-[0.35rem] text-[0.8rem] font-bold text-teal transition-[background,color] duration-150 hover:bg-teal hover:text-white"
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
                  <div className="mb-[1.6rem] flex items-start justify-between gap-4 max-[600px]:flex-col">
                    <div>
                      <h2 className="font-display text-[1.5rem] font-bold text-ink">{t({ en: "My Reports", km: "របាយការណ៍របស់ខ្ញុំ" })}</h2>
                    </div>
                  </div>
                  {myReports.length === 0 ? (
                    <div className={EMPTY}>
                      <span className={EMPTY_IC}><IconFile style={{ width: 26, height: 26 }} /></span>
                      <p className="mb-[1.1rem] text-[1.05rem] text-[#56657f]">{t({ en: "You haven't posted any reports yet.", km: "អ្នកមិនទាន់បានបង្ហោះរបាយការណ៍ណាមួយនៅឡើយទេ។" })}</p>
                      <button type="button" className={EMPTY_LINK} onClick={openReportPanel}>
                        {t({ en: "Post a report", km: "បង្ហោះរបាយការណ៍" })}
                      </button>
                    </div>
                  ) : (
                    <div className={GRID_CARDS}>
                      {myReports.map((r) => (
                        <article className={CARD} key={r.id}>
                          <div className="relative aspect-[16/10] overflow-hidden rounded-t-[20px] bg-ink">
                            {r.image ? (
                              <img className="block h-full w-full object-cover" src={r.image} alt="" loading="lazy" />
                            ) : (
                              <ProfPlaceholder cat={r.cat} lang={lang} />
                            )}
                            <span className={`absolute left-[0.65rem] top-[0.65rem] z-[2] w-fit whitespace-nowrap rounded-full px-[0.65rem] py-[0.22rem] text-[0.82rem] font-bold shadow-sm ${statusClass(r.status)}`}>
                              {t(STATUS_META[r.status] ?? { en: r.status, km: r.status })}
                            </span>
                          </div>
                          <div className="flex flex-1 flex-col gap-[0.4rem] px-[1.15rem] pt-[1rem] pb-[1.1rem]">
                            <div className="flex items-center justify-between gap-2 max-[600px]:flex-wrap">
                              <button
                                type="button"
                                className="inline-flex cursor-pointer items-center gap-[0.3rem] rounded-[10px] border-none bg-none px-[0.5rem] py-[0.35rem] text-[0.9rem] font-semibold text-teal transition-[background,color] duration-150 hover:bg-teal-50"
                                onClick={() => openEdit(r)}
                              >
                                <IconEdit style={{ width: 15, height: 15 }} />
                                {t({ en: "Edit", km: "កែសម្រួល" })}
                              </button>
                              <button
                                type="button"
                                className="inline-flex cursor-pointer items-center gap-[0.3rem] rounded-[10px] border-none bg-none px-[0.5rem] py-[0.35rem] text-[0.9rem] font-semibold text-red-600 transition-[background,color] duration-150 hover:bg-[rgba(220,38,38,0.08)]"
                                onClick={() => confirmDelete(r)}
                              >
                                <IconTrash style={{ width: 15, height: 15 }} />
                                {t({ en: "Delete", km: "លុប" })}
                              </button>
                            </div>
                            <h3 className="line-clamp-2 text-base font-bold leading-[1.4] tracking-[-0.01em] text-ink">{t(r.title)}</h3>
                            <p className="line-clamp-2 flex-1 text-[0.88rem] leading-[1.55] text-[#56657f]">{t(r.desc)}</p>
                            <div className="mt-[0.5rem] flex items-center justify-between gap-2 border-t border-[#e3e9f3] pt-[0.65rem]">
                              <span className="inline-flex min-w-0 items-center gap-[0.55rem]">
                                <span className="inline-flex items-center gap-[0.3rem] text-[0.78rem] text-[#56657f]">
                                  <ProfPlatformIcon name={r.platform} />
                                  <span>{r.platform}</span>
                                </span>
                                <span className="whitespace-nowrap text-[0.76rem] text-faint">{relTime(r.ts, lang)}</span>
                              </span>
                              <button
                                type="button"
                                className="cursor-pointer whitespace-nowrap rounded-full border-[1.5px] border-teal bg-transparent px-[0.85rem] py-[0.35rem] text-[0.8rem] font-bold text-teal transition-[background,color] duration-150 hover:bg-teal hover:text-white"
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
                    <form id="prof-edit-form" onSubmit={saveInfo} noValidate>
                      <div className="mb-[0.3rem] flex items-center justify-between gap-4">
                        <h2 className="font-display text-[1.3rem] font-bold text-ink">{t({ en: "Profile", km: "ទម្រង់" })}</h2>
                        <div className="flex items-center gap-[0.6rem]">
                          <button type="submit" className={`${BTN} ${BTN_MD} ${BTN_TEAL}`}>
                            {t({ en: "Save", km: "រក្សាទុក" })}
                          </button>
                          <button type="button" className="cursor-pointer rounded-[10px] border-none bg-transparent px-[0.75rem] py-[0.45rem] text-[0.95rem] font-bold text-[#56657f] transition-[background,color] duration-150 hover:bg-surface hover:text-ink" onClick={cancelEditing}>
                            {t({ en: "Cancel", km: "បោះបង់" })}
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 max-[700px]:grid-cols-1">
                        <div className="flex min-w-0 flex-col gap-[0.25rem]">
                          <label className="text-[0.85rem] font-semibold text-[#56657f]" htmlFor="pf-name">
                            {t({ en: "Full Name", km: "ឈ្មោះពេញ" })}
                          </label>
                          <input
                            id="pf-name"
                            className={CONTROL}
                            type="text"
                            value={draft.name}
                            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                          />
                        </div>
                        <div className="flex min-w-0 flex-col gap-[0.25rem]">
                          <label className="text-[0.85rem] font-semibold text-[#56657f]" htmlFor="pf-email">Email</label>
                          <input
                            id="pf-email"
                            className={CONTROL}
                            type="email"
                            value={draft.email}
                            readOnly
                          />
                        </div>
                        <div className="flex min-w-0 flex-col gap-[0.25rem]">
                          <label className="text-[0.85rem] font-semibold text-[#56657f]" htmlFor="pf-phone">
                            {t({ en: "Phone", km: "លេខទូរស័ព្ទ" })}
                          </label>
                          <input
                            id="pf-phone"
                            className={CONTROL}
                            type="tel"
                            value={draft.phone}
                            onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
                          />
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div>
                      <div className="mb-[0.3rem] flex items-center justify-between gap-4">
                        <h2 className="font-display text-[1.3rem] font-bold text-ink">{t({ en: "Profile", km: "ទម្រង់" })}</h2>
                        <button type="button" className="inline-flex cursor-pointer items-center gap-[0.4rem] whitespace-nowrap rounded-full border-[1.5px] border-teal bg-transparent px-[0.95rem] py-[0.42rem] text-[0.92rem] font-bold text-teal transition-[background,color] duration-150 hover:bg-teal hover:text-white" onClick={startEditing}>
                          <IconEdit style={{ width: 15, height: 15 }} />
                          {t({ en: "Edit", km: "កែសម្រួល" })}
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-4 max-[700px]:grid-cols-1">
                        <div className="flex min-w-0 flex-col gap-[0.25rem]">
                          <span className="text-[0.85rem] font-semibold text-[#56657f]">{t({ en: "Full Name", km: "ឈ្មោះពេញ" })}</span>
                          <span className="px-0 py-[0.62rem] text-base font-normal text-ink [overflow-wrap:anywhere]">{user.name}</span>
                        </div>
                        <div className="flex min-w-0 flex-col gap-[0.25rem]">
                          <span className="text-[0.85rem] font-semibold text-[#56657f]">Email</span>
                          <span className="px-0 py-[0.62rem] text-base font-normal text-ink [overflow-wrap:anywhere]">{user.email}</span>
                        </div>
                        <div className="flex min-w-0 flex-col gap-[0.25rem]">
                          <span className="text-[0.85rem] font-semibold text-[#56657f]">{t({ en: "Phone", km: "លេខទូរស័ព្ទ" })}</span>
                          <span className="px-0 py-[0.62rem] text-base font-normal text-ink [overflow-wrap:anywhere]">{user.phone || "—"}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <hr className="m-0 mt-[1.35rem] mb-[1.25rem] border-0 border-t-[0.5px] border-t-[#e5e7eb]" />

                  <div>
                    <div className="mb-[0.3rem] flex items-center justify-between gap-4">
                      <h2 className="font-display text-[1.3rem] font-bold text-ink">{t({ en: "Password", km: "ពាក្យសម្ងាត់" })}</h2>
                    </div>
                    <p className="mb-[1.1rem] text-[0.95rem] text-[#56657f]">{t({ en: "Choose a strong password you don't use elsewhere.", km: "ជ្រើសរើសពាក្យសម្ងាត់ដ៏រឹងមាំដែលអ្នកមិនប្រើនៅកន្លែងផ្សេង។" })}</p>
                    <form className="grid grid-cols-3 gap-[0.875rem] max-[700px]:grid-cols-1" onSubmit={submitPassword} noValidate>
                      <div className="flex min-w-0 flex-col gap-[0.25rem]">
                        <label className="text-[0.85rem] font-semibold text-[#56657f]" htmlFor="pw-current">
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
                          <p className="mt-[0.1rem] text-[0.82rem] text-red-600" id="pw-current-err" role="alert">{pwdErrs.current}</p>
                        )}
                      </div>
                      <div className="flex min-w-0 flex-col gap-[0.25rem]">
                        <label className="text-[0.85rem] font-semibold text-[#56657f]" htmlFor="pw-new">
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
                          <p className="mt-[0.1rem] text-[0.82rem] text-red-600" id="pw-new-err" role="alert">{pwdErrs.next}</p>
                        )}
                      </div>
                      <div className="flex min-w-0 flex-col gap-[0.25rem]">
                        <label className="text-[0.85rem] font-semibold text-[#56657f]" htmlFor="pw-confirm">
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
                          <p className="mt-[0.1rem] text-[0.82rem] text-red-600" id="pw-confirm-err" role="alert">{pwdErrs.confirm}</p>
                        )}
                      </div>

                      {passwords.next && (
                        <>
                          <div className="col-span-full flex items-center gap-[0.9rem] px-0 pt-[0.45rem] pb-[0.1rem]" aria-label={`${t({ en: "Password strength", km: "កម្រិតពាក្យសម្ងាត់" })}: ${t(strengthLabel)}`}>
                            <div className="flex max-w-[260px] flex-1 gap-[0.3rem]">
                              {[1, 2, 3, 4].map((i) => (
                                <span key={i} className={`h-[6px] flex-1 rounded-full bg-[#e3e9f3] transition-[background] duration-200 ${i <= strength ? STRENGTH_BAR[strength] : ""}`} />
                              ))}
                            </div>
                            <span className={`whitespace-nowrap text-[0.8rem] font-bold ${STRENGTH_LABEL[strength]}`}>{t(strengthLabel)}</span>
                          </div>
                          <ul className="col-span-full mt-[0.1rem] grid list-none grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[0.35rem_1rem] p-0" aria-label={t({ en: "Password requirements", km: "លក្ខខណ្ឌពាក្យសម្ងាត់" })}>
                            {PASSWORD_RULES.map((r) => (
                              <li key={r.key} className={`flex items-center gap-[0.45rem] text-[0.82rem] ${rulesMet[r.key] ? "text-[#15803d]" : "text-[#56657f]"}`}>
                                <IconCheck style={{ width: 15, height: 15, color: rulesMet[r.key] ? "#16a34a" : "#e3e9f3", flex: "none" }} />
                                <span>{t(r)}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      {pwdMismatch && (
                        <p className="col-span-full text-[0.82rem] text-red-600" role="alert">
                          {t({ en: "New passwords do not match.", km: "ពាក្យសម្ងាត់ថ្មីមិនត្រូវគ្នាទេ។" })}
                        </p>
                      )}
                      <div className="col-span-full mt-[0.2rem]">
                        <button
                          type="submit"
                          className={`${BTN} ${BTN_MD} ${BTN_TEAL}`}
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
            <div className="fixed inset-0 z-[500] bg-[rgba(15,23,42,0.45)] animate-[fadeIn_0.2s_ease]" onClick={() => setDetailReport(null)} />
            <div className="fixed left-1/2 top-1/2 z-[510] flex max-h-[85vh] w-[min(560px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[20px] bg-white shadow-lg [transform:translate(-50%,-50%)] animate-[modalIn_0.2s_ease] max-[720px]:max-h-[90vh] max-[720px]:w-[min(480px,calc(100vw-1.5rem))]" role="dialog" aria-modal="true" aria-labelledby="prof-detail-title">
              <div className="relative aspect-[16/10] flex-none overflow-hidden bg-ink">
                {detailReport.image ? (
                  <img className="block h-full w-full object-cover" src={detailReport.image} alt="" />
                ) : (
                  <ProfPlaceholder cat={detailReport.cat} lang={lang} />
                )}
                <button
                  type="button"
                  className={DETAIL_CLOSE}
                  onClick={() => setDetailReport(null)}
                  aria-label={t({ en: "Close", km: "បិទ" })}
                >
                  <IconClose style={{ width: 18, height: 18 }} />
                </button>
              </div>
              <div className="flex flex-col gap-2 overflow-y-auto px-[1.4rem] pt-[1.3rem] pb-[1.5rem]">
                <span className="inline-block w-fit whitespace-nowrap rounded-full border border-[#e3e9f3] bg-surface px-[0.7rem] py-[0.22rem] text-[0.73rem] font-bold text-[#56657f]">{t(TYPE_LABELS[detailReport.cat] ?? { en: detailReport.cat, km: detailReport.cat })}</span>
                <h3 className="text-[1.2rem] font-bold leading-[1.4] text-ink" id="prof-detail-title">{t(detailReport.title)}</h3>
                <p className="text-[0.94rem] leading-[1.65] text-text">{t(detailReport.desc)}</p>
                <div className="mt-[0.5rem] flex items-center gap-4 border-t border-[#e3e9f3] pt-[0.75rem]">
                  <span className="inline-flex items-center gap-[0.3rem] text-[0.78rem] text-[#56657f]">
                    <ProfPlatformIcon name={detailReport.platform} />
                    <span>{detailReport.platform}</span>
                  </span>
                  <span className="text-[0.82rem] text-faint">{relTime(detailReport.ts, lang)}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      {avatarView && (
        <div className="fixed inset-0 z-[600] bg-[rgba(15,23,42,0.6)] animate-[fadeIn_0.2s_ease]" onClick={() => setAvatarView(null)} aria-hidden="true" />
      )}
      {avatarView && (
        <div className="fixed left-1/2 top-1/2 z-[610] w-[min(520px,calc(100vw-2rem))] cursor-zoom-out overflow-hidden rounded-[20px] bg-white shadow-lg [transform:translate(-50%,-50%)] animate-[modalIn_0.2s_ease]" role="dialog" aria-modal="true" aria-label={t({ en: "Profile photo", km: "រូបថតទម្រង់" })} onClick={() => setAvatarView(null)}>
          <img className="block h-auto w-full max-h-[80vh] object-contain" src={avatarView} alt={t({ en: "Profile photo", km: "រូបថតទម្រង់" })} />
          <button
            type="button"
            className="absolute right-[0.6rem] top-[0.6rem] grid h-9 w-9 cursor-pointer place-items-center rounded-[10px] border-none bg-[rgba(15,23,42,0.4)] text-white [backdrop-filter:blur(4px)] transition-[background] duration-150 hover:bg-[rgba(15,23,42,0.65)]"
            onClick={() => setAvatarView(null)}
            aria-label={t({ en: "Close", km: "បិទ" })}
          >
            <IconClose style={{ width: 18, height: 18 }} />
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
        <div className="fixed inset-0 z-[500] grid place-items-center bg-[rgba(15,23,42,0.45)] p-4 animate-[fadeIn_0.2s_ease]" role="dialog" aria-modal="true" aria-labelledby="delete-title">
          <div className="w-[min(420px,100%)] overflow-hidden rounded-[20px] bg-white p-[1.5rem] shadow-lg animate-[modalIn_0.2s_ease]">
            <h3 className="mb-[0.5rem] text-[1.15rem] font-bold text-ink" id="delete-title">{t({ en: "Delete Report", km: "លុបរបាយការណ៍" })}</h3>
            <p className="mb-[1.25rem] text-[0.95rem] leading-[1.55] text-[#56657f]">
              {t({
                en: "Are you sure you want to delete this report? This action cannot be undone.",
                km: "តើអ្នកប្រាកដថាចង់លុបរបាយការណ៍នេះទេ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។",
              })}
            </p>
            <div className="flex justify-end gap-[0.6rem]">
              <button type="button" className={`${BTN} ${BTN_MD} ${BTN_OUTLINE}`} onClick={cancelDelete} disabled={deleting}>
                {t({ en: "Cancel", km: "បោះបង់" })}
              </button>
              <button type="button" className={`${BTN} ${BTN_MD} ${BTN_RED}`} onClick={handleDelete} disabled={deleting}>
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