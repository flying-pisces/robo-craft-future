import { DatabaseFactory } from '@/database/database-factory'
import type { ContactSubmission, ServiceInquiry } from '@/types/database'

export class ContactService {
  // Submit contact form
  static async submitContactForm(data: Omit<ContactSubmission, 'id' | 'created_at'>) {
    try {
      const database = await DatabaseFactory.getDatabase()
      return await database.submitContactForm(data)
    } catch (error) {
      console.error('Contact form submission error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  // Submit service inquiry
  static async submitServiceInquiry(data: Omit<ServiceInquiry, 'id' | 'created_at'>) {
    try {
      const database = await DatabaseFactory.getDatabase()
      return await database.submitServiceInquiry(data)
    } catch (error) {
      console.error('Service inquiry submission error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  // Get all contact submissions (admin only)
  static async getContactSubmissions() {
    try {
      const database = await DatabaseFactory.getDatabase()
      return await database.getContactSubmissions()
    } catch (error) {
      console.error('Fetch contact submissions error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  // Get all service inquiries (admin only)
  static async getServiceInquiries() {
    try {
      const database = await DatabaseFactory.getDatabase()
      return await database.getServiceInquiries()
    } catch (error) {
      console.error('Fetch service inquiries error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  // Get current database type (useful for admin interface)
  static getCurrentDatabaseType() {
    return DatabaseFactory.getCurrentDatabaseType()
  }
}