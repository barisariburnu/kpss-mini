import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { BottomNav, type TabId } from './src/components/BottomNav';
import { studyCards } from './src/data/cards';
import { subjectById } from './src/data/subjects';
import { buildStudyQueue } from './src/domain/progress';
import { useProgress } from './src/hooks/useProgress';
import { HomeScreen } from './src/screens/HomeScreen';
import { ProgressScreen } from './src/screens/ProgressScreen';
import { SavedScreen } from './src/screens/SavedScreen';
import { StudyScreen } from './src/screens/StudyScreen';
import { colors } from './src/theme';
import type { StudyCard, SubjectId } from './src/types';

type Session = {
  cards: StudyCard[];
  title: string;
};

function KpssApp() {
  const { progress, isReady, rate, save, finishSession } = useProgress();
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [session, setSession] = useState<Session | null>(null);

  function startCards(cards: StudyCard[], title: string) {
    if (cards.length === 0) return;
    setSession({ cards, title });
  }

  function startDaily() {
    const queue = buildStudyQueue(studyCards, progress).slice(0, 10);
    startCards(queue, 'Günlük tekrar');
  }

  function startSubject(subjectId: SubjectId) {
    const queue = buildStudyQueue(studyCards, progress, subjectId);
    startCards(queue, subjectById[subjectId].name);
  }

  function closeSession() {
    setSession(null);
    setActiveTab('home');
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

  if (session) {
    return (
      <StudyScreen
        cards={session.cards}
        title={session.title}
        savedIds={progress.savedIds}
        onClose={closeSession}
        onRate={rate}
        onToggleSaved={save}
        onFinish={finishSession}
      />
    );
  }

  return (
    <View style={styles.app}>
      <View style={styles.screenArea}>
        {activeTab === 'home' ? (
          <HomeScreen
            progress={progress}
            onStartDaily={startDaily}
            onStartSubject={startSubject}
          />
        ) : null}
        {activeTab === 'saved' ? (
          <SavedScreen
            progress={progress}
            onStartCards={startCards}
            onToggleSaved={save}
          />
        ) : null}
        {activeTab === 'progress' ? (
          <ProgressScreen progress={progress} />
        ) : null}
      </View>
      <BottomNav activeTab={activeTab} onChange={setActiveTab} />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
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
});
