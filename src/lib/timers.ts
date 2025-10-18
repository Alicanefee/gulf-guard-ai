import { differenceInSeconds, addSeconds } from 'date-fns';

/**
 * Start or resume a 1-hour timer stored in sessionStorage for a given key.
 * Returns remaining seconds.
 */
export function ensureBenefitTimer(key: string, now = new Date()): number {
  const storageKey = `benefit-timer-${key}`;
  const raw = sessionStorage.getItem(storageKey);
  if (!raw) {
    const start = now.getTime();
    sessionStorage.setItem(storageKey, String(start));
    return 60 * 60; // full hour
  }
  const start = Number(raw);
  if (Number.isNaN(start)) {
    const s = now.getTime();
    sessionStorage.setItem(storageKey, String(s));
    return 60 * 60;
  }
  const end = addSeconds(new Date(start), 3600);
  const seconds = Math.max(0, differenceInSeconds(end, now));
  return seconds;
}

/**
 * Clear a benefit timer from sessionStorage
 */
export function clearBenefitTimer(key: string) {
  sessionStorage.removeItem(`benefit-timer-${key}`);
}

/**
 * Format seconds to MM:SS
 */
export function formatSecondsMMSS(seconds: number) {
  const mm = Math.floor(seconds / 60);
  const ss = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(mm)}:${pad(ss)}`;
}
