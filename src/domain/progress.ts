import type { ProgressState, Rating, StudyCard, SubjectId } from '../types';

export const DAILY_GOAL = 10;

export function localDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function createInitialProgress(date = new Date()): ProgressState {
  return {
    learnedIds: [],
    reviewIds: [],
    savedIds: [],
    daily: { date: localDateKey(date), studiedIds: [] },
    completedSessions: 0,
  };
}

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

export function normalizeProgress(
  state: ProgressState,
  date = new Date(),
): ProgressState {
  if (state.daily.date === localDateKey(date)) {
    return state;
  }

  return {
    ...state,
    daily: { date: localDateKey(date), studiedIds: [] },
  };
}

export function rateCard(
  state: ProgressState,
  cardId: string,
  rating: Rating,
  date = new Date(),
): ProgressState {
  const current = normalizeProgress(state, date);
  const learnedIds = current.learnedIds.filter((id) => id !== cardId);
  const reviewIds = current.reviewIds.filter((id) => id !== cardId);

  return {
    ...current,
    learnedIds: rating === 'learned' ? [...learnedIds, cardId] : learnedIds,
    reviewIds: rating === 'review' ? [...reviewIds, cardId] : reviewIds,
    daily: {
      ...current.daily,
      studiedIds: unique([...current.daily.studiedIds, cardId]),
    },
  };
}

export function toggleSaved(state: ProgressState, cardId: string): ProgressState {
  const isSaved = state.savedIds.includes(cardId);
  return {
    ...state,
    savedIds: isSaved
      ? state.savedIds.filter((id) => id !== cardId)
      : [...state.savedIds, cardId],
  };
}

export function completeSession(state: ProgressState): ProgressState {
  return { ...state, completedSessions: state.completedSessions + 1 };
}

export function buildStudyQueue(
  cards: StudyCard[],
  state: ProgressState,
  subjectId?: SubjectId,
): StudyCard[] {
  const pool = subjectId
    ? cards.filter((card) => card.subjectId === subjectId)
    : cards;
  const review = pool.filter((card) => state.reviewIds.includes(card.id));
  const unseen = pool.filter(
    (card) =>
      !state.reviewIds.includes(card.id) && !state.learnedIds.includes(card.id),
  );
  const learned = pool.filter((card) => state.learnedIds.includes(card.id));

  const queue = [...review, ...unseen];
  return queue.length > 0 ? queue : learned;
}

export function subjectCompletion(
  cards: StudyCard[],
  learnedIds: string[],
  subjectId: SubjectId,
): number {
  const subjectCards = cards.filter((card) => card.subjectId === subjectId);
  if (subjectCards.length === 0) return 0;
  const learnedCount = subjectCards.filter((card) =>
    learnedIds.includes(card.id),
  ).length;
  return Math.round((learnedCount / subjectCards.length) * 100);
}
