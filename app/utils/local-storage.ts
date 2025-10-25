/**
 * Generic utility for type-safe localStorage operations
 * @example
 * // String storage
 * const themeStorage = new LocalStorageManager<string>('theme');
 * themeStorage.set('dark');
 * const theme = themeStorage.get(); // 'dark' | null
 *
 * // JSON storage
 * const userStorage = new LocalStorageManager<User>('user', jsonSerializer<User>());
 * userStorage.set({ name: 'John', age: 30 });
 */
export class LocalStorageManager<T = string> {
  constructor(
    private readonly key: string,
    private readonly serializer?: {
      serialize: (value: T) => string;
      deserialize: (value: string) => T;
    }
  ) {}

  /**
   * Save a value to localStorage
   */
  set(value: T): void {
    try {
      const serialized = this.serializer
        ? this.serializer.serialize(value)
        : String(value);
      localStorage.setItem(this.key, serialized);
    } catch (error) {
      console.error(`Failed to save to localStorage (${this.key}):`, error);
    }
  }

  /**
   * Get a value from localStorage
   * @returns The stored value, or null if not found or deserialization fails
   */
  get(): T | null {
    try {
      const value = localStorage.getItem(this.key);
      if (value === null) {
        return null;
      }
      return this.serializer
        ? this.serializer.deserialize(value)
        : (value as T);
    } catch (error) {
      console.error(`Failed to read from localStorage (${this.key}):`, error);
      return null;
    }
  }

  /**
   * Get a value from localStorage with a fallback default
   * @param defaultValue The value to return if the key doesn't exist or retrieval fails
   * @returns The stored value or the default value
   */
  getOrDefault(defaultValue: T): T {
    return this.get() ?? defaultValue;
  }

  /**
   * Remove the value from localStorage
   */
  remove(): void {
    try {
      localStorage.removeItem(this.key);
    } catch (error) {
      console.error(`Failed to remove from localStorage (${this.key}):`, error);
    }
  }

  /**
   * Check if the key exists in localStorage
   */
  has(): boolean {
    return localStorage.getItem(this.key) !== null;
  }

  /**
   * Clear the value (alias for remove)
   */
  clear(): void {
    this.remove();
  }

  /**
   * Clear all localStorage (use with caution)
   */
  static clearAll(): void {
    localStorage.clear();
  }
}

/**
 * JSON serializer for storing complex objects
 * @example
 * const storage = new LocalStorageManager<User>('user', jsonSerializer<User>());
 */
export const jsonSerializer = <T>() => ({
  serialize: (value: T): string => JSON.stringify(value),
  deserialize: (value: string): T => JSON.parse(value) as T,
});

/**
 * Helper to create a string-based storage manager
 */
export function createStringStorage(key: string): LocalStorageManager<string> {
  return new LocalStorageManager<string>(key);
}

/**
 * Helper to create a JSON-based storage manager
 */
export function createJsonStorage<T>(key: string): LocalStorageManager<T> {
  return new LocalStorageManager<T>(key, jsonSerializer<T>());
}
