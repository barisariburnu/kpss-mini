export type SubjectId =
  | 'turkce'
  | 'matematik'
  | 'tarih'
  | 'cografya'
  | 'vatandaslik'
  | 'guncel';

export type Subject = {
  id: SubjectId;
  name: string;
  shortName: string;
  color: string;
  softColor: string;
  symbol: string;
};

export type StudyCard = {
  id: string;
  subjectId: SubjectId;
  topic: string;
  prompt: string;
  answer: string;
  detail: string;
  memoryTip?: string;
};

export type DailyProgress = {
  date: string;
  studiedIds: string[];
};

export type ProgressState = {
  learnedIds: string[];
  reviewIds: string[];
  savedIds: string[];
  daily: DailyProgress;
  completedSessions: number;
};

export type Rating = 'learned' | 'review';
