import { useEffect, useRef, useState } from "react"
import { useLang } from "@/lib/i18n"
import { SCAM_TYPES } from "@/lib/data"
import { categoriesApi, reportsApi, uploadsApi } from "@/lib/services"
import { IconCheck, IconClose, IconLock } from "./icons"

const MAX_SCREENSHOT_MB = 5

export function ReportForm({ open, onClose, onSubmitted, editReport = null }) {
  const { t } = useLang()
  const successTitleRef = useRef(null)
  const fileRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)
  const isEditing = Boolean(editReport)
  const [form, setForm] = useState({
    title: "",
    category: "",
    sourcePlatform: "",
    description: "",
    dateOccurred: "",
    postAnonymously: false,
  })
  const [screenshot, setScreenshot] = useState(null)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [categories, setCategories] = useState([])

  const categoryOptions = categories.length > 0
    ? categories.map((c) => ({ value: c.value, en: c.label_en || c.id, km: c.label_km || null }))
    : SCAM_TYPES

  useEffect(() => {
    if (!open) return
    let cancelled = false
    categoriesApi.list()
      .then((res) => {
        if (!cancelled && Array.isArray(res.categories)) setCategories(res.categories)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    setSubmitted(false)
    setErrors({})
    setScreenshot((prev) => {
      if (prev?.url) URL.revokeObjectURL(prev.url)
      const existing = editReport?.screenshot_url || null
      return existing ? { file: null, url: existing } : null
    })
    if (editReport) {
      setForm({
        title: editReport.title_en || editReport.title || "",
        category: editReport.category || "",
        sourcePlatform: editReport.platform || "",
        description: editReport.description_en || editReport.description || "",
        dateOccurred: editReport.date_occurred || "",
        postAnonymously: Boolean(editReport.is_anonymous),
      })
    } else {
      setForm({
        title: "",
        category: "",
        sourcePlatform: "",
        description: "",
        dateOccurred: "",
        postAnonymously: false,
      })
    }
    if (fileRef.current) fileRef.current.value = ""
  }, [open, editReport])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.()
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setErrors((er) => {
      if (!er[field]) return er
      const n = { ...er }
      delete n[field]
      return n
    })
  }

  const handleFile = (file) => {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      setErrors((er) => ({ ...er, screenshot: t({ en: "Only image files are accepted.", km: "អនុញ្ញាតតែឯកសាររូបភាពប៉ុណ្ណោះ។" }) }))
      return
    }
    if (file.size > MAX_SCREENSHOT_MB * 1024 * 1024) {
      setErrors((er) => ({ ...er, screenshot: t({ en: "Image must be under 5MB.", km: "រូបភាពត្រូវតែចំណុះ ៥MB។" }) }))
      return
    }
    setScreenshot((prev) => {
      if (prev?.url) URL.revokeObjectURL(prev.url)
      return { file, url: URL.createObjectURL(file) }
    })
    setErrors((er) => {
      if (!er.screenshot) return er
      const n = { ...er }
      delete n.screenshot
      return n
    })
  }

  const removeScreenshot = () => {
    if (screenshot?.url) URL.revokeObjectURL(screenshot.url)
    setScreenshot(null)
    if (fileRef.current) fileRef.current.value = ""
  }

  const validate = () => {
    const errs = {}
    if (!form.title.trim()) errs.title = t({ en: "Title is required.", km: "ចំណងជើងជាចាំបាច់។" })
    if (!form.category) errs.category = t({ en: "Please select a category.", km: "សូមជ្រើសរើសប្រភេទ។" })
    if (!form.sourcePlatform) errs.sourcePlatform = t({ en: "Please select where the scam happened.", km: "សូមជ្រើសរើសកន្លែងដែលការបោកប្រាស់កើតឡើង។" })
    if (!form.description.trim()) errs.description = t({ en: "Description is required.", km: "ការពិពណ៌នាជាចាំបាច់។" })
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    if (submitting) return

    setSubmitting(true)
    try {
      const file = screenshot?.file
      const uploaded =
        file && (await uploadsApi.screenshot(file))
      const isAnonymous = form.postAnonymously
      let reportData = {
        title: form.title,
        description: form.description,
        category: form.category,
        platform: form.sourcePlatform,
        contactMethod: form.sourcePlatform,
        dateOccurred: form.dateOccurred,
        screenshotUrl: uploaded?.url || (isEditing ? editReport?.screenshot_url || null : null),
        isAnonymous,
      }
      if (isAnonymous) {
        reportData.displayName = "Anonymous"
        reportData.displayAvatarSeed = null
      } else {
        reportData.displayName = null
        reportData.displayAvatarSeed = null
      }
      if (isEditing && editReport?.id) {
        await reportsApi.update(editReport.id, reportData)
      } else {
        await reportsApi.create(reportData)
      }
      onSubmitted?.(form)
      setSubmitted(true)
      requestAnimationFrame(() => successTitleRef.current?.focus())
    } catch (err) {
      setErrors({ title: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => {
    setSubmitted(false)
    setForm({
      title: "",
      category: "",
      sourcePlatform: "",
      description: "",
      dateOccurred: "",
      postAnonymously: false,
    })
    setScreenshot(null)
    setErrors({})
    if (fileRef.current) fileRef.current.value = ""
    onClose?.()
  }

  return (
    <>
      <div className={`page-overlay${open ? " open" : ""}`} onClick={onClose} aria-hidden="true" />
      <div
        className={`report-page${open ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        aria-hidden={!open}
      >
        <button type="button" className="report-page-back" onClick={onClose} aria-label={t({ en: "Back to reports", km: "ត្រឡប់ទៅរបាយការណ៍" })}>
          <IconClose />
          <span>{t({ en: "Back", km: "ត្រឡប់ក្រោយ" })}</span>
        </button>
        <div className="report-page-scroll">
          <div className="container">
            <div className="section-head">
              
              <h2 id="drawer-title">{isEditing
                ? t({ en: "Edit Report", km: "កែសម្រួលរបាយការណ៍" })
                : t({ en: "Share What Happened", km: "ចែករំលែកអ្វីដែលបានកើតឡើង" })}</h2>
              <p>
                {t({
                  en: "Your experience could help someone else recognize the same scam before it happens to them. Share what happened, what the scam looked like, and any warning signs you noticed.",
                  km: "បទពិសោធន៍របស់អ្នកអាចជួយអ្នកដទៃឱ្យស្គាល់ការបោកប្រាស់ដូចគ្នា មុនពេលវាកើតឡើងចំពោះពួកគេ។ សូមចែករំលែកពីអ្វីដែលបានកើតឡើង លក្ខណៈនៃការបោកប្រាស់ និងសញ្ញាព្រមានដែលអ្នកបានសង្កេតឃើញ។",
                })}
              </p>
            </div>
            <div className="form-card">
          {!submitted ? (
            <form className="f-grid" onSubmit={handleSubmit} noValidate>

              {/* ─── Screenshot upload ─── */}
              <div className="rf-upload-row">
                <span className="f-label" id="rf-shot-label">
                  {t({ en: "Screenshot", km: "រូបភាពអេក្រង់" })}
                </span>
                <div className="rf-upload-area">
                  <div className={`rf-upload-circle${screenshot ? " has-image" : ""}`}>
                    {screenshot ? (
                      <img src={screenshot.url} alt={t({ en: "Screenshot preview", km: "រូបភាពអេក្រង់ជាមុន" })} />
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                      </svg>
                    )}
                    {screenshot && (
                      <button
                        type="button"
                        className="rf-upload-remove"
                        onClick={removeScreenshot}
                        aria-label={t({ en: "Remove screenshot", km: "លុបរូបភាពអេក្រង់" })}
                      >
                        &times;
                      </button>
                    )}
                  </div>
                  <div className="rf-upload-right">
                    <button
                      type="button"
                      className="rf-upload-btn"
                      onClick={() => fileRef.current?.click()}
                    >
                      {screenshot
                        ? t({ en: "Change Screenshot", km: "ផ្លាស់ប្តូររូបភាពអេក្រង់" })
                        : t({ en: "Upload Screenshot", km: "បញ្ចូលរូបថតអេក្រង់" })}
                    </button>
                    <span className="rf-upload-hint">
                      {t({
                        en: "Upload a screenshot that may help explain or verify the scam.",
                        km: "បញ្ចូលរូបភាពអេក្រង់ដែលអាចជួយពន្យល់ ឬផ្ទៀងផ្ទាត់ការបោកប្រាស់នេះ។",
                      })}
                    </span>
                  </div>
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => handleFile(e.target.files[0])}
                  aria-labelledby="rf-shot-label"
                />
                {errors.screenshot && (
                  <p className="field-error" role="alert">
                    {errors.screenshot}
                  </p>
                )}
              </div>

              {/* ─── Title ─── */}
              <div>
                <label className="f-label" htmlFor="rf-title">
                  <span>{t({ en: "Title", km: "ចំណងជើង" })}</span>{" "}
                  <span className="req" aria-hidden="true">*</span>
                </label>
                <input
                  id="rf-title"
                  name="title"
                  className={`control ${errors.title ? "control--error" : ""}`}
                  type="text"
                  required
                  value={form.title}
                  onChange={update("title")}
                  placeholder={t({
                    en: "e.g. Fake delivery fee scam.",
                    km: "ឧ. ការបោកប្រាស់ថ្លៃដឹកជញ្ជូនក្លែងក្លាយ។",
                  })}
                  aria-describedby={errors.title ? "rf-title-err" : undefined}
                  aria-invalid={errors.title ? "true" : undefined}
                />
                <p className="f-hint">
                  {t({ en: "A short and clear title.", km: "ចំណងជើងខ្លី និងច្បាស់លាស់។" })}
                </p>
                {errors.title && (
                  <p className="field-error" id="rf-title-err" role="alert">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* ─── Category + Source Platform (two-column) ─── */}
              <div className="f-row">
                <div>
                  <label className="f-label" htmlFor="rf-category">
                    <span>{t({ en: "Select a category", km: "ជ្រើសរើសប្រភេទ" })}</span>{" "}
                    <span className="req" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="rf-category"
                    name="category"
                    className={`control ${errors.category ? "control--error" : ""}`}
                    required
                    value={form.category}
                    onChange={update("category")}
                    aria-describedby={errors.category ? "rf-category-err" : undefined}
                    aria-invalid={errors.category ? "true" : undefined}
                  >
                    <option value="">{t({ en: "Select category", km: "ជ្រើសរើសប្រភេទ" })}</option>
                    {categoryOptions.map((type) => (
                      <option key={type.value} value={type.value}>
                        {t(type)}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="field-error" id="rf-category-err" role="alert">
                      {errors.category}
                    </p>
                  )}
                </div>
                <div>
                  <label className="f-label" htmlFor="rf-platform">
                    <span>{t({ en: "Where did the scam happen?", km: "តើការបោកប្រាស់កើតឡើងនៅកន្លែងណា?" })}</span>{" "}
                    <span className="req" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="rf-platform"
                    name="sourcePlatform"
                    className={`control ${errors.sourcePlatform ? "control--error" : ""}`}
                    required
                    value={form.sourcePlatform}
                    onChange={update("sourcePlatform")}
                    aria-describedby={errors.sourcePlatform ? "rf-platform-err" : undefined}
                    aria-invalid={errors.sourcePlatform ? "true" : undefined}
                  >
                    <option value="">{t({ en: "Select where it happened", km: "ជ្រើសរើសកន្លែង" })}</option>
                    <option value="Telegram">Telegram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="TikTok">{t({ en: "TikTok", km: "TikTok" })}</option>
                    <option value="SMS">SMS</option>
                    <option value="Email">{t({ en: "Email", km: "អ៊ីមែល" })}</option>
                    <option value="Telephone call">{t({ en: "Telephone call", km: "ការហៅទូរស័ព្ទ" })}</option>
                    <option value="Other">{t({ en: "Other", km: "ផ្សេងទៀត" })}</option>
                  </select>
                  {errors.sourcePlatform && (
                    <p className="field-error" id="rf-platform-err" role="alert">
                      {errors.sourcePlatform}
                    </p>
                  )}
                </div>
              </div>

              {/* ─── Description ─── */}
              <div>
                <label className="f-label" htmlFor="rf-description">
                  <span>{t({ en: "Description", km: "ការពិពណ៌នា" })}</span>{" "}
                  <span className="req" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="rf-description"
                  name="description"
                  className={`control ${errors.description ? "control--error" : ""}`}
                  rows={4}
                  required
                  value={form.description}
                  onChange={update("description")}
                  placeholder={t({
                    en: "Describe what happened…",
                    km: "ពិពណ៌នាពីអ្វីដែលបានកើតឡើង…",
                  })}
                  aria-describedby={errors.description ? "rf-description-err" : undefined}
                  aria-invalid={errors.description ? "true" : undefined}
                />
                {errors.description && (
                  <p className="field-error" id="rf-description-err" role="alert">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* ─── Date Occurred ─── */}
              <div>
                <label className="f-label" htmlFor="rf-date">
                  <span>{t({ en: "Date Occurred", km: "កាលបរិច្ឆេទកើតឡើង" })}</span>
                </label>
                <input
                  id="rf-date"
                  name="dateOccurred"
                  className="control"
                  type="date"
                  value={form.dateOccurred}
                  onChange={update("dateOccurred")}
                />
              </div>

              {/* ─── Post anonymously ─── */}
              <div className="anon-box">
                <label className="anon-label">
                  <input
                    type="checkbox"
                    className="anon-check"
                    checked={form.postAnonymously}
                    onChange={(e) => setForm((f) => ({ ...f, postAnonymously: e.target.checked }))}
                  />
                  <span>{t({ en: "Post this report anonymously", km: "បង្ហោះរបាយការណ៍នេះដោយអនាមិក" })}</span>
                </label>
                <p className="anon-sub">
                  {t({
                    en: "If unchecked, your name and profile photo will be shown with this report.",
                    km: "ប្រសិនបើមិនបានជ្រើសរើស ឈ្មោះ និងរូបថតទម្រង់របស់អ្នកនឹងត្រូវបានបង្ហាញជាមួយរបាយការណ៍នេះ។",
                  })}
                </p>
              </div>

              {/* ─── Privacy note ─── */}
              <p className="privacy-note">
                <IconLock />
                <span>
                  {t({
                    en: "By default, your name and profile photo are shown with your report. Check the box above if you'd prefer to post anonymously — we still retain your account information internally for safety and moderation, but it won't be shown to other users.",
                    km: "តាមលំនាំដើម ឈ្មោះ និងរូបថតទម្រង់របស់អ្នកត្រូវបានបង្ហាញជាមួយរបាយការណ៍របស់អ្នក។ សូមធីកប្រអប់ខាងលើ ប្រសិនបើអ្នកចង់បង្ហោះដោយអនាមិក — យើងនៅតែរក្សាទុកព័ត៌មានគណនីរបស់អ្នកខាងក្នុងសម្រាប់សុវត្ថិភាព និងការសម្របសម្រួល ប៉ុន្តែវានឹងមិនត្រូវបានបង្ហាញដល់អ្នកប្រើប្រាស់ផ្សេងទៀតទេ។",
                  })}
                </span>
              </p>

              {/* ─── Submit row ─── */}
              <div className="rf-submit-row">
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  <span>{submitting
                    ? t({ en: "Saving…", km: "កំពុងរក្សាទុក…" })
                    : (isEditing
                      ? t({ en: "Save Changes", km: "រក្សាទុកការផ្លាស់ប្តូរ" })
                      : t({ en: "Submit Report", km: "ដាក់ស្នើរបាយការណ៍" }))}</span>
                </button>
                <button type="button" className="rf-cancel-link" onClick={handleCancel}>
                  {t({ en: "Cancel", km: "បោះបង់" })}
                </button>
              </div>
            </form>
          ) : (
            <div className="success">
              <span className="s-ic" aria-hidden="true">
                <IconCheck style={{ width: 30, height: 30 }} />
              </span>
              <h3 ref={successTitleRef} tabIndex={-1}>
                {t({ en: "Report Submitted!", km: "របាយការណ៍ត្រូវបានដាក់ស្នើ!" })}
              </h3>
              <p>
                {t({
                  en: "Thank you for helping others stay alert. Your experience will help people recognize similar attempts.",
                  km: "អរគុណដែលជួយឲ្យអ្នកដទៃប្រុងប្រយ័ត្ន។ បទពិសោធន៍របស់អ្នកនឹងជួយឱ្យមនុស្សផ្សេងទៀតស្គាល់ការព្យាយាមបោកប្រាស់ដូចគ្នា।",
                })}
              </p>
            </div>
          )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
