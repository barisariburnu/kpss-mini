import * as SQLite from 'expo-sqlite';

import { createInitialProgress, localDateKey } from '../domain/progress';
import type { ProgressState, Rating, StudyCard, Subject } from '../types';
import {
  DATABASE_NAME,
  DATABASE_VERSION,
  MIGRATION_V1,
} from './migrations';

type VersionRow = { user_version: number };

type SubjectRow = {
  id: Subject['id'];
  name: string;
  shortName: string;
  color: string;
  softColor: string;
  symbol: string;
};

type CardRow = Omit<StudyCard, 'isVerified'> & { isVerified: number };
type ProgressRow = { cardId: string; status: Rating | null; saved: number };
type CardIdRow = { cardId: string };
type StatRow = { value: number };

let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;

async function migrateDatabase(db: SQLite.SQLiteDatabase) {
  await db.execAsync('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');
  const row = await db.getFirstAsync<VersionRow>('PRAGMA user_version');
  const currentVersion = row?.user_version ?? 0;

  if (currentVersion < 1) {
    await db.withTransactionAsync(async () => {
      const transaction = db;
      await transaction.execAsync(MIGRATION_V1);
      await transaction.execAsync(`PRAGMA user_version = ${DATABASE_VERSION};`);
    });
  }
}

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!databasePromise) {
    databasePromise = SQLite.openDatabaseAsync(DATABASE_NAME).then(async (db) => {
      await migrateDatabase(db);
      return db;
    });
  }
  return databasePromise;
}

export async function loadSubjects(): Promise<Subject[]> {
  const db = await getDatabase();
  return db.getAllAsync<SubjectRow>(`
    SELECT
      id,
      name,
      short_name AS shortName,
      color,
      soft_color AS softColor,
      symbol
    FROM subjects
    WHERE is_active = 1
    ORDER BY sort_order, name
  `);
}

export async function loadCards(): Promise<StudyCard[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<CardRow>(`
    SELECT
      id,
      subject_id AS subjectId,
      topic,
      prompt,
      answer,
      detail,
      memory_tip AS memoryTip,
      source_name AS sourceName,
      source_url AS sourceUrl,
      content_version AS contentVersion,
      is_verified AS isVerified
    FROM cards
    WHERE is_active = 1
    ORDER BY subject_id, topic, id
  `);
  return rows.map((row) => ({ ...row, isVerified: row.isVerified === 1 }));
}

export async function loadProgress(date = new Date()): Promise<ProgressState> {
  const db = await getDatabase();
  const dateKey = localDateKey(date);
  const [progressRows, dailyRows, sessions] = await Promise.all([
    db.getAllAsync<ProgressRow>(`
      SELECT card_id AS cardId, status, saved
      FROM card_progress
    `),
    db.getAllAsync<CardIdRow>(
      'SELECT card_id AS cardId FROM daily_studies WHERE study_date = ?',
      dateKey,
    ),
    db.getFirstAsync<StatRow>(
      "SELECT value FROM app_stats WHERE key = 'completed_sessions'",
    ),
  ]);

  const initial = createInitialProgress(date);
  return {
    ...initial,
    learnedIds: progressRows
      .filter((row) => row.status === 'learned')
      .map((row) => row.cardId),
    reviewIds: progressRows
      .filter((row) => row.status === 'review')
      .map((row) => row.cardId),
    savedIds: progressRows
      .filter((row) => row.saved === 1)
      .map((row) => row.cardId),
    daily: { date: dateKey, studiedIds: dailyRows.map((row) => row.cardId) },
    completedSessions: sessions?.value ?? 0,
  };
}

export async function persistRating(
  cardId: string,
  rating: Rating,
  date = new Date(),
) {
  const db = await getDatabase();
  await db.withTransactionAsync(async () => {
    const transaction = db;
    await transaction.runAsync(
      `INSERT INTO card_progress(card_id, status, saved, updated_at)
       VALUES (?, ?, 0, CURRENT_TIMESTAMP)
       ON CONFLICT(card_id) DO UPDATE SET
         status = excluded.status,
         updated_at = CURRENT_TIMESTAMP`,
      cardId,
      rating,
    );
    await transaction.runAsync(
      `INSERT OR IGNORE INTO daily_studies(study_date, card_id)
       VALUES (?, ?)`,
      localDateKey(date),
      cardId,
    );
  });
}

export async function persistSaved(cardId: string, saved: boolean) {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO card_progress(card_id, status, saved, updated_at)
     VALUES (?, NULL, ?, CURRENT_TIMESTAMP)
     ON CONFLICT(card_id) DO UPDATE SET
       saved = excluded.saved,
       updated_at = CURRENT_TIMESTAMP`,
    cardId,
    saved ? 1 : 0,
  );
}

export async function persistCompletedSession() {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO app_stats(key, value)
     VALUES ('completed_sessions', 1)
     ON CONFLICT(key) DO UPDATE SET value = value + 1`,
  );
}
