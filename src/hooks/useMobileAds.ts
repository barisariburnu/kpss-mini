import { useCallback, useEffect, useState } from 'react';
import mobileAds, {
  AdsConsent,
  AdsConsentPrivacyOptionsRequirementStatus,
  MaxAdContentRating,
} from 'react-native-google-mobile-ads';

type MobileAdsState = {
  isReady: boolean;
  canOpenPrivacyOptions: boolean;
  openPrivacyOptions: () => Promise<void>;
};

export function useMobileAds(): MobileAdsState {
  const [isReady, setIsReady] = useState(false);
  const [canOpenPrivacyOptions, setCanOpenPrivacyOptions] = useState(false);

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

  const openPrivacyOptions = useCallback(async () => {
    await AdsConsent.showPrivacyOptionsForm();
    await refreshPrivacyOptions();
  }, [refreshPrivacyOptions]);

  return { isReady, canOpenPrivacyOptions, openPrivacyOptions };
}

