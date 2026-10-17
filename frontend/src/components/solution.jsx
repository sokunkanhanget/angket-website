import { useLang } from "@/lib/i18n"
import { IconSearch, IconShield, IconBrain } from "./icons"
import detectImg from "@/assets/detect.jpg"
import checkImg from "@/assets/check.jpg"
import understandImg from "@/assets/understand.jpg"
import protectImg from "@/assets/protect.jpg"

const CONTAINER = "mx-auto w-full max-w-[1440px] px-[clamp(1rem,4vw,3rem)]"

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
    <section className="relative overflow-hidden bg-[radial-gradient(640px_340px_at_90%_0%,rgba(56,189,248,0.35),transparent_70%),radial-gradient(520px_320px_at_0%_100%,rgba(37,99,235,0.55),transparent_70%),linear-gradient(135deg,#0d1730,#1e40af)] py-[5rem] text-white" id="solution" aria-labelledby="solution-title">
      <div className={CONTAINER}>
        <header className="flex items-end justify-between gap-[2.5rem] max-[1024px]:items-start max-[620px]:flex-col max-[620px]:gap-[1.6rem]">
          <div className="max-w-none">
            <h2 className="mt-[1rem] mb-[0.7rem] text-[clamp(1.9rem,3.4vw,2.7rem)] font-bold leading-[1.12] tracking-[-0.03em] text-white" id="solution-title">
              {t({ en: "How", km: "របៀប" })} <span className="text-[#5b99ff]">Angket</span>{" "}
              {t({ en: "Helps", km: "ជួយអ្នក" })}
            </h2>
            <p className="text-[1.02rem] leading-[1.7] text-[#c3d2f2]">
              {t({
                en: "Angket scans, checks, and warns, so you can stay one step ahead of online scams.",
                km: "Angket ពិនិត្យ ផ្ទៀងផ្ទាត់ និងជូនដំណឹង ដើម្បីឱ្យអ្នកអាចនៅជាមួយជំហានខាងមុខនៃការបោកប្រាស់តាមអ៊ីនធឺណិត។",
              })}
            </p>
          </div>
          <span className="grid flex-none justify-items-center pb-[0.4rem] text-[1.6rem] leading-none text-[#7fb4ff] [transform:rotate(-4deg)] font-['Caveat','Segoe_Script','Comic_Sans_MS',cursive] max-[620px]:self-end" aria-hidden="true">
            <span>Smarter scans. Safer you.</span>
            <svg className="mt-[0.2rem] h-auto w-[96px] text-[#7fb4ff] opacity-85" viewBox="0 0 120 18" fill="none">
              <path
                d="M4 13C32 4 72 3 114 8"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </header>

        <div className="mt-[2.6rem] grid grid-cols-4 gap-[1.1rem] max-[1024px]:grid-cols-2 max-[620px]:grid-cols-1">
          {FEATURES.map((f) => (
            <article className="flex items-start gap-[0.9rem] rounded-[18px] bg-[rgba(255,255,255,0.06)] p-[1.1rem] transition-[background,transform] duration-200 hover:-translate-y-[3px] hover:bg-[rgba(255,255,255,0.09)]" key={f.title.en}>
              {/* placeholder illustrations — swap real artwork into /public/images/placeholder-*.png */}
              <div className="relative grid aspect-square w-[38%] flex-none place-items-center">
                <span className="absolute h-[110px] w-[110px] rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.45),transparent_75%)]" aria-hidden="true" />
                <img className="relative h-full w-full rounded-[14px] object-cover" src={f.ill} alt="" loading="lazy" />
              </div>
              <div className="flex flex-1 flex-col justify-start">
                <div className="flex items-center gap-[0.6rem]">
                  <span className="grid h-[34px] w-[34px] flex-none place-items-center rounded-full bg-blue-600 text-white shadow-[0_6px_14px_rgba(37,99,235,0.4)]" aria-hidden="true">
                    <f.Icon check={f.check} style={{ width: 17, height: 17 }} />
                  </span>
                  <h3 className="m-0 flex-1 truncate text-[1.12rem] font-bold text-white">{t(f.title)}</h3>
                </div>
                <p className="mt-[0.45rem] text-[0.89rem] leading-[1.55] text-[#c3d2f2]">{t(f.desc)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}