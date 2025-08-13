import type { 
  DatabaseProvider, 
  ContactSubmission, 
  ServiceInquiry, 
  DatabaseResult 
} from '@/types/database'

/**
 * SQLite API Provider
 * This provider communicates with a local SQLite backend API
 * Since SQLite cannot run directly in the browser, this uses HTTP requests
 */
export class SQLiteAPIProvider implements DatabaseProvider {
  private readonly apiBaseUrl: string

  constructor() {
    // In development, use localhost. In production, this would be your backend URL
    this.apiBaseUrl = import.meta.env.VITE_SQLITE_API_URL || 'http://localhost:3001/api'
  }

  async initialize(): Promise<void> {
    try {
      // Test connection to the SQLite backend API
      const response = await fetch(`${this.apiBaseUrl}/health`)
      
      if (!response.ok) {
        throw new Error(`SQLite API not available (${response.status})`)
      }
      
      console.log('SQLite API provider initialized successfully')
    } catch (error) {
      console.error('Failed to initialize SQLite API provider:', error)
      throw new Error('SQLite API backend not available. Please ensure the backend server is running.')
    }
  }

  async submitContactForm(data: Omit<ContactSubmission, 'id' | 'created_at'>): Promise<DatabaseResult<ContactSubmission>> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/contact-submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      const result = await response.json()
      return { success: true, data: result }
    } catch (error) {
      console.error('Error submitting contact form to SQLite API:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  async getContactSubmissions(): Promise<DatabaseResult<ContactSubmission[]>> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/contact-submissions`)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      const result = await response.json()
      return { success: true, data: result }
    } catch (error) {
      console.error('Error fetching contact submissions from SQLite API:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  async submitServiceInquiry(data: Omit<ServiceInquiry, 'id' | 'created_at'>): Promise<DatabaseResult<ServiceInquiry>> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/service-inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      const result = await response.json()
      return { success: true, data: result }
    } catch (error) {
      console.error('Error submitting service inquiry to SQLite API:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  async getServiceInquiries(): Promise<DatabaseResult<ServiceInquiry[]>> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/service-inquiries`)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      const result = await response.json()
      return { success: true, data: result }
    } catch (error) {
      console.error('Error fetching service inquiries from SQLite API:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  async close(): Promise<void> {
    // No cleanup needed for API calls
    console.log('SQLite API provider connection closed')
  }
}