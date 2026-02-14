import { getRequestContext } from "@cloudflare/next-on-pages";
// No need to import D1Database, it comes from the workers-types package globally
// but we define the interface here to satisfy the compiler

interface CloudflareEnv {
  DB: D1Database;
}

export function getDb() {
  // Use 'unknown' first to bypass the strict type overlap check you saw in the screenshot
  const context = getRequestContext() as unknown as { env: CloudflareEnv };

  if (!context || !context.env || !context.env.DB) {
    throw new Error(
      "D1 Database binding 'DB' not found. Ensure it is added in Cloudflare Bindings.",
    );
  }

  return context.env.DB;
}
/**
 * Initialize tables for D1
 * In D1, you usually run migrations, but this keeps your "auto-init" logic
 */
export async function initializeTables(): Promise<void> {
  const db = getDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("✅ Users table checked/created in D1");
}
