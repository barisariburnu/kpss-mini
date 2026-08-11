import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  BannerAd,
  BannerAdSize,
} from 'react-native-google-mobile-ads';

import { ADMOB_BANNER_UNIT_ID } from '../config/ads';
import { colors, radius, spacing } from '../theme';

type Props = {
  isReady: boolean;
};

export function AdBanner({ isReady }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  if (!isReady || hasFailed) return null;

  return (
    <View
      accessibilityLabel="Sponsorlu reklam"
      style={[styles.container, !isLoaded && styles.loading]}
    >
      {isLoaded ? <Text style={styles.label}>REKLAM</Text> : null}
      <BannerAd
        unitId={ADMOB_BANNER_UNIT_ID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        onAdLoaded={() => setIsLoaded(true)}
        onAdFailedToLoad={() => setHasFailed(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 58,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    borderRadius: radius.md,
    paddingTop: spacing.xs,
  },
  loading: { opacity: 0 },
  label: {
    color: colors.inkMuted,
    fontSize: 8,
    lineHeight: 11,
    letterSpacing: 1.2,
    fontWeight: '700',
    marginBottom: 2,
  },
});
