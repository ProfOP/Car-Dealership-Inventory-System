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
| Backend `npm test` | 4 test files, 15 tests passed, 0 failed |
| Backend `npm run test:integration` | 1 file, 11 tests passed, 0 failed; separate database and migration reset |
| Backend `npm run test:coverage` | 15 tests passed; 95.07% statements, 86% branches, 95% functions, 100% lines for application source |
| Frontend `npm test` | 9 test files, 45 tests passed, 0 failed |
| Frontend `npm run lint` | Passed with 0 errors |
| Frontend `npm run build` | Passed; Vite produced `dist/` |
| Frontend `npm run test:e2e` | 8 tests passed across Chromium desktop and mobile projects, including populated inventory and INR/out-of-stock checks |
| Prisma migration/reset + seed | Passed; existing Corolla preserved, 15 demo vehicles added, second seed added 0 duplicates |
| Live API/UI smoke check | Passed: Admin login/dashboard, populated inventory, INR display, make filter, and disabled out-of-stock purchase state |
| Fresh Git checkout | Passed; clean install, setup, seed, build, tests, integration, and E2E verified |
| Screenshot validation | Passed; all 5 README-referenced files exist |
| CI workflow | Local equivalents passed; latest published GitHub run `40215099595` failed in Backend coverage; detailed hosted log unavailable without repository-admin access |

## Coverage and limitations

The frontend audit reports 0 vulnerabilities after safe dependency updates. The backend audit reports 3 remaining high Prisma CLI/config advisories through Prisma 6.19.3; the suggested fix is a breaking Prisma 7 upgrade. Vitest advisories were resolved with Vitest 4.1.12 and coverage-v8 4.1.12. See [final-audit.md](final-audit.md) and [requirements-compliance.md](requirements-compliance.md).
