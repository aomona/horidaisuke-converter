export const MIN_PER_HORI = 30;

export function parseHours(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === '') return null;
  const num = Number(trimmed);
  if (!Number.isFinite(num)) return null;
  if (num < 0) return null;
  return Math.min(24, num);
}

export function toMinutes(hours: number): number {
  return Math.round(hours * 60);
}

export function toHori(minutes: number): number {
  return minutes / MIN_PER_HORI;
}

export function splitHori(minutes: number): { full: number; partial: number } {
  const full = Math.floor(minutes / MIN_PER_HORI);
  const partial = (minutes % MIN_PER_HORI) / MIN_PER_HORI;
  return { full, partial };
}

export function formatHori(hori: number): string {
  if (Number.isInteger(hori)) return String(hori);
  const s = hori.toFixed(2);
  if (s.endsWith('.00')) return s.slice(0, -3);
  if (s.endsWith('0')) return s.slice(0, -1);
  return s;
}

export function formatDuration(minutes: number): string {
  if (minutes <= 0) return '0分';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h}時間${m}分`;
  if (h > 0) return `${h}時間`;
  return `${m}分`;
}
