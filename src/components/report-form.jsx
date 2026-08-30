import { useRef, useState } from "react"
import { useLang } from "@/lib/i18n"
import { SCAM_CHANNELS, IN_PICTURE_TYPES } from "@/lib/data"
import { Reveal } from "./reveal"
import { IconCheck, IconLock, IconSend } from "./icons"

const MAX_SCREENSHOT_MB = 5

export function ReportForm() {
  const { t } = useLang()
  const successTitleRef = useRef(null)
  const fileRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ scamType: "", inPicture: "", platform: "", contacted: "", askedFor: "", consent: false })
  const [screenshot, setScreenshot] = useState(null)
  const [errors, setErrors] = useState({})

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

  const resetForm = () => {
    removeScreenshot()
    setForm({ scamType: "", inPicture: "", platform: "", contacted: "", askedFor: "", consent: false })
    setSubmitted(false)
  }

  const validate = () => {
    const errs = {}
    if (!form.scamType) errs.scamType = t({ en: "Please select a scam type.", km: "សូមជ្រើសរើសប្រភេទការបោកប្រាស់។" })
    if (!form.inPicture) errs.inPicture = t({ en: "Please select an option.", km: "សូមជ្រើសរើសជម្រើសមួយ។" })
    if (!form.platform.trim()) errs.platform = t({ en: "Platform is required.", km: "ត្រូវការវេទិកា។" })
    if (!form.contacted.trim()) errs.contacted = t({ en: "Please describe how you were contacted.", km: "សូមពណ៌នាពីរបៀបដែលពួកគេទំនាក់ទំនងមកអ្នក។" })
    if (!form.askedFor.trim()) errs.askedFor = t({ en: "Please describe what they asked for.", km: "សូមពណ៌នាពីអ្វីដែលពួកគេសុំ។" })
    if (!form.consent) errs.consent = t({ en: "Please confirm that you agree to sharing this report.", km: "សូមបញ្ជាក់ថាអ្នកយល់ព្រមចែករំលែករបាយការណ៍នេះ។" })
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    // TODO: replace with real API call (POST /api/reports)
    setSubmitted(true)
    requestAnimationFrame(() => successTitleRef.current?.focus())
  }

  return (
    <div className="form-block" id="report">
      <Reveal className="section-head center">
        <span className="eyebrow">{t({ en: "Report a scam", km: "រាយការណ៍ការបោកប្រាស់" })}</span>
        <h2>{t({ en: "Share What Happened", km: "ចែករំលែកអ្វីដែលបានកើតឡើង" })}</h2>
        <p>
          {t({
            en: "Your story can help someone else recognize the same trick before it’s too late. Reports are anonymous by default.",
            km: "រឿងរ៉ាវរបស់អ្នកអាចជួយអ្នកដទៃស្គាល់ល្បិចដូចគ្នាបានទាន់ពេល។ របាយការណ៍ជាអនាមិកតាមលំនាំដើម។",
          })}
        </p>
      </Reveal>

      <Reveal className="form-card">
        {!submitted ? (
          <form className="f-grid" onSubmit={handleSubmit} noValidate>
            <div className="f-row">
              <div>
                <label className="f-label" htmlFor="rf-type">
                  <span>{t({ en: "Scam Type", km: "ប្រភេទការបោកប្រាស់" })}</span>{" "}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </label>
                <select
                  id="rf-type"
                  name="scamType"
                  className={`control ${errors.scamType ? "control--error" : ""}`}
                  required
                  value={form.scamType}
                  onChange={update("scamType")}
                  aria-describedby={errors.scamType ? "rf-type-err" : undefined}
                  aria-invalid={errors.scamType ? "true" : undefined}
                >
                  <option value="">{t({ en: "Select a type", km: "ជ្រើសរើសប្រភេទ" })}</option>
                  {SCAM_CHANNELS.map((type) => (
                    <option key={type.value} value={type.value}>
                      {t(type)}
                    </option>
                  ))}
                </select>
                {errors.scamType && (
                  <p className="field-error" id="rf-type-err" role="alert">
                    {errors.scamType}
                  </p>
                )}
              </div>
              <div>
                <label className="f-label" htmlFor="rf-picture">
                  <span>{t({ en: "In Picture", km: "ក្នុងរូបភាព" })}</span>{" "}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </label>
                <select
                  id="rf-picture"
                  name="inPicture"
                  className={`control ${errors.inPicture ? "control--error" : ""}`}
                  required
                  value={form.inPicture}
                  onChange={update("inPicture")}
                  aria-describedby={errors.inPicture ? "rf-picture-err" : undefined}
                  aria-invalid={errors.inPicture ? "true" : undefined}
                >
                  <option value="">{t({ en: "Select an option", km: "ជ្រើសរើសជម្រើសមួយ" })}</option>
                  {IN_PICTURE_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {t(type)}
                    </option>
                  ))}
                </select>
                {errors.inPicture && (
                  <p className="field-error" id="rf-picture-err" role="alert">
                    {errors.inPicture}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="f-label" htmlFor="rf-platform">
                <span>{t({ en: "Platform where it happened", km: "វេទិកាដែលវាបានកើតឡើង" })}</span>{" "}
                <span className="req" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                id="rf-platform"
                name="platform"
                className={`control ${errors.platform ? "control--error" : ""}`}
                type="text"
                required
                value={form.platform}
                onChange={update("platform")}
                placeholder={t({
                  en: "e.g. Telegram, Facebook, SMS…",
                  km: "ឧ. Telegram, Facebook, SMS…",
                })}
                aria-describedby={errors.platform ? "rf-platform-err" : undefined}
                aria-invalid={errors.platform ? "true" : undefined}
              />
              {errors.platform && (
                <p className="field-error" id="rf-platform-err" role="alert">
                  {errors.platform}
                </p>
              )}
            </div>
            <div>
              <label className="f-label" htmlFor="rf-contacted">
                <span>{t({ en: "How were you contacted?", km: "តើពួកគេទំនាក់ទំនងមកអ្នកដោយរបៀបណា?" })}</span>{" "}
                <span className="req" aria-hidden="true">
                  *
                </span>
              </label>
              <textarea
                id="rf-contacted"
                name="contacted"
                className={`control ${errors.contacted ? "control--error" : ""}`}
                rows={3}
                required
                value={form.contacted}
                onChange={update("contacted")}
                placeholder={t({
                  en: "Describe how they reached you — a call, message, ad, link…",
                  km: "ពណ៌នាពីរបៀបដែលពួកគេទៅដល់អ្នក — ការហៅទូរស័ព្ទ សារ ពាណិជ្ជកម្ម តំណ…",
                })}
                aria-describedby={errors.contacted ? "rf-contacted-err" : undefined}
                aria-invalid={errors.contacted ? "true" : undefined}
              />
              {errors.contacted && (
                <p className="field-error" id="rf-contacted-err" role="alert">
                  {errors.contacted}
                </p>
              )}
            </div>
            <div>
              <label className="f-label" htmlFor="rf-asked">
                <span>{t({ en: "What did they ask for?", km: "តើពួកគេសុំអ្វី?" })}</span>{" "}
                <span className="req" aria-hidden="true">
                  *
                </span>
              </label>
              <textarea
                id="rf-asked"
                name="askedFor"
                className={`control ${errors.askedFor ? "control--error" : ""}`}
                rows={3}
                required
                value={form.askedFor}
                onChange={update("askedFor")}
                placeholder={t({
                  en: "Describe what they wanted you to do, pay, or share.",
                  km: "ពណ៌នាពីអ្វីដែលពួកគេចង់ឲ្យអ្នកធ្វើ បង់ប្រាក់ ឬចែករំលែក។",
                })}
                aria-describedby={errors.askedFor ? "rf-asked-err" : undefined}
                aria-invalid={errors.askedFor ? "true" : undefined}
              />
              {errors.askedFor && (
                <p className="field-error" id="rf-asked-err" role="alert">
                  {errors.askedFor}
                </p>
              )}
            </div>

            <div>
              <span className="f-label" id="rf-shot-label">
                {t({ en: "Screenshot", km: "រូបភាពអេក្រង់" })}{" "}
                <span className="opt">({t({ en: "optional", km: "ស្រេចចិត្ត" })})</span>
              </span>
              {screenshot ? (
                <div className="upload-preview">
                  <img src={screenshot.url} alt={t({ en: "Screenshot preview", km: "រូបភាពអេក្រង់ជាមុន" })} />
                  <button
                    type="button"
                    className="upload-remove"
                    onClick={removeScreenshot}
                    aria-label={t({ en: "Remove screenshot", km: "លុបរូបភាពអេក្រង់" })}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button type="button" className="upload-zone" onClick={() => fileRef.current?.click()}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                  <span>
                    {t({ en: "Click to upload an image (PNG, JPG — max 5MB)", km: "ចុចដើម្បីបញ្ចូលរូបភាព (PNG, JPG — អតិបរមា ៥MB)" })}
                  </span>
                </button>
              )}
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

            <div>
              <label className="f-label" htmlFor="rf-name">
                {t({ en: "Name / Username (Optional)", km: "ឈ្មោះ / ឈ្មោះអ្នកប្រើ (ស្រេចចិត្ត)" })}
              </label>
              <input
                id="rf-name"
                name="reporter"
                className="control"
                type="text"
                placeholder={t({ en: "Leave blank to stay anonymous", km: "ទុកចំហចោលដើម្បីរក្សាភាពអនាមិក" })}
              />
            </div>

            <div className={`consent-box ${errors.consent ? "consent-box--error" : ""}`}>
              <input
                id="rf-consent"
                name="consent"
                className="consent-check"
                type="checkbox"
                checked={form.consent}
                onChange={(e) =>
                  update("consent")({ target: { value: e.target.checked } })
                }
                aria-describedby={errors.consent ? "rf-consent-err" : undefined}
                aria-invalid={errors.consent ? "true" : undefined}
              />
              <label htmlFor="rf-consent">
                <span>
                  {t({
                    en: "I agree this report can be used to warn other users and shared with the Angket bot’s scam database.",
                    km: "ខ្ញុំយល់ស្របថារបាយការណ៍នេះអាចប្រើដើម្បីព្រមានអ្នកប្រើផ្សេងទៀត និងចែករំលែកជាមួយមូលដ្ឋានទិន្នន័យការបោកប្រាស់របស់ Bot Angket ។",
                  })}
                </span>
                <strong>
                  {t({
                    en: "My Telegram username stays private and is never shown publicly.",
                    km: "ឈ្មោះអ្នកប្រើ Telegram របស់ខ្ញុំនៅរក្សាការសម្ងាត់ ហើយមិនដែលត្រូវបានបង្ហាញជាសាធារណៈឡើយ។",
                  })}
                </strong>
              </label>
              {errors.consent && (
                <p className="field-error" id="rf-consent-err" role="alert">
                  {errors.consent}
                </p>
              )}
            </div>
            <p className="privacy-note">
              <IconLock />
              <span>
                {t({
                  en: "Please don’t include passwords, OTP codes, bank details, or phone numbers in your report.",
                  km: "សូមកុំបញ្ចូលពាក្យសម្ងាត់ លេខកូដ OTP ព័ត៌មានធនាគារ ឬលេខទូរស័ព្ទក្នុងរបាយការណ៍របស់អ្នក។",
                })}
              </span>
            </p>
            <button type="submit" className="btn btn-primary btn-lg">
              <IconSend />
              <span>{t({ en: "Submit Report", km: "ដាក់ស្នើរបាយការណ៍" })}</span>
            </button>
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
                km: "អរគុណដែលជួយឲ្យអ្នកដទៃប្រុងប្រយ័ត្ន។ បទពិសោធន៍របស់អ្នកនឹងជួយឱ្យមនុស្សផ្សេងទៀតស្គាល់ការព្យាយាមបោកប្រាស់ដូចគ្នា។",
              })}
            </p>
            <button type="button" className="btn btn-outline" onClick={resetForm}>
              <span>{t({ en: "Submit another report", km: "ដាក់ស្នើរបាយការណ៍ថ្មីទៀត" })}</span>
            </button>
          </div>
        )}
      </Reveal>
    </div>
  )
}
