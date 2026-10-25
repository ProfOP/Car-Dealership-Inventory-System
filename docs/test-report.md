# Test Report

This report is maintained from commands actually executed during development on 25 October 2026.

## Planned commands

- `cd backend; npm test` — backend Vitest unit/security tests.
- `cd backend; npm run test:integration` — isolated SQLite migration, HTTP, persistence, and concurrency tests.
- `cd backend; npm run test:coverage` — backend V8 coverage.
- `cd frontend; npm test` — copied React/Vitest tests.
- `cd frontend; npm run test:e2e` — Playwright desktop/mobile browser tests.
- `cd frontend; npm run build` — production bundle validation.

## Results

| Suite/check | Result |
|---|---|
| Backend `npm run build` | Passed |
| Backend `npm test` | 2 test files, 3 tests passed, 0 failed |
| Backend `npm run test:integration` | 1 file, 11 tests passed, 0 failed; separate database and migration reset |
| Backend `npm run test:coverage` | 14 tests passed; 89.55% statements, 87.75% branches, 87.09% functions, 89.55% lines |
| Frontend `npm test` | 8 test files, 44 tests passed, 0 failed |
| Frontend `npm run lint` | Passed with 0 errors |
| Frontend `npm run build` | Passed; Vite produced `dist/` |
| Frontend `npm run test:e2e` | 6 tests passed across Chromium desktop and mobile projects |
| Prisma migration/reset + seed | Passed; 1 migration applied and 6 vehicles seeded |
| Live API smoke check | Passed: `/health`, Admin login, authenticated vehicle listing |

## Coverage and limitations

`npm audit --omit=dev --audit-level=high` reported 3 high transitive advisories through Prisma CLI; the suggested fix is a breaking Prisma major upgrade and was not applied without compatibility testing. See [final-audit.md](final-audit.md) and [requirements-compliance.md](requirements-compliance.md).
