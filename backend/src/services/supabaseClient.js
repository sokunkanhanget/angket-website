import dotenv from "dotenv"
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
// Support both legacy service-role JWT keys and the new sb_secret_ keys
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY/SUPABASE_SECRET_KEY in environment variables');
}

const authOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
};

// Privileged client: always acts as the service role. Never call
// signInWithPassword on this instance — doing so replaces its session with the
// user's JWT and enforces RLS (breaking storage uploads, etc.).
const supabase = createClient(supabaseUrl, supabaseServiceKey, authOptions);

// Dedicated client for password sign-in so the privileged client above stays
// authenticated as the service role.
export const authClient = createClient(supabaseUrl, supabaseServiceKey, authOptions);

export default supabase;