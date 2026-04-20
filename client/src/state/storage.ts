export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota exceeded or disabled — silently ignore */
  }
}

export const STORAGE_KEYS = {
  progress: 'hcq:progress:v1',
  answers: 'hcq:answers:v1',
} as const;
