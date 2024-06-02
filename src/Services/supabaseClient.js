// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const base_url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!base_url || !key) {
  throw new Error("Supabase URL and Key must be provided");
}

export const supabaseClient = createClient(base_url, key);

