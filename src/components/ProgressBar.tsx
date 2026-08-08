import { StyleSheet, View } from 'react-native';

import { colors, radius } from '../theme';

type Props = {
  value: number;
  color?: string;
  trackColor?: string;
  height?: number;
};

export function ProgressBar({
  value,
  color = colors.accent,
  trackColor = colors.muted,
  height = 7,
}: Props) {
  const normalized = Math.max(0, Math.min(100, value));
  return (
    <View style={[styles.track, { backgroundColor: trackColor, height }]}>
      <View
        style={[
          styles.fill,
          { backgroundColor: color, width: `${normalized}%` },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.pill,
  },
});
