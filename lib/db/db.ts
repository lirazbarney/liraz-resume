import { sql } from "@vercel/postgres";

/**
 * Get database connection
 * Vercel Postgres uses environment variables automatically
 */
export function getDb() {
  return sql;
}

/**
 * Initialize tables for Vercel Postgres
 */
export async function initializeTables(): Promise<void> {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("✅ Users table checked/created in Vercel Postgres");
  } catch (error) {
    console.error("Error initializing tables:", error);
    throw error;
  }
}
