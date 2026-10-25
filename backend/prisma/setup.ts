import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const cwd = path.resolve(import.meta.dirname, '..');
const env = { ...process.env };

if (process.platform === 'win32') {
  console.warn('Windows local setup executes the checked-in SQLite migration directly because Prisma migrate deploy can fail while creating a new SQLite file on this platform. CI/Linux applies the same migration with migrate deploy.');
  const databaseUrl = env.DATABASE_URL ?? 'file:./dev.db';
  if (!databaseUrl.startsWith('file:')) throw new Error('Windows local setup requires a SQLite DATABASE_URL.');
  const databasePath = path.resolve(cwd, 'prisma', databaseUrl.slice('file:'.length));
  const db = new DatabaseSync(databasePath);
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name IN ('User', 'Vehicle')").all();
  if (tables.length === 0) db.exec(readFileSync(path.resolve(cwd, 'prisma', 'migrations', '0001_init', 'migration.sql'), 'utf8'));
  db.close();
} else {
  const command = 'npx';
  execFileSync(command, ['prisma', 'migrate', 'deploy'], { cwd, env, stdio: 'inherit' });
}
