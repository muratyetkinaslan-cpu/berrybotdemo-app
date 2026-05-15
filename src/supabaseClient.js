import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient("https://wccqcivcaxsnpdgwezai.supabase.co", "sb_publishable_FuRNbU5-j9JxqBohMG74sA_QLwjkJnL")
