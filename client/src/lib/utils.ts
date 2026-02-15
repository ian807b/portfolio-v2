/**
 * Simple class name concatenation utility.
 * For a portfolio site we don't need the full clsx+twMerge setup.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Format a number with commas (e.g., 1247 -> "1,247")
 */
export function formatNumber(num: number): string {
  return num.toLocaleString("en-US");
}

/**
 * Generate a unique ID for MCP messages
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Debounce a function call
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
