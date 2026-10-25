# Final Engineering Audit

## Overall status

The project is ready with minor limitations. Core API, persistence, authentication, RBAC, inventory concurrency, frontend build, linting, and browser smoke flows are verified. The remaining limitations are documented rather than hidden.

## Changes made during this audit

- Added 11 database-backed integration/concurrency tests using a separate `integration.db` and the checked-in Prisma migration.
- Added coverage reporting with Vitest V8.
- Added six Playwright tests across desktop and mobile Chromium projects.
- Fixed SQLite search portability and malformed vehicle ID handling.
- Fixed Axios login 401 handling so invalid credentials remain visible to the user.
- Fixed Admin seed behavior so rerunning seed refreshes the configured password hash.
- Added CI workflow, requirements matrix, screenshot references, and this audit report.
- Added a Windows-local SQLite bootstrap that executes the checked-in migration directly; Linux/CI continues to use `prisma migrate deploy`.
- Applied safe dependency updates: frontend production audit is clean, and Vitest tooling advisories are resolved.

## Test results

| Category | Passed | Failed | Skipped | Status |
|---|---:|---:|---:|---|
| Backend unit/security | 14 | 0 | 0 | PASS |
| Backend integration/concurrency | 11 | 0 | 0 | PASS |
| Frontend Vitest | 44 | 0 | 0 | PASS |
| Browser E2E | 6 | 0 | 0 | PASS |
| Backend build | 1 | 0 | 0 | PASS |
| Frontend build | 1 | 0 | 0 | PASS |
| Frontend lint | 1 | 0 | 0 | PASS |

## Coverage

The executed backend coverage run included all unit and integration tests and excluded generated output, seed/bootstrap scripts, server entrypoint, type declarations, and test/config files: 95.07% statements, 86% branches, 95% functions, and 100% lines for application source.

## Security findings

Passwords are bcrypt-hashed, JWT secrets are environment-configured, Admin registration escalation is blocked, malformed IDs and request bodies are validated, and error responses do not expose stack traces. The frontend audit reports 0 vulnerabilities after safe updates to Axios, React Router, and Vite. The backend audit reports 3 remaining high Prisma CLI/config advisories through `prisma@6.19.3` and `@prisma/config`/`deepmerge-ts`; the suggested remediation is Prisma 7.10.1, a major upgrade requiring a separately tested migration. Vitest advisories were resolved with Vitest 4.1.12 and coverage-v8 4.1.12. The remaining Prisma findings are development tooling; the application server imports `@prisma/client`, not the Prisma CLI or Vitest APIs.

## CI/CD

The GitHub Actions workflow uses `npm ci`, Prisma generation, migration deployment, seed data, backend build/tests/coverage/integration tests, frontend tests/lint/build, Playwright browser installation, E2E tests, and failure artifacts. Equivalent commands passed locally and in the clean checkout. Remote GitHub Actions execution is pending because the repository has not been pushed.

## Fresh-clone verification

A temporary checkout from the final dependency state was created without inherited `.env`, databases, `node_modules`, or build artifacts. Fresh backend/frontend `npm ci`, Prisma generation, Windows migration bootstrap, seed, backend build, 14 backend tests, 11 integration tests, frontend 44 tests, lint, build, and 6 Playwright tests all passed. The temporary checkout was removed afterward.

## Screenshot validation

All five existing screenshot files under `Screenshots/` were present and referenced by README. They are genuine supplied interface assets, not newly generated application claims.

## TDD and Git evidence

The audit’s malformed-ID/search/E2E defects were found by failing tests, fixed, and rerun successfully. Commits `5944f4d` and `b21a72d` preserve the audit test-first and implementation increments. The earlier three commits were preserved; they do not prove a complete historical Red-Green-Refactor sequence, so TDD compliance is marked partial in the matrix.

## Remaining limitations

- No remote CI run was performed locally; the workflow is checked in but requires GitHub execution.
- Prisma CLI transitive audit advisories remain pending a separately tested major-version upgrade.
