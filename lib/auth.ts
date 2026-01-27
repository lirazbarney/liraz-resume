/**
 * Returns the current user id from the cookie, or null if not logged in.
 * Use this in server components and server actions to know who is signed in.
 */

/**
 * Clears the user cookie (log out).
 * Call this from a Server Action or form action when the user logs out.
 */
export async function clearUserCookie(): Promise<void> {}
