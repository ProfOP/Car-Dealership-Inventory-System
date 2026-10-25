# Requirements Compliance Matrix

Status is based only on checks executed in this repository.

| Requirement | Implementation | Test evidence | Status |
|---|---|---|---|
| Separate sibling project | `D:\car-dealership-inventory` with its own `.git` | Git history and clean repository | PASS |
| Preserved React frontend | Copied React/Vite/Tailwind pages, components, assets | 44 Vitest tests, lint, build, Playwright | PASS |
| Persistent database | Prisma SQLite schema and migration | Migration, seed, persisted integration assertions | PASS |
| User registration | `/api/auth/register`, Zod, bcrypt, default USER | Integration registration/duplicate/validation tests | PASS |
| JWT login and verification | `/api/auth/login`, JWT middleware | Login, malformed, invalid, expired token tests | PASS |
| User/Admin RBAC | `requireRole('ADMIN')` on mutations | Unauthorized mutation tests and Admin E2E login | PASS |
| Vehicle CRUD | Repository/service/routes | Create/read/update/delete integration tests | PASS |
| Combined vehicle search | Make/model/category/min/max filters | Search integration tests | PASS |
| Purchase and stock protection | Conditional atomic SQL decrement | Sequential and concurrent database tests | PASS |
| Admin restock | Protected positive quantity increment | Persistence and authorization integration tests | PASS |
| Browser E2E | Playwright desktop + mobile Chromium projects | 6 tests passed | PASS |
| Coverage reporting | Vitest V8 coverage script | 90.22% statements, 87.75% branches | PASS |
| TDD evidence | Audit defect test failed, fix passed, commits preserved | `5944f4d` then `b21a72d`; earlier history is not a full TDD trace | PARTIAL |
| Raw AI transcript | `PROMPTS.md` records available prompt paths and limitation | Full transcript export unavailable | PARTIAL |
| Production security audit | npm audit and source review | 3 high transitive Prisma CLI advisories | PARTIAL |
