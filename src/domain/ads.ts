export const INTERSTITIAL_SESSION_INTERVAL = 3;
export const INTERSTITIAL_MIN_INTERVAL_MS = 12 * 60 * 60 * 1000;

type InterstitialEligibility = {
  completedSessions: number;
  lastShownAtMs: number | null;
  nowMs?: number;
};

export function shouldShowInterstitial({
  completedSessions,
  lastShownAtMs,
  nowMs = Date.now(),
}: InterstitialEligibility): boolean {
  if (
    completedSessions < INTERSTITIAL_SESSION_INTERVAL ||
    completedSessions % INTERSTITIAL_SESSION_INTERVAL !== 0
  ) {
    return false;
  }

  return (
    lastShownAtMs === null ||
    nowMs - lastShownAtMs >= INTERSTITIAL_MIN_INTERVAL_MS
  );
}
