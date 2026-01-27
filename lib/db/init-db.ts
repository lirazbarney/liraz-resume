import { getDb } from "./db";

/**
 * Manually trigger database initialization
 *
 * Note: The database now auto-initializes when first accessed via getDb().
 * This function is kept for manual re-initialization if needed.
 *
 * You typically don't need to call this - tables are created automatically!
 */
export function initializeDatabase(): void {
  // Just calling getDb() will trigger auto-initialization
  // This function is kept for backwards compatibility
  const db = getDb();
  console.log(
    "Database connection established. Tables are auto-initialized on first access.",
  );
}
