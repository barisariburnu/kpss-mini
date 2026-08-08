import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import { colors, radius, spacing } from '../theme';

export function SponsorSlot() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.copy}>
        <Text style={styles.eyebrow}>SPONSORLU</Text>
        <Text style={styles.title}>Çalışma akışını bölmeyen reklam alanı</Text>
        <Text style={styles.body}>Yalnızca ana sayfada, sessiz ve sabit.</Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Reklam alanını gizle"
        hitSlop={12}
        onPress={() => setVisible(false)}
        style={({ pressed }) => [styles.close, pressed && { opacity: 0.5 }]}
      >
        <Text style={styles.closeText}>×</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1EFE9',
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  copy: { flex: 1, paddingRight: spacing.md },
  eyebrow: {
    fontSize: 9,
    lineHeight: 12,
    letterSpacing: 1.4,
    fontWeight: '800',
    color: colors.inkMuted,
  },
  title: {
    marginTop: 3,
    color: colors.ink,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  body: {
    marginTop: 2,
    color: colors.inkMuted,
    fontSize: 11,
    lineHeight: 15,
  },
  close: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: { fontSize: 22, lineHeight: 24, color: colors.inkMuted },
});
