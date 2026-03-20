import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for conditional class names with Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date range for display
 */
export function formatDateRange(start: string, end: string | null): string {
  const startDate = new Date(start);
  const startYear = startDate.getFullYear();

  if (end === null) {
    return `${startYear} - Present`;
  }

  const endDate = new Date(end);
  const endYear = endDate.getFullYear();

  return `${startYear} - ${endYear}`;
}

/**
 * Calculate duration between two dates
 */
export function calculateDuration(start: string, end: string | null): string {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();

  const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
  }

  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? "s" : ""}`;
  }

  return `${years} year${years !== 1 ? "s" : ""}, ${remainingMonths} month${
    remainingMonths !== 1 ? "s" : ""
  }`;
}

/**
 * Truncate text to a specific length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

/**
 * Parse markdown-style bold (**text**) and return array of text segments
 */
export function parseMarkdownBoldSegments(text: string): Array<{ text: string; isBold: boolean }> {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts
    .filter(part => part.length > 0)
    .map(part => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return { text: part.slice(2, -2), isBold: true };
      }
      return { text: part, isBold: false };
    });
}
