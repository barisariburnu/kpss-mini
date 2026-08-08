import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ProgressBar } from '../components/ProgressBar';
import { subjectById } from '../data/subjects';
import { colors, radius, spacing } from '../theme';
import type { Rating, StudyCard } from '../types';

type Props = {
  cards: StudyCard[];
  title: string;
  savedIds: string[];
  onClose: () => void;
  onRate: (cardId: string, rating: Rating) => void;
  onToggleSaved: (cardId: string) => void;
  onFinish: () => void;
};

export function StudyScreen({
  cards,
  title,
  savedIds,
  onClose,
  onRate,
  onToggleSaved,
  onFinish,
}: Props) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [complete, setComplete] = useState(false);
  const [learnedCount, setLearnedCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const current = cards[index];

  function handleRating(rating: Rating) {
    if (!current) return;
    onRate(current.id, rating);
    if (rating === 'learned') setLearnedCount((count) => count + 1);
    else setReviewCount((count) => count + 1);

    if (index >= cards.length - 1) {
      onFinish();
      setComplete(true);
      return;
    }
    setIndex((value) => value + 1);
    setRevealed(false);
  }

  if (complete || !current) {
    return (
      <View style={styles.completeScreen}>
        <View style={styles.completeMark}>
          <Text style={styles.completeGlyph}>✓</Text>
        </View>
        <Text style={styles.completeEyebrow}>TEKRAR TAMAMLANDI</Text>
        <Text style={styles.completeTitle}>Bugünlük bir adım daha.</Text>
        <Text style={styles.completeBody}>
          {cards.length} kartı bitirdin. İşaretlerin bir sonraki tekrarını daha
          verimli hâle getirecek.
        </Text>
        <View style={styles.completeMetrics}>
          <View style={styles.completeMetric}>
            <Text style={styles.completeValue}>{learnedCount}</Text>
            <Text style={styles.completeLabel}>Öğrenildi</Text>
          </View>
          <View style={styles.completeDivider} />
          <View style={styles.completeMetric}>
            <Text style={[styles.completeValue, { color: colors.amber }]}>
              {reviewCount}
            </Text>
            <Text style={styles.completeLabel}>Tekrara kaldı</Text>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={onClose}
          style={({ pressed }) => [
            styles.doneButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.doneButtonText}>Ana sayfaya dön</Text>
        </Pressable>
      </View>
    );
  }

  const subject = subjectById[current.subjectId];
  const progress = ((index + (revealed ? 0.5 : 0)) / cards.length) * 100;
  const isSaved = savedIds.includes(current.id);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Çalışmayı kapat"
          hitSlop={12}
          onPress={onClose}
          style={({ pressed }) => [
            styles.headerButton,
            pressed && styles.headerPressed,
          ]}
        >
          <Text style={styles.closeGlyph}>×</Text>
        </Pressable>
        <View style={styles.headerCopy}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.counter}>
            {index + 1} / {cards.length}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isSaved ? 'Kaydedilenlerden çıkar' : 'Kartı kaydet'}
          accessibilityState={{ selected: isSaved }}
          hitSlop={12}
          onPress={() => onToggleSaved(current.id)}
          style={({ pressed }) => [
            styles.headerButton,
            pressed && styles.headerPressed,
          ]}
        >
          <Text style={[styles.heartGlyph, isSaved && styles.heartSaved]}>
            {isSaved ? '♥' : '♡'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.progressWrap}>
        <ProgressBar value={progress} color={colors.accent} height={5} />
      </View>

      <ScrollView
        style={styles.cardScroll}
        contentContainerStyle={styles.cardScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <View style={[styles.subjectPill, { backgroundColor: subject.softColor }]}>
              <Text style={[styles.subjectPillText, { color: subject.color }]}>
                {subject.name}
              </Text>
            </View>
            <Text style={styles.topic}>{current.topic}</Text>
          </View>

          <View style={styles.questionBlock}>
            <Text style={styles.questionEyebrow}>KENDİNE SOR</Text>
            <Text style={styles.question}>{current.prompt}</Text>
          </View>

          {revealed ? (
            <View style={styles.answerArea}>
              <View style={styles.divider} />
              <Text style={styles.answerEyebrow}>KISA CEVAP</Text>
              <Text style={styles.answer}>{current.answer}</Text>
              <Text style={styles.detail}>{current.detail}</Text>
              {current.memoryTip ? (
                <View style={styles.tipBox}>
                  <Text style={styles.tipIcon}>✦</Text>
                  <View style={styles.tipCopy}>
                    <Text style={styles.tipLabel}>AKILDA KALSIN</Text>
                    <Text style={styles.tipText}>{current.memoryTip}</Text>
                  </View>
                </View>
              ) : null}
            </View>
          ) : (
            <View style={styles.hiddenHint}>
              <Text style={styles.hiddenHintText}>
                Önce cevabı zihninden geçir, sonra kontrol et.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.actions}>
        {revealed ? (
          <View style={styles.ratingRow}>
            <Pressable
              accessibilityRole="button"
              onPress={() => handleRating('review')}
              style={({ pressed }) => [
                styles.reviewButton,
                pressed && styles.lightPressed,
              ]}
            >
              <Text style={styles.reviewButtonIcon}>↺</Text>
              <View>
                <Text style={styles.reviewButtonText}>Tekrar et</Text>
                <Text style={styles.buttonHint}>Listeye ekle</Text>
              </View>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={() => handleRating('learned')}
              style={({ pressed }) => [
                styles.learnedButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.learnedButtonIcon}>✓</Text>
              <View>
                <Text style={styles.learnedButtonText}>Öğrendim</Text>
                <Text style={styles.learnedButtonHint}>Sıradaki kart</Text>
              </View>
            </Pressable>
          </View>
        ) : (
          <Pressable
            accessibilityRole="button"
            onPress={() => setRevealed(true)}
            style={({ pressed }) => [
              styles.revealButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.revealButtonText}>Cevabı göster</Text>
            <Text style={styles.revealArrow}>↓</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  headerButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  headerPressed: { backgroundColor: colors.muted },
  closeGlyph: { color: colors.ink, fontSize: 29, lineHeight: 31, fontWeight: '300' },
  heartGlyph: { color: colors.inkMuted, fontSize: 25 },
  heartSaved: { color: colors.accent },
  headerCopy: { flex: 1, alignItems: 'center' },
  headerTitle: { color: colors.ink, fontSize: 14, fontWeight: '800' },
  counter: { color: colors.inkMuted, fontSize: 10, marginTop: 2 },
  progressWrap: { paddingHorizontal: spacing.xl },
  cardScroll: { flex: 1 },
  cardScrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
  },
  card: {
    flexGrow: 1,
    minHeight: 440,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xxl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    boxShadow: '0 7px 16px rgba(23, 43, 58, 0.07)',
    elevation: 3,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  subjectPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  subjectPillText: { fontSize: 10, fontWeight: '800' },
  topic: { flex: 1, color: colors.inkMuted, fontSize: 11, fontWeight: '600' },
  questionBlock: { marginTop: spacing.xxxl },
  questionEyebrow: {
    color: colors.accentDark,
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
  },
  question: {
    color: colors.ink,
    fontSize: 25,
    lineHeight: 34,
    letterSpacing: -0.4,
    fontWeight: '800',
    marginTop: spacing.md,
  },
  answerArea: { marginTop: spacing.xxl },
  divider: { height: 1, backgroundColor: colors.line, marginBottom: spacing.xxl },
  answerEyebrow: {
    color: colors.teal,
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '900',
  },
  answer: {
    color: colors.ink,
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '800',
    marginTop: spacing.sm,
  },
  detail: {
    color: colors.inkMuted,
    fontSize: 14,
    lineHeight: 22,
    marginTop: spacing.md,
  },
  tipBox: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.amberSoft,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.xl,
  },
  tipIcon: { color: colors.amber, fontSize: 18 },
  tipCopy: { flex: 1 },
  tipLabel: {
    color: '#926415',
    fontSize: 9,
    letterSpacing: 1.1,
    fontWeight: '900',
  },
  tipText: { color: colors.ink, fontSize: 13, lineHeight: 18, marginTop: 3 },
  hiddenHint: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: spacing.xxxl,
  },
  hiddenHintText: {
    color: colors.inkMuted,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
  actions: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },
  revealButton: {
    minHeight: 58,
    borderRadius: radius.md,
    backgroundColor: colors.ink,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
  },
  revealButtonText: { color: colors.white, fontSize: 15, fontWeight: '800' },
  revealArrow: { color: colors.accent, fontSize: 20 },
  ratingRow: { flexDirection: 'row', gap: spacing.md },
  reviewButton: {
    flex: 1,
    minHeight: 62,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  reviewButtonIcon: { color: colors.amber, fontSize: 22, fontWeight: '700' },
  reviewButtonText: { color: colors.ink, fontSize: 13, fontWeight: '800' },
  buttonHint: { color: colors.inkMuted, fontSize: 9, marginTop: 2 },
  learnedButton: {
    flex: 1,
    minHeight: 62,
    borderRadius: radius.md,
    backgroundColor: colors.teal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  learnedButtonIcon: { color: colors.white, fontSize: 20, fontWeight: '800' },
  learnedButtonText: { color: colors.white, fontSize: 13, fontWeight: '800' },
  learnedButtonHint: { color: '#CBE2DD', fontSize: 9, marginTop: 2 },
  buttonPressed: { opacity: 0.82 },
  lightPressed: { backgroundColor: colors.muted },
  completeScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xxxl,
  },
  completeMark: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: colors.tealSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeGlyph: { color: colors.teal, fontSize: 39, fontWeight: '700' },
  completeEyebrow: {
    color: colors.teal,
    fontSize: 10,
    letterSpacing: 1.6,
    fontWeight: '900',
    marginTop: spacing.xxl,
  },
  completeTitle: {
    color: colors.ink,
    fontSize: 25,
    lineHeight: 32,
    textAlign: 'center',
    fontWeight: '900',
    marginTop: spacing.sm,
  },
  completeBody: {
    color: colors.inkMuted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  completeMetrics: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingVertical: spacing.xl,
    marginTop: spacing.xxl,
  },
  completeMetric: { flex: 1, alignItems: 'center' },
  completeDivider: { width: 1, backgroundColor: colors.line },
  completeValue: { color: colors.teal, fontSize: 25, fontWeight: '900' },
  completeLabel: { color: colors.inkMuted, fontSize: 11, marginTop: 4 },
  doneButton: {
    width: '100%',
    minHeight: 56,
    borderRadius: radius.md,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  doneButtonText: { color: colors.white, fontSize: 14, fontWeight: '800' },
});
