"use server";

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
  getUserByEmail,
  getUserById,
  getUserNameById,
  updateUserFromId,
} from "./queries/users";
import {
  isEmailValid,
  isNameValid,
  isPasswordLongEnough,
  isPasswordValid,
} from "./functions";
import { compare, hash } from "bcryptjs";
import { clearUserCookie, getUserIdFromCookie, setUserCookie } from "./auth";

/**
 * This function is used to create a new user in the database.
 * @param prevState - the previous state of the form. not relevant.
 * @param formData - the form data from the user.
 * @returns - the result of the creation of the user.
 *            if successfull, ok property will be true.
 *            if not, ok property will be false and the errors property will be a custom object with the errors.
 */
export async function createUserAction(
  prevState: CreateUserResult | null,
  formData: FormData,
): Promise<CreateUserResult> {
  console.log("=== SERVER ACTION CALLED ===");
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
    await setUserCookie(result.id);
    redirect("/profile");
  }
  return result;
}
//✅

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * This function is used to get the current user data by the id from the cookie.
 * @returns the current user data object or redirect to the closest not-found page.
 */
export async function getCurrentUserById(isRedirect: boolean) {
  //get the user id from the cookie

  const userId = await getUserIdFromCookie();
  if (userId === null) {
    console.log("testing A");
    if (isRedirect) {
      console.log("testing B");
      notFound();
    }
    console.log("testing C");
    return null;
  }
  console.log("testing D");
  const user = await getUserById(userId);
  if (!user) {
    if (isRedirect) {
      notFound();
    }
    return null;
  }
  return user;
}
//✅

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * Clears the user cookie and redirects to home.
 * Use as a form action or call from a "Log out" button (e.g. form action={logoutAction} or startTransition(() => logoutAction())).
 */
export async function logoutAction(): Promise<never> {
  await clearUserCookie();
  redirect("/");
}
//✅

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
    await clearUserCookie();
    redirect(path);
  } else {
    console.error("Failed to delete user");
  }
}
//✅

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 *
 * @param _state - the previous state of the form. not relevant.
 * @param formData - the form data from the user.
 * @returns the result of the update.
 *            if successfull, ok property will be true.
 *            if not, ok property will be false and the errors property will be a custom object with the errors.
 */
export async function updateProfileAction(
  _state: updateUserResult | null,
  formData: FormData,
): Promise<updateUserResult> {
  const userId = await getUserIdFromCookie();
  if (userId === null) {
    notFound();
  }
  const prevUser = await getFullUserById(userId);
  if (!prevUser) {
    notFound();
  }
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string | null;
  const confirmPassword = formData.get("confirmPassword") as string | null;
  const errors: CreateUserErrors = {};

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
    if (confirmPassword === null) {
      errors.password = "Confirm password is required";
    } else {
      if (password !== confirmPassword) {
        errors.password = "Passwords do not match";
      } else {
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
      }
    }
  } else {
    console.log("=== SERVER ACTION testing 9");
    updatedUser.password = prevUser.password;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const result = await updateUserFromId(
    updatedUser.id,
    updatedUser.email.trim(),
    updatedUser.name.trim(),
    updatedUser.password,
  );
  if (result.ok) {
    redirect("/profile");
  }
  return result;
}
//✅

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 *
 * @param _state - the previous state of the form. not relevant.
 * @param formData - the form data from the user.
 * @returns the result of the login.
 *            if successfull, ok property will be true.
 *            if not, ok property will be false and the errors property will be a custom object with the errors.
 * @returns
 */
export async function loginAction(
  _state: CreateUserResult | null,
  formData: FormData,
): Promise<CreateUserResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const genericErrorMsg = "Invalid email or password";

  if (!email) {
    return { ok: false, errors: { email: "Email is required" } };
  }
  if (!password) {
    return { ok: false, errors: { password: "Password is required" } };
  }
  if (
    !isEmailValid(email) ||
    !isPasswordValid(password) ||
    !isPasswordLongEnough(password)
  ) {
    return { ok: false, errors: { general: genericErrorMsg } };
  }

  const user = await getUserByEmail(email.trim());
  console.log("=== SERVER ACTION user: ", user);
  if (!user) {
    console.log("=== SERVER ACTION testing 1 ");
    return {
      ok: false,
      errors: { general: genericErrorMsg },
    };
  }
  const isSamePassword = await compare(password.trim(), user.password);
  if (!isSamePassword) {
    return {
      ok: false,
      errors: { general: genericErrorMsg },
    };
  }
  await setUserCookie(user.id);
  redirect("/profile");
}
//✅

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export async function getUserNameAction() {
  const userId = await getUserIdFromCookie();
  if (userId === null) {
    return null;
  }
  return await getUserNameById(userId);
}
