import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ProgressBar } from '../components/ProgressBar';
import { SubjectMark } from '../components/SubjectMark';
import { studyCards } from '../data/cards';
import { subjects } from '../data/subjects';
import { DAILY_GOAL, subjectCompletion } from '../domain/progress';
import { colors, radius, spacing } from '../theme';
import type { ProgressState } from '../types';

type Props = { progress: ProgressState };

export function ProgressScreen({ progress }: Props) {
  const total = studyCards.length;
  const learned = progress.learnedIds.length;
  const overall = total === 0 ? 0 : Math.round((learned / total) * 100);
  const daily = Math.min(progress.daily.studiedIds.length, DAILY_GOAL);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Text style={styles.kicker}>GELİŞİMİN</Text>
        <Text style={styles.title}>İlerleme</Text>
        <Text style={styles.subtitle}>Küçük tekrarların birikimini takip et.</Text>
      </View>

      <View style={styles.overallCard}>
        <View style={styles.overallTop}>
          <View>
            <Text style={styles.overallLabel}>GENEL TAMAMLAMA</Text>
            <Text style={styles.overallTitle}>{learned} bilgi öğrenildi</Text>
          </View>
          <Text style={styles.overallPercent}>%{overall}</Text>
        </View>
        <ProgressBar
          value={overall}
          color={colors.accent}
          trackColor="#324756"
          height={8}
        />
        <Text style={styles.overallBody}>
          Toplam {total} kartın {total - learned} tanesi sırada.
        </Text>
      </View>

      <View style={styles.metricRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{daily}</Text>
          <Text style={styles.metricLabel}>Bugün çalışılan</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={[styles.metricValue, { color: colors.amber }]}>
            {progress.reviewIds.length}
          </Text>
          <Text style={styles.metricLabel}>Tekrar bekleyen</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={[styles.metricValue, { color: colors.teal }]}>
            {progress.completedSessions}
          </Text>
          <Text style={styles.metricLabel}>Tamamlanan tur</Text>
        </View>
      </View>

      <View>
        <Text style={styles.sectionTitle}>Derslere göre</Text>
        <View style={styles.subjectList}>
          {subjects.map((subject) => {
            const completion = subjectCompletion(
              studyCards,
              progress.learnedIds,
              subject.id,
            );
            const learnedCount = studyCards.filter(
              (card) =>
                card.subjectId === subject.id &&
                progress.learnedIds.includes(card.id),
            ).length;
            const subjectTotal = studyCards.filter(
              (card) => card.subjectId === subject.id,
            ).length;
            return (
              <View key={subject.id} style={styles.subjectRow}>
                <SubjectMark subject={subject} size={40} />
                <View style={styles.subjectCopy}>
                  <View style={styles.subjectLabels}>
                    <Text style={styles.subjectName}>{subject.name}</Text>
                    <Text style={styles.subjectCount}>
                      {learnedCount}/{subjectTotal}
                    </Text>
                  </View>
                  <ProgressBar
                    value={completion}
                    color={subject.color}
                    height={6}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </View>
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
  subtitle: { color: colors.inkMuted, fontSize: 13, marginTop: spacing.sm },
  overallCard: {
    backgroundColor: colors.ink,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  overallTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  overallLabel: {
    color: '#AEBAC1',
    fontSize: 9,
    letterSpacing: 1.3,
    fontWeight: '800',
  },
  overallTitle: {
    color: colors.white,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '800',
    marginTop: 5,
  },
  overallPercent: {
    color: colors.accent,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '900',
  },
  overallBody: { color: '#C7D0D5', fontSize: 12 },
  metricRow: { flexDirection: 'row', gap: spacing.sm },
  metricCard: {
    flex: 1,
    minHeight: 102,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  metricValue: { color: colors.accentDark, fontSize: 25, fontWeight: '900' },
  metricLabel: {
    color: colors.inkMuted,
    fontSize: 10,
    lineHeight: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: '800',
    marginBottom: spacing.lg,
  },
  subjectList: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  subjectRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  subjectCopy: { flex: 1, gap: spacing.sm },
  subjectLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectName: { color: colors.ink, fontSize: 13, fontWeight: '700' },
  subjectCount: { color: colors.inkMuted, fontSize: 11, fontWeight: '700' },
});
