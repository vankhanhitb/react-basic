# Commerce Practice Lab

A focused full-stack project for learning how Next.js, strict TypeScript, Tailwind CSS, React Hook Form, Zod, PostgreSQL, Prisma, Auth.js, Vitest and Playwright cooperate in one real workflow.

The project is intentionally small: an authenticated merchant creates products and quantity-break offers. The scope is small enough to understand, but the data flow crosses the important production boundaries.

## Core data flow

```text
Browser interaction
  → React Hook Form manages temporary form state
  → Zod validates shape and business constraints in the client
  → Server Action receives untrusted input
  → Zod validates again at the server boundary
  → Auth.js resolves the current identity
  → authorization scopes the write to that user
  → Prisma maps the use case to relational queries
  → PostgreSQL persists Product + QuantityTier records
  → revalidatePath invalidates affected server-rendered pages
  → Next.js renders the updated product list
```

## Why each technology exists

| Technology | Responsibility in this project | File to inspect first |
| --- | --- | --- |
| Next.js 16 | Routes, Server Components, Server Actions, revalidation and Proxy | `src/app`, `src/actions/products.ts`, `proxy.ts` |
| TypeScript strict | Compile-time contracts and boundary visibility | `tsconfig.json` |
| Tailwind CSS 4 | Responsive UI and shared component utilities | `src/app/globals.css` |
| React Hook Form | Client-side form state and dynamic quantity tiers | `src/components/products/product-form.tsx` |
| Zod 4 | Runtime validation for browser and server input | `src/domain/product/product.schema.ts` |
| PostgreSQL | Durable relational source of truth | `docker-compose.yml` |
| Prisma 7 | Schema, migrations, relations and type-safe queries | `prisma/schema.prisma`, `src/lib/prisma.ts` |
| Auth.js 5 beta | Credential sign-in, JWT session and protected routes | `src/auth.ts`, `proxy.ts` |
| Vitest | Fast tests for pricing and validation rules | `src/domain/product/*.test.ts` |
| Playwright | Real browser tests for auth and product creation | `e2e` |

## Project structure

```text
nextjs-commerce-lab/
├── e2e/
│   ├── public.spec.ts                 # public page + protected-route behavior
│   └── product-flow.spec.ts           # login → create product → verify UI
├── prisma/
│   ├── migrations/                    # versioned PostgreSQL schema changes
│   ├── schema.prisma                  # User, Product, QuantityTier relations
│   └── seed.ts                        # repeatable practice account + product
├── src/
│   ├── actions/
│   │   └── products.ts                # authenticated mutation boundary
│   ├── app/
│   │   ├── api/auth/[...nextauth]/    # Auth.js Route Handler
│   │   ├── dashboard/                 # protected Server Components
│   │   ├── sign-in/                   # credential login UI
│   │   └── page.tsx                   # public architecture overview
│   ├── components/
│   │   ├── auth/sign-in-form.tsx      # RHF + Zod + Auth.js client call
│   │   └── products/product-form.tsx  # dynamic tiers + Server Action
│   ├── domain/product/
│   │   ├── pricing.ts                 # pure business rule
│   │   └── product.schema.ts          # shared runtime contract
│   ├── generated/prisma/              # generated database client
│   ├── lib/
│   │   ├── prisma.ts                  # one Prisma client in development
│   │   └── require-user.ts            # server authorization guard
│   └── auth.ts                        # Auth.js configuration
├── docker-compose.yml                 # local PostgreSQL
├── playwright.config.ts
├── prisma.config.ts                   # Prisma 7 datasource + seed config
├── proxy.ts                           # Next.js 16 protected-route proxy
└── vitest.config.ts
```

## Run locally

Requirements: Node.js 20.19+ and Docker Desktop.

```bash
npm install
cp .env.example .env
docker compose up -d
npm run db:deploy
npm run db:seed
npm run dev
```

Open `http://localhost:3000` and sign in with:

```text
admin@example.com
Practice123!
```

Generate a strong local auth secret when you stop using the provided practice value:

```bash
npx auth secret
```

## Verification commands

```bash
npm run typecheck     # strict TypeScript
npm run lint          # Next.js ESLint rules
npm test              # Vitest unit/contract tests
npm run test:e2e      # Playwright browser flow; database must be running + seeded
npm run build         # production build
```

Install the Playwright browser once before the first E2E run:

```bash
npx playwright install chromium
```

## Practice path

### Stage 1 — Trace before changing

Create one product, then explain:

1. Which code runs in the browser?
2. Why does Zod validate twice?
3. Where is identity established?
4. Where is ownership enforced?
5. Which records are written in one nested Prisma operation?
6. Why does the product list update without a client fetch library?

### Stage 2 — Change one requirement

Add an edit-product flow. Reuse the schema, require the current user, and update only a product owned by that user. Add a Vitest case for invalid tiers and a Playwright case for the edit flow.

### Stage 3 — Force a boundary failure

Try these experiments one at a time:

- Remove server-side Zod validation and submit an action outside the form.
- Remove the `ownerId` constraint from a query and explain the security risk.
- Use floating-point dollars in PostgreSQL instead of integer cents and compare rounding behavior.
- Remove `revalidatePath` and observe stale server-rendered output.
- Move Prisma into a Client Component and read the build error as a boundary lesson.

### Stage 4 — Extend the domain

Add an `Order` aggregate with order lines and a pricing snapshot. Do not recalculate historical orders from the current product price. This teaches why database state and business history are different concerns.

## Important implementation decisions

- **Server Components first:** dashboard reads happen on the server. TanStack Query or Redux would add complexity without solving a current problem.
- **Money uses integer cents:** `3200` means `$32.00`, avoiding common floating-point errors.
- **Credentials are a learning mechanism:** Auth.js documents that the Credentials provider does not persist users automatically. This project deliberately owns password hashing and user persistence. For production, prefer OAuth, email magic links or passkeys and add rate limiting, password reset and account verification.
- **Authentication is not authorization:** a valid session is insufficient. Product writes and reads are scoped by `user.id`.
- **Pure rules stay framework-independent:** the quantity-break calculator imports no React, Next.js or Prisma code, so Vitest can exercise it quickly.
- **Prisma 7 uses a driver adapter:** `PrismaPg` receives the PostgreSQL connection string, while `prisma.config.ts` owns CLI configuration.

## Official references

- [Next.js documentation](https://nextjs.org/docs)
- [Next.js forms and Server Actions](https://nextjs.org/docs/app/guides/forms)
- [Next.js authentication guide](https://nextjs.org/docs/app/guides/authentication)
- [Next.js data security](https://nextjs.org/docs/app/guides/data-security)
- [React Hook Form](https://react-hook-form.com/get-started)
- [Zod](https://zod.dev/)
- [Prisma with Next.js](https://www.prisma.io/docs/guides/frameworks/nextjs)
- [Prisma PostgreSQL connector](https://www.prisma.io/docs/orm/core-concepts/supported-databases/postgresql)
- [Auth.js installation](https://authjs.dev/getting-started/installation)
- [Auth.js Credentials provider](https://authjs.dev/getting-started/authentication/credentials)
- [Vitest guide](https://vitest.dev/guide/)
- [Playwright writing tests](https://playwright.dev/docs/writing-tests)

## Version note

This scaffold targets the current stack available on 13 August 2026: Next.js 16.3, React 19.2, Prisma 7.9, Zod 4, Vitest 4 and Playwright 1.62. Auth.js documentation currently covers `next-auth@5.0.0-beta` and later, so the project pins the v5 beta line intentionally rather than silently mixing v4 examples with the App Router API.
