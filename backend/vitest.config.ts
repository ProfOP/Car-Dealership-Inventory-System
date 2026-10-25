import { defineConfig } from 'vitest/config';
export default defineConfig({ pool: 'forks', poolOptions: { forks: { singleFork: true } }, test: { environment: 'node', include: ['tests/**/*.test.ts'], coverage: { provider: 'v8', reporter: ['text', 'html'], exclude: ['dist/**', 'prisma/**', 'src/server.ts', 'src/types.ts', 'tests/**', 'vitest*.config.ts'] } } });
