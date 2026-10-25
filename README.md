# Car Dealership Inventory Management System

An independently runnable dealership inventory application. The React interface and visual language are preserved from the reference implementation, while the backend is a new TypeScript service with a layered architecture, persistent SQLite storage, JWT authentication, Zod validation, and atomic inventory updates.

## Features

- Public landing page and responsive React UI.
- User registration and login with bcrypt password hashing and JWTs.
- User and Admin roles; public registration can only create User accounts.
- Vehicle listing, combined make/model/category/price search, and admin CRUD.
- Authenticated purchases and Admin-only restocking/deletion.
- Atomic stock decrement prevents overselling under concurrent purchase requests.

## Technology Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, Axios, Vitest, Testing Library.
- Backend: Node.js, TypeScript, Express, Prisma ORM, SQLite, Zod, JWT, bcryptjs, Vitest, Supertest.

## Architecture and Structure

The backend separates HTTP routes, middleware, validators, services, and Prisma repositories. The repository owns persistence and performs the purchase update with an atomic conditional quantity guard inside a database transaction. The frontend is a preserved React/Vite application connected through an environment-configured Axios client.

```text
car-dealership-inventory/
├── backend/
│   ├── prisma/schema.prisma
│   ├── src/{config,middleware,repositories,routes,services}/
│   └── tests/
├── frontend/src/{api,components,context,pages}/
├── docs/test-report.md
└── PROMPTS.md
```

## Prerequisites and Installation

Node.js 20+ and npm are recommended.

```powershell
cd D:\car-dealership-inventory\backend
npm install
Copy-Item .env.example .env
npx prisma migrate dev --name init
npm run prisma:seed

cd ..\frontend
npm install
```

The default Admin is configured by `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `backend/.env`. Change the development default before sharing the environment.

## Environment Configuration

Backend variables are documented in [backend/.env.example](backend/.env.example). Set `VITE_API_URL` in `frontend/.env` only when the API is not available at the default `/api` origin; for local development, use `VITE_API_URL=http://localhost:8080/api`.

## Running

```powershell
# terminal 1
cd D:\car-dealership-inventory\backend
npm run dev

# terminal 2
cd D:\car-dealership-inventory\frontend
npm run dev
```

## API Documentation

| Method | Endpoint | Purpose | Auth | Role |
|---|---|---|---|---|
| POST | `/api/auth/register` | Register User | No | — |
| POST | `/api/auth/login` | Issue JWT | No | — |
| GET | `/api/vehicles` | List vehicles | JWT | User/Admin |
| GET | `/api/vehicles/search` | Filter vehicles | JWT | User/Admin |
| GET | `/api/vehicles/:id` | Get one vehicle | JWT | User/Admin |
| POST | `/api/vehicles` | Create vehicle | JWT | Admin |
| PUT | `/api/vehicles/:id` | Update vehicle | JWT | Admin |
| DELETE | `/api/vehicles/:id` | Delete vehicle | JWT | Admin |
| POST | `/api/vehicles/:id/purchase` | Decrement stock | JWT | User/Admin |
| POST | `/api/vehicles/:id/restock` | Increment stock | JWT | Admin |

## Testing

```powershell
cd D:\car-dealership-inventory\backend; npm test
cd D:\car-dealership-inventory\frontend; npm test
cd D:\car-dealership-inventory\backend; npm run test:integration
cd D:\car-dealership-inventory\backend; npm run test:coverage
cd D:\car-dealership-inventory\frontend; npx playwright install chromium
cd D:\car-dealership-inventory\frontend; npm run test:e2e
cd D:\car-dealership-inventory\frontend; npm run build
```

See [docs/test-report.md](docs/test-report.md) for the executed results. The included screenshots are reused reference-interface assets and are not presented as new runtime captures.

## My AI Usage

Codex was used in this development session to inspect the reference repository, scaffold the independent sibling project, implement the TypeScript/Express/Prisma backend, preserve and integrate the React frontend, write tests, run validation, and draft documentation. The master prompt and the limitation on exporting the complete chat transcript are recorded in [PROMPTS.md](PROMPTS.md). All claims in this README are based on files and commands actually inspected or executed during the session.

## Future Improvements

- Add pagination, sorting, audit history, and a production PostgreSQL deployment profile.
- Add broader browser scenarios for purchase, restock, search, and out-of-stock UI states.
