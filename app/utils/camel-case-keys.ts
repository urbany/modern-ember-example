import { camelize } from '@warp-drive/utilities/string';

export default function camelCaseKeys<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(camelCaseKeys) as T;
  }
  if (value !== null && typeof value === 'object') {
    const obj: Record<string, unknown> = {};
    Object.keys(value).forEach((k) => {
      obj[camelize(k)] = camelCaseKeys((value as Record<string, unknown>)[k]);
    });
    return obj as T;
  }
  return value;
}
