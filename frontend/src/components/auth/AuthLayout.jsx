import { useLang } from "@/lib/i18n"
import onlineScamsImg from "@/assets/online-scams.png"
import logoImg from "@/assets/logo.png"

export function AuthLayout({ children }) {
  const { t } = useLang()
  return (
    <div className="flex min-h-screen bg-white max-[900px]:min-h-0 max-[900px]:flex-col">
      <div className="relative flex w-1/2 flex-col overflow-hidden p-[2.5rem_2rem_1.5rem] text-white bg-[radial-gradient(closest-side_at_85%_-10%,rgba(59,130,246,0.5),transparent_72%),radial-gradient(closest-side_at_-10%_110%,rgba(14,165,233,0.35),transparent_68%),linear-gradient(150deg,#0d1730_0%,#1e40af_52%,#2563eb_100%)] max-[900px]:w-full max-[900px]:p-[5.8rem_1.5rem_2rem] max-[480px]:p-[5.2rem_1.25rem_1.5rem]">
        <div
          className="pointer-events-none absolute -top-[150px] -right-[180px] h-[460px] w-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(147,197,253,0.35),transparent_70%)]"
          aria-hidden="true"
        />

        <div
          className="absolute left-8 top-[2.5rem] z-[1] inline-flex items-center gap-[0.6rem] max-[900px]:left-6 max-[900px]:top-[1.6rem]"
          aria-hidden="true"
        >
          <span className="grid h-[60px] w-[60px] place-items-center text-white">
            <img className="h-full w-full rounded-none object-contain" src={logoImg} alt="" />
          </span>
          <span className="font-display text-[1.15rem] font-bold uppercase tracking-[0.14em]">ANGKET</span>
        </div>

        <div className="z-[1] my-auto flex flex-col items-center max-[900px]:my-0 max-[900px]:mt-8">
          <div className="mb-[1.6rem] w-full max-w-[540px] text-left max-[900px]:mb-[1.2rem]">
            <h2 className="mb-[0.7rem] font-display text-[2rem] font-bold leading-[1.3] tracking-[-0.01em] text-white max-[900px]:text-[1.6rem] max-[480px]:text-[1.35rem]">
              {t({
                en: "Scams are everywhere. We help you see them coming.",
                km: "ការបោកប្រាស់មាននៅគ្រប់ទីកន្លែង។ យើងជួយអ្នកឱ្យឃើញវាមុន។",
              })}
            </h2>
            <p className="text-[1.05rem] leading-[1.6] text-white/80">
              {t({
                en: "Angket scans messages, links, and files — powered by Bot detection and real reports from the community.",
                km: "Angket ពិនិត្យសារ តំណ និងឯកសារ — ដោយប្រើបច្ចេកវិទ្យារកឃើញ Bot និងរបាយការណ៍ពិតពីសហគមន៍។",
              })}
            </p>
          </div>

          <figure className="w-full max-w-[78%] max-[480px]:max-w-full">
            <img
              className="block h-auto w-full object-contain [filter:drop-shadow(0_18px_40px_rgba(9,18,51,0.5))]"
              src={onlineScamsImg}
              alt="Illustration about how to avoid online scams"
              loading="lazy"
            />
          </figure>
        </div>
      </div>

      <div className="flex w-1/2 items-center justify-center bg-white p-[2.5rem_2rem] max-[900px]:w-full max-[900px]:p-[2rem_1.5rem_3rem] max-[480px]:p-[1.5rem_1.1rem_2.5rem]">
        <div className="w-full max-w-[430px]">
          {children}
        </div>
      </div>
    </div>
  )
}
