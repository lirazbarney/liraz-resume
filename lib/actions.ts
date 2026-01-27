"use server";

import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import {
  CreateUserErrors,
  CreateUserResult,
  updateUserResult,
  User,
} from "@/types/user";
import {
  createUser,
  deleteUser,
  getFullUserById,
  getUserById,
  updateUserFromId,
} from "./queries/users";
import {
  isEmailValid,
  isNameValid,
  isPasswordLongEnough,
  isPasswordValid,
} from "./functions";
import { hash } from "bcryptjs";

const USER_ID_COOKIE = "userId";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 1 day

/**
 * This function is used to create a new user in the database.
 * @param prevState - the previous state of the form. not relevant.
 * @param formData - the form data from the user.
 * @returns - the result of the creation of the user.
 *            if successfull, ok property will be true.
 *            if not, ok property will be false and the errors property will be a custom object with the errors.
 */
export async function createUserAction(
  prevState: CreateUserResult,
  formData: FormData,
): Promise<CreateUserResult> {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const errors: CreateUserErrors = {};

  if (!isEmailValid(email)) {
    errors.email = "Invalid email";
  }
  if (!isNameValid(name)) {
    errors.name = "Invalid name";
  }
  if (!isPasswordValid(password)) {
    errors.password = "Invalid password";
  }
  if (!isPasswordLongEnough(password)) {
    errors.password = "Password must be at least 8 characters long";
  }
  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }
  const hashedPassword = await hash(password.trim(), 12);
  const result = await createUser(email.trim(), name.trim(), hashedPassword);
  if (result.ok && result.id != null) {
    const store = await cookies();
    store.set(USER_ID_COOKIE, String(result.id), {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
    });
  }
  return result;
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * This function is used to get the current user data by the id from the cookie.
 * @returns the current user data object or redirect to the closest not-found page.
 */
export async function getCurrentUserById() {
  //get the user id from the cookie
  const store = await cookies();
  const value = store.get(USER_ID_COOKIE)?.value;
  if (!value) return null;
  const id = parseInt(value, 10);
  const userId = Number.isNaN(id) ? null : id;
  if (userId == null) {
    notFound();
  }
  const user = await getUserById(userId);
  if (!user) {
    notFound();
  }
  return user;
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * Clears the user cookie and redirects to home.
 * Use as a form action or call from a "Log out" button (e.g. form action={logoutAction} or startTransition(() => logoutAction())).
 */
export async function logoutAction(): Promise<never> {
  const store = await cookies();
  store.delete(USER_ID_COOKIE);
  // await clearUserCookie();
  redirect("/");
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * This function is used to delete a user by the id.
 * @param id - the id of the user to delete.
 * @param path - the path to redirect to after deleting the user.
 * @returns - redirects to the path if the user is deleted successfully, otherwise it will log an error.
 */
export async function deleteUserAction(id: number, path: string) {
  const result = await deleteUser(id);
  if (result) {
    redirect(path);
  } else {
    console.error("Failed to delete user");
  }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export async function updateProfileAction(
  _state: updateUserResult,
  formData: FormData,
): Promise<updateUserResult> {
  const store = await cookies();
  const value = store.get(USER_ID_COOKIE)?.value;
  if (!value) return { ok: false, errors: { general: "Not authenticated" } };
  const id = parseInt(value, 10);
  const userId = Number.isNaN(id) ? null : id;
  if (userId == null)
    return { ok: false, errors: { general: "Invalid session" } };
  const prevUser = await getFullUserById(userId);
  if (!prevUser) return { ok: false, errors: { general: "User not found" } };

  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const errors: any = {};

  const updatedUser: User = {
    id: prevUser.id,
    email: "",
    name: "",
    password: "",
    created_at: prevUser.created_at,
  };

  if (email) {
    if (isEmailValid(email)) {
      updatedUser.email = email;
    } else {
      errors.email = "Invalid email";
    }
  } else {
    updatedUser.email = prevUser.email;
  }

  if (name) {
    if (isNameValid(name)) {
      updatedUser.name = name;
    } else {
      errors.name = "Invalid name";
    }
  } else {
    updatedUser.name = prevUser.name;
  }

  if (password) {
    const isValidPassword = isPasswordValid(password);
    const isLongPassword = isPasswordLongEnough(password);

    if (isValidPassword && isLongPassword) {
      const hashedPassword = await hash(password.trim(), 12);
      updatedUser.password = hashedPassword;
    } else {
      if (!isValidPassword) {
        errors.password = "Invalid password";
      } else {
        errors.password = "Password must be at least 8 characters long";
      }
    }
  } else {
    updatedUser.password = prevUser.password;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return await updateUserFromId(
    updatedUser.id,
    updatedUser.email.trim(),
    updatedUser.name.trim(),
    updatedUser.password,
  );
}
