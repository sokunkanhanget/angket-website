import dotenv from "dotenv"
import { adminEmails } from "../src/config.js"
import { createClient } from "@supabase/supabase-js"

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY/SUPABASE_SECRET_KEY in backend/.env",
  )
  process.exit(1)
}

if (adminEmails.length === 0) {
  console.error("No ADMIN_EMAILS set in backend/.env (comma-separated).")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const SEED_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "AngketAdmin@2026!"
const SEED_FULL_NAME = process.env.SEED_ADMIN_FULL_NAME || "Angket Admin"

async function main() {
  for (const email of adminEmails) {
    console.log(`Seeding admin: ${email}`)

    const { data: existing, error: lookupError } = await supabase
      .from("users")
      .select("user_id, name, email, role")
      .eq("email", email)
      .maybeSingle()

    if (lookupError) {
      console.error("Lookup failed:", lookupError.message)
      process.exit(1)
    }

    if (existing) {
      if (existing.role === "admin") {
        console.log(`"${email}" is already an admin. Nothing to do.`)
        continue
      }
      const { error: promoteError } = await supabase
        .from("users")
        .update({ role: "admin" })
        .eq("user_id", existing.user_id)
      if (promoteError) {
        console.error("Promote failed:", promoteError.message)
        process.exit(1)
      }
      console.log(`Promoted existing user "${email}" to admin.`)
      continue
    }

    const { data: created, error: authError } = await supabase.auth.admin.createUser({
      email,
      password: SEED_PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: SEED_FULL_NAME, name: SEED_FULL_NAME },
    })

    if (authError) {
      console.error("Create user failed:", authError.message)
      process.exit(1)
    }

    const { error: insertError } = await supabase.from("users").insert({
      user_id: created.user.id,
      name: SEED_FULL_NAME,
      email,
      role: "admin",
      phone: null,
    })

    if (insertError) {
      console.error("Insert into users failed:", insertError.message)
      process.exit(1)
    }

    console.log(`Seeded admin: ${email}`)
  }

  console.log(`Password: ${SEED_PASSWORD}`)
  console.log("Log in at http://localhost:5173/login to reach /admin/dashboard.")
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})