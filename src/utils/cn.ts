/** Minimal class-name joiner. Keeps the bundle free of a utility dependency. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
