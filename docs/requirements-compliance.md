# Requirements Compliance Matrix

Status is based only on checks executed in this repository.

| Requirement | Implementation | Test evidence | Status |
|---|---|---|---|
| Separate sibling project | `D:\car-dealership-inventory` with its own `.git` | Git history and clean repository | PASS |
| Preserved React frontend | Copied React/Vite/Tailwind pages, components, assets | 45 Vitest tests, lint, build, Playwright | PASS |
| Persistent database | Prisma SQLite schema and migration | Migration, seed, persisted integration assertions | PASS |
| User registration | `/api/auth/register`, Zod, bcrypt, default USER | Integration registration/duplicate/validation tests | PASS |
| JWT login and verification | `/api/auth/login`, JWT middleware | Login, malformed, invalid, expired token tests | PASS |
| User/Admin RBAC | `requireRole('ADMIN')` on mutations | Unauthorized mutation tests and Admin E2E login | PASS |
| Vehicle CRUD | Repository/service/routes | Create/read/update/delete integration tests | PASS |
| Combined vehicle search | Make/model/category/min/max filters | Search integration tests | PASS |
| Purchase and stock protection | Conditional atomic SQL decrement | Sequential and concurrent database tests | PASS |
| Admin restock | Protected positive quantity increment | Persistence and authorization integration tests | PASS |
| Browser E2E | Playwright desktop + mobile Chromium projects | 8 tests passed, including seeded inventory and INR UI checks | PASS |
| Coverage reporting | Vitest V8 coverage script | 95.07% statements, 86% branches, 95% functions, 100% lines for application source | PASS |
| Fresh-clone reproducibility | Clean Git checkout with no local state | Setup, seed, build, tests, and E2E all passed | PASS |
| CI workflow | `.github/workflows/ci.yml` | Equivalent commands passed locally; remote run pending | PARTIAL |
| TDD evidence | Audit defect test failed, fix passed, commits preserved | `5944f4d` then `b21a72d`; earlier history is not a full TDD trace | PARTIAL |
| Production security audit | npm audit and source review | Frontend audit clean; 3 high Prisma-chain development-tool advisories remain in backend Prisma 6.19.3 | PARTIAL |
