import { camelize } from '@warp-drive/utilities/string';

/**
 * Recursively transforms all object keys from snake_case or kebab-case to camelCase
 * @param value The value to transform (can be object, array, or primitive)
 * @returns The transformed value with camelized keys
 * @example
 * camelCaseKeys({ user_name: 'John', user_age: 30 })
 * // => { userName: 'John', userAge: 30 }
 *
 * camelCaseKeys([{ first_name: 'Jane' }])
 * // => [{ firstName: 'Jane' }]
 */
export default function camelCaseKeys<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(camelCaseKeys) as T;
  }

  // Handle special object types that shouldn't be transformed
  if (value instanceof Date || value instanceof Map || value instanceof Set) {
    return value;
  }

  // Note: typeof null === 'object', so we explicitly check for it
  if (value !== null && typeof value === 'object') {
    const obj: Record<string, unknown> = {};
    Object.keys(value).forEach((k) => {
      obj[camelize(k)] = camelCaseKeys((value as Record<string, unknown>)[k]);
    });
    return obj as T;
  }

  return value;
}

// Named export for convenience
export { camelCaseKeys };
