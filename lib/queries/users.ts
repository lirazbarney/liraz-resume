"use server";
//this file is for the queries related to the users table. all of it's funnctions will recived the data after validations.

import { getDb } from "../db/db";
import {
  User,
  UserWithoutPassWord,
  CreateUserResult,
  updateUserResult,
} from "@/types/user";

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * All of the parameters are being checked in the action file.
 * This function is just for creating the user in the database.
 * @param email - the email of the user
 * @param name - the name of the user
 * @param password - the hashed password of the user
 * @returns true or false based on the success of the operation in the "ok" property.
 *          If true the id of the user will be returned in the "id" property.
 *          If false an error object will be returned with the error message in the "errors" property.
 */
export async function createUser(
  email: string,
  name: string,
  password: string,
): Promise<CreateUserResult> {
  const db = getDb();
  try {
    const result = db
      .prepare("INSERT INTO users (email, name, password) VALUES (?, ?, ?)")
      .run(email, name, password);
    const id = Number(result.lastInsertRowid);
    // const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id) as User;
    // const { password: _, ...newUser } = user;
    // return { ok: true, user: newUser };
    return { ok: true, id };
  } catch (e: unknown) {
    const err = e as { code?: string };
    if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
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
//✅

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * This function is for getting the user by the id.
 * @param id - the id of the user
 * @returns the user object without the password or null if the user is not found.
 */
export async function getUserById(id: number) {
  const db = getDb();
  const row = db.prepare("SELECT * FROM users WHERE id = ?").get(id) as
    | UserWithoutPassWord
    | undefined;
  return row ?? null;
}
//✅

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//TODO - check if correct.
/**
 * Returns the full user including password. Used by server actions that need to update the user.
 */
export async function getFullUserById(id: number): Promise<User | null> {
  const db = getDb();
  const row = db.prepare("SELECT * FROM users WHERE id = ?").get(id) as
    | User
    | undefined;
  return row ?? null;
}
//❌

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export async function deleteUser(id: number) {
  const db = getDb();
  const result = db.prepare("DELETE FROM users WHERE id = ?").run(id);
  return result.changes > 0;
}
//✅

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// TODO
export async function updateUserFromId(
  id: number,
  email: string,
  name: string,
  password: string,
): Promise<updateUserResult> {
  const db = getDb();
  try {
    const result = db
      .prepare(
        "UPDATE users SET email = ?, name = ?, password = ? WHERE id = ?",
      )
      .run(email, name, password, id);
    return {
      ok: result.changes > 0,
      errors:
        result.changes === 0 ? { general: "Failed to update user" } : undefined,
    };
  } catch (error: unknown) {
    const isNotUnique =
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "SQLITE_CONSTRAINT" &&
      "message" in error &&
      typeof (error as any).message === "string" &&
      (error as any).message.includes("email");
    return {
      ok: false,
      errors: isNotUnique
        ? { email: "This email is already in use" }
        : { general: "Failed to update user" },
    };
  }
}
//❌

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 *
 * @param email - the email of the user
 * @returns the user object without the password or null if the user is not found.
 */
export async function getUserByEmail(email: string) {
  const db = getDb();
  const row = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as
    | User
    | undefined;
  return row ?? null;
}
//✅

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export async function getUserNameById(id: number) {
  const db = getDb();
  const row = db.prepare("SELECT name FROM users WHERE id = ?").get(id) as
    | { name: string }
    | undefined;
  return row?.name ?? null;
}
//
