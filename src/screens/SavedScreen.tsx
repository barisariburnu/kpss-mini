import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { SubjectMark } from '../components/SubjectMark';
import { studyCards } from '../data/cards';
import { subjectById } from '../data/subjects';
import { colors, radius, spacing } from '../theme';
import type { ProgressState, StudyCard } from '../types';

type Props = {
  progress: ProgressState;
  onStartCards: (cards: StudyCard[], title: string) => void;
  onToggleSaved: (cardId: string) => void;
};

export function SavedScreen({
  progress,
  onStartCards,
  onToggleSaved,
}: Props) {
  const savedCards = studyCards.filter((card) =>
    progress.savedIds.includes(card.id),
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Text style={styles.kicker}>KİŞİSEL LİSTE</Text>
        <Text style={styles.title}>Kaydettiklerin</Text>
        <Text style={styles.subtitle}>
          Dönmek istediğin önemli bilgileri burada bulursun.
        </Text>
      </View>

      {savedCards.length > 0 ? (
        <>
          <Pressable
            accessibilityRole="button"
            onPress={() => onStartCards(savedCards, 'Kaydedilenler')}
            style={({ pressed }) => [
              styles.studyButton,
              pressed && styles.pressed,
            ]}
          >
            <View>
              <Text style={styles.studyButtonEyebrow}>HIZLI TEKRAR</Text>
              <Text style={styles.studyButtonText}>
                {savedCards.length} kartı çalış
              </Text>
            </View>
            <Text style={styles.studyButtonArrow}>→</Text>
          </Pressable>

          <View style={styles.list}>
            {savedCards.map((card) => {
              const subject = subjectById[card.subjectId];
              return (
                <View key={card.id} style={styles.card}>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`${subject.name}, ${card.topic}: ${card.prompt}`}
                    onPress={() => onStartCards([card], card.topic)}
                    style={({ pressed }) => [
                      styles.cardMain,
                      pressed && styles.cardPressed,
                    ]}
                  >
                    <SubjectMark subject={subject} size={38} />
                    <View style={styles.cardCopy}>
                      <Text style={[styles.topic, { color: subject.color }]}>
                        {subject.name} · {card.topic}
                      </Text>
                      <Text style={styles.prompt} numberOfLines={2}>
                        {card.prompt}
                      </Text>
                    </View>
                  </Pressable>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Kaydedilenlerden çıkar"
                    hitSlop={12}
                    onPress={() => onToggleSaved(card.id)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeIcon}>♥</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        </>
      ) : (
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Text style={styles.emptyGlyph}>♡</Text>
          </View>
          <Text style={styles.emptyTitle}>Henüz kart kaydetmedin</Text>
          <Text style={styles.emptyBody}>
            Çalışırken kalp simgesine dokunduğun bilgiler burada birikir.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.xxl,
  },
  kicker: {
    color: colors.accentDark,
    fontSize: 10,
    letterSpacing: 1.8,
    fontWeight: '800',
  },
  title: {
    color: colors.ink,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.6,
    fontWeight: '800',
    marginTop: 3,
  },
  subtitle: {
    color: colors.inkMuted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: spacing.sm,
  },
  studyButton: {
    minHeight: 82,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.ink,
  },
  studyButtonEyebrow: {
    color: '#AEBAC1',
    fontSize: 9,
    letterSpacing: 1.4,
    fontWeight: '800',
  },
  studyButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 4,
  },
  studyButtonArrow: { color: colors.accent, fontSize: 26 },
  pressed: { opacity: 0.8 },
  list: { gap: spacing.md },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingRight: spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  cardMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  cardPressed: { opacity: 0.72 },
  cardCopy: { flex: 1 },
  topic: { fontSize: 10, fontWeight: '800', marginBottom: 4 },
  prompt: { color: colors.ink, fontSize: 13, lineHeight: 18, fontWeight: '600' },
  removeButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeIcon: { color: colors.accent, fontSize: 18 },
  empty: {
    minHeight: 350,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  emptyIcon: {
    width: 78,
    height: 78,
    borderRadius: 39,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentSoft,
  },
  emptyGlyph: { color: colors.accentDark, fontSize: 34 },
  emptyTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '800',
    marginTop: spacing.xl,
  },
  emptyBody: {
    color: colors.inkMuted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
