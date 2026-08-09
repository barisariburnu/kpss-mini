import { describe, expect, it } from 'vitest';

import type { StudyCard } from '../types';
import {
  buildStudyQueue,
  completeSession,
  createInitialProgress,
  localDateKey,
  normalizeProgress,
  rateCard,
  subjectCompletion,
  toggleSaved,
} from './progress';

const today = new Date(2026, 7, 8, 12);
const studyCards: StudyCard[] = [
  {
    id: 'turkce-1',
    subjectId: 'turkce',
    topic: 'Dil Bilgisi',
    prompt: 'Soru 1',
    answer: 'Cevap 1',
    detail: 'Detay 1',
    contentVersion: 1,
    isVerified: true,
  },
  {
    id: 'turkce-2',
    subjectId: 'turkce',
    topic: 'Anlam',
    prompt: 'Soru 2',
    answer: 'Cevap 2',
    detail: 'Detay 2',
    contentVersion: 1,
    isVerified: true,
  },
  {
    id: 'matematik-1',
    subjectId: 'matematik',
    topic: 'Sayılar',
    prompt: 'Soru 3',
    answer: 'Cevap 3',
    detail: 'Detay 3',
    contentVersion: 1,
    isVerified: true,
  },
  {
    id: 'matematik-2',
    subjectId: 'matematik',
    topic: 'Problemler',
    prompt: 'Soru 4',
    answer: 'Cevap 4',
    detail: 'Detay 4',
    contentVersion: 1,
    isVerified: true,
  },
  {
    id: 'matematik-3',
    subjectId: 'matematik',
    topic: 'Oran',
    prompt: 'Soru 5',
    answer: 'Cevap 5',
    detail: 'Detay 5',
    contentVersion: 1,
    isVerified: true,
  },
  {
    id: 'matematik-4',
    subjectId: 'matematik',
    topic: 'Yüzde',
    prompt: 'Soru 6',
    answer: 'Cevap 6',
    detail: 'Detay 6',
    contentVersion: 1,
    isVerified: true,
  },
];

describe('progress domain', () => {
  it('uses a local calendar date key', () => {
    expect(localDateKey(today)).toBe('2026-08-08');
  });

  it('records learned and review ratings without duplicates', () => {
    const initial = createInitialProgress(today);
    const reviewed = rateCard(initial, 'turkce-1', 'review', today);
    const learned = rateCard(reviewed, 'turkce-1', 'learned', today);
    const repeated = rateCard(learned, 'turkce-1', 'learned', today);

    expect(repeated.reviewIds).not.toContain('turkce-1');
    expect(repeated.learnedIds).toEqual(['turkce-1']);
    expect(repeated.daily.studiedIds).toEqual(['turkce-1']);
  });

  it('resets only daily activity on a new day', () => {
    const state = rateCard(
      createInitialProgress(today),
      'tarih-1',
      'learned',
      today,
    );
    const tomorrow = new Date(2026, 7, 9, 9);
    const normalized = normalizeProgress(state, tomorrow);

    expect(normalized.learnedIds).toContain('tarih-1');
    expect(normalized.daily).toEqual({ date: '2026-08-09', studiedIds: [] });
  });

  it('prioritizes review cards, then unseen cards', () => {
    const state = {
      ...createInitialProgress(today),
      reviewIds: ['turkce-2'],
      learnedIds: ['turkce-1'],
    };
    const queue = buildStudyQueue(studyCards, state, 'turkce');

    expect(queue[0]?.id).toBe('turkce-2');
    expect(queue.map((card) => card.id)).not.toContain('turkce-1');
  });

  it('toggles saved cards and counts completed sessions', () => {
    const initial = createInitialProgress(today);
    const saved = toggleSaved(initial, 'cografya-1');
    const unsaved = toggleSaved(saved, 'cografya-1');

    expect(saved.savedIds).toEqual(['cografya-1']);
    expect(unsaved.savedIds).toEqual([]);
    expect(completeSession(initial).completedSessions).toBe(1);
  });

  it('calculates subject completion', () => {
    expect(subjectCompletion(studyCards, ['matematik-1'], 'matematik')).toBe(25);
  });
});
