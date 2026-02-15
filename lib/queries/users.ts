"use server";

import { sql } from "@vercel/postgres";
import {
  User,
  UserWithoutPassWord,
  CreateUserResult,
  updateUserResult,
} from "@/types/user";

/**
 * Creates a user in the Vercel Postgres database.
 */
export async function createUser(
  email: string,
  name: string,
  password: string,
): Promise<CreateUserResult> {
  try {
    const result = await sql`
      INSERT INTO users (email, name, password)
      VALUES (${email}, ${name}, ${password})
      RETURNING id
    `;

    const id = result.rows[0].id;
    return { ok: true, id };
  } catch (e: unknown) {
    const err = e as { message?: string; code?: string };
    // Postgres unique constraint violation code
    if (err.code === "23505" || err.message?.includes("duplicate key")) {
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
export async function getUserById(
  id: number,
): Promise<UserWithoutPassWord | null> {
  const result = await sql`
    SELECT id, email, name, created_at
    FROM users
    WHERE id = ${id}
  `;
  return (result.rows[0] as UserWithoutPassWord) || null;
}

/**
 * Gets full user including password.
 */
export async function getFullUserById(id: number): Promise<User | null> {
  const result = await sql`
    SELECT *
    FROM users
    WHERE id = ${id}
  `;
  return (result.rows[0] as User) || null;
}

/**
 * Deletes user by ID.
 */
export async function deleteUser(id: number): Promise<boolean> {
  try {
    await sql`
      DELETE FROM users
      WHERE id = ${id}
    `;
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
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
  try {
    await sql`
      UPDATE users
      SET email = ${email}, name = ${name}, password = ${password}
      WHERE id = ${id}
    `;

    return {
      ok: true,
      errors: undefined,
    };
  } catch (error: unknown) {
    const err = error as { message?: string; code?: string };
    const isNotUnique =
      err.code === "23505" || err.message?.includes("duplicate key");

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
export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await sql`
    SELECT *
    FROM users
    WHERE email = ${email}
  `;
  return (result.rows[0] as User) || null;
}

/**
 * Gets username by ID.
 */
export async function getUserNameById(id: number): Promise<string | null> {
  const result = await sql`
    SELECT name
    FROM users
    WHERE id = ${id}
  `;
  return result.rows[0]?.name || null;
}
