import dotenv from "dotenv"
import { createClient } from "@supabase/supabase-js"

dotenv.config()

let client

function getClient() {
  if (!client) {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabasePublicKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY
    if (!supabaseUrl || !supabasePublicKey) {
      throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY/SUPABASE_PUBLISHABLE_KEY in environment variables")
    }
    client = createClient(supabaseUrl, supabasePublicKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }
  return client
}

const auth = new Proxy({}, {
  get(_target, method) {
    return (...args) => getClient().auth[method](...args)
  },
})

export default { auth }
