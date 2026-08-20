# Repository Guidelines

## Project Structure & Module Organization

TaskFlow is split into two independent npm packages:

- `client/`: Next.js 16 App Router UI. Pages live in `src/app/`, UI in `src/components/`, API helpers in `src/lib/api.ts`, and assets in `public/`.
- `server/`: Express 5 API. Routes and handlers currently live in `src/server.ts`; Prisma setup is in `src/lib/prisma.ts`.
- `server/prisma/`: PostgreSQL schema and migrations. Regenerate the ignored client under `server/src/generated/prisma/` locally.
- `insert-into.sql`: development seed statements. `outputs/` contains artifacts, not runtime source.

The browser data path is React page → `client/src/lib/api.ts` → Express route → Prisma → PostgreSQL. Also follow the narrower rules in `client/AGENTS.md` when changing client code.

## Build, Test, and Development Commands

Run commands inside the relevant package; there is no root package script.

```bash
cd client && npm ci && npm run dev            # UI on localhost:3000
cd server && npm ci && npx prisma generate
cd server && npm run dev                       # API, normally port 5000
cd client && npm run lint                      # Next.js ESLint rules
cd client && npx tsc --noEmit && npm run build
cd server && npm run typecheck
cd server && npx prisma migrate dev --name describe_change
```

## Coding Style & Naming Conventions

Use strict TypeScript, two-space indentation, double quotes, semicolons, and trailing commas. Use `PascalCase` for React components and types, `camelCase` for functions and variables, and lowercase filenames. Keep API responses consistent (`{ data: ... }` or `{ message: ... }`) and validate request input before Prisma calls. Never edit generated Prisma files.

## Testing Guidelines

No test framework or coverage threshold is configured. Server `npm test` is a failing placeholder, not validation. Until tests exist, changes should pass client lint/typecheck/build and server typecheck, plus manual checks of affected API and UI flows. Name future tests `*.test.ts` or `*.test.tsx` and add a package script for the chosen runner.

## Commit & Pull Request Guidelines

History contains only `First-Commit`, so no convention is established. Use imperative subjects such as `Add project search validation`. Pull requests should explain behavior and data-flow changes, list validation commands, link issues, call out schema or environment changes, and include screenshots for UI work.

## Security & Configuration

Keep secrets out of Git. The server expects `DATABASE_URL` and `CLIENT_URL`; the client may set `NEXT_PUBLIC_API_URL`. Commit Prisma migrations, but never `.env` files or generated clients.
