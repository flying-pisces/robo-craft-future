import { supabase, type ContactSubmission, type ServiceInquiry } from '@/lib/supabase'

export class ContactService {
  // Submit contact form
  static async submitContactForm(data: Omit<ContactSubmission, 'id' | 'created_at'>) {
    try {
      const { data: submission, error } = await supabase
        .from('contact_submissions')
        .insert([data])
        .select()
        .single()

      if (error) {
        console.error('Error submitting contact form:', error)
        throw new Error('Failed to submit contact form')
      }

      return { success: true, data: submission }
    } catch (error) {
      console.error('Contact form submission error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  // Submit service inquiry
  static async submitServiceInquiry(data: Omit<ServiceInquiry, 'id' | 'created_at'>) {
    try {
      const { data: inquiry, error } = await supabase
        .from('service_inquiries')
        .insert([data])
        .select()
        .single()

      if (error) {
        console.error('Error submitting service inquiry:', error)
        throw new Error('Failed to submit service inquiry')
      }

      return { success: true, data: inquiry }
    } catch (error) {
      console.error('Service inquiry submission error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  // Get all contact submissions (admin only)
  static async getContactSubmissions() {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching contact submissions:', error)
        throw new Error('Failed to fetch contact submissions')
      }

      return { success: true, data }
    } catch (error) {
      console.error('Fetch contact submissions error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  // Get all service inquiries (admin only)
  static async getServiceInquiries() {
    try {
      const { data, error } = await supabase
        .from('service_inquiries')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching service inquiries:', error)
        throw new Error('Failed to fetch service inquiries')
      }

      return { success: true, data }
    } catch (error) {
      console.error('Fetch service inquiries error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}