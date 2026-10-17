import { useState } from "react"
import { Link } from "react-router-dom"
import { useLang } from "@/lib/i18n"
import { TELEGRAM_BOT_URL } from "@/lib/data"
import { Reveal } from "./reveal"
import { IconCheck, IconShield, IconSend } from "./icons"
import { Clock } from "lucide-react"

// Presentational only: tabs + billing toggle have no backend and no real billing.
// Prices are demo values; toggling just swaps displayed strings via state.

const CONTAINER = "mx-auto w-full max-w-[1440px] px-[clamp(1rem,4vw,3rem)]"

const BTN =
  "inline-flex items-center justify-center gap-2 rounded-full border cursor-pointer font-semibold whitespace-nowrap transition-[background-color,box-shadow,transform] duration-[180ms] ease-out"
const BTN_MD = "px-[1.25rem] py-[0.62rem] text-[0.95rem] km:pt-[0.42rem] km:pb-[0.42rem]"
const BTN_LG = "px-[1.7rem] py-[0.88rem] text-[1.03rem] km:pt-[0.62rem] km:pb-[0.62rem]"
const PKG_BTN = "px-[1.25rem] py-[0.62rem] text-[0.95rem] km:pt-[0.62rem] km:pb-[0.62rem]"
const BTN_TEAL = "border-transparent bg-teal text-white hover:bg-teal-dim hover:-translate-y-px"
const BTN_OUTLINE = "border-blue-200 bg-white text-blue-700 hover:bg-blue-50"

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
    <ul className="list-none p-0 m-0 mb-[1.25rem]">
      {items.map((item) => (
        <li key={item.en} className="flex items-center gap-[0.55rem] text-[0.9rem] text-text py-[0.32rem]">
          <span
            className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-green-border bg-green-bg text-green-text"
            aria-hidden="true"
          >
            <IconCheck style={{ width: 11, height: 11 }} />
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
    <div className="rounded-md border border-[#e3e9f3] bg-white p-[1.1rem] shadow-sm">
      <svg
        className="mx-auto block h-[200px] w-[200px] max-[600px]:h-[168px] max-[600px]:w-[168px]"
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
    <div className="mx-auto max-w-[560px] rounded-lg border border-[#e3e9f3] bg-white p-[2rem_1.8rem] shadow-md max-[600px]:p-[1.5rem_1.2rem]">
      <div className="flex flex-col items-center gap-[1.05rem] text-center animate-[checkoutFade_0.4s_ease_both]" key={step}>
        {step === 1 && (
          <>
            <span className="text-[0.78rem] font-bold uppercase tracking-[0.06em] text-teal-dim">{t({ en: "Confirm plan", km: "បញ្ជាក់កញ្ចប់" })}</span>
            <h3 className="max-w-[22em] text-[1.32rem] leading-[1.35]">{t({ en: "Almost done - review your plan", km: "ជិតរួចរាល់ហើយ - ពិនិត្យកញ្ចប់របស់អ្នក" })}</h3>
            <div className="flex w-full flex-col items-center gap-[0.35rem] rounded-md border border-[#e3e9f3] bg-surface p-[1.15rem]">
              <span className="text-[0.9rem] font-bold text-teal-dim">{plan}</span>
              <span className="font-display text-[2.1rem] font-bold leading-none text-ink km:font-km">
                ${price}
                <small className="ml-[0.2rem] text-[0.85rem] font-semibold text-faint">{t({ en: "/month", km: "/ខែ" })}</small>
              </span>
              <span className="text-[0.85rem] text-[#56657f]">
                {cycle}
                {annual ? ` · ${t({ en: "billed annually", km: "គិតជាប្រចាំឆ្នាំ" })}` : ""}
              </span>
            </div>
            <div className="flex w-full flex-col gap-[0.6rem]">
              <button type="button" className={`${BTN} ${BTN_LG} ${BTN_TEAL}`} onClick={() => go(2)}>
                {t({ en: "Continue to payment", km: "បន្តទៅការទូទាត់" })}
              </button>
            </div>
            <button type="button" className="cursor-pointer border-none bg-none text-[0.85rem] font-semibold text-[#56657f] underline underline-offset-[3px] hover:text-teal-dim" onClick={() => go(0)}>
              {t({ en: "Change plan", km: "ផ្លាស់ប្ដូរកញ្ចប់" })}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="max-w-[22em] text-[1.32rem] leading-[1.35]">{t({ en: "Scan with any banking app", km: "ស្កេនជាមួយកម្មវិធីធនាគារណាមួយ" })}</h3>
            <QrPlaceholder t={t} />
            <div className="flex items-baseline gap-2 text-base font-bold text-ink">
              <strong className="font-display text-[1.6rem] leading-none km:font-km">${price}</strong>
              <span>·</span>
              <span>
                {plan} · {cycle}
              </span>
            </div>
            <p className="text-[0.8rem] text-faint">{t({ en: "Works with", km: "ប្រើបានជាមួយ" })}</p>
            <div className="flex flex-wrap justify-center gap-[0.7rem]">
              {BANKS.map((bank) => (
                <span key={bank.label} className="grid h-[34px] w-[34px] place-items-center rounded-full text-[0.8rem] font-bold text-white shadow-sm" style={{ background: bank.color }} title={bank.label} aria-hidden="true">
                  {bank.label[0]}
                </span>
              ))}
            </div>
            <p className="inline-flex items-center gap-[0.4rem] text-[0.82rem] font-semibold text-[#56657f]">
              <Clock size={14} />
              {t({ en: "Code expires in 04:59", km: "លេខកូដផុតកំណត់ក្នុងរយៈពេល 04:59" })}
            </p>
            <div className="flex w-full flex-col gap-[0.6rem]">
              <button type="button" className={`${BTN} ${BTN_LG} ${BTN_TEAL}`} onClick={() => go(3)}>
                {t({ en: "I've completed the payment", km: "ខ្ញុំបានបង់ប្រាក់រួចហើយ" })}
              </button>
            </div>
            <button type="button" className="cursor-pointer border-none bg-none text-[0.85rem] font-semibold text-[#56657f] underline underline-offset-[3px] hover:text-teal-dim">
              {t({ en: "Change payment method", km: "ផ្លាស់ប្ដូរវិធីទូទាត់" })}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <span className="grid h-14 w-14 place-items-center rounded-full border border-teal-100 bg-teal-50" aria-hidden="true">
              <span className="h-[14px] w-[14px] rounded-full bg-teal animate-[pulseSoft_1.6s_ease-in-out_infinite]" />
            </span>
            <h3 className="max-w-[22em] text-[1.32rem] leading-[1.35]">{t({ en: "Payment received - verifying", km: "បានទទួលការទូទាត់ - កំពុងផ្ទៀងផ្ទាត់" })}</h3>
            <p className="max-w-[34em] text-[0.96rem] leading-[1.6] text-[#56657f]">
              {t({
                en: "We're confirming your payment. This usually takes a few minutes. You'll get a message from the Angket bot once Premium is active.",
                km: "យើងកំពុងផ្ទៀងផ្ទាត់ការទូទាត់របស់អ្នក។ ជាធម្មតាចំណាយពេលពីរបីនាទី។ អ្នកនឹងទទួលបានសារពី Bot Angket នៅពេលដែលកញ្ចប់ព្រីមីអ៊ឹមដំណើរការ។",
              })}
            </p>
            <div className="flex w-full flex-col gap-[0.6rem]">
              <Link className={`${BTN} ${BTN_LG} ${BTN_OUTLINE}`} to="/">
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

  const chipBtn =
    "cursor-pointer rounded-full border-0 bg-transparent px-[0.9rem] py-[0.38rem] text-[0.83rem] font-semibold text-[#56657f] transition-all duration-150 whitespace-nowrap hover:text-teal-dim km:pt-[0.42rem] km:pb-[0.42rem]"

  return (
    <section className="border-y border-[#e3e9f3] bg-white" id="pricing" aria-labelledby="pricing-title">
      <div className={CONTAINER}>
        <Reveal className="mb-10">
          <h2 id="pricing-title" className="text-[clamp(1.6rem,3.4vw,2.15rem)] font-bold mt-[0.9rem] mb-[0.6rem]">{t({ en: "Subscription", km: "ការទូទាត់ប្រាក់" })}</h2>
        </Reveal>

        <Reveal className="mb-[2.4rem] flex flex-col items-center gap-[1.15rem]">
          <div className="inline-flex rounded-full border border-[#e3e9f3] bg-white p-[0.2rem]" role="tablist" aria-label={t({ en: "Select plan type", km: "ជ្រើសរើសប្រភេទកញ្ចប់" })}>
            <button
              type="button"
              role="tab"
              aria-selected={plan === "individual"}
              aria-pressed={plan === "individual"}
              className={`${chipBtn} ${plan === "individual" ? "bg-teal text-white" : ""}`}
              onClick={() => pickPlan("individual")}
            >
              {t({ en: "Individuals", km: "បុគ្គល" })}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={plan === "business"}
              aria-pressed={plan === "business"}
              className={`${chipBtn} ${plan === "business" ? "bg-teal text-white" : ""}`}
              onClick={() => pickPlan("business")}
            >
              {t({ en: "Business", km: "អាជីវកម្ម" })}
            </button>
          </div>

          {plan === "individual" && !checkout && (
            <div className="inline-flex items-center gap-[0.6rem] text-[0.88rem] font-semibold text-[#56657f]">
              <span className={!annual ? "text-teal-dim" : undefined}>{t({ en: "Monthly", km: "ប្រចាំខែ" })}</span>
              <button
                type="button"
                role="switch"
                aria-checked={annual}
                className={`relative h-[26px] w-[44px] shrink-0 cursor-pointer rounded-full border transition-[background,border-color] duration-200 ${
                  annual ? "border-teal bg-teal" : "border-[#e3e9f3] bg-surface"
                }`}
                onClick={toggleBilling}
              >
                <span className={`absolute left-[3px] top-[3px] h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-transform duration-200 ${annual ? "translate-x-[18px]" : ""}`} />
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
            <div className="mx-auto grid max-w-[780px] grid-cols-2 items-stretch justify-center gap-[1.3rem] max-[720px]:grid-cols-[minmax(0,360px)]">
              <Reveal as="article" className="relative flex flex-col rounded-lg border border-[#e3e9f3] bg-surface px-[1.5rem] pt-[1.7rem] pb-[1.5rem] shadow-sm transition-[box-shadow,transform] duration-200 ease-out hover:shadow-md hover:-translate-y-[3px] max-[600px]:p-[1.3rem_1.1rem_1.2rem]">
                <div className="mb-[1.05rem] flex items-center gap-[0.7rem]">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] border border-teal-100 bg-teal-50 text-teal-dim" aria-hidden="true">
                    <IconShield style={{ width: 22, height: 22 }} />
                  </span>
                  <h3 className="text-[1.15rem]">{t({ en: "Free", km: "ឥតគិតថ្លៃ" })}</h3>
                </div>
                <div className="flex items-baseline gap-[0.25rem]">
                  <span className="font-display text-[1.35rem] font-bold text-ink km:font-km">$</span>
                  <strong className="font-display text-[2.5rem] font-bold leading-none text-ink km:font-km max-[600px]:text-[2rem]">0</strong>
                  <span className="text-[0.9rem] font-semibold text-faint">{t({ en: "/month", km: "/ខែ" })}</span>
                </div>
                <p className="mb-[0.9rem] mt-[0.65rem] text-[0.9rem] text-[#56657f]">{t({ en: "Everyday scam checks on Telegram", km: "ពិនិត្យការបោកប្រាស់ប្រចាំថ្ងៃលើ Telegram" })}</p>
                <FeatureList items={FREE_FEATURES} />
                <a className={`${BTN} ${PKG_BTN} ${BTN_OUTLINE} mt-auto w-full justify-center rounded-full`} href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
                  <IconSend />
                  <span>{t({ en: "Get started", km: "ចាប់ផ្ដើម" })}</span>
                </a>
              </Reveal>

              <Reveal as="article" className="relative flex flex-col rounded-lg border-[1.5px] border-teal bg-white px-[1.5rem] pt-[1.7rem] pb-[1.5rem] shadow-[0_12px_34px_rgba(37,99,235,0.14)] transition-[box-shadow,transform] duration-200 ease-out hover:shadow-md hover:-translate-y-[3px] max-[600px]:p-[1.3rem_1.1rem_1.2rem]">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-teal px-[0.9rem] py-[0.24rem] text-[0.72rem] font-bold tracking-[0.04em] text-white shadow-sm">{t({ en: "Most popular", km: "ពេញនិយមបំផុត" })}</span>
                <div className="mb-[1.05rem] flex items-center gap-[0.7rem]">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[13px] border border-teal-100 bg-teal-50 text-teal-dim" aria-hidden="true">
                    <IconShield check style={{ width: 22, height: 22 }} />
                  </span>
                  <h3 className="text-[1.15rem]">{t({ en: "Premium", km: "ព្រីមីអ៊ឹម" })}</h3>
                </div>
                <div className="flex items-baseline gap-[0.25rem]">
                  <span className="font-display text-[1.35rem] font-bold text-ink km:font-km">$</span>
                  <strong className="font-display text-[2.5rem] font-bold leading-none text-ink km:font-km max-[600px]:text-[2rem]">{annual ? "3.99" : "4.99"}</strong>
                  <span className="text-[0.9rem] font-semibold text-faint">{t({ en: "/month", km: "/ខែ" })}</span>
                </div>
                {annual && <span className="mt-[0.35rem] text-[0.78rem] font-semibold text-teal-dim">{t({ en: "billed annually", km: "គិតជាប្រចាំឆ្នាំ" })}</span>}
                <p className="mb-[0.9rem] mt-[0.65rem] text-[0.9rem] text-[#56657f]">{t({ en: "Unlimited checks, deeper and faster.", km: "ពិនិត្យមិនកំណត់ ស៊ីជម្រៅ និងលឿនជាងមុន។" })}</p>
                <FeatureList items={PREMIUM_FEATURES} />
                <button type="button" className={`${BTN} ${PKG_BTN} ${BTN_TEAL} mt-auto w-full justify-center rounded-full`} onClick={() => go(1)}>
                  {t({ en: "Upgrade", km: "ដំឡើងកញ្ចប់" })}
                </button>
              </Reveal>
            </div>
          )
        ) : (
          <Reveal className="mx-0 max-w-[560px] rounded-lg border border-[#e3e9f3] bg-surface p-[2.4rem_2rem] text-left">
            <span className="mb-[0.9rem] grid h-11 w-11 place-items-center rounded-[13px] border border-teal-100 bg-teal-50 text-teal-dim" aria-hidden="true">
              <IconShield check style={{ width: 22, height: 22 }} />
            </span>
            <h3 className="mb-2 text-[1.3rem]">{t({ en: "Business", km: "អាជីវកម្ម" })}</h3>
            <p className="mb-[1.4rem] text-[0.98rem] text-[#56657f]">{t({ en: "Contact us for team pricing and custom volume plans.", km: "ទាក់ទងយើងសម្រាប់តម្លៃក្រុមហ៊ុន និងកញ្ចប់តាមតម្រូវការ។" })}</p>
            <div className="flex flex-wrap justify-start gap-[0.9rem]">
              <a className={`${BTN} ${BTN_MD} ${BTN_OUTLINE}`} href="mailto:hello@angket.org">
                {t({ en: "Email us", km: "ផ្ញើអ៊ីមែល" })}
              </a>
              <a className={`${BTN} ${BTN_MD} ${BTN_TEAL}`} href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
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
