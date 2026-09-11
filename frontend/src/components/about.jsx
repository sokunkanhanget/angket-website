import { useLang } from "@/lib/i18n"
import { Reveal } from "./reveal"
import briefcaseIcon from "@/assets/icons/briefcase.svg"
import phishingIcon from "@/assets/icons/phishing.svg"
import moneyScamIcon from "@/assets/icons/money-scam.svg"
import brokenLinkIcon from "@/assets/icons/broken-link.svg"
import {
  IconMail,
  IconFacebook,
  IconPhone,
  IconShield,
  IconBot,
  IconEye,
  IconFlag,
  IconBrain,
  IconSearch,
  IconLock,
  IconInfo,
  IconCheckDouble,
  IconWarning,
} from "./icons"

export function About() {
  const { t } = useLang()

  return (
    <>
      {/* ── About Angket ── */}
      <section id="about" className="about-hero" aria-labelledby="about-title">
        <div className="container">
          <Reveal className="about-hero-inner">
            <h1 id="about-title" className="about-hero-title">
              {t({
                en: "Empowering People to Make Safer Digital Decisions",
                km: "ជំរុញមនុស្សឱ្យធ្វើការសម្រេចចិត្តឌីជីថលប្រកបដោយសុវត្ថិភាព",
              })}
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
          </Reveal>
        </div>
      </section>

      {/* ── The Problem We Address ── */}
      <section id="problem" className="about-problem" aria-labelledby="problem-title">
        <div className="container">
          <Reveal className="about-problem-grid">
            <div className="about-problem-left">
              <h2 id="problem-title" className="about-section-title">
                {t({
                  en: "Scams Are Easier to Encounter Than You Think",
                  km: "ការបោកប្រាស់ងាយស្រួលជួបជាងអ្វីដែលអ្នកគិត",
                })}
              </h2>
              <p className="about-section-body">
                {t({
                  en: "Every day, people receive suspicious messages, links, URLs, and files online. These may include fake job offers, prize notifications, phishing attempts, impersonation, investment scams, and other forms of online fraud.",
                  km: "រាល់ថ្ងៃ មនុស្សទទួលបានសារសង្ស័យ តំណភ្ជាប់ URL និងឯកសារតាមអ៊ីនធឺណិត។ ទាំងនេះអាចរួមបញ្ចូលការផ្តល់ការងារក្លែងក្លាយ ការជូនពរឈ្នះរង្វាន់ ការព្យាយាម钓鱼 ការក្លែងបន្លំអត្តសញ្ញាណ ការវិនិយោគបោកប្រាស់ និងទម្រង់ផ្សេងទៀតនៃការក្បត់តាមអ៊ីនធឺណិត។",
                })}
              </p>
            </div>
            <div className="about-problem-right">
              <div className="about-problem-cards">
                <div className="about-problem-card">
                  <span className="about-problem-ic" aria-hidden="true"><img src={briefcaseIcon} alt="" width="32" height="32" /></span>
                  <p>
                    {t({
                      en: "Fake job offers and prize notifications",
                      km: "ការផ្តល់ការងារក្លែងក្លាយ និងការជូនពរឈ្នះរង្វាន់",
                    })}
                  </p>
                </div>
                <div className="about-problem-card">
                  <span className="about-problem-ic" aria-hidden="true"><img src={phishingIcon} alt="" width="32" height="32" /></span>
                  <p>
                    {t({
                      en: "Phishing attempts and impersonation",
                      km: "ការព្យាយាម钓鱼 និងការក្លែងបន្លំអត្តសញ្ញាណ",
                    })}
                  </p>
                </div>
                <div className="about-problem-card">
                  <span className="about-problem-ic" aria-hidden="true"><img src={moneyScamIcon} alt="" width="32" height="32" /></span>
                  <p>
                    {t({
                      en: "Investment scams and online fraud",
                      km: "ការវិនិយោគបោកប្រាស់ និងការក្បត់តាមអ៊ីនធឺណិត",
                    })}
                  </p>
                </div>
                <div className="about-problem-card">
                  <span className="about-problem-ic" aria-hidden="true"><img src={brokenLinkIcon} alt="" width="32" height="32" /></span>
                  <p>
                    {t({
                      en: "Suspicious links, URLs, and files",
                      km: "តំណភ្ជាប់ URL និងឯកសារសង្ស័យ",
                    })}
                  </p>
                </div>
              </div>
              <p className="about-problem-note">
                {t({
                  en: "However, many people may not know whether the information they receive is legitimate or suspicious. Without a way to share and recognize these threats, users may unknowingly make unsafe decisions.",
                  km: "ទោះជាយ៉ាងណា មនុស្សជាច្រើនអាចមិនដឹងថាព័ត៌មានដែលពួកគេទទួលបានគឺពិតប្រាកដឬសង្ស័យ។ គ្មានវិធីដើម្បីចែករំលែក និងស្គាល់ការគំរាមកំហែងទាំងនេះ អ្នកប្រើប្រាស់អាចធ្វើការសម្រេចចិត្តមិនសុវត្ថិភាពដោយមិនដឹងខ្លួន។",
                })}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Our Solution ── */}
      <section id="solution" className="about-solution" aria-labelledby="solution-title">
        <div className="container">
          <Reveal className="about-solution-header">
            <span className="about-kicker">
              {t({ en: "OUR SOLUTION", km: "ដំណោះស្រាយរបស់យើង" })}
            </span>
            <h2 id="solution-title" className="about-section-title">
              {t({
                en: "Meet Angket",
                km: "ស្គាល់ Angket",
              })}
            </h2>
            <p className="about-section-lead">
              {t({
                en: "Angket combines AI-assisted analysis with community awareness to help users better understand potential digital threats. Our platform provides three main solutions:",
                km: "Angket រួមបញ្ចូលការវិភាគដែលជួយដោយ AI ជាមួយការយល់ដឹងរបស់សហគមន៍ដើម្បីជួយអ្នកប្រើប្រាស់យល់ពីការគំរាមកំហែងឌីជីថលដែលអាចកើតមាន។ វេទិការបស់យើងផ្តល់ដំណោះស្រាយសំខាន់ៗបី៖",
              })}
            </p>
          </Reveal>
          <Reveal className="about-solution-grid">
            {/* Telegram Bot */}
            <div className="about-solution-card">
              <div className="about-solution-card-icon">
                <IconBot />
              </div>
              <h3>
                {t({ en: "Telegram Bot", km: "Telegram Bot" })}
              </h3>
              <p className="about-solution-card-desc">
                {t({
                  en: "Users can send suspicious content directly to the Angket Telegram Bot, including messages, links and URLs, and files.",
                  km: "អ្នកប្រើប្រាស់អាផ្ញើសារសង្ស័យផ្ទាល់ទៅ Angket Telegram Bot រួមទាំងសារ តំណភ្ជាប់ និងឯកសារ។",
                })}
              </p>
              <ul className="about-solution-card-list">
                <li>
                  <IconShield className="about-solution-list-icon" />
                  {t({ en: "Risk level or risk score", km: "កម្រិតហានិភ័យ ឬពិន្ទុហានិភ័យ" })}
                </li>
                <li>
                  <IconInfo className="about-solution-list-icon" />
                  {t({ en: "Reasons behind the assessment", km: "ហេតុផលនៃការវាយតម្លៃ" })}
                </li>
                <li>
                  <IconSearch className="about-solution-list-icon" />
                  {t({ en: "Suspicious patterns detected", km: "លំនាំសង្ស័យដែលរកឃើញ" })}
                </li>
                <li>
                  <IconCheckDouble className="about-solution-list-icon" />
                  {t({ en: "Recommended next steps", km: "ជំហានបន្ទាប់ដែលអនុសាសន៍" })}
                </li>
              </ul>
            </div>

            {/* Live Scan Mode */}
            <div className="about-solution-card">
              <div className="about-solution-card-icon">
                <IconEye />
              </div>
              <h3>
                {t({ en: "Live Scan Mode", km: "Live Scan Mode" })}
              </h3>
              <p className="about-solution-card-desc">
                {t({
                  en: "When enabled, Live Scan Mode helps users monitor incoming messages and identify potentially suspicious activity.",
                  km: "នៅពេលបើក Live Scan Mode ជួយអ្នកប្រើប្រាស់ត្រួតពិនិត្យសារចូល និងកំណត់សកម្មភាពសង្ស័យ។",
                })}
              </p>
              <ul className="about-solution-card-list">
                <li>
                  <IconEye className="about-solution-list-icon" />
                  {t({ en: "Monitor incoming messages automatically", km: "ត្រួតពិនិត្យសារចូលដោយស្វ័យប្រវត្តិ" })}
                </li>
                <li>
                  <IconWarning className="about-solution-list-icon" />
                  {t({ en: "Receive alerts for suspicious content", km: "ទទួលការជូនដំណឹងសម្រាប់មាតិកាសង្ស័យ" })}
                </li>
                <li>
                  <IconSearch className="about-solution-list-icon" />
                  {t({ en: "Get instant risk analysis", km: "ទទួលការវិភាគហានិភ័យភ្លាមៗ" })}
                </li>
                <li>
                  <IconLock className="about-solution-list-icon" />
                  {t({ en: "No manual checking needed", km: "មិនចាំបាច់ពិនិត្យដោយដៃ" })}
                </li>
              </ul>
            </div>

            {/* Community Reporting */}
            <div className="about-solution-card">
              <div className="about-solution-card-icon">
                <IconFlag />
              </div>
              <h3>
                {t({ en: "Community Reporting", km: "របាយការណ៍សហគមន៍" })}
              </h3>
              <p className="about-solution-card-desc">
                {t({
                  en: "Through the Angket website, users can report scam experiences and suspicious activities to help others.",
                  km: "តាមរយៈគេហទំព័រ Angket អ្នកប្រើប្រាស់អាចរាយការណ៍ពីបទពិសោធន៍បោកប្រាស់ និងសកម្មភាពសង្ស័យដើម្បីជួយអ្នកដទៃ។",
                })}
              </p>
              <ul className="about-solution-card-list">
                <li>
                  <IconInfo className="about-solution-list-icon" />
                  {t({ en: "Increase awareness of common scams", km: "បង្កើនការយល់ដឹងពីការបោកប្រាស់ជាទូទៅ" })}
                </li>
                <li>
                  <IconSearch className="about-solution-list-icon" />
                  {t({ en: "Identify threats targeting multiple people", km: "កំណត់ការគំរាមកំហែងដែលកំណត់គោលដៅមនុស្សជាច្រើន" })}
                </li>
                <li>
                  <IconFlag className="about-solution-list-icon" />
                  {t({ en: "Help others recognize similar activities", km: "ជួយអ្នកដទៃស្គាល់សកម្មភាពដែលដូចគ្នា" })}
                </li>
                <li>
                  <IconBrain className="about-solution-list-icon" />
                  {t({ en: "Build collective digital awareness", km: "សាងសង់ការយល់ដឹងឌីជីថលរួមគ្នា" })}
                </li>
              </ul>
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
