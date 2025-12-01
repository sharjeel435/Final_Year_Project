import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateFailedTrades(total: number, success: number) {
  if (!Number.isFinite(total) || !Number.isFinite(success)) return 0;
  if (total < 0 || success < 0) return 0;
  if (success > total) return 0;
  return Math.max(total - success, 0);
}
