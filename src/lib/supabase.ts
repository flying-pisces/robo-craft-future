import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface ContactSubmission {
  id?: string
  first_name: string
  last_name: string
  email: string
  company?: string
  project_type: string
  project_description: string
  created_at?: string
}

export interface ServiceInquiry {
  id?: string
  service_type: 'robotics' | 'automation' | 'electronics'
  email: string
  name?: string
  message?: string
  created_at?: string
}