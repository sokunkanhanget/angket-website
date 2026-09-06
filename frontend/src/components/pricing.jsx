import { useState } from "react"
import { Link } from "react-router-dom"
import { useLang } from "@/lib/i18n"
import { TELEGRAM_BOT_URL } from "@/lib/data"
import { Reveal } from "./reveal"
import { IconCheck, IconShield, IconSend } from "./icons"
import { Clock } from "lucide-react"

// Presentational only: tabs + billing toggle have no backend and no real billing.
// Prices are demo values; toggling just swaps displayed strings via state.

const FREE_FEATURES = [
  { en: "5 checks per day", km: "ពិនិត្យ ៥ ដងក្នុងមួយថ្ងៃ" },
  { en: "Estimated risk score", km: "សន្ទស្សន៍ហានិភ័យប៉ាន់ស្មាន" },
  { en: "Browse community reports", km: "មើលរបាយការណ៍ពីសហគមន៍" },
]

const PREMIUM_FEATURES = [
  { en: "Unlimited checks", km: "ពិនិត្យមិនកំណត់" },
  { en: "Detailed risk explanations", km: "ការពន្យល់ហានិភ័យលម្អិត" },
  { en: "Priority alert speed", km: "ជូនដំណឹងលឿនអាទិភាព" },
  { en: "Weekly safety digest", km: "សង្ខេបសុវត្ថិភាពប្រចាំសប្ដាហ៍" },
]

const BANKS = [
  { label: "ABA", color: "#d81b31" },
  { label: "ACLEDA", color: "#0072bc" },
  { label: "Wing", color: "#7a2fa3" },
  { label: "PRASAC", color: "#0f9d58" },
]

function FeatureList({ items }) {
  const { t } = useLang()
  return (
    <ul className="pkg-features">
      {items.map((item) => (
        <li key={item.en}>
          <span className="pkg-check" aria-hidden="true">
            <IconCheck />
          </span>
          <span>{t(item)}</span>
        </li>
      ))}
    </ul>
  )
}

function QrPlaceholder({ t }) {
  const cells = []
  for (let r = 0; r < 11; r++) {
    for (let c = 0; c < 11; c++) {
      if ((r + c) % 2 === 0) {
        cells.push(<rect key={`${r}-${c}`} x={c * 20} y={r * 20} width="20" height="20" fill="#e7edf5" />)
      }
    }
  }
  const finder = (x, y) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="36" height="36" fill="#c3cddb" rx="4" />
      <rect x={x + 8} y={y + 8} width="20" height="20" fill="#fff" />
      <rect x={x + 14} y={y + 14} width="8" height="8" fill="#c3cddb" />
    </g>
  )
  return (
    <div className="qr-box">
      <svg
        className="qr-svg"
        viewBox="0 0 220 220"
        role="img"
      >
        <rect width="220" height="220" fill="#fff" />
        {cells}
        {finder(4, 4)}
        {finder(180, 4)}
        {finder(4, 180)}
      </svg>
      
    </div>
  )
}

// FRONTEND-ONLY CHECKOUT UI.
// Step 2's QR is a placeholder graphic (never a real scannable code).
// Step 3 assumes payment success without any verification.
// Before launch: (1) generate a real per-transaction KHQR via a payment
// provider API, (2) verify payment via webhook/callback before showing
// Step 3, (3) auto-advance from Step 2 to Step 3 only on confirmed
// payment, not on button click.
function CheckoutFlow({ annual, t, step, go }) {
  const price = annual ? "3.99" : "4.99"
  const plan = t({ en: "Premium", km: "ព្រីមីអ៊ឹម" })
  const cycle = annual ? t({ en: "Annual", km: "ប្រចាំឆ្នាំ" }) : t({ en: "Monthly", km: "ប្រចាំខែ" })

  return (
    <div className="checkout-panel">
      <div className="checkout-step" key={step}>
        {step === 1 && (
          <>
            <span className="checkout-eyebrow">{t({ en: "Confirm plan", km: "បញ្ជាក់កញ្ចប់" })}</span>
            <h3 className="checkout-title">{t({ en: "Almost done - review your plan", km: "ជិតរួចរាល់ហើយ - ពិនិត្យកញ្ចប់របស់អ្នក" })}</h3>
            <div className="checkout-summary">
              <span className="checkout-plan">{plan}</span>
              <span className="checkout-price">
                ${price}
                <small>{t({ en: "/month", km: "/ខែ" })}</small>
              </span>
              <span className="checkout-cycle">
                {cycle}
                {annual ? ` · ${t({ en: "billed annually", km: "គិតជាប្រចាំឆ្នាំ" })}` : ""}
              </span>
            </div>
            <div className="checkout-actions">
              <button type="button" className="btn btn--teal btn-lg" onClick={() => go(2)}>
                {t({ en: "Continue to payment", km: "បន្តទៅការទូទាត់" })}
              </button>
            </div>
            <button type="button" className="checkout-link" onClick={() => go(0)}>
              {t({ en: "Change plan", km: "ផ្លាស់ប្ដូរកញ្ចប់" })}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="checkout-title">{t({ en: "Scan with any banking app", km: "ស្កេនជាមួយកម្មវិធីធនាគារណាមួយ" })}</h3>
            <QrPlaceholder t={t} />
            <div className="checkout-total">
              <strong>${price}</strong>
              <span>·</span>
              <span>
                {plan} · {cycle}
              </span>
            </div>
            <p className="checkout-works">{t({ en: "Works with", km: "ប្រើបានជាមួយ" })}</p>
            <div className="bank-row">
              {BANKS.map((bank) => (
                <span key={bank.label} className="bank-icon" style={{ background: bank.color }} title={bank.label} aria-hidden="true">
                  {bank.label[0]}
                </span>
              ))}
            </div>
            <p className="expiry-label">
              <Clock size={14} />
              {t({ en: "Code expires in 04:59", km: "លេខកូដផុតកំណត់ក្នុងរយៈពេល 04:59" })}
            </p>
            <div className="checkout-actions">
              <button type="button" className="btn btn--teal btn-lg" onClick={() => go(3)}>
                {t({ en: "I've completed the payment", km: "ខ្ញុំបានបង់ប្រាក់រួចហើយ" })}
              </button>
            </div>
            <button type="button" className="checkout-link">
              {t({ en: "Change payment method", km: "ផ្លាស់ប្ដូរវិធីទូទាត់" })}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <span className="pulse-wrap" aria-hidden="true">
              <span className="pulse-dot" />
            </span>
            <h3 className="checkout-title">{t({ en: "Payment received - verifying", km: "បានទទួលការទូទាត់ - កំពុងផ្ទៀងផ្ទាត់" })}</h3>
            <p className="checkout-copy">
              {t({
                en: "We're confirming your payment. This usually takes a few minutes. You'll get a message from the Angket bot once Premium is active.",
                km: "យើងកំពុងផ្ទៀងផ្ទាត់ការទូទាត់របស់អ្នក។ ជាធម្មតាចំណាយពេលពីរបីនាទី។ អ្នកនឹងទទួលបានសារពី Bot Angket នៅពេលដែលកញ្ចប់ព្រីមីអ៊ឹមដំណើរការ។",
              })}
            </p>
            <div className="checkout-actions">
              <Link className="btn btn-outline btn-lg" to="/">
                {t({ en: "Back to home", km: "ត្រឡប់ទៅទំព័រដើម" })}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export function Pricing() {
  const { t } = useLang()
  const [plan, setPlan] = useState("individual")
  const [annual, setAnnual] = useState(false)
  const [checkout, setCheckout] = useState(null)

  const pickPlan = (value) => {
    setPlan(value)
    setCheckout(null)
  }

  const toggleBilling = () => {
    setAnnual((v) => !v)
  }

  const go = (step) => {
    setCheckout(step === 0 ? null : { step })
  }

  return (
    <section className="pricing" id="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <Reveal className="section-head">
          <h2 id="pricing-title">{t({ en: "Subscription", km: "ការទូទាត់ប្រាក់" })}</h2>
        </Reveal>

        <Reveal className="pricing-controls">
          <div className="seg pricing-tabs" role="tablist" aria-label={t({ en: "Select plan type", km: "ជ្រើសរើសប្រភេទកញ្ចប់" })}>
            <button
              type="button"
              role="tab"
              aria-selected={plan === "individual"}
              aria-pressed={plan === "individual"}
              className="chip-btn"
              onClick={() => pickPlan("individual")}
            >
              {t({ en: "Individuals", km: "បុគ្គល" })}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={plan === "business"}
              aria-pressed={plan === "business"}
              className="chip-btn"
              onClick={() => pickPlan("business")}
            >
              {t({ en: "Business", km: "អាជីវកម្ម" })}
            </button>
          </div>

          {plan === "individual" && !checkout && (
            <div className="pricing-toggle">
              <span className={!annual ? "on" : undefined}>{t({ en: "Monthly", km: "ប្រចាំខែ" })}</span>
              <button type="button" role="switch" aria-checked={annual} className="pricing-switch" onClick={toggleBilling}>
                <span className="pricing-knob" />
              </button>
            </div>
          )}
        </Reveal>

        {plan === "individual" ? (
          /* FRONTEND-ONLY CHECKOUT UI. Step 2's QR is a placeholder graphic.
             Step 3 assumes payment success without verification. Before launch:
             (1) generate a real per-transaction KHQR via a payment provider API,
             (2) verify payment via webhook/callback before showing Step 3,
             (3) auto-advance from Step 2 to Step 3 only on confirmed payment,
             not on button click. */
          checkout ? (
            <CheckoutFlow annual={annual} t={t} step={checkout.step} go={go} />
          ) : (
            <div className="pricing-grid">
              <Reveal as="article" className="pkg-card free">
                <div className="pkg-top">
                  <span className="pkg-ic" aria-hidden="true">
                    <IconShield />
                  </span>
                  <h3>{t({ en: "Free", km: "ឥតគិតថ្លៃ" })}</h3>
                </div>
                <div className="pkg-price">
                  <span className="pkg-currency">$</span>
                  <strong>0</strong>
                  <span className="pkg-per">{t({ en: "/month", km: "/ខែ" })}</span>
                </div>
                <p className="pkg-tagline">{t({ en: "Everyday scam checks on Telegram", km: "ពិនិត្យការបោកប្រាស់ប្រចាំថ្ងៃលើ Telegram" })}</p>
                <FeatureList items={FREE_FEATURES} />
                <a className="btn btn-outline pkg-btn" href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
                  <IconSend />
                  <span>{t({ en: "Get started", km: "ចាប់ផ្ដើម" })}</span>
                </a>
              </Reveal>

              <Reveal as="article" className="pkg-card premium">
                <span className="pkg-pop">{t({ en: "Most popular", km: "ពេញនិយមបំផុត" })}</span>
                <div className="pkg-top">
                  <span className="pkg-ic" aria-hidden="true">
                    <IconShield check />
                  </span>
                  <h3>{t({ en: "Premium", km: "ព្រីមីអ៊ឹម" })}</h3>
                </div>
                <div className="pkg-price">
                  <span className="pkg-currency">$</span>
                  <strong>{annual ? "3.99" : "4.99"}</strong>
                  <span className="pkg-per">{t({ en: "/month", km: "/ខែ" })}</span>
                </div>
                {annual && <span className="pkg-note">{t({ en: "billed annually", km: "គិតជាប្រចាំឆ្នាំ" })}</span>}
                <p className="pkg-tagline">{t({ en: "Unlimited checks, deeper and faster.", km: "ពិនិត្យមិនកំណត់ ស៊ីជម្រៅ និងលឿនជាងមុន។" })}</p>
                <FeatureList items={PREMIUM_FEATURES} />
                <button type="button" className="btn btn--teal pkg-btn" onClick={() => go(1)}>
                  {t({ en: "Upgrade", km: "ដំឡើងកញ្ចប់" })}
                </button>
              </Reveal>
            </div>
          )
        ) : (
          <Reveal className="pkg-business">
            <span className="pkg-ic" aria-hidden="true">
              <IconShield check />
            </span>
            <h3>{t({ en: "Business", km: "អាជីវកម្ម" })}</h3>
            <p>{t({ en: "Contact us for team pricing and custom volume plans.", km: "ទាក់ទងយើងសម្រាប់តម្លៃក្រុមហ៊ុន និងកញ្ចប់តាមតម្រូវការ។" })}</p>
            <div className="tg-ctas">
              <a className="btn btn-outline" href="mailto:hello@angket.org">
                {t({ en: "Email us", km: "ផ្ញើអ៊ីមែល" })}
              </a>
              <a className="btn btn--teal" href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
                <IconSend />
                <span>{t({ en: "Message on Telegram", km: "ផ្ញើសារតាម Telegram" })}</span>
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}