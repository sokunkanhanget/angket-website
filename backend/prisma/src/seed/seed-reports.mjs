#!/usr/bin/env node
// Seed sample scam reports into the `report_form` table.
// Run from backend/:  node prisma/src/seed/seed-reports.mjs
import { randomUUID } from "node:crypto"
import supabase from "../services/supabaseClient.js"

const SEED_EMAIL = "community@angket.kh"
const SEED_NAME = "Community Member"

const SAMPLE_REPORTS = [
  {
    title_en: "Data-entry job asking for a registration fee",
    title_km: "ការងារបញ្ចូលទិន្នន័យ សុំថ្លៃចុះឈ្មោះ",
    description_en:
      "Someone offered me an online data-entry job paying $50 per day. Before I could start, they asked for a $30 “registration fee”. A real job never asks you to pay first.",
    description_km:
      "មានគេផ្ដល់ការងារបញ្ចូលទិន្នន័យតាមអ៊ីនធឺណិតឲ្យខ្ញុំ ថ្ងៃមួយ 50 ដុល្លារ។ មុនចាប់ផ្ដើម គេសុំ «ថ្លៃចុះឈ្មោះ» 30 ដុល្លារ។",
    category: "fake-job",
    platform: "Telegram",
    contact_method: "Telegram",
    amount_lost: "$30",
    date_occurred: "2026-08-20",
    reported_count: 34,
    hours_ago: 2,
  },
  {
    title_en: "You won! Just pay the delivery fee",
    title_km: "អ្នកឈ្នះរង្វាន់! គ្រាន់តែបង់ថ្លៃដឹកជញ្ជូន",
    description_en:
      "A page said I won a lottery I never entered. To claim it, I only had to pay a “delivery fee” through a link that looked almost exactly like a real courier website.",
    description_km:
      "ទំព័រមួយប្រាប់ថាខ្ញុំជាប់ឆ្នោតដែលខ្ញុំមិនបានចូលរួម។ ដើម្បីទទួលរង្វាន់ គ្រាន់តែបង់ «ថ្លៃដឹកជញ្ជូន» តាមតំណមើលទៅដូចគេហទំព័រដឹកជញ្ជូនពិត។",
    category: "prize",
    platform: "Facebook",
    contact_method: "Facebook Messenger",
    amount_lost: "$15",
    date_occurred: "2026-08-18",
    reported_count: 21,
    hours_ago: 3,
  },
  {
    title_en: "Trading group froze my account",
    title_km: "ក្រុមវិនិយោគបានបិទគណនីខ្ញុំ",
    description_en:
      "A “trading mentor” posted daily profit screenshots and invited me into his group. My first small withdrawal worked, but after I invested more, my account was frozen and they disappeared.",
    description_km:
      "«គ្រូវិនិយោគ»បានផ្សាយរូបភាពចំណេញប្រចាំថ្ងៃ ហើយអញ្ជើញខ្ញុំចូលក្រុម។ ការដកប្រាក់តូចដំបូងដំណើរការ ប៉ុន្តែពេលខ្ញុំវិនិយោគបន្ថែម គណនីត្រូវបានបិទ ហើយពួកគេបាត់ខ្លួន។",
    category: "investment",
    platform: "Facebook",
    contact_method: "Telegram",
    amount_lost: "$1,250",
    date_occurred: "2026-08-10",
    reported_count: 27,
    hours_ago: 5,
  },
  {
    title_en: "Fake bank security alert via SMS",
    title_km: "ការជូនដំណឹងសុវត្ថិភាពធនាគារក្លែងក្លាយតាម SMS",
    description_en:
      "An SMS claimed my bank account would be suspended and told me to “verify” it on a link. The site copied my bank's logo and asked for my password and OTP.",
    description_km:
      "សារ SMS ប្រាប់ថាគណនីធនាគារខ្ញុំនឹងត្រូវបិទ ហើយឲ្យ «ផ្ទៀងផ្ទាត់» តាមតំណមួយ។ គេហទំព័រចម្លងសញ្ញាធនាគារខ្ញុំ ហើយសុំពាក្យសម្ងាត់ និងលេខ OTP។",
    category: "phishing",
    platform: "SMS",
    contact_method: "SMS / Link",
    amount_lost: null,
    date_occurred: "2026-08-16",
    reported_count: 18,
    hours_ago: 7,
  },
  {
    title_en: "Seller vanished after I paid",
    title_km: "អ្នកលក់បាត់ខ្លួនបន្ទាប់ពីទទួលប្រាក់",
    description_en:
      "I paid for sneakers after seeing their videos. The next day the account deleted every post and blocked me.",
    description_km:
      "ខ្ញុំបង់ប្រាក់ទិញស្បែកជើងបន្ទាប់ពីមើលវីដេអូរបស់គេ។ ថ្ងៃបន្ទាប់ គណនីលុបការផ្សាយទាំងអស់ ហើយ block ខ្ញុំ។",
    category: "fake-seller",
    platform: "TikTok",
    contact_method: "TikTok",
    amount_lost: "$85",
    date_occurred: "2026-08-14",
    reported_count: 15,
    hours_ago: 8,
  },
  {
    title_en: "“Tax refund” email from a fake ministry address",
    title_km: "អ៊ីមែល «បង្វិលសងពន្ធ» ពីអាសយដ្ឋានក្លែងក្លាយ",
    description_en:
      "An email said I was owed a tax refund and asked me to click a link to input my bank card details. The sender address was a misspelled copy of a real government domain.",
    description_km:
      "អ៊ីមែលប្រាប់ថាខ្ញុំមានសិទ្ធិទទួលការបង្វិលសងពន្ធ ហើយសុំឲ្យចុចតំណដើម្បីបញ្ចូលព័ត៌មានកាតធនាគារ។ អាសយដ្ឋានអ្នកផ្ញើចម្លងពីដែនរដ្ឋាភិបាលពិត ប៉ុន្តែសរសេរខុស។",
    category: "phishing",
    platform: "Email",
    contact_method: "Email",
    amount_lost: null,
    date_occurred: "2026-08-12",
    reported_count: 9,
    hours_ago: 3,
  },
  {
    title_en: "Job interview on Telegram asked for my passport photo",
    title_km: "សំភាសន៍ការងារតាម Telegram សុំរូបលិខិតឆ្លងដែន",
    description_en:
      "They “hired” me after a short Telegram interview, then asked for a passport photo and my bank account “for salary”. I didn't send anything and reported them.",
    description_km:
      "គេ «ទទួលយក» ខ្ញុំក្រោយសំភាសន៍តាម Telegram ខ្លី បន្ទាប់មកសុំរូបលិខិតឆ្លងដែន និងលេខគណនីធនាគារ «សម្រាប់ប្រាក់ខែ»។ ខ្ញុំមិនបានផ្ញើអ្វី ហើយរាយការណ៍។",
    category: "fake-job",
    platform: "Telegram",
    contact_method: "Telegram",
    amount_lost: null,
    date_occurred: "2026-08-09",
    reported_count: 12,
    hours_ago: 1,
  },
  {
    title_en: "Fake courier claiming an unpaid customs fee",
    title_km: "អ្នកដឹកជញ្ជូនក្លែងក្លាយ ទាមទារថ្លៃគយមិនទាន់បង់",
    description_en:
      "A message pretended to be a courier company and said my package was stuck at customs. I had to pay a $20 fee on a fake payment page before they disappeared.",
    description_km:
      "សារមួយក្លែងធ្វើជាក្រុមហ៊ុនដឹកជញ្ជូន ប្រាប់ថាក្បាលដីរបស់ខ្ញុំជាប់គយ។ ខ្ញុំបង់ថ្លៃ 20 ដុល្លារនៅទំព័រក្លែងក្លាយ បន្ទាប់មកពួកគេបាត់ខ្លួន។",
    category: "fake-seller",
    platform: "Telegram",
    contact_method: "Telegram / Link",
    amount_lost: "$20",
    date_occurred: "2026-08-07",
    reported_count: 7,
    hours_ago: 4,
  },
  {
    title_en: "Instagram account “verification” scam",
    title_km: "ការបោកប្រាស់ «ផ្ទៀងផ្ទាត់» គណនី Instagram",
    description_en:
      "Someone posing as Instagram support asked for my login code to “verify” my account. They took over my account and messaged my followers asking for money.",
    description_km:
      "អ្នកក្លែងធ្វើជាក្រុមជំនួយ Instagram សុំលេខកូដចូលគណនី ដើម្បី «ផ្ទៀងផ្ទាត់»។ ពួកគេគ្រប់គ្រងគណនីខ្ញុំ ហើយផ្ញើសារសុំលុយអ្នកតាមដានខ្ញុំ។",
    category: "impersonation",
    platform: "Instagram",
    contact_method: "Instagram DM",
    amount_lost: null,
    date_occurred: "2026-08-05",
    reported_count: 11,
    hours_ago: 6,
  },
  {
    title_en: "WhatsApp “your relative is in trouble” call",
    title_km: "ការហៅ WhatsApp «សាច់ញាតិរបស់អ្នកកំពុងមានបញ្ហា»",
    description_en:
      "A caller said my relative was in trouble and demanded an urgent transfer. They used the relative's name and photo taken from their public profile.",
    description_km:
      "អ្នកហៅចូលប្រាប់ថាសាច់ញាតិខ្ញុំកំពុងមានបញ្ហា ហើយទាមទារឲ្យផ្ទេរប្រាក់ជាបន្ទាន់។ ពួកគេប្រើឈ្មោះ និងរូបសាច់ញាតិពីទម្រង់សាធារណៈ។",
    category: "impersonation",
    platform: "WhatsApp",
    contact_method: "Phone call",
    amount_lost: null,
    date_occurred: "2026-08-03",
    reported_count: 6,
    hours_ago: 9,
  },
]

async function getOrCreateSeedUser() {
  const { data: existing } = await supabase
    .from("users")
    .select("user_id")
    .eq("email", SEED_EMAIL)
    .maybeSingle()
  if (existing) return existing.user_id

  const id = randomUUID()
  const { data, error } = await supabase
    .from("users")
    .insert({
      user_id: id,
      name: SEED_NAME,
      email: SEED_EMAIL,
      role: "user",
      phone: "+85512345678",
    })
    .select("user_id")
    .single()
  if (error) throw new Error(`Could not create seed user: ${error.message}`)
  return data.user_id
}

async function loadCategoryMap() {
  const { data, error } = await supabase.from("category").select("category_id, value")
  if (error) throw new Error(`Could not load categories: ${error.message}`)
  const map = new Map()
  for (const row of data || []) map.set(row.value || row.category_id, row.category_id)
  return map
}

async function main() {
  const { count } = await supabase
    .from("report_form")
    .select("report_form_id", { count: "exact", head: true })
  if (count > 0) {
    console.log(`report_form already has ${count} row(s). Skipping.`)
    return
  }

  const categoryMap = await loadCategoryMap()
  const userId = await getOrCreateSeedUser()

  const rows = SAMPLE_REPORTS.map((r) => {
    const categoryId = categoryMap.get(r.category)
    if (!categoryId) throw new Error(`Unknown category value: ${r.category}`)
    return {
      report_form_id: randomUUID(),
      user_id: userId,
      category_id: categoryId,
      description: r.description_en,
      place: r.platform,
      status: "published",
      title_en: r.title_en,
      title_km: r.title_km,
      description_en: r.description_en,
      description_km: r.description_km,
      category: r.category,
      platform: r.platform,
      contact_method: r.contact_method,
      amount_lost: r.amount_lost,
      date_occurred: r.date_occurred,
      reported_count: r.reported_count,
      created_at: new Date(Date.now() - r.hours_ago * 60 * 60 * 1000).toISOString(),
    }
  })

  const { error } = await supabase.from("report_form").insert(rows)
  if (error) throw new Error(`Insert failed: ${error.message}`)
  console.log(`Seeded ${rows.length} sample reports into report_form.`)
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})