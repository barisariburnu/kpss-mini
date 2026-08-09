import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ProgressBar } from '../components/ProgressBar';
import { SubjectMark } from '../components/SubjectMark';
import { colors, radius, spacing } from '../theme';
import type { ProgressState, StudyCard, Subject } from '../types';

type Props = {
  subject: Subject;
  cards: StudyCard[];
  progress: ProgressState;
  onBack: () => void;
  onStartAll: () => void;
  onStartTopic: (topic: string) => void;
};

type TopicSummary = {
  name: string;
  cards: StudyCard[];
  learnedCount: number;
  reviewCount: number;
};

export function TopicsScreen({
  subject,
  cards,
  progress,
  onBack,
  onStartAll,
  onStartTopic,
}: Props) {
  const subjectCards = cards.filter((card) => card.subjectId === subject.id);
  const topics = [...new Set(subjectCards.map((card) => card.topic))]
    .sort((a, b) => a.localeCompare(b, 'tr'))
    .map<TopicSummary>((name) => {
      const topicCards = subjectCards.filter((card) => card.topic === name);
      return {
        name,
        cards: topicCards,
        learnedCount: topicCards.filter((card) =>
          progress.learnedIds.includes(card.id),
        ).length,
        reviewCount: topicCards.filter((card) =>
          progress.reviewIds.includes(card.id),
        ).length,
      };
    });
  const learnedTotal = subjectCards.filter((card) =>
    progress.learnedIds.includes(card.id),
  ).length;
  const completion =
    subjectCards.length === 0
      ? 0
      : Math.round((learnedTotal / subjectCards.length) * 100);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Derslere dön"
          onPress={onBack}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Ionicons name="arrow-back" size={22} color={colors.ink} />
        </Pressable>
        <Text style={styles.headerTitle}>Konu seç</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.subjectIntro}>
        <SubjectMark subject={subject} size={56} />
        <View style={styles.subjectCopy}>
          <Text style={styles.kicker}>DERS</Text>
          <Text style={styles.title}>{subject.name}</Text>
          <Text style={styles.subtitle}>
            {topics.length} konu · {subjectCards.length} hap bilgi
          </Text>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${subject.name} tüm konuları çalış`}
        onPress={onStartAll}
        style={({ pressed }) => [styles.allCard, pressed && styles.darkPressed]}
      >
        <View style={styles.allTop}>
          <View>
            <Text style={styles.allEyebrow}>TÜM KONULAR</Text>
            <Text style={styles.allTitle}>Karma tekrar</Text>
          </View>
          <View style={styles.percentPill}>
            <Text style={styles.percentText}>%{completion}</Text>
          </View>
        </View>
        <ProgressBar
          value={completion}
          color={colors.accent}
          trackColor="#324756"
          height={7}
        />
        <View style={styles.allFooter}>
          <Text style={styles.allMeta}>
            {learnedTotal}/{subjectCards.length} bilgi öğrenildi
          </Text>
          <Ionicons name="arrow-forward" size={19} color={colors.accent} />
        </View>
      </Pressable>

      <View>
        <Text style={styles.sectionTitle}>Konular</Text>
        <View style={styles.topicList}>
          {topics.map((topic, index) => {
            const topicPercent = Math.round(
              (topic.learnedCount / topic.cards.length) * 100,
            );
            return (
              <Pressable
                key={topic.name}
                accessibilityRole="button"
                accessibilityLabel={`${topic.name}, ${topic.cards.length} kart, yüzde ${topicPercent} tamamlandı`}
                onPress={() => onStartTopic(topic.name)}
                style={({ pressed }) => [
                  styles.topicCard,
                  pressed && styles.topicPressed,
                ]}
              >
                <View
                  style={[
                    styles.topicNumber,
                    { backgroundColor: subject.softColor },
                  ]}
                >
                  <Text style={[styles.topicNumberText, { color: subject.color }]}>
                    {String(index + 1).padStart(2, '0')}
                  </Text>
                </View>
                <View style={styles.topicCopy}>
                  <View style={styles.topicLabels}>
                    <Text style={styles.topicName} numberOfLines={2}>
                      {topic.name}
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={colors.inkMuted}
                    />
                  </View>
                  <Text style={styles.topicMeta}>
                    {topic.cards.length} kart
                    {topic.reviewCount > 0
                      ? ` · ${topic.reviewCount} tekrar bekliyor`
                      : ''}
                  </Text>
                  <View style={styles.topicProgress}>
                    <ProgressBar
                      value={topicPercent}
                      color={subject.color}
                      height={5}
                    />
                  </View>
                </View>
              </Pressable>
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
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxxl,
    gap: spacing.xxl,
  },
  header: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  pressed: { opacity: 0.6 },
  headerTitle: { color: colors.ink, fontSize: 14, fontWeight: '800' },
  headerSpacer: { width: 44 },
  subjectIntro: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  subjectCopy: { flex: 1 },
  kicker: {
    color: colors.accentDark,
    fontSize: 9,
    letterSpacing: 1.5,
    fontWeight: '900',
  },
  title: {
    color: colors.ink,
    fontSize: 27,
    lineHeight: 33,
    fontWeight: '900',
    marginTop: 2,
  },
  subtitle: { color: colors.inkMuted, fontSize: 12, marginTop: 3 },
  allCard: {
    backgroundColor: colors.ink,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  darkPressed: { opacity: 0.86 },
  allTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  allEyebrow: {
    color: '#AEBAC1',
    fontSize: 9,
    letterSpacing: 1.3,
    fontWeight: '900',
  },
  allTitle: { color: colors.white, fontSize: 20, fontWeight: '900', marginTop: 4 },
  percentPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: '#263D4D',
  },
  percentText: { color: colors.accent, fontSize: 12, fontWeight: '900' },
  allFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  allMeta: { color: '#C7D0D5', fontSize: 11 },
  sectionTitle: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: '900',
    marginBottom: spacing.lg,
  },
  topicList: { gap: spacing.md },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  topicPressed: { opacity: 0.7, transform: [{ scale: 0.995 }] },
  topicNumber: {
    width: 46,
    height: 46,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicNumberText: { fontSize: 12, fontWeight: '900' },
  topicCopy: { flex: 1 },
  topicLabels: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  topicName: { flex: 1, color: colors.ink, fontSize: 14, fontWeight: '800' },
  topicMeta: { color: colors.inkMuted, fontSize: 10, marginTop: 4 },
  topicProgress: { marginTop: spacing.sm },
});
