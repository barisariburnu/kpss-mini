import type { Subject } from '../types';

export const subjects: Subject[] = [
  {
    id: 'turkce',
    name: 'Türkçe',
    shortName: 'TR',
    color: '#7A5AA6',
    softColor: '#EEE8F5',
    symbol: 'A',
  },
  {
    id: 'matematik',
    name: 'Matematik',
    shortName: 'MT',
    color: '#2775A6',
    softColor: '#E2F0F8',
    symbol: '∑',
  },
  {
    id: 'tarih',
    name: 'Tarih',
    shortName: 'TRH',
    color: '#B45F3C',
    softColor: '#F7E9E1',
    symbol: '⌛',
  },
  {
    id: 'cografya',
    name: 'Coğrafya',
    shortName: 'COĞ',
    color: '#2E8067',
    softColor: '#E3F1EB',
    symbol: '⌖',
  },
  {
    id: 'vatandaslik',
    name: 'Vatandaşlık',
    shortName: 'VTD',
    color: '#9B6A22',
    softColor: '#F7EDD8',
    symbol: '§',
  },
  {
    id: 'guncel',
    name: 'Güncel Bilgiler',
    shortName: 'GNC',
    color: '#B24D68',
    softColor: '#F8E6EB',
    symbol: '•',
  },
];

export const subjectById = Object.fromEntries(
  subjects.map((subject) => [subject.id, subject]),
) as Record<Subject['id'], Subject>;
