import { execFileSync } from 'node:child_process';
import path from 'node:path';

const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const cwd = path.resolve(import.meta.dirname, '..');
const env = { ...process.env };

if (process.platform === 'win32') {
  console.warn('Windows local setup uses Prisma db push because Prisma migrate deploy can fail while creating a new SQLite file on this platform. CI/Linux applies the checked-in migration with migrate deploy.');
  execFileSync(command, ['prisma', 'db', 'push'], { cwd, env, stdio: 'inherit', shell: true });
} else {
  execFileSync(command, ['prisma', 'migrate', 'deploy'], { cwd, env, stdio: 'inherit' });
}
