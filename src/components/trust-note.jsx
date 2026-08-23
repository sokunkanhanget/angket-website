import { useLang } from "@/lib/i18n"
import { Reveal } from "./reveal"
import { IconCheck, IconShield } from "./icons"

const TRUTH_CHIPS = [
  { en: "Estimates, not verdicts", km: "ការប៉ាន់ស្មាន មិនមែនសេចក្ដីសម្រេច" },
  { en: "AI can make mistakes", km: "AI អាចមានកំហុសបាន" },
  { en: "Official sources come first", km: "ប្រភពផ្លូវការសំខាន់ជាងគេ" },
]

export function TrustNote() {
  const { t } = useLang()

  return (
    <section id="trust" aria-labelledby="trust-title">
      <div className="container">
        <Reveal className="trust-panel">
          <span className="t-ic" aria-hidden="true">
            <IconShield check />
          </span>
          <div>
            <h2 id="trust-title">
              {t({ en: "Use Angket as a Safety Guide", km: "ប្រើ Angket ជាមគ្គុទ្ទេសក៍សុវត្ថិភាព" })}
            </h2>
            <p>
              {t({
                en: "Angket provides an estimated assessment based on detected patterns. It is not a guarantee that information is legitimate or fraudulent. AI and automated analysis can make mistakes. Always verify important information through trusted and official sources.",
                km: "Angket ផ្ដល់ការវាយតម្លៃប៉ាន់ស្មានផ្អែកលើលំនាំដែលរកឃើញ។ វាមិនមែនជាការធានាថាព័ត៌មាននោះពិតប្រាកដ ឬជាការបោកប្រាស់នោះទេ។ ការវិភាគដោយ AI និងស្វ័យប្រវត្តិអាចមានកំហុសបាន។ សូមផ្ទៀងផ្ទាត់ព័ត៌មានសំខាន់ៗតាមប្រភពដែលទុកចិត្តបាន និងផ្លូវការជានិច្ច។",
              })}
            </p>
            <div className="truth-chips">
              {TRUTH_CHIPS.map((chip) => (
                <span className="truth-chip" key={chip.en}>
                  <IconCheck />
                  <span>{t(chip)}</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
