-- PostgreSQL 16+ editorial source-of-truth schema.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE content_status AS ENUM ('draft', 'review', 'approved', 'rejected', 'archived');

CREATE TABLE subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true
);

CREATE TABLE topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid NOT NULL REFERENCES subjects(id),
  slug text NOT NULL,
  name text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  UNIQUE(subject_id, slug)
);

CREATE TABLE content_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  publisher text,
  source_url text,
  license_type text NOT NULL,
  license_reference text,
  accessed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid NOT NULL REFERENCES topics(id),
  status content_status NOT NULL DEFAULT 'draft',
  current_revision integer NOT NULL DEFAULT 1,
  is_active boolean NOT NULL DEFAULT true,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE card_revisions (
  card_id uuid NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  revision integer NOT NULL,
  prompt text NOT NULL,
  answer text NOT NULL,
  detail text NOT NULL,
  memory_tip text,
  source_id uuid NOT NULL REFERENCES content_sources(id),
  authored_by uuid NOT NULL,
  verified_by uuid,
  verified_at timestamptz,
  valid_until date,
  content_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY(card_id, revision),
  CHECK (verified_by IS NULL OR verified_by <> authored_by)
);

CREATE TABLE content_releases (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  version integer UNIQUE NOT NULL,
  status text NOT NULL CHECK (status IN ('building', 'published', 'revoked')),
  checksum_sha256 text,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE release_cards (
  release_id bigint NOT NULL REFERENCES content_releases(id) ON DELETE CASCADE,
  card_id uuid NOT NULL REFERENCES cards(id),
  revision integer NOT NULL,
  operation text NOT NULL CHECK (operation IN ('upsert', 'delete')),
  PRIMARY KEY(release_id, card_id),
  FOREIGN KEY(card_id, revision) REFERENCES card_revisions(card_id, revision)
);

CREATE INDEX idx_cards_topic_status ON cards(topic_id, status, is_active);
CREATE INDEX idx_card_revisions_verified ON card_revisions(verified_at, valid_until);
CREATE INDEX idx_release_cards_release ON release_cards(release_id, operation);
