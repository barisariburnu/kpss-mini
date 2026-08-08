import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '../theme';

export type TabId = 'home' | 'saved' | 'progress';

type Props = {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
};

const tabs: { id: TabId; label: string; glyph: string }[] = [
  { id: 'home', label: 'Ana Sayfa', glyph: '⌂' },
  { id: 'saved', label: 'Kaydedilen', glyph: '♡' },
  { id: 'progress', label: 'İlerleme', glyph: '↗' },
];

export function BottomNav({ activeTab, onChange }: Props) {
  return (
    <View style={styles.container} accessibilityRole="tablist">
      {tabs.map((tab) => {
        const active = tab.id === activeTab;
        return (
          <Pressable
            key={tab.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={tab.label}
            onPress={() => onChange(tab.id)}
            style={({ pressed }) => [styles.item, pressed && styles.pressed]}
          >
            <Text style={[styles.glyph, active && styles.activeText]}>
              {tab.glyph}
            </Text>
            <Text style={[styles.label, active && styles.activeText]}>
              {tab.label}
            </Text>
            {active ? <View style={styles.activeDot} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 72,
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.sm,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    minHeight: 56,
  },
  pressed: { opacity: 0.6 },
  glyph: {
    color: colors.inkMuted,
    fontSize: 22,
    lineHeight: 24,
    fontWeight: '600',
  },
  label: {
    color: colors.inkMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  activeText: { color: colors.accentDark },
  activeDot: {
    position: 'absolute',
    bottom: 0,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accent,
  },
});
