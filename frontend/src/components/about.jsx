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

export function About() {
  const { lang, t } = useLang()

  return (
    <>
      {/* ── About Angket ── */}
      <section id="about" className="about-hero" aria-labelledby="about-title">
        <div className="container">
          <Reveal className="about-hero-grid">
            <div className="about-hero-copy">
              <span className="about-kicker">
                <IconShield />
                {t({ en: "ABOUT ANGKET", km: "អំពី Angket" })}
              </span>
              <h1 id="about-title" className="about-hero-title">
                {lang === "km" ? (
                  t({
                    km: "ជំរុញមនុស្សឱ្យធ្វើការសម្រេចចិត្តឌីជីថលប្រកបដោយសុវត្ថិភាព",
                  })
                ) : (
                  <>
                    Empowering People to Make
                    <span className="about-hero-line">
                      <span className="about-hero-accent">Safer</span> Digital Decisions
                    </span>
                  </>
                )}
              </h1>
              <p className="about-hero-lead">
                {t({
                  en: "Angket is an AI-driven digital safety platform designed to help people identify and understand potential online threats. Through our Telegram Bot and reporting platform, users can check suspicious messages, links, URLs, and files before taking action.",
                  km: "Angket ជាវេទិកាសុវត្ថិភាពឌីជីថលដែលដំណើរការដោយ AI រចនាឡើងដើម្បីជួយមនុស្សកំណត់ និងយល់ពីការគំរាមកំហែងតាមអ៊ីនធឺណិតដែលអាចកើតមាន។ តាមរយៈ Telegram Bot និងវេទិការាយការណ៍របស់យើង អ្នកប្រើប្រាស់អាចពិនិត្យសារសង្ស័យ តំណភ្ជាប់ URL និងឯកសារមុននឹងធ្វើសកម្មភាព។",
                })}
              </p>
              <p className="about-hero-sub">
                {t({
                  en: "Angket provides a risk assessment, explains suspicious patterns, and offers recommendations to help users make safer decisions online. We believe that digital safety should be accessible to everyone, even without technical knowledge.",
                  km: "Angket ផ្តល់នូវការវាយតម្លៃហានិភ័យ ពន្យល់ពីលំនាំសង្ស័យ និងផ្តល់អនុសាសន៍ដើម្បីជួយអ្នកប្រើប្រាស់ធ្វើការសម្រេចចិត្តប្រកបដោយសុវត្ថិភាពតាមអ៊ីនធឺណិត។ យើងជឿថាសុវត្ថិភាពឌីជីថលគួរតែអាចចូលដោយគ្រប់គ្នា សូម្បីតែគ្មានចំណេះដឹងបច្ចេកវិទ្យា។",
                })}
              </p>
              <ul className="about-hero-mini">
                <li>
                  <span className="mini-ic" aria-hidden="true"><IconShield /></span>
                  <span className="mini-label">{t({ en: "Detect Scams", km: "រកឃើញការបោកប្រាស់" })}</span>
                </li>
                <li>
                  <span className="mini-ic" aria-hidden="true"><IconZap /></span>
                  <span className="mini-label">{t({ en: "Share Reports", km: "ចែករំលែករបាយការណ៍" })}</span>
                </li>
                <li>
                  <span className="mini-ic" aria-hidden="true"><IconUsers /></span>
                  <span className="mini-label">{t({ en: "Build a Safer Community", km: "បង្កើតសហគមន៍សុវត្ថិភាព" })}</span>
                </li>
              </ul>
              <div className="about-hero-cta">
                <Link className="btn btn-primary btn-lg" to="/report">
                  <span>{t({ en: "Join Our Mission", km: "ចូលរួមបេសកកម្មរបស់យើង" })}</span>
                  <IconArrowRight />
                </Link>
              </div>
            </div>

            <div className="about-hero-ill" aria-hidden="true">
              <span className="hero-orb hero-orb--c1" />
              <span className="hero-orb hero-orb--c2" />
              <span className="hero-orb hero-orb--c3" />
              <svg className="hero-ring" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 7">
                <circle cx="50" cy="50" r="48" />
              </svg>
              <span className="hero-shield"><IconShield check /></span>
              <span className="hero-tg"><IconTelegram /></span>

              <div className="phone-wrap">
                <div className="phone">
                  <div className="chat-head">
                    <span className="avatar"><IconShield check style={{ width: 18, height: 18 }} /></span>
                    <div>
                      <strong>Angket Bot</strong>
                      <small>{t({ en: "online", km: "លើបណ្ដាញ" })}</small>
                    </div>
                  </div>
                  <div className="chat-body">
                    <div className="bubble user">
                      <span>{t({ en: "Check if this link is safe:", km: "ពិនិត្យមើលតើតំណនេះមានសុវត្ថិភាពឬអត់៖" })}</span>
                      <span className="link-echo">https://suspicious-link.com/claim</span>
                    </div>
                    <div className="bubble bot">
                      <p className="warn-line">
                        <IconWarning />
                        <span>{t({ en: "This link looks suspicious!", km: "តំណនេះមើលទៅគួរឲ្យសង្ស័យ!" })}</span>
                      </p>
                      <p className="warn-desc">
                        {t({
                          en: "Potentially a phishing site or known scam. Be careful.",
                          km: "អាចជាគេហទំព័របន្លំ ឬការបោកប្រាស់ដែលគេស្គាល់។ សូមប្រុងប្រយ័ត្ន។",
                        })}
                      </p>
                      <div className="warn-actions">
                        <span className="warn-btn warn-btn--primary">{t({ en: "Report", km: "រាយការណ៍" })}</span>
                        <span className="warn-btn warn-btn--ghost">{t({ en: "Learn More", km: "ស្វែងយល់បន្ថែម" })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="float-card float-card--red">
                <span className="float-ic float-ic--red"><IconBriefcase /></span>
                <div>
                  <strong>{t({ en: "Fake job offers", km: "ការផ្តល់ការងារក្លែងក្លាយ" })}</strong>
                  <span className="float-bars"><i /><i /></span>
                </div>
              </div>
              <div className="float-card float-card--blue">
                <span className="float-ic float-ic--blue"><IconLink /></span>
                <div>
                  <strong>{t({ en: "Suspicious links", km: "តំណភ្ជាប់សង្ស័យ" })}</strong>
                  <span className="float-bars"><i /><i /></span>
                </div>
              </div>
              <div className="float-card float-card--orange">
                <span className="float-ic float-ic--orange"><IconFile /></span>
                <div>
                  <strong>{t({ en: "Malicious files", km: "ឯកសារព្យាបាទ" })}</strong>
                  <span className="float-bars"><i /><i /></span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section id="mission" className="about-mission" aria-labelledby="mission-title">
        <div className="container">
          <Reveal className="about-mission-grid">
            <div className="about-mission-card">
              <span className="about-kicker about-kicker--dark">
                {t({ en: "OUR MISSION", km: "បេសកកម្មរបស់យើង" })}
              </span>
              <h2 id="mission-title" className="about-mission-title">
                {t({
                  en: "Making digital safety accessible to everyone",
                  km: "ធ្វើឱ្យសុវត្ថិភាពឌីជីថលអាចចូលដោយគ្រប់គ្នា",
                })}
              </h2>
              <p className="about-mission-body">
                {t({
                  en: "Our mission is to make digital safety more accessible by helping people recognize, understand, and respond to potential online threats. We aim to empower users with the knowledge and tools they need to make safer and more informed decisions in the digital world.",
                  km: "បេសកកម្មរបស់យើងគឺធ្វើឱ្យសុវត្ថិភាពឌីជីថលអាចចូលបានកាន់តែច្រើនដោយជួយមនុស្សស្គាល់ យល់ និងឆ្លើយតបចំពោះការគំរាមកំហែងតាមអ៊ីនធឺណិតដែលអាចកើតមាន។ យើងមានបំណងជំរុញអ្នកប្រើប្រាស់ជាមួយនឹងចំណេះដឹង និងឧបករណ៍ដែលពួកគេត្រូវការដើម្បីធ្វើការសម្រេចចិត្តប្រកបដោយសុវត្ថិភាព និងកាន់តែដឹងនៅក្នុងពិភពឌីជីថល។",
                })}
              </p>
            </div>
            <div className="about-mission-card">
              <span className="about-kicker about-kicker--dark">
                {t({ en: "OUR VISION", km: "ចក្ខុវិស័យរបស់យើង" })}
              </span>
              <h2 className="about-mission-title">
                {t({
                  en: "A safer digital community for all",
                  km: "សហគមន៍ឌីជីថលប្រកបដោយសុវត្ថិភាពសម្រាប់ទាំងអស់គ្នា",
                })}
              </h2>
              <p className="about-mission-body">
                {t({
                  en: "We envision a safer digital community where people are more aware of online threats, better equipped to evaluate information, and able to protect themselves and others from scams and digital risks.",
                  km: "យើងស្រមៃមើលសហគមន៍ឌីជីថលប្រកបដោយសុវត្ថិភាពដែលមនុស្សមានការយល់ដឹងកាន់តែច្រើនអំពីការគំរាមកំហែងតាមអ៊ីនធឺណិត ប្រដាប់ក្នុងការវាយតម្លៃព័ត៌មានកាន់តែប្រសើរ និងអាចការពារខ្លួនឯង និងអ្នកដទៃពីការបោកប្រាស់ និងហានិភ័យឌីជីថល។",
                })}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Our Approach to Digital Literacy ── */}
      <section id="dmil" className="about-dmil" aria-labelledby="dmil-title">
        <div className="container">
          <Reveal className="about-dmil-header">
            <span className="about-kicker">
              {t({ en: "OUR APPROACH", km: "វិធីសាស្រ្តរបស់យើង" })}
            </span>
            <h2 id="dmil-title" className="about-section-title">
              {t({
                en: "Built Around Digital, Media and Information Literacy",
                km: "បង្កើតជុំវិញសមត្ថភាពឌីជីថល សារព័ត៌មាន និងព័ត៌មាន",
              })}
            </h2>
            <p className="about-section-lead">
              {t({
                en: "Angket is developed under the theme of Digital, Media and Information Literacy (DMIL). Our solution incorporates several important DMIL domains:",
                km: "Angket ត្រូវបានអភិវឌ្ឍន៍ក្រោមប្រធានបទសមត្ថភាពឌីជីថល សារព័ត៌មាន និងព័ត៌មាន (DMIL)។ ដំណោះស្រាយរបស់យើងរួមបញ្ចូល domain DMIL សំខាន់ៗជាច្រើន៖",
              })}
            </p>
          </Reveal>
          <Reveal className="about-dmil-grid">
            <div className="about-dmil-card">
              <div className="about-dmil-card-icon">
                <IconSearch />
              </div>
              <h3>
                {t({
                  en: "Information and Data Literacy",
                  km: "សមត្ថភាពព័ត៌មាន និងទិន្នន័យ",
                })}
              </h3>
              <p>
                {t({
                  en: "Helping users evaluate whether digital information, messages, links, and files are credible before taking action.",
                  km: "ជួយអ្នកប្រើប្រាស់វាយតម្លៃថាតើព័ត៌មានឌីជីថល សារ តំណភ្ជាប់ និងឯកសារគឺគួរឱ្យជឿឬអត់មុននឹងធ្វើសកម្មភាព។",
                })}
              </p>
            </div>
            <div className="about-dmil-card">
              <div className="about-dmil-card-icon">
                <IconEye />
              </div>
              <h3>
                {t({
                  en: "Media Literacy",
                  km: "សមត្ថភាពសារព័ត៌មាន",
                })}
              </h3>
              <p>
                {t({
                  en: "Encouraging users to think critically about content, sources, intentions, and possible manipulation or deception.",
                  km: "លើកទឹកចិត្តអ្នកប្រើប្រាស់គិតដោយរិះគិតអំពីមាតិកា ប្រភព បំណង និងការបំភ្លៃ ឬការបោកប្រាស់ដែលអាចមាន។",
                })}
              </p>
            </div>
            <div className="about-dmil-card">
              <div className="about-dmil-card-icon">
                <IconFlag />
              </div>
              <h3>
                {t({
                  en: "Communication and Collaboration",
                  km: "ការទំនាក់ទំនង និងការសហការ",
                })}
              </h3>
              <p>
                {t({
                  en: "Using community reporting to allow users to share experiences and help raise awareness of potential threats.",
                  km: "ប្រើប្រាស់របាយការណ៍សហគមន៍ដើម្បីអនុញ្ញាតឱ្យអ្នកប្រើប្រាស់ចែករំលែកបទពិសោធន៍ និងជួយបង្កើនការយល់ដឹងអំពីការគំរាមកំហែងដែលអាចកើតមាន។",
                })}
              </p>
            </div>
            <div className="about-dmil-card">
              <div className="about-dmil-card-icon">
                <IconLock />
              </div>
              <h3>
                {t({
                  en: "Security and Safety",
                  km: "សុវត្ថិភាព និងការពារ",
                })}
              </h3>
              <p>
                {t({
                  en: "Helping users recognize potential scams, phishing attempts, fraud, and unsafe digital content.",
                  km: "ជួយអ្នកប្រើប្រាស់ស្គាល់ការបោកប្រាស់ដែលអាចកើតមាន ការព្យាយាម钓鱼 ការក្បត់ និងមាតិកាឌីជីថលដែលមិនសុវត្ថិភាព។",
                })}
              </p>
            </div>
            <div className="about-dmil-card">
              <div className="about-dmil-card-icon">
                <IconBrain />
              </div>
              <h3>
                {t({
                  en: "Problem Solving",
                  km: "ការដោះស្រាយបញ្ហា",
                })}
              </h3>
              <p>
                {t({
                  en: "Using technology to address a real-world problem and support users in responding to digital threats.",
                  km: "ប្រើប្រាស់បច្ចេកវិទ្យាដើម្បីដោះស្រាយបញ្ហាពិតប្រាកដ និងគាំទ្រអ្នកប្រើប្រាស់ក្នុងការឆ្លើយតបចំពោះការគំរាមកំហែងឌីជីថល។",
                })}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Contact ── */}
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
