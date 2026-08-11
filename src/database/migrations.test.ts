import { DatabaseSync } from 'node:sqlite';
import { afterEach, describe, expect, it } from 'vitest';

import { MIGRATION_V1, MIGRATION_V2 } from './migrations';

describe('SQLite content migration', () => {
  let database: DatabaseSync | null = null;

  afterEach(() => {
    database?.close();
    database = null;
  });

  it('creates the content and progress schema with the initial release', () => {
    database = new DatabaseSync(':memory:');
    database.exec('PRAGMA foreign_keys = ON;');
    database.exec(MIGRATION_V1);

    const subjectCount = database
      .prepare('SELECT COUNT(*) AS count FROM subjects')
      .get() as { count: number };
    const cardCount = database
      .prepare('SELECT COUNT(*) AS count FROM cards')
      .get() as { count: number };
    const version = database
      .prepare("SELECT value FROM content_meta WHERE key = 'content_version'")
      .get() as { value: string };

    expect(subjectCount.count).toBe(6);
    expect(cardCount.count).toBe(24);
    expect(version.value).toBe('1');
  });

  it('keeps migration seed operations idempotent', () => {
    database = new DatabaseSync(':memory:');
    database.exec(MIGRATION_V1);
    database.exec(MIGRATION_V1);

    const cardCount = database
      .prepare('SELECT COUNT(*) AS count FROM cards')
      .get() as { count: number };
    expect(cardCount.count).toBe(24);
  });

  it('adds an accessible official source URL to every card', () => {
    database = new DatabaseSync(':memory:');
    database.exec(MIGRATION_V1);
    database.exec(MIGRATION_V2);
    database.exec(MIGRATION_V2);

    const sourcedCards = database
      .prepare(
        `SELECT COUNT(*) AS count
         FROM cards
         WHERE source_name IS NOT NULL
           AND source_url LIKE 'https://%'`,
      )
      .get() as { count: number };
    const version = database
      .prepare("SELECT value FROM content_meta WHERE key = 'content_version'")
      .get() as { value: string };

    expect(sourcedCards.count).toBe(24);
    expect(version.value).toBe('2');
  });

  it('enforces valid progress states', () => {
    database = new DatabaseSync(':memory:');
    database.exec(MIGRATION_V1);

    expect(() =>
      database?.exec(
        "INSERT INTO card_progress(card_id, status) VALUES ('turkce-1', 'invalid')",
      ),
    ).toThrow();
  });
});
