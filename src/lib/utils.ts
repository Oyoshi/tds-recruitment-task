import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseAmount(value: string): number {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? 0 : Math.max(0, parsedValue);
}

export function formatAmount(value: number): string {
  return value.toFixed(2);
}

export function getCurrentTime() {
  return new Date().toLocaleTimeString();
}
