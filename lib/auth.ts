"use server";

import { cookies } from "next/headers";

const USER_ID_COOKIE = "user_id"; // Adjust if your constant name is different
const COOKIE_MAX_AGE = 60 * 60 * 24; // 7 days (adjust as needed)

/**
 * Creates a user authentication cookie
 * @param userId - The user ID to store in the cookie
 */
export async function setUserCookie(userId: number): Promise<void> {
  const store = await cookies();
  store.set(USER_ID_COOKIE, String(userId), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
  });
}

/**
 * Removes the user authentication cookie
 */
export async function clearUserCookie(): Promise<void> {
  const store = await cookies();
  store.delete(USER_ID_COOKIE);
}

/**
 * Gets the current user ID from the cookie
 * @returns The user ID or null if not authenticated
 */
export async function getUserIdFromCookie(): Promise<number | null> {
  const store = await cookies();
  const userIdCookie = store.get(USER_ID_COOKIE);

  if (!userIdCookie?.value) {
    return null;
  }

  const userId = parseInt(userIdCookie.value, 10);
  return isNaN(userId) ? null : userId;
}
