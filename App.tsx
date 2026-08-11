import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { BottomNav, type TabId } from './src/components/BottomNav';
import { buildStudyQueue } from './src/domain/progress';
import { useAppData } from './src/hooks/useAppData';
import { HomeScreen } from './src/screens/HomeScreen';
import { ProgressScreen } from './src/screens/ProgressScreen';
import { SavedScreen } from './src/screens/SavedScreen';
import { StudyScreen } from './src/screens/StudyScreen';
import { TopicsScreen } from './src/screens/TopicsScreen';
import { colors, radius, spacing } from './src/theme';
import type { StudyCard, SubjectId } from './src/types';

type Session = {
  cards: StudyCard[];
  title: string;
  returnTab: TabId;
  returnSubjectId?: SubjectId;
};

function KpssApp() {
  const {
    subjects,
    cards,
    progress,
    isReady,
    error,
    reload,
    clearError,
    rate,
    save,
    finishSession,
  } = useAppData();
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [session, setSession] = useState<Session | null>(null);
  const [topicSubjectId, setTopicSubjectId] = useState<SubjectId | null>(null);

  function startCards(
    sessionCards: StudyCard[],
    title: string,
    returnTab: TabId,
    returnSubjectId?: SubjectId,
  ) {
    if (sessionCards.length === 0) return;
    setSession({ cards: sessionCards, title, returnTab, returnSubjectId });
  }

  function startDaily() {
    const queue = buildStudyQueue(cards, progress).slice(0, 10);
    startCards(queue, 'Günlük tekrar', 'home');
  }

  function openSubject(subjectId: SubjectId) {
    setTopicSubjectId(subjectId);
  }

  function startSubject(subjectId: SubjectId, topic?: string) {
    const subject = subjects.find((item) => item.id === subjectId);
    if (!subject) return;
    const subjectCards = cards.filter(
      (card) =>
        card.subjectId === subjectId && (!topic || card.topic === topic),
    );
    const queue = buildStudyQueue(subjectCards, progress);
    startCards(queue, topic ?? subject.name, 'home', subjectId);
  }

  function closeSession() {
    const returnTab = session?.returnTab ?? 'home';
    const returnSubjectId = session?.returnSubjectId;
    setSession(null);
    setActiveTab(returnTab);
    setTopicSubjectId(returnSubjectId ?? null);
  }

  function changeTab(tab: TabId) {
    setTopicSubjectId(null);
    setActiveTab(tab);
  }

  if (!isReady) {
    return (
      <View style={styles.loading}>
        <View style={styles.loadingMark}>
          <Text style={styles.loadingText}>H</Text>
        </View>
        <ActivityIndicator color={colors.accent} style={styles.spinner} />
      </View>
    );
  }

  if (error && cards.length === 0) {
    return (
      <View style={styles.errorScreen}>
        <View style={styles.errorIcon}>
          <Ionicons name="server-outline" size={30} color={colors.danger} />
        </View>
        <Text style={styles.errorTitle}>Veritabanı açılamadı</Text>
        <Text style={styles.errorBody}>{error}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => void reload()}
          style={({ pressed }) => [
            styles.retryButton,
            pressed && { opacity: 0.75 },
          ]}
        >
          <Text style={styles.retryButtonText}>Tekrar dene</Text>
        </Pressable>
      </View>
    );
  }

  if (session) {
    return (
      <StudyScreen
        cards={session.cards}
        subjects={subjects}
        title={session.title}
        doneLabel={
          session.returnSubjectId ? 'Konulara dön' : 'Çalışmaya dön'
        }
        savedIds={progress.savedIds}
        onClose={closeSession}
        onRate={rate}
        onToggleSaved={save}
        onFinish={finishSession}
      />
    );
  }


  const selectedSubject = subjects.find(
    (subject) => subject.id === topicSubjectId,
  );

  if (selectedSubject) {
    return (
      <TopicsScreen
        subject={selectedSubject}
        cards={cards}
        progress={progress}
        onBack={() => setTopicSubjectId(null)}
        onStartAll={() => startSubject(selectedSubject.id)}
        onStartTopic={(topic) => startSubject(selectedSubject.id, topic)}
      />
    );
  }

  return (
    <View style={styles.app}>
      <View style={styles.screenArea}>
        {activeTab === 'home' ? (
          <HomeScreen
            subjects={subjects}
            cards={cards}
            progress={progress}
            onStartDaily={startDaily}
            onStartSubject={openSubject}
          />
        ) : null}
        {activeTab === 'saved' ? (
          <SavedScreen
            cards={cards}
            subjects={subjects}
            progress={progress}
            onStartCards={(sessionCards, title) =>
              startCards(sessionCards, title, 'saved')
            }
            onToggleSaved={save}
          />
        ) : null}
        {activeTab === 'progress' ? (
          <ProgressScreen
            cards={cards}
            subjects={subjects}
            progress={progress}
          />
        ) : null}
      </View>
      {error ? (
        <View style={styles.errorBanner}>
          <Ionicons name="warning-outline" size={18} color={colors.danger} />
          <Text style={styles.errorBannerText}>{error}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Uyarıyı kapat"
            hitSlop={12}
            onPress={clearError}
          >
            <Ionicons name="close" size={20} color={colors.inkMuted} />
          </Pressable>
        </View>
      ) : null}
      <BottomNav activeTab={activeTab} onChange={changeTab} />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar style="dark" />
        <KpssApp />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  app: { flex: 1, backgroundColor: colors.background },
  screenArea: { flex: 1 },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  loadingMark: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: { color: colors.accent, fontSize: 32, fontWeight: '900' },
  spinner: { marginTop: 18 },
  errorScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxxl,
    backgroundColor: colors.background,
  },
  errorIcon: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7E6E2',
  },
  errorTitle: {
    color: colors.ink,
    fontSize: 21,
    fontWeight: '900',
    marginTop: spacing.xl,
  },
  errorBody: {
    color: colors.inkMuted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  retryButton: {
    minWidth: 170,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.ink,
    marginTop: spacing.xl,
  },
  retryButtonText: { color: colors.white, fontSize: 14, fontWeight: '800' },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#F7E6E2',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E7C8C1',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  errorBannerText: {
    flex: 1,
    color: colors.danger,
    fontSize: 11,
    lineHeight: 16,
  },
});
