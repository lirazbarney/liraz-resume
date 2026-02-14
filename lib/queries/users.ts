"use server";

import { getDb } from "../db/db";
import {
  User,
  UserWithoutPassWord,
  CreateUserResult,
  updateUserResult,
} from "@/types/user";

/**
 * Creates a user in the D1 database.
 */
export async function createUser(
  email: string,
  name: string,
  password: string,
): Promise<CreateUserResult> {
  const db = getDb();
  try {
    const result = await db
      .prepare("INSERT INTO users (email, name, password) VALUES (?, ?, ?)")
      .bind(email, name, password)
      .run();

    const id = result.meta.last_row_id;
    return { ok: true, id };
  } catch (e: unknown) {
    const err = e as { message?: string };
    // D1 error messages usually contain the constraint name
    if (err.message?.includes("UNIQUE constraint failed: users.email")) {
      return {
        ok: false,
        errors: {
          email: "Email already in use",
        },
      };
    }
    throw e;
  }
}

/**
 * Gets user by ID without password.
 */
export async function getUserById(id: number) {
  const db = getDb();
  const row = await db
    .prepare("SELECT id, email, name, created_at FROM users WHERE id = ?")
    .bind(id)
    .first<UserWithoutPassWord>();
  return row ?? null;
}

/**
 * Gets full user including password.
 */
export async function getFullUserById(id: number): Promise<User | null> {
  const db = getDb();
  const row = await db
    .prepare("SELECT * FROM users WHERE id = ?")
    .bind(id)
    .first<User>();
  return row ?? null;
}

/**
 * Deletes user by ID.
 */
export async function deleteUser(id: number) {
  const db = getDb();
  const result = await db
    .prepare("DELETE FROM users WHERE id = ?")
    .bind(id)
    .run();
  return result.success;
}

/**
 * Updates user details.
 */
export async function updateUserFromId(
  id: number,
  email: string,
  name: string,
  password: string,
): Promise<updateUserResult> {
  const db = getDb();
  try {
    const result = await db
      .prepare(
        "UPDATE users SET email = ?, name = ?, password = ? WHERE id = ?",
      )
      .bind(email, name, password, id)
      .run();

    return {
      ok: result.success,
      errors: !result.success
        ? { general: "Failed to update user" }
        : undefined,
    };
  } catch (error: unknown) {
    const err = error as { message?: string };
    const isNotUnique = err.message?.includes(
      "UNIQUE constraint failed: users.email",
    );
    return {
      ok: false,
      errors: isNotUnique
        ? { email: "This email is already in use" }
        : { general: "Failed to update user" },
    };
  }
}

/**
 * Gets user by email.
 */
export async function getUserByEmail(email: string) {
  const db = getDb();
  const row = await db
    .prepare("SELECT * FROM users WHERE email = ?")
    .bind(email)
    .first<User>();
  return row ?? null;
}

/**
 * Gets username by ID.
 */
export async function getUserNameById(id: number) {
  const db = getDb();
  const row = await db
    .prepare("SELECT name FROM users WHERE id = ?")
    .bind(id)
    .first<{ name: string }>();
  return row?.name ?? null;
}
