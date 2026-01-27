import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

/**
 * Database configuration
 * Change the database name to match your project
 */
const DB_NAME = 'resume.db';
const DB_DIR = 'data';

// Get the database file path
const dbPath = path.join(process.cwd(), DB_DIR, DB_NAME);

// Ensure the data directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Singleton database connection
// Note: better-sqlite3 is synchronous, which is perfect for server-side code
let db: Database.Database | null = null;
let initialized = false;

/**
 * Initialize database tables automatically
 * Called once when the database is first accessed
 */
function initializeTables(database: Database.Database): void {
  // Check if tables already exist by querying sqlite_master
  const tableCheck = database.prepare(`
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name='users'
  `).get() as { name: string } | undefined;
  
  // If tables don't exist, create them
  if (!tableCheck) {
    // Create users table
    database.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table created');
  }
  // else {
  //   database.exec(`
  //     DROP TABLE IF EXISTS users;
  //   `);
  //   console.log('✅ Users table dropped');
  //   database.exec(`DROP TABLE IF EXISTS posts;`);
  //   console.log('✅ Posts table dropped');
  //   database.exec(`drop index if exists idx_posts_user_id;`);
  //   console.log('✅ Index dropped');
  // }
  
}

/**
 * Get the database connection instance
 * Creates a new connection if one doesn't exist
 * Automatically initializes tables on first access
 * 
 * @returns Database instance
 */
export function getDb(): Database.Database {
  if (!db) {
    db = new Database(dbPath);
    
    // Enable foreign keys for referential integrity
    db.pragma('foreign_keys = ON');
    
    // Enable WAL mode for better concurrency (optional but recommended)
    db.pragma('journal_mode = WAL');
    
    // Optional: Set busy timeout to handle concurrent access
    db.pragma('busy_timeout = 5000');
    
    // Auto-initialize tables on first connection
    if (!initialized) {
      initializeTables(db);
      initialized = true;
    }
  }
  return db;
}

/**
 * Close the database connection
 * Useful for cleanup in tests or when shutting down
 */
export function closeDb(): void {
  if (db) {
    db.close();
    db = null;
  }
}

/**
 * Execute a raw SQL statement
 * Use this for DDL operations (CREATE TABLE, ALTER TABLE, etc.)
 * 
 * @param sql - SQL statement to execute
 */
export function execSql(sql: string): void {
  const database = getDb();
  database.exec(sql);
}
