import { useRef, useState } from "react"
import { useLang } from "@/lib/i18n"
import { REPORT_TYPES } from "@/lib/data"
import { Reveal } from "./reveal"
import { IconCheck, IconLock, IconSend } from "./icons"

export function ReportForm() {
  const { t } = useLang()
  const formRef = useRef(null)
  const typeRef = useRef(null)
  const successTitleRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    requestAnimationFrame(() => successTitleRef.current?.focus())
  }

  const resetForm = () => {
    if (formRef.current) formRef.current.reset()
    setSubmitted(false)
    requestAnimationFrame(() => typeRef.current?.focus())
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
          <form ref={formRef} className="f-grid" onSubmit={handleSubmit}>
            <div className="f-row">
              <div>
                <label className="f-label" htmlFor="rf-type">
                  <span>{t({ en: "Scam Type", km: "ប្រភេទការបោកប្រាស់" })}</span>{" "}
                  <span className="req" aria-hidden="true">
                    *
                  </span>
                </label>
                <select
                  ref={typeRef}
                  id="rf-type"
                  name="scamType"
                  className="control"
                  required
                  defaultValue=""
                >
                  <option value="">{t({ en: "Select a type", km: "ជ្រើសរើសប្រភេទ" })}</option>
                  {REPORT_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {t(type)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="f-label" htmlFor="rf-platform">
                  {t({ en: "Platform (Optional)", km: "វេទិកា (ស្រេចចិត្ត)" })}
                </label>
                <input
                  id="rf-platform"
                  name="platform"
                  className="control"
                  type="text"
                  placeholder={t({
                    en: "e.g. Telegram, Facebook, SMS…",
                    km: "ឧ. Telegram, Facebook, SMS…",
                  })}
                />
              </div>
            </div>
            <div>
              <label className="f-label" htmlFor="rf-desc">
                <span>{t({ en: "What Happened?", km: "អ្វីដែលបានកើតឡើង?" })}</span>{" "}
                <span className="req" aria-hidden="true">
                  *
                </span>
              </label>
              <textarea
                id="rf-desc"
                name="description"
                className="control"
                required
                placeholder={t({
                  en: "Describe how you were contacted and what they asked for.",
                  km: "ពណ៌នាពីរបៀបដែលពួកគេទំនាក់ទំនងមកអ្នក និងអ្វីដែលពួកគេសុំ។",
                })}
              />
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
