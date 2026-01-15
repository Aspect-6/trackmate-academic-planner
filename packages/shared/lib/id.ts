/**
 * Generates a unique identifier string.
 * Combines a random string with the current timestamp.
 * @returns A unique ID string.
 */
export const generateId = (): string => Math.random().toString(36).substring(2, 9) + Date.now().toString(36)
