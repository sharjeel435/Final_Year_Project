export function validateUsername(username: string) {
  const issues: string[] = [];
  const valid = /^[A-Za-z]+$/.test(username);
  if (!valid) issues.push("Username must contain letters only");
  return { valid, issues };
}

export function validatePassword(password: string) {
  const issues: string[] = [];
  const len = password.length >= 6;
  const upper = /[A-Z]/.test(password);
  const lower = /[a-z]/.test(password);
  const digit = /[0-9]/.test(password);
  const special = /[^A-Za-z0-9]/.test(password);
  if (!len) issues.push("Minimum length of 6 characters");
  if (!upper) issues.push("At least one uppercase letter");
  if (!lower) issues.push("At least one lowercase letter");
  if (!digit) issues.push("At least one number");
  if (!special) issues.push("At least one special symbol");
  return { valid: len && upper && lower && digit && special, issues };
}

export function validateStrongPassword(password: string) {
  const issues: string[] = [];
  const len = password.length >= 8;
  const upper = /[A-Z]/.test(password);
  const lower = /[a-z]/.test(password);
  const digit = /[0-9]/.test(password);
  if (!len) issues.push("Minimum length of 8 characters");
  if (!upper) issues.push("At least one uppercase letter");
  if (!lower) issues.push("At least one lowercase letter");
  if (!digit) issues.push("At least one number");
  return { valid: len && upper && lower && digit, issues };
}

export function validateEmail(email: string) {
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return { valid, issues: valid ? [] : ["Invalid email format"] };
}

export function validateName(name: string) {
  const n = name.trim();
  const valid = n.length >= 2;
  return { valid, issues: valid ? [] : ["Minimum 2 characters"] };
}

export function validateContactNumber(number?: string) {
  if (!number) return { valid: true, issues: [] };
  const valid = /^\+?[0-9\s\-()]{7,}$/.test(number);
  return { valid, issues: valid ? [] : ["Invalid contact number"] };
}
