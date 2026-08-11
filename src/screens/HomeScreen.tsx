import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AdBanner } from '../components/AdBanner';
import { ProgressBar } from '../components/ProgressBar';
import { SubjectMark } from '../components/SubjectMark';
import { DAILY_GOAL, subjectCompletion } from '../domain/progress';
import { colors, radius, spacing } from '../theme';
import type {
  ProgressState,
  StudyCard,
  Subject,
  SubjectId,
} from '../types';

type Props = {
  subjects: Subject[];
  cards: StudyCard[];
  progress: ProgressState;
  onStartDaily: () => void;
  onStartSubject: (subjectId: SubjectId) => void;
  adsReady: boolean;
  canOpenAdPrivacy: boolean;
  onOpenAdPrivacy: () => Promise<void>;
};

export function HomeScreen({
  subjects,
  cards,
  progress,
  onStartDaily,
  onStartSubject,
  adsReady,
  canOpenAdPrivacy,
  onOpenAdPrivacy,
}: Props) {
  const dailyCount = progress.daily.studiedIds.length;
  const dailyPercent = Math.min(100, Math.round((dailyCount / DAILY_GOAL) * 100));
  const reviewCount = progress.reviewIds.length;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.kicker}>KPSS MINI</Text>
          <Text style={styles.title}>Bugün biraz daha yakın.</Text>
        </View>
      </View>

      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <View style={styles.ring}>
            <View style={styles.ringContent}>
              <Text style={styles.ringValue}>{dailyCount}</Text>
              <Text style={styles.ringGoal}>/{DAILY_GOAL}</Text>
            </View>
          </View>
          <View style={styles.heroCopy}>
            <Text style={styles.heroEyebrow}>BUGÜNKÜ HEDEF</Text>
            <Text style={styles.heroTitle}>
              {dailyCount >= DAILY_GOAL
                ? 'Hedef tamam, harika.'
                : `${DAILY_GOAL - dailyCount} kart daha`}
            </Text>
            <Text style={styles.heroBody}>
              {reviewCount > 0
                ? `${reviewCount} kart tekrar için seni bekliyor.`
                : 'Kısa bir tekrar, bilgiyi taze tutar.'}
            </Text>
          </View>
        </View>
        <ProgressBar
          value={dailyPercent}
          color={colors.white}
          trackColor="rgba(255,255,255,0.25)"
          height={6}
        />
        <Pressable
          accessibilityRole="button"
          onPress={onStartDaily}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.primaryButtonText}>
            {reviewCount > 0 ? 'Tekrara başla' : 'Bugünün kartlarına başla'}
          </Text>
          <Ionicons name="arrow-forward" size={20} color={colors.white} />
        </Pressable>
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Dersler</Text>
          <Text style={styles.sectionBody}>Bir ders seç, kaldığın yerden sürdür.</Text>
        </View>
      </View>

      <View style={styles.subjectGrid}>
        {subjects.map((subject) => {
          const completion = subjectCompletion(
            cards,
            progress.learnedIds,
            subject.id,
          );
          const cardCount = cards.filter(
            (card) => card.subjectId === subject.id,
          ).length;
          return (
            <Pressable
              key={subject.id}
              accessibilityRole="button"
              accessibilityLabel={`${subject.name}, yüzde ${completion} tamamlandı`}
              onPress={() => onStartSubject(subject.id)}
              style={({ pressed }) => [
                styles.subjectCard,
                pressed && styles.cardPressed,
              ]}
            >
              <View style={styles.subjectCardTop}>
                <SubjectMark subject={subject} />
                <Ionicons name="chevron-forward" size={17} color="#A9B0B4" />
              </View>
              <Text style={styles.subjectName}>{subject.name}</Text>
              <Text style={styles.subjectMeta}>{cardCount} hap bilgi</Text>
              <View style={styles.subjectProgressRow}>
                <View style={styles.subjectProgressBar}>
                  <ProgressBar value={completion} color={subject.color} height={5} />
                </View>
                <Text style={[styles.subjectPercent, { color: subject.color }]}>
                  %{completion}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <AdBanner isReady={adsReady} />

      <View style={styles.disclaimerBox}>
        <Ionicons name="information-circle-outline" size={18} color={colors.inkMuted} />
        <View style={styles.disclaimerCopy}>
          <Text style={styles.disclaimer}>
            gearapps tarafından geliştirilen bağımsız bir çalışma aracıdır. ÖSYM’yi
            veya başka bir kamu kurumunu temsil etmez.
          </Text>
          <Pressable
            accessibilityRole="link"
            accessibilityLabel="ÖSYM resmî internet sitesini aç"
            onPress={() => void Linking.openURL('https://www.osym.gov.tr/')}
            style={({ pressed }) => pressed && styles.officialLinkPressed}
          >
            <Text style={styles.officialLink}>Resmî sınav bilgileri: osym.gov.tr</Text>
          </Pressable>
          {canOpenAdPrivacy ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Reklam gizlilik tercihlerini aç"
              onPress={() => void onOpenAdPrivacy()}
              style={({ pressed }) => pressed && styles.officialLinkPressed}
            >
              <Text style={styles.privacyLink}>Reklam gizlilik tercihleri</Text>
            </Pressable>
          ) : null}
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
    gap: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  headerCopy: { flex: 1, minWidth: 0 },
  kicker: {
    color: colors.accentDark,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1.8,
    fontWeight: '800',
  },
  title: {
    color: colors.ink,
    fontSize: 23,
    lineHeight: 29,
    letterSpacing: -0.6,
    fontWeight: '800',
    marginTop: 2,
  },
  hero: {
    backgroundColor: colors.ink,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
    boxShadow: '0 8px 18px rgba(23, 43, 58, 0.14)',
    elevation: 5,
  },
  heroTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  ring: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 6,
    borderColor: colors.accent,
    backgroundColor: '#203747',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  ringValue: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 23,
    lineHeight: 28,
  },
  ringGoal: {
    color: '#B7C1C7',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 18,
  },
  heroCopy: { flex: 1 },
  heroEyebrow: {
    color: '#AEBAC1',
    fontSize: 10,
    letterSpacing: 1.4,
    fontWeight: '800',
  },
  heroTitle: {
    color: colors.white,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '800',
    marginTop: 4,
  },
  heroBody: {
    color: '#C7D0D5',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 3,
  },
  primaryButton: {
    minHeight: 50,
    borderRadius: radius.md,
    backgroundColor: colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  primaryButtonText: { color: colors.white, fontSize: 14, fontWeight: '800' },
  buttonPressed: { backgroundColor: colors.accentDark },
  sectionHeader: { marginTop: spacing.xs },
  sectionTitle: { color: colors.ink, fontSize: 20, fontWeight: '800' },
  sectionBody: { color: colors.inkMuted, fontSize: 12, marginTop: 3 },
  subjectGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.md,
  },
  subjectCard: {
    width: '48.2%',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
    minHeight: 185,
  },
  cardPressed: { opacity: 0.72, transform: [{ scale: 0.99 }] },
  subjectCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  subjectName: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '800',
    marginTop: spacing.md,
  },
  subjectMeta: { color: colors.inkMuted, fontSize: 11, marginTop: 3 },
  subjectProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  subjectProgressBar: { flex: 1 },
  subjectPercent: { fontSize: 10, fontWeight: '800' },
  disclaimerBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: colors.muted,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  disclaimerCopy: { flex: 1 },
  disclaimer: {
    color: colors.inkMuted,
    fontSize: 10,
    lineHeight: 15,
  },
  officialLink: {
    color: colors.accentDark,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '800',
    marginTop: spacing.xs,
  },
  officialLinkPressed: { opacity: 0.65 },
  privacyLink: {
    color: colors.inkMuted,
    fontSize: 10,
    lineHeight: 15,
    fontWeight: '700',
    textDecorationLine: 'underline',
    marginTop: spacing.xs,
  },
});
