# Test Report

This report is maintained from commands actually executed during development on 25 October 2026.

## Planned commands

- `cd backend; npm test` — backend Vitest unit/security tests.
- `cd frontend; npm test` — copied React/Vitest tests.
- `cd frontend; npm run build` — production bundle validation.

## Results

| Suite/check | Result |
|---|---|
| Backend `npm run build` | Passed |
| Backend `npm test` | 2 test files, 3 tests passed, 0 failed |
| Frontend `npm test` | 8 test files, 44 tests passed, 0 failed |
| Frontend `npm run build` | Passed; Vite produced `dist/` |
| Prisma migration/reset + seed | Passed; 1 migration applied and 6 vehicles seeded |
| Live API smoke check | Passed: `/health`, Admin login, authenticated vehicle listing |

## Coverage and limitations

The backend suite currently covers validation and the authentication boundary. Full database-backed endpoint, authorization, and concurrency coverage remains a follow-up item until the local Prisma test database suite is expanded. `npm install` reported audit advisories from the dependency tree; these were not force-fixed because that could introduce unreviewed breaking upgrades.
