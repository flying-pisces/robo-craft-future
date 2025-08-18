// Database types shared between all database providers
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

// Database operation results
export interface DatabaseResult<T> {
  success: boolean
  data?: T
  error?: string
}

// Database provider interface - all database providers must implement this
export interface DatabaseProvider {
  // Initialize the database connection/setup
  initialize(): Promise<void>
  
  // Contact submissions
  submitContactForm(data: Omit<ContactSubmission, 'id' | 'created_at'>): Promise<DatabaseResult<ContactSubmission>>
  getContactSubmissions(): Promise<DatabaseResult<ContactSubmission[]>>
  
  // Service inquiries  
  submitServiceInquiry(data: Omit<ServiceInquiry, 'id' | 'created_at'>): Promise<DatabaseResult<ServiceInquiry>>
  getServiceInquiries(): Promise<DatabaseResult<ServiceInquiry[]>>
  
  // Clean up resources
  close?(): Promise<void>
}

// Database provider types
export type DatabaseType = 'pocketbase' | 'sqlite'