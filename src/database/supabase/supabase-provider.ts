import { createClient } from '@supabase/supabase-js'
import type { 
  DatabaseProvider, 
  ContactSubmission, 
  ServiceInquiry, 
  DatabaseResult 
} from '@/types/database'

export class SupabaseProvider implements DatabaseProvider {
  private supabase: ReturnType<typeof createClient> | null = null

  async initialize(): Promise<void> {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase environment variables')
      }

      this.supabase = createClient(supabaseUrl, supabaseAnonKey)
      console.log('Supabase database initialized successfully')
    } catch (error) {
      console.error('Failed to initialize Supabase database:', error)
      throw new Error('Supabase database initialization failed')
    }
  }

  private ensureConnection() {
    if (!this.supabase) {
      throw new Error('Database not initialized. Call initialize() first.')
    }
    return this.supabase
  }

  async submitContactForm(data: Omit<ContactSubmission, 'id' | 'created_at'>): Promise<DatabaseResult<ContactSubmission>> {
    try {
      const supabase = this.ensureConnection()
      
      const { data: submission, error } = await supabase
        .from('contact_submissions')
        .insert([data])
        .select()
        .single()

      if (error) {
        console.error('Error submitting contact form to Supabase:', error)
        throw new Error('Failed to submit contact form')
      }

      return { success: true, data: submission }
    } catch (error) {
      console.error('Contact form submission error:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  async getContactSubmissions(): Promise<DatabaseResult<ContactSubmission[]>> {
    try {
      const supabase = this.ensureConnection()
      
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching contact submissions from Supabase:', error)
        throw new Error('Failed to fetch contact submissions')
      }

      return { success: true, data }
    } catch (error) {
      console.error('Fetch contact submissions error:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  async submitServiceInquiry(data: Omit<ServiceInquiry, 'id' | 'created_at'>): Promise<DatabaseResult<ServiceInquiry>> {
    try {
      const supabase = this.ensureConnection()
      
      const { data: inquiry, error } = await supabase
        .from('service_inquiries')
        .insert([data])
        .select()
        .single()

      if (error) {
        console.error('Error submitting service inquiry to Supabase:', error)
        throw new Error('Failed to submit service inquiry')
      }

      return { success: true, data: inquiry }
    } catch (error) {
      console.error('Service inquiry submission error:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  async getServiceInquiries(): Promise<DatabaseResult<ServiceInquiry[]>> {
    try {
      const supabase = this.ensureConnection()
      
      const { data, error } = await supabase
        .from('service_inquiries')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching service inquiries from Supabase:', error)
        throw new Error('Failed to fetch service inquiries')
      }

      return { success: true, data }
    } catch (error) {
      console.error('Fetch service inquiries error:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  async close(): Promise<void> {
    // Supabase client doesn't need explicit closing
    console.log('Supabase database connection closed')
  }
}