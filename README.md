# CertReady

**Prepare. Practice. Get Certified.**

CertReady is a freemium exam-preparation platform for skilled-trade and professional certifications. The MVP ships with the **EPA 608 Technician Certification** (Core, Type I, Type II, Type III) plus three Grade 1 water/wastewater operator exams. Every exam, section, question and study page lives in PostgreSQL and is managed from the admin panel, so adding exam #2 is a content task, not a code change.

All practice questions are original study material. CertReady is not affiliated with the U.S. EPA or any certifying body and never presents questions as "official".

---

## Contents

1. [Project architecture](#1-project-architecture)
2. [Database schema](#2-database-schema)
3. [Route structure](#3-route-structure)
4. [Component structure](#4-component-structure)
5. [Authentication flow](#5-authentication-flow)
6. [Admin architecture](#6-admin-architecture)
7. [SEO architecture](#7-seo-architecture)
8. [Development setup](#8-development-setup)
9. [Environment variables](#9-environment-variables)
10. [Deployment](#10-deployment)
11. [Freemium, payments and Phase 2](#11-freemium-payments-and-phase-2)
12. [Adding a new exam](#12-adding-a-new-exam)

---

## 1. Project architecture

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) + TypeScript | Server components by default; client components only where interactivity is needed (question runners, forms, charts, menus). |
| Styling | Tailwind CSS v4 + hand-written shadcn-style primitives (Radix UI + `cva`) | Brand tokens in `src/app/globals.css` (`navy`, `brand`, `success`, `teal`, …). Mobile-first. |
| Data | PostgreSQL 16 + Prisma 6 | Single `db` client in `src/lib/db.ts`. All content and user data in Postgres. |
| Auth | Custom email/password sessions | bcrypt hashes, DB-backed sessions, httpOnly cookie. Google OAuth table is in the schema for Phase 2. |
| Validation | Zod v4 | Every server action parses `FormData`/JSON before touching the DB. |
| Mutations | Next.js Server Actions | `"use server"` files under `src/lib/**/actions.ts`. No REST layer needed for the MVP. |
| Charts | Recharts | Dashboard and admin analytics. |
| Email | Resend (optional) | Falls back to console logging when `RESEND_API_KEY` is blank. |
| Analytics | Server `AnalyticsEvent` table + optional GA4 | Shared event names in `src/lib/analytics/events.ts`. |
| Ads | AdSense-ready `AdSlot` | Renders nothing until `NEXT_PUBLIC_ADSENSE_CLIENT_ID` is set. |
| Payments | Stripe-ready schema and entitlement service | **Not wired.** No fake pricing is shown. |
| AI | `StudyAssistantProvider` interface | Placeholder provider; nothing user-facing yet. |
| Hosting | Vercel + managed Postgres | Any Node host works; see [Deployment](#10-deployment). |

### Source layout

```
prisma/
  schema.prisma            data model
  migrations/              Prisma migrations
  seed.ts                  idempotent seed (categories, admin, exams, questions)
  seed-data/               EPA 608 content + legacy water exam adapter
src/
  proxy.ts                 edge redirect for /dashboard and /admin when no session cookie
  app/                     routes (see §3)
  components/              UI (see §4)
  lib/
    env.ts                 Zod-validated environment
    db.ts                  Prisma client singleton
    site.ts                site name, URL, brand copy
    utils.ts               cn(), formatters, shuffle, pluralize
    rate-limit.ts          in-memory sliding-window limiter (login, registration, reset)
    email.ts               sendEmail() → Resend or console
    entitlements.ts        getEntitlement(), hasPremiumFor(), FREE_LIMITS
    auth/                  session.ts, password.ts, tokens.ts, guards.ts, actions.ts
    content/               exams.ts (public content queries), metadata.ts (SEO helpers)
    engine/                select-questions.ts, practice-actions.ts, mock-actions.ts,
                           mock-results.ts, progress.ts
    dashboard/queries.ts   learner dashboard aggregates
    admin/                 actions.ts (CRUD, import, moderation), queries.ts (lists, analytics)
    analytics/             events.ts, server.ts (trackServer), client.ts (gtag), actions.ts
    ai/                    types.ts (StudyAssistantProvider), provider.ts (registry)
```

### Request flow

1. **Public content pages** are server components. They call `src/lib/content/exams.ts`, which only returns `PUBLISHED` exams/questions, and render full HTML (including JSON-LD) on the server.
2. **Practice / mock** pages call a server action (`startPractice`, `startMock`) during render to select questions. Correct-answer flags never reach the browser; `submitAnswer` / `submitMock` grade on the server and return the explanation and source.
3. **Signed-in mutations** (bookmark, report, profile, admin CRUD) are server actions that re-check the session and role inside the action (`assertUser`, `assertAdmin`), so the UI cannot bypass authorization.
4. `src/proxy.ts` is a cheap edge redirect for `/dashboard/*` and `/admin/*` when the session cookie is absent. Real authorization lives in the route layouts (`requireUser`, `requireAdmin`).

---

## 2. Database schema

Defined in `prisma/schema.prisma`. Grouped by concern:

**Identity**

| Model | Purpose |
| --- | --- |
| `User` | email, `passwordHash`, `name`, `role` (`USER`/`ADMIN`), `status` (`ACTIVE`/`SUSPENDED`), `targetExamId`, `examDate`, `lastLoginAt` |
| `Session` | DB-backed session; stores `tokenHash` (SHA-256 of the cookie token), `expiresAt`, `userAgent` |
| `PasswordResetToken` | hashed single-use token, 1-hour expiry, `usedAt` |
| `OAuthAccount` | provider + provider account id (Google, Phase 2) |

**Content**

| Model | Purpose |
| --- | --- |
| `CertificationCategory` | top-level grouping (HVAC & refrigeration, water & wastewater, security, …) with slug, description, icon, sort order |
| `Exam` | one certification: slug, title, `summary`, markdown `overview` / `whoShouldTake` / `requirements` / `studyGuide`, `faq` JSON, `officialResources` JSON, `certifyingBody`, `scope` (`FEDERAL`/`STATE`/`NATIONAL_PRIVATE`) + `states[]`, `difficulty`, `status` (`DRAFT`/`PUBLISHED`/`ARCHIVED`), `isFeatured`, real-exam facts (`realQuestionCount`, `realTimeMinutes`, `passingScoreText`), mock config (`mockQuestionCount`, `mockTimeMinutes`), `freeQuestionLimit`, `seoTitle`, `seoDescription`, `publishedAt` |
| `ExamCategory` | a section of one exam (EPA 608: Core, Type I, II, III) with `weight` (% of real exam), `longDescription` markdown for its landing page, SEO fields. Unique on `(examId, slug)` |
| `SourceReference` | citation (title, url, publisher, notes) attached to questions |
| `Question` | belongs to `Exam` + `ExamCategory`; `prompt`, `explanation`, `difficulty`, `status`, `isFree`, `tags[]`, `sourceId`, `sourceNote`, `timesAnswered`, `timesCorrect` |
| `QuestionOption` | `label` (A–F), `text`, `isCorrect`, `sortOrder` |

**Learning**

| Model | Purpose |
| --- | --- |
| `PracticeSession` | `mode` (`QUICK`/`CATEGORY`/`RANDOM`), exam, optional category, counts, `startedAt`/`completedAt` |
| `PracticeAnswer` | one graded answer in a session (`selectedOptionId`, `isCorrect`, `timeSpentSec`) |
| `MockExam` | `status` (`IN_PROGRESS`/`COMPLETED`/`ABANDONED`), `totalQuestions`, `timeLimitSec`, `startedAt`, `completedAt`, `timeTakenSec`, `correctCount`, `scorePercent` |
| `MockExamQuestion` | fixed question order for a mock (`position`), saved `selectedOptionId`, `isCorrect`, `isFlagged`; unique on `(mockExamId, questionId)` — enables resume after reload |
| `UserProgress` | per user × exam rollup: questions answered/correct, mocks completed, best/last score, streak, `lastActivityAt` |
| `Bookmark` | user × question, unique |
| `QuestionReport` | user-submitted issue with `reason`, `details`, `status` (`OPEN`/`RESOLVED`/`DISMISSED`), `resolvedAt` |

**Commerce (schema only)**

| Model | Purpose |
| --- | --- |
| `Subscription` | `plan` (`FREE`/`MONTHLY`/`ANNUAL`/`EXAM_PACKAGE`), `status` (`ACTIVE`/`TRIALING`/`PAST_DUE`/`CANCELED`/`EXPIRED`), optional `examId` for exam packages, Stripe ids, `currentPeriodEnd` |
| `Payment` | amount, currency, `status`, Stripe payment intent id |

**Analytics**

| Model | Purpose |
| --- | --- |
| `AnalyticsEvent` | `name`, optional `userId`, `examId`, `properties` JSON, `createdAt`. Source for DAU/MAU, popular exams and event counts in admin |

Key indexes: `Question(examId, status)`, `Question(categoryId, status)`, `MockExam(userId, startedAt)`, `MockExam(examId, status)`, `AnalyticsEvent(name, createdAt)`, `AnalyticsEvent(userId, createdAt)`.

---

## 3. Route structure

All routes are server-rendered on demand (the root layout reads the session cookie), so the production build needs no database connection.

**Public**

| Route | Purpose |
| --- | --- |
| `/` | Homepage: hero, popular exams, categories, how it works, why CertReady, real platform stats, FAQ, CTA |
| `/exams` | Exam directory with `q`, `category`, `state`, `sort` filters (GET form, crawlable) |
| `/exams/[slug]` | Exam hub: overview, facts card, sections, official resources, FAQ, Course + Breadcrumb JSON-LD |
| `/exams/[slug]/practice-test` | Practice-test landing (mode picker, free-tier explanation) |
| `/exams/[slug]/study-guide` | Long-form markdown study guide |
| `/exams/[slug]/requirements` | Eligibility, fees, scheduling, retakes |
| `/exams/[slug]/faq` | FAQ page with FAQPage JSON-LD |
| `/exams/[slug]/[categorySlug]` | Section landing page (e.g. `/exams/epa-608/core`, `/type-1`, `/type-2`, `/type-3`) |
| `/practice/[slug]` | Practice setup (quick / by section / random with count) |
| `/practice/[slug]/run` | Practice runner (`?mode=QUICK|CATEGORY|RANDOM&category=&count=`); guests allowed within `freeQuestionLimit` |
| `/mock/[slug]` | Mock exam intro (question count, time, free-limit messaging) |
| `/mock/[slug]/run` | Timed mock runner; resumes an unfinished attempt for signed-in users |
| `/mock/results/[mockId]` | Stored result for a signed-in user's completed mock |
| `/pricing` | Free vs. premium comparison, "coming soon" — no prices, no checkout |
| `/about`, `/privacy`, `/terms` | Static pages |
| `/sitemap.xml`, `/robots.txt` | Generated from published content; disallows `/admin`, `/dashboard`, `/api`, runners and results |
| `/icon.png`, `/opengraph-image.png` | Brand assets via metadata routes |

**Auth** (route group `(auth)`)

`/login`, `/register`, `/forgot-password`, `/reset-password?token=…` — all accept `?next=` (same-origin paths only).

**Learner (requires session)**

| Route | Purpose |
| --- | --- |
| `/dashboard` | Stats, target-exam readiness, score trend, accuracy by section, weak categories, recent mocks, exams in progress |
| `/dashboard/history` | Completed mocks and practice sessions |
| `/dashboard/bookmarks` | Saved questions with explanations |
| `/dashboard/profile` | Name, target exam, exam date, change password, subscription placeholder |

**Admin (requires `ADMIN` role)**

| Route | Purpose |
| --- | --- |
| `/admin` | Analytics: users, questions answered, mocks, DAU/MAU, published content, open reports, signups chart, event counts, popular exams |
| `/admin/exams`, `/admin/exams/new`, `/admin/exams/[id]` | Exam list, create, edit (content, SEO, mock config, states), publish/archive, section manager |
| `/admin/exams/[id]/questions`, `/questions/new`, `/admin/questions/[id]` | Question table with filters and bulk status, create/edit question |
| `/admin/exams/[id]/import` | JSON bulk import with per-row validation |
| `/admin/categories`, `/admin/sources` | Certification categories and source references |
| `/admin/users`, `/admin/users/[id]` | Search, activity, suspend/reactivate, promote/demote |
| `/admin/reports` | Question issue reports: resolve / dismiss |

---

## 4. Component structure

```
src/components/
  ui/            button, card, input (Input, Textarea, NativeSelect, Label, Field, FieldError),
                 badge, progress, dialog, dropdown-menu, tabs, switch, table,
                 misc (Alert, EmptyState, PageHeader, Stat, Separator, Skeleton)
  layout/        site-header (Logo, nav, UserMenu, MobileNav), site-footer, user-menu, mobile-nav
  seo/           json-ld (Organization, Website, Breadcrumb, FAQ, Course), breadcrumbs
  exams/         exam-card, exam-subnav (Overview / Practice test / Study guide / Requirements / FAQ),
                 exam-page-shell (ExamPageShell, ExamFactsCard, ExamCategoriesCard, OfficialResourcesCard)
  practice/      question-card (QuestionCard, ExplanationPanel), question-tools (BookmarkButton, ReportButton),
                 practice-runner (client)
  mock/          mock-runner (client: timer, flags, palette, confirm dialog, autosave, resume),
                 mock-results (score, by-section, recommendations, review tabs)
  auth/          auth-shell, auth-forms (Login, Register, ForgotPassword, ResetPassword via useActionState)
  dashboard/     dashboard-nav, charts (ScoreTrendChart, CategoryBarChart), bookmark-list, profile-forms
  admin/         admin-nav, exam-form, exam-status-controls, category-manager, question-table,
                 question-form, import-form, simple-forms, user-controls, report-controls, signup-chart
  ads/           ad-slot (no-op without AdSense id)
  analytics/     scripts (GA + AdSense loaders), exam-view-tracker
  markdown.tsx   react-markdown + remark-gfm with .prose-cr styles
```

Conventions: server components by default; `"use client"` only for the runners, forms with `useActionState`, charts, menus and trackers. Forms post to server actions and render `FormState { error, fieldErrors, success }`.

---

## 5. Authentication flow

**Registration** (`registerAction`) → Zod validates name/email/password (min 8) → rate-limited per IP → email uniqueness check → `bcrypt` hash → `User` created → session created → `registration` event → redirect to `next` or `/dashboard`.

**Login** (`loginAction`) → rate-limited per IP (20 / 15 min) and per email (8 / 15 min) → constant-time password verify → rejects `SUSPENDED` accounts → `lastLoginAt` updated → session created → `login` event → redirect to safe `next`.

**Sessions** → a random 32-byte token is set in the `certready_session` cookie (`httpOnly`, `sameSite=lax`, `secure` in production, `SESSION_TTL_DAYS` expiry). Only its SHA-256 hash (keyed by `AUTH_SECRET`) is stored in `Session`. `getCurrentUser()` is wrapped in React `cache()` so a request hits the DB once.

**Logout** → deletes the `Session` row and clears the cookie.

**Forgot / reset** → `forgotPasswordAction` always returns the same message (no account enumeration), creates a hashed 1-hour `PasswordResetToken`, and emails `/reset-password?token=…` (console in dev). `resetPasswordAction` verifies, marks the token used, updates the hash, destroys **all** sessions for the user, starts a fresh session.

**Guards**

- `src/proxy.ts`: redirect to `/login?next=…` when the cookie is missing on `/dashboard/*` or `/admin/*`.
- `requireUser()` / `requireAdmin()` in layouts: redirect (non-admins hitting `/admin` go to `/dashboard`).
- `assertUser()` / `assertAdmin()` inside server actions: throw `AuthError`.

**Security notes** → server actions are same-origin by construction (CSRF-safe), all inputs are Zod-parsed, `next` redirects only accept same-origin paths, answer keys never leave the server, and admin actions re-verify the role on every call. The rate limiter is in-memory (per instance); swap in Redis/Upstash for multi-region deployments.

**Anonymous practice** → guests can run practice sets up to `Exam.freeQuestionLimit` and a shortened mock (`FREE_LIMITS.guestMockQuestions`); nothing is persisted for guests and the UI prompts them to register to save progress.

---

## 6. Admin architecture

- `src/app/admin/layout.tsx` calls `requireAdmin()`; every server action in `src/lib/admin/actions.ts` calls `assertAdmin()` again.
- **Exams**: `createExamAction`, `updateExamAction`, `setExamStatusAction` (draft → published → archived; sets `publishedAt`). `revalidatePublic(slug)` refreshes the homepage, directory, exam pages and sitemap after any change.
- **Sections**: `upsertCategoryAction`, `deleteCategoryAction` (blocked when questions exist).
- **Questions**: `createQuestionAction` (with "save & add another"), `updateQuestionAction` (replaces removed options, updates/creates the rest), `bulkQuestionStatusAction`, `deleteQuestionAction`, free/premium flag, difficulty, tags, source + note.
- **Bulk import**: `importQuestionsAction` accepts a JSON array of  
  `{ category, prompt, options[], correctIndex, explanation, difficulty?, isFree?, tags?, sourceNote? }`,  
  validates each row against the exam's section slugs, imports valid rows (draft or published) and returns per-row errors.
- **Taxonomy**: `createCertificationCategoryAction`, `createSourceAction`.
- **Users**: search, per-user activity, `setUserStatusAction` (suspend/reactivate also destroys sessions), `setUserRoleAction`.
- **Reports**: `resolveReportAction` marks a report resolved or dismissed.
- **Analytics** (`getAdminAnalytics`): totals, 7/30-day signups, DAU/MAU from distinct `AnalyticsEvent.userId`, event counts, popular exams; conversion metrics appear once billing is enabled.

---

## 7. SEO architecture

- **Metadata**: root `metadataBase` = `NEXT_PUBLIC_SITE_URL`, title template `%s | CertReady`, per-page `generateMetadata` via `examMetadata()` (title, description, canonical, Open Graph, Twitter). Admin/dashboard/runners set `robots: noindex`.
- **Structured data** (`src/components/seo/json-ld.tsx`): `Organization` + `WebSite` on every page; `BreadcrumbList` on exam pages; `Course` on exam hubs; `FAQPage` on FAQ pages and the homepage.
- **Server rendering**: all public content pages are server components with full HTML, semantic headings and visible breadcrumbs. Internal linking: header/footer → exam hub → sections/study guide/requirements/FAQ/practice.
- **Sitemap / robots**: `src/app/sitemap.ts` lists static pages and every published exam page and section (`lastModified` from `updatedAt`); `robots.ts` disallows private areas.
- **Content model**: `Exam.seoTitle/seoDescription`, `ExamCategory.seoTitle/seoDescription`, markdown long-form fields, and FAQ JSON are all editable in admin, so landing pages can be tuned without deploys.
- **Assets**: `icon.png` and `opengraph-image.png` metadata routes from the brand logo.
- **Ads**: `AdSlot` reserves at most a few positions per content page and renders nothing until AdSense is configured, keeping layout stable and avoiding an ad-farm look.

---

## 8. Development setup

Prerequisites: Node 20+ (Node 22/23 recommended; the seed uses `--env-file`), Docker Desktop, npm.

```bash
# 1. Install
npm install                       # also runs `prisma generate`

# 2. Environment
cp .env.example .env
#    edit AUTH_SECRET (openssl rand -base64 32); the rest works locally as-is

# 3. Database (PostgreSQL 16 in Docker, port 5433)
npm run db:up
npm run db:migrate                # applies prisma/migrations; creates a new one if the schema changed

# 4. Seed content + admin user
npm run db:seed                   # 6 categories, admin (ADMIN_EMAIL/ADMIN_PASSWORD), 4 exams, 101 questions

# 5. Run
npm run dev                       # http://localhost:3000  (or: npx next dev -p 3210)
```

Useful commands:

| Command | What it does |
| --- | --- |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (Next + React Hooks rules) |
| `npm run build` | Production build (no DB needed) |
| `npm run db:studio` | Prisma Studio |
| `npm run db:deploy` | `prisma migrate deploy` (CI/production) |

Sign in as the seeded admin (`admin@certready.local` / `ChangeMe123!` by default) and open `/admin`. Password-reset emails print to the dev server console when `RESEND_API_KEY` is empty.

---

## 9. Environment variables

Validated at boot by `src/lib/env.ts`; a missing required value fails fast. Copy from `.env.example`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | yes | PostgreSQL connection string (local Docker: `postgresql://certready:certready@localhost:5433/certready?schema=public`) |
| `AUTH_SECRET` | yes | ≥16 chars (use 32+ random bytes). Keys session/reset token hashes. Rotating it invalidates all sessions |
| `SESSION_TTL_DAYS` | no (30) | Session lifetime |
| `NEXT_PUBLIC_SITE_URL` | production | Public origin without trailing slash; canonical URLs, sitemap, OG, reset links |
| `RESEND_API_KEY` | no | Enables real email; blank → console |
| `EMAIL_FROM` | no | From address for outbound mail |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | seed only | Bootstrap admin account created by `db:seed` if it does not exist |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | no | GA4; loader renders only when set |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | no | AdSense; `AdSlot` renders only when set |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Phase 2 | Google OAuth (schema ready, not wired) |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Phase 2 | Stripe (schema + entitlements ready, not wired) |

---

## 10. Deployment

### Vercel + managed Postgres (recommended)

1. **Database**: create a PostgreSQL 16 instance (Neon, Supabase, Vercel Postgres, RDS). Copy the pooled connection string as `DATABASE_URL`. If the provider offers a direct (non-pooled) URL, use that for migrations.
2. **Project**: import the repository into Vercel (Framework: Next.js; build command `npm run build`; install command `npm install`, which runs `prisma generate`).
3. **Environment variables** (Production + Preview): `DATABASE_URL`, `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL` (e.g. `https://certready.com`), `RESEND_API_KEY`, `EMAIL_FROM`, optional `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_ADSENSE_CLIENT_ID`.
4. **Migrate + seed** once from your machine against the production database:

   ```bash
   DATABASE_URL="postgresql://…" npx prisma migrate deploy
   DATABASE_URL="postgresql://…" ADMIN_EMAIL="you@company.com" ADMIN_PASSWORD="<strong>" \
     npx tsx prisma/seed.ts
   ```

   The seed is idempotent: it upserts categories and exams by slug and only inserts questions for exams that have none, so re-running it later does not duplicate content.
5. **Deploy**. Log in with the admin account, change its password in `/dashboard/profile`, and review `/admin`.
6. **Ongoing schema changes**: commit new migrations from `npm run db:migrate` locally, then run `npx prisma migrate deploy` against production before (or as part of) the deploy. A safe pattern is a Vercel build command of `prisma migrate deploy && next build` **only** if the build has network access to the DB; otherwise run migrations from CI.

### Other hosts (Docker / VPS / Railway / Fly)

- Build: `npm ci && npm run build`. Start: `npm run start` (or `node .next/standalone/server.js` with `output: "standalone"`).
- Run `npx prisma migrate deploy` on release.
- Put the app behind HTTPS; the session cookie is `secure` in production.
- The rate limiter is per process. For multiple instances, replace `src/lib/rate-limit.ts` with a Redis-backed implementation (same `rateLimit(key, limit, windowSec)` signature).

### Post-launch checklist

- Set `NEXT_PUBLIC_SITE_URL` before indexing so canonicals and the sitemap are correct.
- Submit `/sitemap.xml` in Google Search Console.
- Configure Resend's sending domain (SPF/DKIM) for password-reset mail.
- Add AdSense only after content volume justifies it; slots are already reserved.

---

## 11. Freemium, payments and Phase 2

- **Entitlements** (`src/lib/entitlements.ts`) are the single source of truth: `getEntitlement(userId)` reads `Subscription` rows; `hasPremiumFor(entitlement, examId)` handles site-wide vs. exam-package plans. Practice, mock and dashboard code call these rather than checking subscriptions directly.
- **Free tier today**: guests practise up to `Exam.freeQuestionLimit` questions per set and a 10-question mock; free accounts get all `isFree` questions, 2 completed mocks per exam, bookmarks, history and the dashboard. Premium questions (`isFree = false`) and unlimited mocks unlock when a subscription exists.
- **Stripe**: `Subscription`/`Payment` tables and env vars are in place. Wiring Stripe means adding checkout + webhook handlers that write `Subscription` rows; nothing else needs to change. The pricing page intentionally shows no prices or checkout until then.
- **AI (Phase 2)**: `src/lib/ai/types.ts` defines `StudyAssistantProvider` (`explainQuestion`, `generateSimilarQuestions`, `buildStudyPlan`, `analyzeWeakTopics`). `registerStudyAssistant()` swaps in a real provider; `aiEnabled()` lets UI show features only when configured.
- **Google login**: `OAuthAccount` model and env vars exist; add the OAuth route handlers and reuse `createSession()`.

---

## 12. Adding a new exam

No code required:

1. `/admin/categories` → make sure a certification category exists.
2. `/admin/exams/new` → fill title, slug, summary, certifying body, scope/states, real-exam facts, mock settings, free-question limit, markdown pages (overview, who should take, requirements, study guide), FAQ and official resources, SEO fields. Save as **draft**.
3. On the exam page → add **sections** with weights that sum to ~100.
4. Add questions individually or via `/admin/exams/[id]/import` with the JSON format above. Mark a healthy share as free.
5. Publish the exam (and its questions). `revalidatePublic` updates the homepage, `/exams`, the new exam's pages and the sitemap immediately.

Seeded content can also be added in `prisma/seed-data/` for reproducible environments.
