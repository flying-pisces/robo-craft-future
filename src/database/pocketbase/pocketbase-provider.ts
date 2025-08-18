import PocketBase from 'pocketbase'
import type { 
  DatabaseProvider, 
  ContactSubmission, 
  ServiceInquiry, 
  DatabaseResult 
} from '@/types/database'

export class PocketBaseProvider implements DatabaseProvider {
  private pb: PocketBase | null = null

  async initialize(): Promise<void> {
    try {
      const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL

      if (!pocketbaseUrl) {
        throw new Error('Missing PocketBase environment variable VITE_POCKETBASE_URL')
      }

      this.pb = new PocketBase(pocketbaseUrl)
      console.log('PocketBase database initialized successfully')
    } catch (error) {
      console.error('Failed to initialize PocketBase database:', error)
      throw new Error('PocketBase database initialization failed')
    }
  }

  private ensureConnection() {
    if (!this.pb) {
      throw new Error('Database not initialized. Call initialize() first.')
    }
    return this.pb
  }

  async submitContactForm(data: Omit<ContactSubmission, 'id' | 'created_at'>): Promise<DatabaseResult<ContactSubmission>> {
    try {
      const pb = this.ensureConnection()
      
      const record = await pb.collection('contact_submissions').create(data)

      return { success: true, data: record as ContactSubmission }
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
      const pb = this.ensureConnection()
      
      const records = await pb.collection('contact_submissions').getFullList<ContactSubmission>({
        sort: '-created'
      })

      return { success: true, data: records }
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
      const pb = this.ensureConnection()
      
      const record = await pb.collection('service_inquiries').create(data)

      return { success: true, data: record as ServiceInquiry }
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
      const pb = this.ensureConnection()
      
      const records = await pb.collection('service_inquiries').getFullList<ServiceInquiry>({
        sort: '-created'
      })

      return { success: true, data: records }
    } catch (error) {
      console.error('Fetch service inquiries error:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  async close(): Promise<void> {
    // PocketBase client doesn't need explicit closing
    this.pb = null
    console.log('PocketBase database connection closed')
  }
}