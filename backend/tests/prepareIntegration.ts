import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, unlinkSync } from 'node:fs';
import path from 'node:path';

const backendRoot = path.resolve(import.meta.dirname, '..');
const testDb = path.join(backendRoot, 'prisma', 'integration.db');
const devDb = path.join(backendRoot, 'prisma', 'dev.db');
if (existsSync(testDb)) unlinkSync(testDb);
if (existsSync(`${testDb}-journal`)) unlinkSync(`${testDb}-journal`);
if (!existsSync(devDb)) throw new Error('Development database is required to bootstrap the isolated SQLite integration database. Run prisma migrate and seed first.');
copyFileSync(devDb, testDb);
const env = { ...process.env, DATABASE_URL: 'file:./integration.db', JWT_SECRET: 'integration-test-secret-please-change' };
execFileSync(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['prisma', 'migrate', 'reset', '--force', '--skip-seed'], { cwd: backendRoot, env, stdio: 'inherit', shell: process.platform === 'win32' });
