import { initializeTables } from "./db";

/**
 * Manually trigger database initialization
 *
 * This function initializes the database tables.
 * It's safe to call multiple times - tables are created only if they don't exist.
 */
export async function initializeDatabase(): Promise<void> {
  try {
    await initializeTables();
    console.log("Database tables initialized successfully");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
}
