
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/database.types'
// Create a single supabase client for interacting with your database
console.log("------------------------")

const dbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const dbAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY



const supabase = createClient<Database>(
    dbUrl!,
    dbAnonKey!
  )


export default supabase