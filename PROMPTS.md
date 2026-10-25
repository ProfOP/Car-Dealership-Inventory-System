# AI Prompts History

This document records the AI-assisted development workflow for the Car Dealership Inventory Management System.

**AI tools used:** OpenAI Codex and ChatGPT.

**Note:** The entries below summarize development requests and outcomes. Original, unedited prompts and conversation records should be used for the final assignment submission wherever available.

---

## 1. Project analysis and planning

**AI tool:** ChatGPT / Codex

**Prompt:**
```text
Analyze the existing Car Dealership Inventory System repository.

Inspect the frontend, backend, database, API endpoints, authentication, tests, and project structure.

Use the existing repository as a reference to develop a separate Car Dealership Inventory Management System.

Preserve the existing frontend design while implementing a substantially new backend.

Do not modify the original repository.
```

**Outcome:** Analyzed the reference implementation and planned an independent full-stack project with the existing React frontend and a new backend architecture.

---

## 2. Independent project setup

**AI tool:** Codex

**Prompt:**
```text
Create a new project named car-dealership-inventory in a separate folder alongside the original repository.

Preserve the existing React/Vite/Tailwind frontend design and assets.

Replace the existing Spring Boot backend with Node.js, TypeScript, Express, Prisma ORM, and SQLite.

Initialize a separate Git repository with independent configuration, dependencies, and documentation.

Do not modify the original project.
```

**Outcome:** Created the independent project at `D:\car-dealership-inventory`, preserved the frontend, and established the TypeScript/Express/Prisma/SQLite backend.

---

## 3. Backend architecture and database

**AI tool:** Codex

**Prompt:**
```text
Implement a modular Express backend using TypeScript.

Separate routes, controllers, services, repositories, middleware, validation, and database access.

Use Prisma ORM with SQLite for persistent storage.

Create the database schema, migrations, environment configuration, and seed scripts.

Follow SOLID principles and maintain clean, readable code.
```

**Outcome:** Implemented the modular backend architecture, Prisma schema, SQLite persistence, migrations, and database initialization.

---

## 4. Authentication API

**AI tool:** Codex

**Prompt:**
```text
Implement secure user registration and login using JWT authentication.

Use bcrypt for password hashing and Zod for request validation.

Support User and Admin roles with role-based authorization.

Prevent users from assigning themselves Admin privileges during registration.

Protect API endpoints using authentication and authorization middleware.
```

**Outcome:** Implemented registration, login, password hashing, JWT verification, User/Admin authorization, and secure API middleware.

---

## 5. Vehicle management API

**AI tool:** Codex

**Prompt:**
```text
Implement RESTful vehicle management endpoints.

Support adding, retrieving, updating, and deleting vehicles.

Each vehicle must contain a unique ID, make, model, category, price, and quantity.

Implement vehicle search and filtering by make, model, category, minimum price, and maximum price.

Restrict vehicle management operations according to the configured User/Admin permissions.

Add input validation and centralized error handling.
```

**Outcome:** Implemented vehicle CRUD operations, combined search filters, role restrictions, validation, and consistent API error handling.

---

## 6. Inventory purchasing and restocking

**AI tool:** Codex

**Prompt:**
```text
Implement vehicle purchasing and inventory restocking.

Purchasing must decrease vehicle stock and prevent purchases when insufficient inventory is available.

Restocking must increase stock and require Admin authorization.

Use atomic database operations to prevent negative inventory and concurrent overselling.

Validate purchase and restock quantities and return appropriate HTTP responses.
```

**Outcome:** Implemented protected purchase and restock endpoints with atomic inventory updates, stock validation, and database persistence.

---

## 7. Frontend integration

**AI tool:** Codex

**Prompt:**
```text
Connect the preserved React frontend to the new Express backend.

Maintain the existing frontend design, styling, navigation, components, animations, and responsive behavior.

Integrate registration, login, JWT authentication, vehicle listing, searching, purchasing, and Admin vehicle management.

Fix compatibility issues without redesigning the interface.
```

**Outcome:** Integrated the React frontend with the new backend while preserving the original visual design and user experience.

---

## 8. Admin setup and role verification

**AI tool:** Codex

**Prompt:**
```text
Implement Admin account provisioning through the database seed process.

Verify that regular users can browse, search, and purchase vehicles.

Verify that Admin users can add, update, delete, and restock vehicles.

Test role-based authorization through both API requests and frontend workflows.

Ensure unauthorized operations are rejected.
```

**Outcome:** Added development Admin provisioning, verified User/Admin permissions, and tested protected inventory management operations.

---

## 9. Test-driven development and backend testing

**AI tool:** Codex

**Prompt:**
```text
Expand backend automated testing using Vitest and Supertest.

Write meaningful tests for authentication, authorization, vehicle management, search, purchasing, restocking, validation, and error handling.

Follow Red-Green-Refactor for newly implemented functionality and defect fixes.

Use database-backed integration tests where appropriate.

Preserve genuine Git commits and do not fabricate TDD evidence.
```

**Outcome:** Expanded backend unit, security, and integration testing. Later defect fixes followed verified failing-test, implementation, and passing-test cycles.

---

## 10. Database integration and concurrency testing

**AI tool:** Codex

**Prompt:**
```text
Implement database-backed integration and concurrency tests using an isolated SQLite test database.

Test the complete HTTP-to-database request flow.

Verify that concurrent purchase requests cannot oversell inventory.

For a vehicle with stock quantity three, send five concurrent purchase requests.

Exactly three requests should succeed, two should fail, and final stock should be zero.

Verify database persistence and prevent negative inventory.
```

**Outcome:** Added database-backed integration and concurrency tests covering authentication, vehicle management, stock persistence, and concurrent purchasing.

---

## 11. Frontend testing and browser automation

**AI tool:** Codex

**Prompt:**
```text
Add Playwright browser end-to-end tests for the existing React application.

Verify registration, login, inventory listing, search, purchasing, Admin management, and stock availability.

Test desktop and mobile Chromium viewports.

Preserve the frontend design.

Run frontend unit tests, linting, production builds, and browser tests.
```

**Outcome:** Added Playwright E2E coverage and verified core user and Admin workflows across desktop and mobile browser configurations.

---

## 12. Backend debugging and compatibility fixes

**AI tool:** Codex

**Prompt:**
```text
Audit the backend for functional and validation defects.

Fix malformed vehicle ID handling and SQLite search compatibility.

Verify authentication error handling and prevent incorrect redirects after failed login attempts.

Improve Admin seed behavior while preserving existing database records.

Add regression tests and rerun the affected test suites.
```

**Outcome:** Fixed malformed vehicle identifiers, SQLite search behavior, login error handling, and Admin seed password refresh.

---

## 13. Demonstration inventory seeding

**AI tool:** Codex

**Prompt:**
```text
Improve the existing Prisma seed script to populate realistic demonstration inventory.

Add approximately 15 Indian-market vehicles from manufacturers such as Maruti Suzuki, Hyundai, Tata, Mahindra, Honda, Toyota, Kia, Volkswagen, Skoda, and MG.

Include different vehicle categories, prices, and stock levels.

Preserve existing vehicle records.

Make the seed process idempotent so repeated execution does not create duplicates.

Do not reset or delete existing database records.
```

**Outcome:** Added 15 demonstration vehicles while preserving the existing Toyota Corolla record, resulting in 16 vehicles. Verified that repeated seeding created no duplicates.

---

## 14. Indian Rupee currency formatting

**AI tool:** Codex

**Prompt:**
```text
Standardize vehicle price formatting across the frontend.

Use Indian Rupees with the en-IN locale.

Display prices using Indian numbering conventions such as ₹7,50,000 and ₹14,50,000.

Apply consistent formatting to vehicle cards, inventory pages, Admin dashboard summaries, and Admin tables.

Do not change stored database prices or redesign the frontend.
```

**Outcome:** Implemented shared INR formatting and applied it consistently throughout the application.

---

## 15. Final quality assurance and security audit

**AI tool:** Codex

**Prompt:**
```text
Perform a comprehensive final QA audit of the independent project.

Run backend unit tests, database integration tests, concurrency tests, frontend tests, linting, builds, and Playwright E2E tests.

Measure backend coverage.

Review authentication security, authorization, dependency vulnerabilities, repository cleanliness, and environment configuration.

Fix genuine defects without rewriting working functionality.

Create a test report, final audit, and requirements compliance matrix.
```

**Outcome:** Completed comprehensive testing, security review, and documentation. Recorded backend coverage of 95.07% statements, 86% branches, 95% functions, and 100% lines.

---

## 16. Fresh-clone reproducibility

**AI tool:** Codex

**Prompt:**
```text
Verify that the project can run independently from a fresh Git checkout.

Use an isolated temporary checkout without existing node_modules, environment files, databases, or build artifacts.

Install dependencies, configure the database, apply Prisma migrations, seed data, run tests, and build both applications.

Verify frontend/backend connectivity and browser functionality.

Fix missing configuration or documentation issues.
```

**Outcome:** Verified independent installation, Prisma migration bootstrap, database seeding, builds, tests, and browser E2E execution in a clean checkout.

---

## 17. GitHub Actions CI/CD

**AI tool:** Codex

**Prompt:**
```text
Configure GitHub Actions for automated project validation.

Use Node.js and npm ci for reproducible dependency installation.

Generate Prisma Client, apply database migrations, and initialize test data.

Run backend build, coverage, integration tests, frontend tests, linting, production build, and Playwright E2E tests.

Do not configure application deployment.
```

**Outcome:** Added the GitHub Actions quality workflow to automate backend and frontend validation.

---

## 18. GitHub Actions concurrency failure debugging

**AI tool:** ChatGPT / Codex

**Prompt:**
```text
Investigate the GitHub Actions Backend coverage failure.

The concurrent inventory purchase test times out after five seconds on GitHub's Ubuntu runner.

Inspect Vitest configuration, Prisma transactions, SQLite locking, and test isolation.

Fix the failure without removing the concurrency test or weakening its assertions.

Verify that three purchases succeed, two fail, and final stock is zero.

Run local regression tests and verify the hosted GitHub Actions workflow.
```

**Outcome:** Investigated the CI-only concurrency issue, adjusted timeout handling, and added bounded handling for transient SQLite contention. The hosted GitHub Actions workflow subsequently passed.

---

## 19. README and screenshot preparation

**AI tool:** Codex

**Prompt:**
```text
Rewrite README.md into a professional GitHub project README.

Document the actual React, TypeScript, Express, Prisma, and SQLite implementation.

Include the technology stack, local setup, features, API endpoints, testing instructions, screenshots, project structure, AI usage, and test report.

Capture genuine screenshots from the running application using Playwright.

Do not include application deployment links or hosting instructions.
```

**Outcome:** Updated the README and added screenshots of the landing page, vehicle inventory, search, login, registration, Admin dashboard, and Admin vehicle form.

---

## 20. GitHub repository publication

**AI tool:** Codex

**Prompt:**
```text
Prepare the independent Car Dealership Inventory Management System for GitHub publication.

Verify repository security, Git history, README, screenshots, dependencies, and test results.

Connect the local repository to:

https://github.com/ProfOP/Car-Dealership-Inventory-System

Push the existing independent Git history to the main branch.

Do not force-push, modify the original repository, expose secrets, or deploy the application.

Verify the published repository and GitHub Actions workflow.
```

**Outcome:** Published the independent project to GitHub with its source code, documentation, screenshots, tests, and CI configuration.

---

## 21. Final CI verification and documentation

**AI tool:** Codex

**Prompt:**
```text
Verify that the corrected GitHub Actions workflow completes successfully.

Check backend coverage, integration tests, frontend validation, and Playwright E2E results.

Investigate failures using actual hosted logs rather than assumptions.

Once CI passes, update the final audit, test report, and requirements compliance documentation.

Preserve the existing application functionality and Git history.
```

**Outcome:** Verified a successful hosted GitHub Actions run and updated the engineering audit documentation to reflect the result.

---

## Final Project Outcome

The completed Car Dealership Inventory Management System includes:

- React/Vite/Tailwind frontend
- TypeScript/Express backend
- Prisma ORM and SQLite database
- JWT authentication and User/Admin authorization
- Vehicle CRUD, searching, purchasing, and restocking
- Atomic inventory updates
- Idempotent demonstration inventory seeding
- INR currency formatting
- Backend unit and database integration tests
- Concurrency testing
- Frontend unit tests
- Playwright browser E2E testing
- GitHub Actions CI
- README, screenshots, test report, and audit documentation

**GitHub Repository:** https://github.com/ProfOP/Car-Dealership-Inventory-System

**Development note:** AI tools assisted with implementation, testing, debugging, and documentation. The frontend reused permitted reference components and assets, while the backend was substantively reimplemented. The available development history supports test-first work for selected fixes, but not a complete Red-Green-Refactor sequence for every original feature.
