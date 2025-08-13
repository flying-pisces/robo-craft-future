import type { DatabaseProvider, DatabaseType } from '@/types/database'
import { SQLiteAPIProvider } from './sqlite/sqlite-api-provider'
import { SupabaseProvider } from './supabase/supabase-provider'

/**
 * Database Factory
 * Creates and manages database provider instances based on configuration
 */
export class DatabaseFactory {
  private static instance: DatabaseProvider | null = null

  /**
   * Get the configured database provider
   * Uses environment variable VITE_DATABASE_TYPE to determine which database to use
   * Defaults to 'supabase' if not specified
   */
  static async getDatabase(): Promise<DatabaseProvider> {
    if (this.instance) {
      return this.instance
    }

    const dbType = this.getDatabaseType()
    console.log(`Initializing ${dbType} database provider...`)

    try {
      this.instance = this.createProvider(dbType)
      await this.instance.initialize()
      return this.instance
    } catch (error) {
      console.error(`Failed to initialize ${dbType} database:`, error)
      throw error
    }
  }

  /**
   * Create a database provider instance
   */
  private static createProvider(dbType: DatabaseType): DatabaseProvider {
    switch (dbType) {
      case 'sqlite':
        return new SQLiteAPIProvider()
      case 'supabase':
        return new SupabaseProvider()
      default:
        throw new Error(`Unsupported database type: ${dbType}`)
    }
  }

  /**
   * Get the configured database type from environment variables
   */
  private static getDatabaseType(): DatabaseType {
    const dbType = import.meta.env.VITE_DATABASE_TYPE as DatabaseType
    
    // Validate the database type
    if (dbType && !['sqlite', 'supabase'].includes(dbType)) {
      console.warn(`Invalid database type: ${dbType}. Falling back to supabase.`)
      return 'supabase'
    }
    
    return dbType || 'supabase' // Default to supabase
  }

  /**
   * Reset the database instance (useful for testing or switching databases)
   */
  static async reset(): Promise<void> {
    if (this.instance && this.instance.close) {
      await this.instance.close()
    }
    this.instance = null
  }

  /**
   * Get current database type without initializing
   */
  static getCurrentDatabaseType(): DatabaseType {
    return this.getDatabaseType()
  }
}