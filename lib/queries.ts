// THIS FILE IS FOR EXAMPLE QUERIES ONLY AND IS NOT USED IN THE PROJECT. will be deleted later.

import { getDb } from "./db/db";
import type Database from "better-sqlite3";

/**
 * Example queries demonstrating best practices with better-sqlite3
 *
 * Best practices:
 * 1. Always use prepared statements with parameters (prevents SQL injection)
 * 2. Use transactions for multiple related operations
 * 3. Handle errors appropriately
 * 4. Use appropriate query methods: .get() for single row, .all() for multiple rows
 */

// ============================================================================
// Query 1: SELECT with parameters (prepared statement)
// ============================================================================

/**
 * Example: Get a single record by ID
 * Uses .get() for single row results
 */
export function getUserById(userId: number) {
  const db = getDb();

  // Prepared statement with parameter binding (prevents SQL injection)
  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  const user = stmt.get(userId) as
    | { id: number; email: string; name: string; created_at: string }
    | undefined;

  return user;
}

/**
 * Example: Get multiple records with filtering
 * Uses .all() for multiple row results
 */
export function getUsersByEmailDomain(domain: string) {
  const db = getDb();

  // Using LIKE with parameter binding
  const stmt = db.prepare(
    "SELECT * FROM users WHERE email LIKE ? ORDER BY created_at DESC",
  );
  const users = stmt.all(`%@${domain}`) as Array<{
    id: number;
    email: string;
    name: string;
    created_at: string;
  }>;

  return users;
}

// ============================================================================
// Query 2: INSERT with transaction (multiple related operations)
// ============================================================================

/**
 * Example: Insert multiple records atomically using a transaction
 * If any operation fails, all changes are rolled back
 */
export function createUserWithPosts(
  userData: { email: string; name: string },
  posts: Array<{ title: string; content: string }>,
) {
  const db = getDb();

  // Transaction ensures all operations succeed or all fail
  const transaction = db.transaction((data) => {
    // Insert user
    const userStmt = db.prepare(
      "INSERT INTO users (email, name) VALUES (?, ?)",
    );
    const userResult = userStmt.run(data.userData.email, data.userData.name);
    const userId = Number(userResult.lastInsertRowid);

    // Insert posts for the user
    const postStmt = db.prepare(
      "INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)",
    );
    for (const post of data.posts) {
      postStmt.run(userId, post.title, post.content);
    }

    return userId;
  });

  // Execute the transaction
  const userId = transaction({ userData, posts });
  return userId;
}

// ============================================================================
// Query 3: Complex SELECT with JOIN and aggregation
// ============================================================================

/**
 * Example: Complex query with JOIN and COUNT aggregation
 * Demonstrates more advanced SQL patterns
 */
export function getUserStats(userId: number) {
  const db = getDb();

  // Complex query with JOIN and aggregation
  const stmt = db.prepare(`
    SELECT 
      u.id,
      u.email,
      u.name,
      u.created_at as user_created_at,
      COUNT(p.id) as post_count,
      MAX(p.created_at) as latest_post_date
    FROM users u
    LEFT JOIN posts p ON u.id = p.user_id
    WHERE u.id = ?
    GROUP BY u.id, u.email, u.name, u.created_at
  `);

  const stats = stmt.get(userId) as
    | {
        id: number;
        email: string;
        name: string;
        user_created_at: string;
        post_count: number;
        latest_post_date: string | null;
      }
    | undefined;

  return stats;
}

/**
 * Example: UPDATE with conditional logic
 */
export function updateUserEmail(userId: number, newEmail: string): boolean {
  const db = getDb();

  const stmt = db.prepare("UPDATE users SET email = ? WHERE id = ?");
  const result = stmt.run(newEmail, userId);

  // Returns true if a row was actually updated
  return result.changes > 0;
}

/**
 * Example: DELETE with cascade (handled by foreign key constraint)
 */
export function deleteUser(userId: number): boolean {
  const db = getDb();

  const stmt = db.prepare("DELETE FROM users WHERE id = ?");
  const result = stmt.run(userId);

  // Returns true if a row was actually deleted
  // Note: If foreign keys are enabled, related posts will be deleted automatically
  return result.changes > 0;
}
