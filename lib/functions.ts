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
