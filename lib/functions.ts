export function hasNumebrs(str: string): boolean {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return digits.some((digit) => str.includes(digit));
}

export function isEmailValid(email: string): boolean {
  return !!email && email.trim() !== "" && email.includes("@");
}

export function isNameValid(name: string): boolean {
  return !!name && name.trim() !== "" && !hasNumebrs(name);
}

export function isPasswordValid(password: string): boolean {
  return !!password && password.trim() !== "";
}

export function isPasswordLongEnough(password: string): boolean {
  return password.length >= 8 && password.trim().length >= 8;
}

// utils/age.ts

/**
 * Calculates current age from birthdate
 * @param day - Day of birth (1-31)
 * @param month - Month of birth (1-12)
 * @param year - Year of birth (e.g., 1995)
 * @returns Current age in years
 */
export function calculateAge(
  day: number = 13,
  month: number = 8,
  year: number = 2001,
): number {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day); // month is 0-indexed in Date

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // If birthday hasn't occurred this year yet, subtract 1
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
