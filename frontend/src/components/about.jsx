import { useLang } from "@/lib/i18n"
import { Reveal } from "./reveal"
import { IconMail, IconFacebook, IconPhone } from "./icons"

export function About() {
  const { t } = useLang()

  return (
    <>
      {/* ── Why We Started ── */}
      <section id="about" className="about-started" aria-labelledby="started-title">
        <div className="container">
          <Reveal className="about-started-grid">
            <div className="about-started-left">
              <span className="about-started-kicker">
                {t({ en: "WHY WE STARTED", km: "មូលហេតុដែលយើងចាប់ផ្ដើម" })}
              </span>
              <h1 id="started-title" className="about-started-headline">
                {t({
                  en: "People were losing money to scams — and had nowhere to check before it was too late.",
                  km: "មនុស្សជាច្រើនបានបាត់បង់ប្រាក់ដោយសារការបោកប្រាស់ — ហើយគ្មានកន្លែងណាមួយអាចពិនិត្យជាមុន មុនពេលដែលវាហួសពេល។",
                })}
              </h1>
              <p className="about-started-body">
                {t({
                  en: "We kept seeing the same thing: people forwarding suspicious messages in group chats, asking \"is this real?\" — after they'd already clicked, already paid, already lost. The question was always too late. We wanted to put the answer before the damage.",
                  km: "យើងឃើញរឿងដដែលៗជានិច្ច៖ មនុស្សភាគច្រើនផ្ញើសារសង្ស័យនៅក្នុងក្រុម chat សួរថា «តើនេះពិតឬទេ?» — បន្ទាប់ពីពួកគេចុចរួចហើយ បង់ប្រាក់រួចហើយ បាត់បង់រួចហើយ។ សំណួរនោះគឺតែងតែយឺតពេល។ ពួកយើងចង់ផ្ដល់់ដំណឹងជាមុន​ មុនពេលដែលអាចមានការបាត់បង់កើតឡើង។",
                })}
              </p>
            </div>
            <div className="about-started-right">
              <div className="about-started-timeline">
                <div className="about-timeline-beat">
                  <span className="about-beat-lead">
                    {t({ en: "The gap.", km: "គម្លាត" })}
                  </span>{" "}
                  {t({
                    en: "Existing tools weren't in Khmer, weren't inside the apps people actually use, and never explained why something was risky — only that it might be.",
                    km: "ឧបករណ៍ដែលមានស្រាប់មិនមានភាសាខ្មែរ មិននៅក្នុងកម្មវិធីដែលមនុស្សប្រើប្រាស់ពិតប្រាកដ ហើយមិនដែលពន្យល់ថាហេតុអ្វីបានជាអ្វីមួយមានហានិភ័យ — តែប្រាប់ថាវាអាចមានប៉ុណ្ណោះ។",
                  })}
                </div>
                <div className="about-timeline-beat">
                  <span className="about-beat-lead">
                    {t({ en: "The idea.", km: "គំនិត។" })}
                  </span>{" "}
                  {t({
                    en: "Put the check right where the scam arrives: inside Telegram itself. No new app to download, no website to visit — just forward the message.",
                    km: "ដាក់ការពិនិត្យនៅកន្លែងដែលការបោកប្រាស់មកដល់៖ ខាងក្នុង Telegram ផ្ទាល់។ មិនមានកម្មវិធីថ្មីដែលត្រូវទាញយក មិនមានគេហទំព័រដែលត្រូវចូល — គ្រាន់តែផ្ញើសារនោះប៉ុណ្ណោះ។",
                  })}
                </div>
                <div className="about-timeline-beat">
                  <span className="about-beat-lead">
                    {t({ en: "The mission now.", km: "បេសកកម្មបច្ចុប្បន្ន។" })}
                  </span>{" "}
                  {t({
                    en: "Give every Cambodian a free, instant way to verify before they act — and build a community that learns from every reported scam.",
                    km: "ផ្តល់ឱ្យមនុស្សកម្ពុជាគ្រប់គ្នានូវវិធីឥតគិតថ្លៃ ភ្លាមៗដើម្បីផ្ទៀងផ្ទាត់មុននឹងធ្វើសកម្មភាព — និងសាងសង់សហគមន៍មួយដែលរៀនពីរាល់ការបោកប្រាស់ដែលបានរាយការណ៍។",
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Section 2: Meet the Team ── */}
      <section id="team" className="about-team" aria-labelledby="team-title">
        <div className="about-team-circles" aria-hidden="true">
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="300" cy="100" r="180" stroke="currentColor" strokeWidth="1" />
            <circle cx="300" cy="100" r="140" stroke="currentColor" strokeWidth="1" />
            <circle cx="300" cy="100" r="100" stroke="currentColor" strokeWidth="1" />
            <circle cx="300" cy="100" r="60" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
        <div className="container">
          <Reveal className="about-team-header">
            <span className="about-team-kicker">
              {t({ en: "THE PEOPLE BEHIND IT", km: "មនុស្សដែលនៅពីក្រោយវា" })}
            </span>
            <h2 id="team-title">
              {t({
                en: "A small team of university student ",
                km: "",
              })}
            </h2>
            <p className="about-team-sub">
              {t({
                en: "Students and volunteers building Angket in our spare time, driven by the belief that Cambodians deserve safer digital spaces.",
                km: "និស្សិត និងអ្នកស្ម័គ្រចិត្តសាងសង់ Angket នៅពេលទំនេរ ដោយមានជំនឿថាពលរដ្ឋកម្ពុជាមានសិទ្ធិក្នុងការមានប្រព័ន្ធឌីជីថលប្រកបដោយសុវត្ថិភាព។",
              })}
            </p>
          </Reveal>
          <Reveal className="about-team-card">
            <div className="about-team-card-head">
              <h3 className="about-team-card-title">
                {t({ en: "Angket Team", km: "ក្រុម Angket" })}
              </h3>
              <span className="about-team-pill">
                {t({ en: "NGEP Batch III · Angket Bot", km: "កម្មវិធី NGEP លើកទី ៣ · Angket Bot" })}
              </span>
            </div>
            <div className="about-team-card-body">
              <p>
                {t({
                  en: "Angket was built by students from CADT through the NGEP (Next-Gen Engagament Program) Batch III program. What started as a Telegram bot to verify suspicious messages has grown into a community-driven platform that helps people stay safe online - united by the belief that technology should protect, not exploit.",
                  km: "Angket ត្រូវបានបង្កើតឡើងដោយនិស្សិតពី​ CADT តាមរយៈកម្មវិធី NGEP (Next-Gen Engagament Program) លើកទី ៣។ ចាប់ផ្ដើមជាមួយ Telegram bot ដើម្បីផ្ទៀងផ្ទាត់សារសង្ស័យបានក្លាយជាវេទិកាមួយដែលជួយមនុស្សឱ្យមានសុវត្ថិភាពតាមអ៊ីនធឺណិតជាងមុន។ រួមគ្នាដោយជំនឿថាបច្ចេកវិទ្យាគួរការពារ មិនមែនកេងប្រវ័ញ្ញ។",
                })}
              </p>
              <p>
                {t({
                  en: "We're not a company. We're students who believe that every Cambodian deserves a tools that can help them from any risk, instant way to check if something is a scam — before it's too late.",
                  km: "យើងមិនមែនជាក្រុមហ៊ុនទេ។ យើងជាក្រុមនិសិត្សដែលជឿជាក់ថាគ្រប់គ្នាអាចប្រើប្រាស់ Bot នេះ​ ហើយអាចជួយការពារពួកគេពីហានិភ័យនាៗ ភ្លាមៗដើម្បីពិនិត្យមើលថាតើអ្វីវាជាការបោកប្រាស់ដែរឬទេ — មុនពេលដែលវាយឺតពេល។",
                })}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Section 3: Contact ── */}
      <section id="contact" className="about-contact" aria-labelledby="contact-title">
        <div className="container">
          <Reveal className="about-contact-header">
            <span className="about-contact-kicker">
              {t({ en: "GET IN TOUCH", km: "អាចទំនាក់ទំនងមកយើងតាមរយៈ" })}
            </span>
          </Reveal>
          <Reveal className="about-contact-card">
            <a className="about-contact-row" href="mailto:angket.bot12@gmail.com">
              <span className="about-contact-ic" aria-hidden="true">
                <IconMail />
              </span>
              <div className="about-contact-text">
                <span className="about-contact-label">
                  {t({ en: "Email", km: "អ៊ីមែល" })}
                </span>
                <span className="about-contact-value">angket.bot12@gmail.com</span>
              </div>
            </a>
            <a
              className="about-contact-row"
              href="https://www.facebook.com/profile.php?id=61594053519400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="about-contact-ic" aria-hidden="true">
                <IconFacebook />
              </span>
              <div className="about-contact-text">
                <span className="about-contact-label">
                  {t({ en: "Facebook", km: "ហ្វេសប៊ុក" })}
                </span>
                <span className="about-contact-value">Angket - អង្កេត</span>
              </div>
            </a>
            <a className="about-contact-row about-contact-row-last" href="tel:+855926424621">
              <span className="about-contact-ic" aria-hidden="true">
                <IconPhone />
              </span>
              <div className="about-contact-text">
                <span className="about-contact-label">
                  {t({ en: "Phone", km: "ទូរស័ព្ទ" })}
                </span>
                <span className="about-contact-value">092 642 4621</span>
              </div>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
