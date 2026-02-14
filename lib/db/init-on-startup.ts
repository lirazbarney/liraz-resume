import { initializeTables } from "./db";

export async function initDb() {
  if (typeof window === "undefined") {
    try {
      await initializeTables();
      console.log("🚀 D1 Database ready on app startup");
    } catch (error) {
      console.error("❌ Failed to initialize D1:", error);
    }
  }
}
