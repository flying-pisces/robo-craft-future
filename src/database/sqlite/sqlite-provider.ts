import Database from 'better-sqlite3'
import { readFileSync } from 'fs'
import { join } from 'path'
import type { 
  DatabaseProvider, 
  ContactSubmission, 
  ServiceInquiry, 
  DatabaseResult 
} from '@/types/database'

export class SQLiteProvider implements DatabaseProvider {
  private db: Database.Database | null = null
  private readonly dbPath: string

  constructor(dbPath: string = 'ssh-robotics.db') {
    this.dbPath = dbPath
  }

  async initialize(): Promise<void> {
    try {
      // Create SQLite database connection
      this.db = new Database(this.dbPath)
      
      // Enable foreign keys and WAL mode for better performance
      this.db.exec('PRAGMA foreign_keys = ON')
      this.db.exec('PRAGMA journal_mode = WAL')
      
      // Read and execute schema
      const schemaPath = join(process.cwd(), 'src/database/sqlite/schema.sql')
      const schema = readFileSync(schemaPath, 'utf-8')
      this.db.exec(schema)
      
      console.log('SQLite database initialized successfully')
    } catch (error) {
      console.error('Failed to initialize SQLite database:', error)
      throw new Error('SQLite database initialization failed')
    }
  }

  private ensureConnection(): Database.Database {
    if (!this.db) {
      throw new Error('Database not initialized. Call initialize() first.')
    }
    return this.db
  }

  async submitContactForm(data: Omit<ContactSubmission, 'id' | 'created_at'>): Promise<DatabaseResult<ContactSubmission>> {
    try {
      const db = this.ensureConnection()
      
      const stmt = db.prepare(`
        INSERT INTO contact_submissions (first_name, last_name, email, company, project_type, project_description)
        VALUES (?, ?, ?, ?, ?, ?)
      `)
      
      const result = stmt.run(
        data.first_name,
        data.last_name, 
        data.email,
        data.company || null,
        data.project_type,
        data.project_description
      )
      
      // Get the inserted record
      const getStmt = db.prepare('SELECT * FROM contact_submissions WHERE rowid = ?')
      const insertedRecord = getStmt.get(result.lastInsertRowid) as ContactSubmission
      
      return { success: true, data: insertedRecord }
    } catch (error) {
      console.error('Error submitting contact form to SQLite:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  async getContactSubmissions(): Promise<DatabaseResult<ContactSubmission[]>> {
    try {
      const db = this.ensureConnection()
      
      const stmt = db.prepare('SELECT * FROM contact_submissions ORDER BY created_at DESC')
      const submissions = stmt.all() as ContactSubmission[]
      
      return { success: true, data: submissions }
    } catch (error) {
      console.error('Error fetching contact submissions from SQLite:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  async submitServiceInquiry(data: Omit<ServiceInquiry, 'id' | 'created_at'>): Promise<DatabaseResult<ServiceInquiry>> {
    try {
      const db = this.ensureConnection()
      
      const stmt = db.prepare(`
        INSERT INTO service_inquiries (service_type, email, name, message)
        VALUES (?, ?, ?, ?)
      `)
      
      const result = stmt.run(
        data.service_type,
        data.email,
        data.name || null,
        data.message || null
      )
      
      // Get the inserted record
      const getStmt = db.prepare('SELECT * FROM service_inquiries WHERE rowid = ?')
      const insertedRecord = getStmt.get(result.lastInsertRowid) as ServiceInquiry
      
      return { success: true, data: insertedRecord }
    } catch (error) {
      console.error('Error submitting service inquiry to SQLite:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  async getServiceInquiries(): Promise<DatabaseResult<ServiceInquiry[]>> {
    try {
      const db = this.ensureConnection()
      
      const stmt = db.prepare('SELECT * FROM service_inquiries ORDER BY created_at DESC')
      const inquiries = stmt.all() as ServiceInquiry[]
      
      return { success: true, data: inquiries }
    } catch (error) {
      console.error('Error fetching service inquiries from SQLite:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  async close(): Promise<void> {
    if (this.db) {
      this.db.close()
      this.db = null
      console.log('SQLite database connection closed')
    }
  }
}