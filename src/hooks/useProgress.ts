import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

import {
  completeSession,
  createInitialProgress,
  normalizeProgress,
  rateCard,
  toggleSaved,
} from '../domain/progress';
import type { ProgressState, Rating } from '../types';

const STORAGE_KEY = '@kpss-hap-not/progress-v1';

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function parseProgress(value: string): ProgressState | null {
  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== 'object') return null;
    const candidate = parsed as Partial<ProgressState>;
    if (
      !isStringArray(candidate.learnedIds) ||
      !isStringArray(candidate.reviewIds) ||
      !isStringArray(candidate.savedIds) ||
      !candidate.daily ||
      typeof candidate.daily.date !== 'string' ||
      !isStringArray(candidate.daily.studiedIds) ||
      typeof candidate.completedSessions !== 'number'
    ) {
      return null;
    }
    return normalizeProgress(candidate as ProgressState);
  } catch {
    return null;
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(createInitialProgress);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function hydrate() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        const parsed = stored ? parseProgress(stored) : null;
        if (isMounted && parsed) setProgress(parsed);
      } finally {
        if (isMounted) setIsReady(true);
      }
    }
    void hydrate();
    return () => {
      isMounted = false;
    };
  }, []);

  const updateProgress = useCallback(
    (transform: (current: ProgressState) => ProgressState) => {
      setProgress((current) => {
        const next = transform(normalizeProgress(current));
        void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  const rate = useCallback(
    (cardId: string, rating: Rating) => {
      updateProgress((current) => rateCard(current, cardId, rating));
    },
    [updateProgress],
  );

  const save = useCallback(
    (cardId: string) => {
      updateProgress((current) => toggleSaved(current, cardId));
    },
    [updateProgress],
  );

  const finishSession = useCallback(() => {
    updateProgress(completeSession);
  }, [updateProgress]);

  return { progress, isReady, rate, save, finishSession };
}
