import { DatabaseSync } from 'node:sqlite';

export const database = new DatabaseSync('./database.db', { readBigInts: true });

database.exec(`
  CREATE TABLE IF NOT EXISTS global (
    id INTEGER PRIMARY KEY CHECK (id = 0),
    count INTEGER NOT NULL DEFAULT 0
  ) STRICT;

  INSERT OR IGNORE INTO global (id, count) VALUES (0, 0);

  CREATE TABLE IF NOT EXISTS guilds (
    id INTEGER PRIMARY KEY,
    count INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    logs INTEGER
  ) STRICT;

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    count INTEGER DEFAULT 0
  ) STRICT;
`);
