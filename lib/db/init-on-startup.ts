import { initializeTables } from "./db";

export async function initDb() {
  if (typeof window === "undefined") {
    try {
      await initializeTables();
      console.log("🚀 Vercel Postgres Database ready on app startup");
    } catch (error) {
      console.error("❌ Failed to initialize Vercel Postgres:", error);
    }
  }
}
