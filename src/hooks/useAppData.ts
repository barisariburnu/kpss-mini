import { useCallback, useEffect, useRef, useState } from 'react';

import {
  loadCards,
  loadProgress,
  loadSubjects,
  persistCompletedSession,
  persistRating,
  persistSaved,
} from '../database/repository';
import {
  completeSession,
  createInitialProgress,
  normalizeProgress,
  rateCard,
  toggleSaved,
} from '../domain/progress';
import type { ProgressState, Rating, StudyCard, Subject } from '../types';

export function useAppData() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [cards, setCards] = useState<StudyCard[]>([]);
  const [progress, setProgress] = useState<ProgressState>(createInitialProgress);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const writeQueue = useRef(Promise.resolve());

  const load = useCallback(async () => {
    setIsReady(false);
    setError(null);
    try {
      const [loadedSubjects, loadedCards, loadedProgress] = await Promise.all([
        loadSubjects(),
        loadCards(),
        loadProgress(),
      ]);
      setSubjects(loadedSubjects);
      setCards(loadedCards);
      setProgress(loadedProgress);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Veritabanı açılırken beklenmeyen bir hata oluştu.',
      );
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(load);
  }, [load]);

  const queueWrite = useCallback((operation: () => Promise<void>) => {
    writeQueue.current = writeQueue.current
      .then(operation)
      .catch(() => setError('Değişiklik cihazda kaydedilemedi. Tekrar deneyin.'));
  }, []);

  const rate = useCallback(
    (cardId: string, rating: Rating) => {
      setProgress((current) => rateCard(normalizeProgress(current), cardId, rating));
      queueWrite(() => persistRating(cardId, rating));
    },
    [queueWrite],
  );

  const save = useCallback(
    (cardId: string) => {
      setProgress((current) => {
        const next = toggleSaved(normalizeProgress(current), cardId);
        queueWrite(() => persistSaved(cardId, next.savedIds.includes(cardId)));
        return next;
      });
    },
    [queueWrite],
  );

  const finishSession = useCallback(() => {
    setProgress((current) => completeSession(normalizeProgress(current)));
    queueWrite(persistCompletedSession);
  }, [queueWrite]);

  return {
    subjects,
    cards,
    progress,
    isReady,
    error,
    reload: load,
    clearError: () => setError(null),
    rate,
    save,
    finishSession,
  };
}
