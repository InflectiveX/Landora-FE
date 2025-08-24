import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // allow importing during tests/builds; runtime will fail if used without env
  // but keep a graceful console message
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase URL or anon key not set. Supabase client will not work until these are provided."
  );
}

export const supabase = createClient(url || "", anonKey || "");

export default supabase;
