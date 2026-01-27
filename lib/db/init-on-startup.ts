/**
 * Database initialization module
 * This file runs when imported, initializing the database on app startup
 *
 * Import this in your root layout to ensure database is ready when app starts
 */

import { getDb } from "./db";

// Initialize database on module load (when app starts)
// This runs once when the module is first imported
if (typeof window === "undefined") {
  // Only run on server-side (Next.js server)
  try {
    getDb(); // This will trigger auto-initialization
    console.log("🚀 Database ready on app startup");
  } catch (error) {
    console.error("❌ Failed to initialize database on startup:", error);
  }
}
