import { useLang } from "@/lib/i18n"
import { IconSearch, IconShield, IconBrain } from "./icons"
import detectImg from "@/assets/detect.jpg"
import checkImg from "@/assets/check.jpg"
import understandImg from "@/assets/understand.jpg"
import protectImg from "@/assets/protect.jpg"

const FEATURES = [
  {
    Icon: IconSearch,
    ill: detectImg,
    title: { en: "Detect", km: "ស្វែងរក" },
    desc: {
      en: "Finds suspicious messages, links, and patterns automatically.",
      km: "ស្វែងរកសារ តំណភ្ជាប់ និងលំនាំគួរឲ្យសង្ស័យដោយស្វ័យប្រវត្តិ។",
    },
  },
  {
    Icon: IconShield,
    check: true,
    ill: checkImg,
    title: { en: "Check", km: "ពិនិត្យ" },
    desc: {
      en: "Verifies links, files, and content before you click.",
      km: "ពិនិត្យតំណភ្ជាប់ ឯកសារ និងមាតិកាមុនពេលអ្នកចុច។",
    },
  },
  {
    Icon: IconBrain,
    ill: understandImg,
    title: { en: "Understand", km: "ស្វែងយល់" },
    desc: {
      en: "Explains why something is risky in simple language.",
      km: "ពន្យល់ពីមូលហេតុនៃសកម្មភាពនៃការបោកប្រាស់ក្នុងភាសាងាយស្រួលយល់។",
    },
  },
  {
    Icon: IconShield,
    ill: protectImg,
    title: { en: "Protect", km: "ការពារ" },
    desc: {
      en: "Helps you and your community stay safer online.",
      km: "ជួយអ្នក និងសហគមន៍របស់អ្នកឱ្យមានសុវត្ថិភាពជាងមុននៅលើអ៊ីនធឺណិត។",
    },
  },
]

export function Solution() {
  const { t } = useLang()

  return (
    <section className="solution" id="solution" aria-labelledby="solution-title">
      <div className="container">
        <header className="sol-head">
          <div className="sol-head-copy">
            <h2 id="solution-title">
              {t({ en: "How", km: "របៀប" })} <span className="sol-accent">Angket</span>{" "}
              {t({ en: "Helps", km: "ជួយអ្នក" })}
            </h2>
            <p className="sol-lead">
              {t({
                en: "Angket scans, checks, and warns, so you can stay one step ahead of online scams.",
                km: "Angket ពិនិត្យ ផ្ទៀងផ្ទាត់ និងជូនដំណឹង ដើម្បីឱ្យអ្នកអាចនៅជាមួយជំហានខាងមុខនៃការបោកប្រាស់តាមអ៊ីនធឺណិត។",
              })}
            </p>
          </div>
          <span className="sol-flourish" aria-hidden="true">
            <span>Smarter scans. Safer you.</span>
            <svg className="sol-swoosh" viewBox="0 0 120 18" fill="none">
              <path
                d="M4 13C32 4 72 3 114 8"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </header>

        <div className="sol-cards">
          {FEATURES.map((f) => (
            <article className="sol-card" key={f.title.en}>
              {/* placeholder illustrations — swap real artwork into /public/images/placeholder-*.png */}
              <div className="sol-ill">
                <span className="sol-glow" aria-hidden="true" />
                <img src={f.ill} alt="" loading="lazy" />
              </div>
              <div className="sol-body">
                <div className="sol-head-row">
                  <span className="sol-badge" aria-hidden="true">
                    <f.Icon check={f.check} />
                  </span>
                  <h3>{t(f.title)}</h3>
                </div>
                <p>{t(f.desc)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}