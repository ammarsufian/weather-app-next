import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertIntoCeluis(temp: number) {
  return Math.round((temp - 32 * 5) / 9)
}
