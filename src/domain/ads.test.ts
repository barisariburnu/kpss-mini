import { describe, expect, it } from 'vitest';

import {
  INTERSTITIAL_MIN_INTERVAL_MS,
  shouldShowInterstitial,
} from './ads';

describe('interstitial frequency policy', () => {
  const nowMs = Date.UTC(2026, 7, 11, 12);

  it('keeps the first two completed sessions ad-free', () => {
    expect(
      shouldShowInterstitial({ completedSessions: 2, lastShownAtMs: null, nowMs }),
    ).toBe(false);
  });

  it('allows a natural break after every third completed session', () => {
    expect(
      shouldShowInterstitial({ completedSessions: 3, lastShownAtMs: null, nowMs }),
    ).toBe(true);
    expect(
      shouldShowInterstitial({ completedSessions: 4, lastShownAtMs: null, nowMs }),
    ).toBe(false);
  });

  it('enforces a twelve-hour minimum interval', () => {
    expect(
      shouldShowInterstitial({
        completedSessions: 6,
        lastShownAtMs: nowMs - INTERSTITIAL_MIN_INTERVAL_MS + 1,
        nowMs,
      }),
    ).toBe(false);
    expect(
      shouldShowInterstitial({
        completedSessions: 6,
        lastShownAtMs: nowMs - INTERSTITIAL_MIN_INTERVAL_MS,
        nowMs,
      }),
    ).toBe(true);
  });
});
