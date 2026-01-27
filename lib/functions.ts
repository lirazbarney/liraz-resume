export function hasNumers(str: string): boolean {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  return digits.some((digit) => str.includes(digit));
}

export function isEmailValid(email: string): boolean {
  return !email || email.trim() === "" || !email.includes("@");
}

export function isNameValid(name: string) {
  return !name || name.trim() === "" || hasNumers(name);
}

export function isPasswordValid(password: string) {
  return !password || password.trim() === "";
}

export function isPasswordLongEnough(password: string) {
  return password.length < 8 || password.trim().length < 8;
}
