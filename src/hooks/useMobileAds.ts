import { useCallback, useEffect, useRef, useState } from 'react';
import mobileAds, {
  AdsConsent,
  AdsConsentPrivacyOptionsRequirementStatus,
  MaxAdContentRating,
  useInterstitialAd,
} from 'react-native-google-mobile-ads';

import { ADMOB_INTERSTITIAL_UNIT_ID } from '../config/ads';
import {
  loadLastInterstitialShownAt,
  persistInterstitialShownAt,
} from '../database/repository';
import { shouldShowInterstitial } from '../domain/ads';

type MobileAdsState = {
  isReady: boolean;
  canOpenPrivacyOptions: boolean;
  openPrivacyOptions: () => Promise<void>;
  showInterstitialAtNaturalBreak: (
    completedSessions: number,
    onClosed: () => void,
  ) => Promise<boolean>;
};

export function useMobileAds(): MobileAdsState {
  const [isReady, setIsReady] = useState(false);
  const [canOpenPrivacyOptions, setCanOpenPrivacyOptions] = useState(false);
  const lastInterstitialAtRef = useRef<number | null>(null);
  const closeContinuationRef = useRef<(() => void) | null>(null);
  const interstitial = useInterstitialAd(
    isReady ? ADMOB_INTERSTITIAL_UNIT_ID : null,
    { requestNonPersonalizedAdsOnly: true },
  );
  const {
    error: interstitialError,
    isClosed: isInterstitialClosed,
    isLoaded: isInterstitialLoaded,
    isShowing: isInterstitialShowing,
    load: loadInterstitial,
    show: showInterstitial,
  } = interstitial;

  const refreshPrivacyOptions = useCallback(async () => {
    const consentInfo = await AdsConsent.getConsentInfo();
    setCanOpenPrivacyOptions(
      consentInfo.privacyOptionsRequirementStatus ===
        AdsConsentPrivacyOptionsRequirementStatus.REQUIRED,
    );
    return consentInfo;
  }, []);

  useEffect(() => {
    let active = true;

    async function initializeAds() {
      try {
        await AdsConsent.gatherConsent({ tagForUnderAgeOfConsent: false });
      } catch {
        // UMP uses the last valid consent state when a refresh is unavailable.
      }

      try {
        const consentInfo = await refreshPrivacyOptions();
        if (!consentInfo.canRequestAds) return;

        await mobileAds().setRequestConfiguration({
          maxAdContentRating: MaxAdContentRating.PG,
          tagForChildDirectedTreatment: false,
          tagForUnderAgeOfConsent: false,
          testDeviceIdentifiers: __DEV__ ? ['EMULATOR'] : [],
        });
        await mobileAds().initialize();
        lastInterstitialAtRef.current = await loadLastInterstitialShownAt();
        if (active) setIsReady(true);
      } catch {
        if (active) setIsReady(false);
      }
    }

    void initializeAds();
    return () => {
      active = false;
    };
  }, [refreshPrivacyOptions]);

  useEffect(() => {
    if (
      isReady &&
      !interstitialError &&
      !isInterstitialLoaded &&
      !isInterstitialShowing
    ) {
      loadInterstitial();
    }
  }, [
    isInterstitialLoaded,
    isInterstitialShowing,
    isReady,
    interstitialError,
    loadInterstitial,
  ]);

  useEffect(() => {
    if (!isInterstitialClosed) return;
    const continueAfterAd = closeContinuationRef.current;
    closeContinuationRef.current = null;
    continueAfterAd?.();
    loadInterstitial();
  }, [isInterstitialClosed, loadInterstitial]);

  useEffect(() => {
    if (!interstitialError || !closeContinuationRef.current) return;
    const continueWithoutAd = closeContinuationRef.current;
    closeContinuationRef.current = null;
    continueWithoutAd();
  }, [interstitialError]);

  const openPrivacyOptions = useCallback(async () => {
    await AdsConsent.showPrivacyOptionsForm();
    await refreshPrivacyOptions();
  }, [refreshPrivacyOptions]);

  const showInterstitialAtNaturalBreak = useCallback(
    async (completedSessions: number, onClosed: () => void) => {
      // A rapid second tap must keep waiting for the already requested ad instead
      // of closing the screen or attempting to show the same ad twice.
      if (closeContinuationRef.current) return true;

      const nowMs = Date.now();
      if (
        !isReady ||
        !isInterstitialLoaded ||
        !shouldShowInterstitial({
          completedSessions,
          lastShownAtMs: lastInterstitialAtRef.current,
          nowMs,
        })
      ) {
        return false;
      }

      lastInterstitialAtRef.current = nowMs;
      closeContinuationRef.current = onClosed;
      try {
        await persistInterstitialShownAt(nowMs);
        showInterstitial();
        return true;
      } catch {
        closeContinuationRef.current = null;
        return false;
      }
    },
    [isInterstitialLoaded, isReady, showInterstitial],
  );

  return {
    isReady,
    canOpenPrivacyOptions,
    openPrivacyOptions,
    showInterstitialAtNaturalBreak,
  };
}
