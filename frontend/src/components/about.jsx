import { useLang } from "@/lib/i18n"
import { Link } from "react-router-dom"
import { Reveal } from "./reveal"
import {
  IconMail,
  IconFacebook,
  IconPhone,
  IconShield,
  IconEye,
  IconFlag,
  IconBrain,
  IconSearch,
  IconLock,
  IconWarning,
  IconBriefcase,
  IconLink,
  IconFile,
  IconUsers,
  IconZap,
  IconArrowRight,
  IconTelegram,
} from "./icons"

const CONTAINER = "mx-auto w-full max-w-[1440px] px-[clamp(1rem,4vw,3rem)]"

const KICKER =
  "inline-flex items-center gap-[0.45rem] text-[0.7rem] font-bold tracking-[0.12em] uppercase text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-[0.9rem] py-[0.4rem] mb-4 km:text-[0.9em] km:tracking-[0] km:normal-case"

export function About() {
  const { lang, t } = useLang()

  return (
    <>
      {/* ── About Angket ── */}
      <section
        id="about"
        className="relative overflow-hidden pt-[clamp(2.4rem,4vw,3.5rem)] pb-[clamp(3.5rem,7vw,5.5rem)] bg-[radial-gradient(820px_520px_at_90%_4%,rgba(59,130,246,0.14),transparent_68%),radial-gradient(640px_420px_at_0%_96%,rgba(147,197,253,0.3),transparent_70%),linear-gradient(180deg,#f2f7ff_0%,#eaf2ff_55%,#f6f9ff_100%)]"
        aria-labelledby="about-title"
      >
        <div className={CONTAINER}>
          <Reveal className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] items-center gap-[clamp(2.5rem,5vw,4.5rem)] max-[1020px]:grid-cols-1 max-[1020px]:gap-12">
            <div className="relative z-[1] max-w-none">
              <h1
                id="about-title"
                className="text-[clamp(2.25rem,5vw,3.3rem)] leading-[1.1] font-bold text-navy-900 mb-6 tracking-[-0.03em]"
              >
                {lang === "km" ? (
                  t({
                    km: "ជំរុញមនុស្សឱ្យធ្វើការសម្រេចចិត្តឌីជីថលប្រកបដោយសុវត្ថិភាព",
                  })
                ) : (
                  <>
                    Empowering People to Make
                    <span className="block">
                      <span className="text-blue-600">Safer</span> Digital Decisions
                    </span>
                  </>
                )}
              </h1>
              <p className="text-text text-[1.1rem] leading-[1.8] mb-[1.1rem] max-w-none">
                {t({
                  en: "Angket is an AI-driven digital safety platform designed to help people identify and understand potential online threats. Through our Telegram Bot and reporting platform, users can check suspicious messages, links, URLs, and files before taking action.",
                  km: "Angket ជាវេទិកាសុវត្ថិភាពឌីជីថលដែលដំណើរការដោយ AI រចនាឡើងដើម្បីជួយមនុស្សកំណត់ និងយល់ពីការគំរាមកំហែងតាមអ៊ីនធឺណិតដែលអាចកើតមាន។ តាមរយៈ Telegram Bot និងវេទិការាយការណ៍របស់យើង អ្នកប្រើប្រាស់អាចពិនិត្យសារសង្ស័យ តំណភ្ជាប់ URL និងឯកសារមុននឹងធ្វើសកម្មភាព។",
                })}
              </p>
              <p className="text-[#56657f] text-[1rem] leading-[1.8] max-w-none">
                {t({
                  en: "Angket provides a risk assessment, explains suspicious patterns, and offers recommendations to help users make safer decisions online. We believe that digital safety should be accessible to everyone, even without technical knowledge.",
                  km: "Angket ផ្តល់នូវការវាយតម្លៃហានិភ័យ ពន្យល់ពីលំនាំសង្ស័យ និងផ្តល់អនុសាសន៍ដើម្បីជួយអ្នកប្រើប្រាស់ធ្វើការសម្រេចចិត្តប្រកបដោយសុវត្ថិភាពតាមអ៊ីនធឺណិត។ យើងជឿថាសុវត្ថិភាពឌីជីថលគួរតែអាចចូលដោយគ្រប់គ្នា សូម្បីតែគ្មានចំណេះដឹងបច្ចេកវិទ្យា។",
                })}
              </p>

              <div className="mt-8">
                <Link
                  className="inline-flex items-center justify-center gap-[0.55rem] rounded-full border border-transparent bg-blue-800 text-white shadow-sm cursor-pointer px-[1.7rem] py-[0.88rem] text-[1.03rem] font-semibold whitespace-nowrap transition-[background-color,box-shadow,transform] duration-[180ms] ease-out hover:bg-blue-700 hover:-translate-y-px km:pt-[0.62rem] km:pb-[0.62rem]"
                  to="/report"
                >
                  <span>{t({ en: "Join Our Mission", km: "ចូលរួមបេសកកម្មរបស់យើង" })}</span>
                  <IconArrowRight style={{ width: 18, height: 18 }} />
                </Link>
              </div>
            </div>

            <div className="relative grid min-h-[580px] place-items-center max-[1020px]:w-full max-[1020px]:max-w-[440px] max-[1020px]:mx-auto max-[1020px]:min-h-[540px] max-[1020px]:pt-2 max-[700px]:min-h-[460px]" aria-hidden="true">
              <span className="pointer-events-none absolute -right-10 -top-[30px] h-[360px] w-[360px] rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.22),transparent_72%)] max-[700px]:-right-[10px] max-[700px]:h-[240px] max-[700px]:w-[240px]" />
              <span className="pointer-events-none absolute -bottom-[30px] -left-[50px] h-[320px] w-[320px] rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.15),transparent_72%)]" />
              <span className="pointer-events-none absolute right-[22%] top-[84px] h-[170px] w-[170px] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.18),transparent_72%)]" />
              <svg className="pointer-events-none absolute -left-[14px] -top-10 h-[210px] w-[210px] text-blue-600 max-[700px]:hidden" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 7">
                <circle cx="50" cy="50" r="48" />
              </svg>
              <span className="absolute -left-[14px] top-[30px] z-[3] grid h-[74px] w-[74px] place-items-center rounded-[22px] bg-[linear-gradient(135deg,#3b82f6,#1e40af)] text-white shadow-[0_18px_36px_rgba(37,99,235,0.35)] max-[700px]:hidden">
                <IconShield check style={{ width: 34, height: 34 }} />
              </span>
              <span className="absolute right-0 top-6 z-[3] grid h-[46px] w-[46px] place-items-center rounded-full bg-[linear-gradient(135deg,#38bdf8,#0369a1)] text-white shadow-[0_12px_26px_rgba(3,105,161,0.35)] max-[700px]:hidden">
                <IconTelegram style={{ width: 22, height: 22 }} />
              </span>

              <div className="relative z-[2] w-full max-w-[340px] max-[600px]:max-w-[320px]">
                <div className="bg-white border border-[#e3e9f3] rounded-[26px] shadow-lg p-[0.7rem] max-[600px]:rounded-[20px] max-[600px]:p-2">
                  <div className="flex items-center gap-[0.65rem] bg-[linear-gradient(135deg,#38bdf8,#0369a1)] text-white rounded-t-[18px] rounded-b-[6px] px-[0.9rem] py-[0.7rem]">
                    <span className="grid w-[34px] h-[34px] place-items-center rounded-full bg-white/20">
                      <IconShield check style={{ width: 18, height: 18 }} />
                    </span>
                    <div>
                      <strong className="block text-[0.92rem] leading-[1.2]">Angket Bot</strong>
                      <small className="text-[0.72rem] opacity-85">{t({ en: "online", km: "លើបណ្ដាញ" })}</small>
                    </div>
                  </div>
                  <div className="grid gap-[0.6rem] mt-0.5 bg-[#eef3f9] rounded-t-[6px] rounded-b-[18px] p-[0.85rem] max-[600px]:p-[0.6rem]">
                    <div className="ml-auto max-w-[94%] rounded-[14px] rounded-br-[4px] bg-blue-600 text-white px-[0.8rem] py-[0.6rem] text-[0.85rem] leading-[1.5] max-[600px]:px-[0.65rem] max-[600px]:py-2 max-[600px]:text-[0.78rem]">
                      <span>{t({ en: "Check if this link is safe:", km: "ពិនិត្យមើលតើតំណនេះមានសុវត្ថិភាពឬអត់៖" })}</span>
                      <span className="block mt-[0.3rem] font-mono text-[0.76rem] text-[#dbeafe] break-all">https://suspicious-link.com/claim</span>
                    </div>
                    <div className="max-w-[94%] rounded-[14px] rounded-bl-[4px] bg-white border border-[#e3e9f3] px-[0.8rem] py-[0.6rem] text-[0.85rem] leading-[1.5] max-[600px]:px-[0.65rem] max-[600px]:py-2 max-[600px]:text-[0.78rem]">
                      <p className="flex items-center gap-[0.35rem] font-bold text-red-600 text-[0.9rem]">
                        <IconWarning style={{ width: 15, height: 15 }} />
                        <span>{t({ en: "This link looks suspicious!", km: "តំណនេះមើលទៅគួរឲ្យសង្ស័យ!" })}</span>
                      </p>
                      <p className="mt-[0.35rem] mb-[0.6rem] text-[#56657f] text-[0.82rem] leading-[1.5]">
                        {t({
                          en: "Potentially a phishing site or known scam. Be careful.",
                          km: "អាចជាគេហទំព័របន្លំ ឬការបោកប្រាស់ដែលគេស្គាល់។ សូមប្រុងប្រយ័ត្ន។",
                        })}
                      </p>
                      <div className="flex gap-[0.45rem]">
                        <span className="inline-flex items-center justify-center rounded-full bg-blue-700 text-white text-[0.73rem] font-bold px-[0.85rem] py-[0.32rem]">{t({ en: "Report", km: "រាយការណ៍" })}</span>
                        <span className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-[0.73rem] font-bold px-[0.85rem] py-[0.32rem]">{t({ en: "Learn More", km: "ស្វែងយល់បន្ថែម" })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute z-[3] left-[-18px] top-[42%] -rotate-[5deg] flex max-w-[205px] items-center gap-[0.65rem] bg-white border border-[#e3e9f3] rounded-2xl px-[0.85rem] py-[0.7rem] shadow-md max-[700px]:-left-[6px] max-[700px]:top-[40%]">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#fdecee] border border-[#f7c9ce] text-[#dc2626]">
                  <IconBriefcase style={{ width: 18, height: 18 }} />
                </span>
                <div>
                  <strong className="block text-[0.84rem] font-bold text-ink leading-[1.25] whitespace-nowrap">{t({ en: "Fake job offers", km: "ការផ្តល់ការងារក្លែងក្លាយ" })}</strong>
                  <span className="flex flex-col gap-1 mt-[6px]">
                    <i className="block h-[5px] rounded-full bg-[#e6ecf5]" />
                    <i className="block h-[5px] w-[62%] rounded-full bg-[#e6ecf5]" />
                  </span>
                </div>
              </div>
              <div className="absolute z-[3] right-[-24px] top-[30%] rotate-[4deg] flex max-w-[205px] items-center gap-[0.65rem] bg-white border border-[#e3e9f3] rounded-2xl px-[0.85rem] py-[0.7rem] shadow-md max-[700px]:hidden">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#eaf3ff] border border-[#cfe3ff] text-[#2563eb]">
                  <IconLink style={{ width: 18, height: 18 }} />
                </span>
                <div>
                  <strong className="block text-[0.84rem] font-bold text-ink leading-[1.25] whitespace-nowrap">{t({ en: "Suspicious links", km: "តំណភ្ជាប់សង្ស័យ" })}</strong>
                  <span className="flex flex-col gap-1 mt-[6px]">
                    <i className="block h-[5px] rounded-full bg-[#e6ecf5]" />
                    <i className="block h-[5px] w-[62%] rounded-full bg-[#e6ecf5]" />
                  </span>
                </div>
              </div>
              <div className="absolute z-[3] right-2 bottom-4 -rotate-[3deg] flex max-w-[205px] items-center gap-[0.65rem] bg-white border border-[#e3e9f3] rounded-2xl px-[0.85rem] py-[0.7rem] shadow-md max-[700px]:hidden">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#fff0e0] border border-[#f6d8b3] text-[#ea7a1a]">
                  <IconFile style={{ width: 18, height: 18 }} />
                </span>
                <div>
                  <strong className="block text-[0.84rem] font-bold text-ink leading-[1.25] whitespace-nowrap">{t({ en: "Malicious files", km: "ឯកសារព្យាបាទ" })}</strong>
                  <span className="flex flex-col gap-1 mt-[6px]">
                    <i className="block h-[5px] rounded-full bg-[#e6ecf5]" />
                    <i className="block h-[5px] w-[62%] rounded-full bg-[#e6ecf5]" />
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section
        id="mission"
        className="relative overflow-hidden py-[clamp(4rem,7vw,6rem)] text-white bg-[radial-gradient(640px_360px_at_86%_0%,rgba(59,130,246,0.35),transparent_70%),radial-gradient(560px_340px_at_0%_100%,rgba(6,182,212,0.16),transparent_70%),linear-gradient(135deg,#0d1730,#14275a)]"
        aria-labelledby="mission-title"
      >
        <div className={CONTAINER}>
          <Reveal className="relative z-[1] grid grid-cols-2 gap-12 max-[1020px]:grid-cols-1 max-[1020px]:gap-8">
            <div className="py-6 border-t border-white/15">
              <span className={`${KICKER} text-[#cfe0ff] bg-blue-500/[0.22] border-[#60a5fa]/40`}>
                {t({ en: "OUR MISSION", km: "បេសកកម្មរបស់យើង" })}
              </span>
              <h2 id="mission-title" className="text-[clamp(1.4rem,2.6vw,1.8rem)] font-bold text-white mb-4 leading-[1.3]">
                {t({
                  en: "Making digital safety accessible to everyone",
                  km: "ធ្វើឱ្យមានសុវត្ថិភាពឌីជីថល​ ដែលអាចឲមនុស្សគ្រប់គ្នាប្រើប្រាស់បាន",
                })}
              </h2>
              <p className="text-[#c3d0ec] text-base leading-[1.8]">
                {t({
                  en: "Our mission is to make digital safety more accessible by helping people recognize, understand, and respond to potential online threats. We aim to empower users with the knowledge and tools they need to make safer and more informed decisions in the digital world.",
                  km: "បេសកកម្មរបស់យើងគឺធ្វើឱ្យមានសុវត្ថិភាពឌីជីថលប្រសើរជាងមុន ដោយការជួយមនុស្សឲស្គាល់ យល់ និងឆ្លើយតបចំពោះការគំរាមកំហែងតាមអ៊ីនធឺណិតបានល្អជាងមុន។ យើងមានបំណងជំរុញឲអ្នកប្រើប្រាស់ ប្រើជាមួយនឹងចំណេះដឹង និងឧបករណ៍ដែលជួយពួកគេធ្វើការសម្រេចចិត្តប្រកបដោយសុវត្ថិភាព និងការធ្វើសកម្មភាពឲបានល្អប្រសើរជាងមុនក្នុងពិភពឌីជីថល។",
                })}
              </p>
            </div>
            <div className="py-6 border-t border-white/15">
              <span className={`${KICKER} text-[#cfe0ff] bg-blue-500/[0.22] border-[#60a5fa]/40`}>
                {t({ en: "OUR VISION", km: "ចក្ខុវិស័យរបស់យើង" })}
              </span>
              <h2 className="text-[clamp(1.4rem,2.6vw,1.8rem)] font-bold text-white mb-4 leading-[1.3]">
                {t({
                  en: "A safer digital community for all",
                  km: "សហគមន៍ឌីជីថលប្រកបដោយសុវត្ថិភាពសម្រាប់ទាំងអស់គ្នា",
                })}
              </h2>
              <p className="text-[#c3d0ec] text-base leading-[1.8]">
                {t({
                  en: "We envision a safer digital community where people are more aware of online threats, better equipped to evaluate information, and able to protect themselves and others from scams and digital risks.",
                  km: "យើងស្រមៃមើលសហគមន៍ឌីជីថលប្រកបដោយសុវត្ថិភាពដែលមនុស្សគ្រប់គ្នាមានការយល់ដឹងកាន់តែច្រើនអំពីការគំរាមកំហែងតាមអ៊ីនធឺណិត ឧបករណ៏ក្នុងការវាយតម្លៃព័ត៌មានកាន់តែប្រសើរ និងអាចការពារខ្លួនឯង និងអ្នកដទៃពីការបោកប្រាស់ និងហានិភ័យឌីជីថល។",
                })}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Our Approach to Digital Literacy ── */}
      <section id="dmil" className="bg-[linear-gradient(180deg,#f6f9ff_0%,#fdfdfe_100%)]" aria-labelledby="dmil-title">
        <div className={CONTAINER}>
          <Reveal className="max-w-none mb-12">
            <h2 id="dmil-title" className="text-[clamp(1.7rem,3.4vw,2.35rem)] font-bold text-ink m-0 mb-4 leading-[1.2] tracking-[-0.02em]">
              {t({
                en: "Built Around Digital, Media and Information Literacy",
                km: "បង្កើតជុំវិញសមត្ថភាពឌីជីថល សារព័ត៌មាន និងព័ត៌មាន",
              })}
            </h2>
            <p className="text-[#56657f] text-[1.05rem] leading-[1.75] max-w-none">
              {t({
                en: "Angket is developed under the theme of Digital, Media and Information Literacy (DMIL). It incorporates several important DMIL domains:",
                km: "Angket ត្រូវបានអភិវឌ្ឍន៍ក្រោមប្រធានបទសមត្ថភាពឌីជីថល សារព័ត៌មាន និងព័ត៌មាន (DMIL)។ វារួមបញ្ចូល domain DMIL សំខាន់ៗជាច្រើន៖",
              })}
            </p>
          </Reveal>
          <Reveal className="grid grid-cols-3 gap-[1.3rem] max-[1020px]:grid-cols-2 max-[720px]:grid-cols-1">
            <div className="bg-white border border-[#e3e9f3] rounded-[18px] px-[1.5rem] py-[1.7rem] shadow-sm transition-[box-shadow,transform] duration-200 ease-out hover:shadow-md hover:-translate-y-[3px]">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-[14px] bg-[#eaf3ff] border border-[#d3e5ff] text-[#1d4ed8]">
                <IconSearch style={{ width: 24, height: 24 }} />
              </div>
              <h3 className="text-[1.05rem] font-bold text-ink m-0 mb-2">
                {t({
                  en: "Information and Data Literacy",
                  km: "សមត្ថភាពព័ត៌មាន និងទិន្នន័យ",
                })}
              </h3>
              <p className="text-[#56657f] text-[0.9rem] leading-[1.65]">
                {t({
                  en: "Helping users evaluate whether digital information, messages, links, and files are credible before taking action.",
                  km: "ជួយឲអ្នកប្រើប្រាស់ងាយស្រួលក្នុងការវាយតម្លៃថាតើព័ត៌មានឌីជីថល សារ តំណភ្ជាប់ និងឯកសារគឺគួរឱ្យជឿឬអត់មុននឹងធ្វើសកម្មភាព។",
                })}
              </p>
            </div>
            <div className="bg-white border border-[#e3e9f3] rounded-[18px] px-[1.5rem] py-[1.7rem] shadow-sm transition-[box-shadow,transform] duration-200 ease-out hover:shadow-md hover:-translate-y-[3px]">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-[14px] bg-[#f3edff] border border-[#e0d4ff] text-[#7c3aed]">
                <IconEye style={{ width: 24, height: 24 }} />
              </div>
              <h3 className="text-[1.05rem] font-bold text-ink m-0 mb-2">
                {t({
                  en: "Media Literacy",
                  km: "សមត្ថភាពសារព័ត៌មាន",
                })}
              </h3>
              <p className="text-[#56657f] text-[0.9rem] leading-[1.65]">
                {t({
                  en: "Encouraging users to think critically about content, sources, intentions, and possible manipulation or deception.",
                  km: "លើកទឹកចិត្តអ្នកប្រើប្រាស់ ប្រើដោយរិះគិតអំពីមាតិកា ប្រភព បំណង និងការបំភ្លៃ ឬការបោកប្រាស់ដែលអាចកើតមាន។",
                })}
              </p>
            </div>
            <div className="bg-white border border-[#e3e9f3] rounded-[18px] px-[1.5rem] py-[1.7rem] shadow-sm transition-[box-shadow,transform] duration-200 ease-out hover:shadow-md hover:-translate-y-[3px]">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-[14px] bg-[#ecfaf2] border border-[#d0f0df] text-[#0e7a44]">
                <IconFlag style={{ width: 24, height: 24 }} />
              </div>
              <h3 className="text-[1.05rem] font-bold text-ink m-0 mb-2">
                {t({
                  en: "Communication and Collaboration",
                  km: "ការទំនាក់ទំនង និងការសហការ",
                })}
              </h3>
              <p className="text-[#56657f] text-[0.9rem] leading-[1.65]">
                {t({
                  en: "Using community reporting to allow users to share experiences and help raise awareness of potential threats.",
                  km: "ប្រើប្រាស់របាយការណ៍សហគមន៍ដើម្បីអនុញ្ញាតឱ្យអ្នកប្រើប្រាស់ចែករំលែកបទពិសោធន៍ និងជួយបង្កើនការយល់ដឹងអំពីការគំរាមកំហែងដែលអាចកើតមាន។",
                })}
              </p>
            </div>
            <div className="bg-white border border-[#e3e9f3] rounded-[18px] px-[1.5rem] py-[1.7rem] shadow-sm transition-[box-shadow,transform] duration-200 ease-out hover:shadow-md hover:-translate-y-[3px]">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-[14px] bg-[#fff5e0] border border-[#fce8b8] text-[#b45309]">
                <IconLock style={{ width: 24, height: 24 }} />
              </div>
              <h3 className="text-[1.05rem] font-bold text-ink m-0 mb-2">
                {t({
                  en: "Security and Safety",
                  km: "សុវត្ថិភាព និងការពារ",
                })}
              </h3>
              <p className="text-[#56657f] text-[0.9rem] leading-[1.65]">
                {t({
                  en: "Helping users recognize potential scams, phishing attempts, fraud, and unsafe digital content.",
                  km: "ជួយអ្នកប្រើប្រាស់ឲស្គាល់ការបោកប្រាស់ដែលអាចកើតមាន ការព្យាយាមវាយប្រហារ  និងមាតិកាឌីជីថលដែលមិនមានសុវត្ថិភាព។",
                })}
              </p>
            </div>
            <div className="bg-white border border-[#e3e9f3] rounded-[18px] px-[1.5rem] py-[1.7rem] shadow-sm transition-[box-shadow,transform] duration-200 ease-out hover:shadow-md hover:-translate-y-[3px]">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-[14px] bg-[#ffeef0] border border-[#fbd4d9] text-[#be123c]">
                <IconBrain style={{ width: 24, height: 24 }} />
              </div>
              <h3 className="text-[1.05rem] font-bold text-ink m-0 mb-2">
                {t({
                  en: "Problem Solving",
                  km: "ការដោះស្រាយបញ្ហា",
                })}
              </h3>
              <p className="text-[#56657f] text-[0.9rem] leading-[1.65]">
                {t({
                  en: "Using technology to address a real-world problem and support users in responding to digital threats.",
                  km: "ប្រើប្រាស់បច្ចេកវិទ្យាដើម្បីដោះស្រាយបញ្ហានៅក្នុងសង្គមជាក់ស្ដែង និងគាំទ្រអ្នកប្រើប្រាស់ក្នុងការឆ្លើយតបចំពោះការគំរាមកំហែងឌីជីថល។",
                })}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        className="relative overflow-hidden bg-[radial-gradient(680px_440px_at_85%_8%,rgba(59,130,246,0.1),transparent_70%),radial-gradient(500px_360px_at_8%_92%,rgba(147,197,253,0.28),transparent_72%),#f6f9ff]"
        aria-labelledby="contact-title"
      >
        <div className={CONTAINER}>
          <Reveal className="text-left max-w-none m-0 mb-[2.6rem] max-[720px]:mb-[2.2rem]">
            <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.15] font-bold text-navy-900 m-0 mb-4" id="contact-title">
              {t({
                en: "We'd love to hear from you",
                km: "យើងរីករាយក្នុងការស្តាប់ពីអ្នក",
              })}
            </h2>
            <p className="text-[#56657f] text-[1.05rem] leading-[1.8] m-0">
              {t({
                en: "Have questions about scams, need help with a report, or want to partner with us? Reach out, our team is here to help.",
                km: "មានសំណួរអំពីការបោកប្រាស់ ត្រូវការជំនួយក្នុងការរាយការណ៍ ឬចង់សហការជាមួយយើង? សូមទំនាក់ទំនងមកយើង ក្រុមការងាររបស់យើងនៅទីនេះដើម្បីជួយអ្នក។",
              })}
            </p>
          </Reveal>

          <Reveal className="flex flex-wrap items-center justify-start gap-[0.9rem] max-[720px]:gap-3">
            <a
              className="group inline-flex items-center gap-[0.6rem] rounded-full bg-white border border-[#e3e9f3] pl-2 pr-[1.15rem] py-[0.45rem] shadow-sm no-underline transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:border-[color-mix(in_srgb,var(--chip-accent)_45%,#e3e9f3)]"
              style={{ "--chip-accent": "#2563eb" }}
              href="mailto:angket.bot12@gmail.com"
            >
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                style={{ background: "linear-gradient(135deg, var(--chip-accent), color-mix(in srgb, var(--chip-accent) 72%, #000))" }}
                aria-hidden="true"
              >
                <IconMail className="text-white" style={{ width: 17, height: 17 }} />
              </span>
              <span className="text-[0.88rem] font-semibold text-ink leading-[1.25] break-all">angket.bot12@gmail.com</span>
            </a>
            <a
              className="group inline-flex items-center gap-[0.6rem] rounded-full bg-white border border-[#e3e9f3] pl-2 pr-[1.15rem] py-[0.45rem] shadow-sm no-underline transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:border-[color-mix(in_srgb,var(--chip-accent)_45%,#e3e9f3)]"
              style={{ "--chip-accent": "#1877f2" }}
              href="https://www.facebook.com/profile.php?id=61594053519400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                style={{ background: "linear-gradient(135deg, var(--chip-accent), color-mix(in srgb, var(--chip-accent) 72%, #000))" }}
                aria-hidden="true"
              >
                <IconFacebook className="text-white" style={{ width: 17, height: 17 }} />
              </span>
              <span className="text-[0.88rem] font-semibold text-ink leading-[1.25] break-all">Angket - អង្កេត</span>
            </a>
            <a
              className="group inline-flex items-center gap-[0.6rem] rounded-full bg-white border border-[#e3e9f3] pl-2 pr-[1.15rem] py-[0.45rem] shadow-sm no-underline transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md hover:border-[color-mix(in_srgb,var(--chip-accent)_45%,#e3e9f3)]"
              style={{ "--chip-accent": "#059669" }}
              href="tel:+855926424621"
            >
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
                style={{ background: "linear-gradient(135deg, var(--chip-accent), color-mix(in srgb, var(--chip-accent) 72%, #000))" }}
                aria-hidden="true"
              >
                <IconPhone className="text-white" style={{ width: 17, height: 17 }} />
              </span>
              <span className="text-[0.88rem] font-semibold text-ink leading-[1.25] break-all">092 642 4621</span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
