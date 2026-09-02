import { useEffect, useRef, useState } from "react"
import { useLang } from "@/lib/i18n"
import { SCAM_TYPES } from "@/lib/data"
import { IconCheck, IconClose, IconLock } from "./icons"

const MAX_SCREENSHOT_MB = 5

export function ReportForm({ open, onClose, onSubmitted }) {
  const { t } = useLang()
  const successTitleRef = useRef(null)
  const fileRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    title: "",
    category: "",
    sourcePlatform: "",
    description: "",
    amountLost: "",
    dateOccurred: "",
    contactMethod: "",
  })
  const CONTACT_METHODS = [
    { value: "Telegram", label: { en: "Telegram", km: "Telegram" } },
    { value: "Facebook", label: { en: "Facebook", km: "Facebook" } },
    { value: "SMS", label: { en: "SMS", km: "SMS" } },
    { value: "Telephone call", label: { en: "Telephone call", km: "ការហៅទូរស័ព្ទ" } },
    { value: "Other", label: { en: "Other", km: "ផ្សេងទៀត" } },
  ]
  const [screenshot, setScreenshot] = useState(null)
  const [errors, setErrors] = useState({})

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
      // Local preview only — production should upload the file to real storage
      // (S3, Cloudinary, etc.) and store the resulting URL, not the raw image blob.
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
    if (!form.sourcePlatform) errs.sourcePlatform = t({ en: "Please select a platform.", km: "សូមជ្រើសរើសវេទិកា។" })
    if (!form.description.trim()) errs.description = t({ en: "Description is required.", km: "ការពិពណ៌នាជាចាំបាច់។" })
    if (!form.contactMethod) errs.contactMethod = t({ en: "Please select how they contacted you.", km: "សូមជ្រើសរើសពីរបៀបដែលពួកគេទំនាក់ទំនងអ្នក។" })
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    // TODO: replace with real API call (POST /api/reports) that persists
    // status = 'published' by default and stores the reporter's user_id.
    onSubmitted?.(form)
    setSubmitted(true)
    requestAnimationFrame(() => successTitleRef.current?.focus())
  }

  const handleCancel = () => {
    setSubmitted(false)
    setForm({
      title: "",
      category: "",
      sourcePlatform: "",
      description: "",
      amountLost: "",
      dateOccurred: "",
      contactMethod: "",
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
            <div className="section-head center">
              <span className="eyebrow">{t({ en: "Report a scam", km: "រាយការណ៍ការបោកប្រាស់" })}</span>
              <h2 id="drawer-title">{t({ en: "Share What Happened", km: "ចែករំលែកអ្វីដែលបានកើតឡើង" })}</h2>
              <p>
                {t({
                  en: "Your story can help someone else recognize the same trick before it's too late. Reports are anonymous by default.",
                  km: "រឿងរ៉ាវរបស់អ្នកអាចជួយអ្នកដទៃស្គាល់ល្បិចដូចគ្នាបានទាន់ពេល។ របាយការណ៍ជាអនាមិកតាមលំនាំដើម។",
                })}
              </p>
            </div>
            <div className="form-card">
          {!submitted ? (
            <form className="f-grid" onSubmit={handleSubmit} noValidate>

              {/* ─── Screenshot upload ─── */}
              <div className="rf-upload-row">
                <span className="f-label" id="rf-shot-label">
                  {t({ en: "Screenshot", km: "រូបភាពអេក្រង់" })}{" "}
                  <span className="opt">({t({ en: "optional", km: "ស្រេចចិត្ត" })})</span>
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
                        en: "PNG, JPG, WebP — up to 5MB (optional)",
                        km: "PNG, JPG, WebP — រហូតដល់ ៥MB (ស្រេចចិត្ត)",
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
                    <span>{t({ en: "Category", km: "ប្រភេទ" })}</span>{" "}
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
                    {SCAM_TYPES.map((type) => (
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
                    <span>{t({ en: "Source Platform", km: "វេទិកា" })}</span>{" "}
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
                    <option value="">{t({ en: "Select platform", km: "ជ្រើសរើសវេទិកា" })}</option>
                    <option value="Telegram">Telegram</option>
                    <option value="Facebook">Facebook</option>
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

              {/* ─── Amount Lost + Date Occurred (two-column) ─── */}
              <div className="f-row">
                <div>
                  <label className="f-label" htmlFor="rf-amount">
                    <span>{t({ en: "Amount Lost", km: "ចំនួនប្រាក់បាត់បង់" })}</span>{" "}
                    <span className="opt">({t({ en: "optional", km: "ស្រេចចិត្ត" })})</span>
                  </label>
                  <input
                    id="rf-amount"
                    name="amountLost"
                    className="control"
                    type="text"
                    value={form.amountLost}
                    onChange={update("amountLost")}
                    placeholder={t({
                      en: "e.g. $50",
                      km: "ឧ. $50",
                    })}
                  />
                </div>
                <div>
                  <label className="f-label" htmlFor="rf-date">
                    <span>{t({ en: "Date Occurred", km: "កាលបរិច្ឆេទកើតឡើង" })}</span>{" "}
                    <span className="opt">({t({ en: "optional", km: "ស្រេចចិត្ត" })})</span>
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
              </div>

              {/* ─── Contact method ─── */}
              <div>
                <label className="f-label" htmlFor="rf-contact">
                  <span>{t({ en: "Contact method", km: "វិធីទំនាក់ទំនង" })}</span>{" "}
                  <span className="req" aria-hidden="true">*</span>
                </label>
                <select
                  id="rf-contact"
                  name="contactMethod"
                  className={`control ${errors.contactMethod ? "control--error" : ""}`}
                  required
                  value={form.contactMethod}
                  onChange={update("contactMethod")}
                  aria-describedby={errors.contactMethod ? "rf-contact-err" : undefined}
                  aria-invalid={errors.contactMethod ? "true" : undefined}
                >
                  <option value="">{t({ en: "How did they contact you?", km: "តើពួកគេទំនាក់ទំនងអ្នកដោយរបៀបណា?" })}</option>
                  {CONTACT_METHODS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {t(m.label)}
                    </option>
                  ))}
                </select>
                {errors.contactMethod && (
                  <p className="field-error" id="rf-contact-err" role="alert">
                    {errors.contactMethod}
                  </p>
                )}
              </div>

              {/* ─── Privacy note ─── */}
              <p className="privacy-note">
                <IconLock />
                <span>
                  {t({
                    en: "Please don't include passwords, OTP codes, bank details, or phone numbers in your report.",
                    km: "សូមកុំបញ្ចូលពាក្យសម្ងាត់ លេខកូដ OTP ព័ត៌មានធនាគារ ឬលេខទូរស័ព្ទក្នុងរបាយការណ៍របស់អ្នក។",
                  })}
                </span>
              </p>

              {/* ─── Submit row ─── */}
              <div className="rf-submit-row">
                <button type="submit" className="btn btn-primary">
                  <span>{t({ en: "Submit Report", km: "ដាក់ស្នើរបាយការណ៍" })}</span>
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
