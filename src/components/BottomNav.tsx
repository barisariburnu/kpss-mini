import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, spacing } from '../theme';

export type TabId = 'home' | 'saved' | 'progress';

type Props = {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
};

const tabs: {
  id: TabId;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
}[] = [
  { id: 'home', label: 'Ana Sayfa', icon: 'home-outline', activeIcon: 'home' },
  { id: 'saved', label: 'Kaydedilen', icon: 'heart-outline', activeIcon: 'heart' },
  { id: 'progress', label: 'İlerleme', icon: 'stats-chart-outline', activeIcon: 'stats-chart' },
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
            <Ionicons
              name={active ? tab.activeIcon : tab.icon}
              size={21}
              color={active ? colors.accentDark : colors.inkMuted}
            />
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
