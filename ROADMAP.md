# Angket — Working-Tree Roadmap

## Purpose

**Angket** is a community scam-detection platform for Cambodia (Khmer + English). Users learn to
spot scams, submit scam reports to a community feed, bookmark reports, and manage their profile.
An admin dashboard lets operators manage users, reports, categories, subscriptions, and
verifications.

**Stack:** React 19 + Vite + Tailwind 4 (frontend) · Express + Supabase/Prisma + PostgreSQL
(backend) · JWT auth · Gemini AI for scam analysis.

---

## What this document covers

Everything listed below is **uncommitted work** present in the working tree (`git status`), grouped
by feature with its purpose and current status. Older roadmap content was removed on request.

---

## 1. Backend data layer (Prisma + SQL sync)

**Purpose:** Move the app's live-database behaviour onto the real Prisma/Supabase tables
(`users`, `category`, `report_form`, …) that actually hold data, replacing the legacy
`profiles`/`reports`/`subscriptions` schema.

- `backend/prisma/schema.prisma` — **Prisma schema** updated:
  - `User`: added `phone` and `avatarUrl` columns.
  - New models: `ProfileImage` (+ `users.avatar_url`), `SavedReport` (bookmarks), `Verification`.
  - `ReportForm`: expanded with `title_en/title_km`, `description_en/description_km`, `category`,
    `platform`, `contact_method`, `amount_lost`, `date_occurred`, `screenshot_url`,
    `reported_count`, and anonymous-authorship fields (`is_anonymous`, `display_name`,
    `display_avatar_seed`).
  - `Category`: added `value`, `label_en/label_km`, `description_en/description_km`, `sort_order`.
  - **Note:** `@default(uuid())` is Prisma-client-side only; the database itself has no default on
    `report_form_id` unless `sync_profile.sql` has been applied (see 2).
- `backend/prisma/sync_app.sql` (new) — idempotent SQL: creates `verifications` table and seeds
  `subscription_plan` rows (Free / Premium Monthly / Premium Annual). Run via
  `npx prisma db execute --file prisma/sync_app.sql --schema prisma/schema.prisma`.
- `backend/prisma/sync_profile.sql` (new) — idempotent SQL for profile + anonymity features:
  - `users.avatar_url` column, `profile_image` and `saved_reports` tables.
  - `report_form` anonymous columns.
  - **`report_form_id` server-side default (`gen_random_uuid()`)** so REST (supabase-js) inserts
    work without an explicit id.
  - Run via `npx prisma db execute --file prisma/sync_profile.sql --schema prisma/schema.prisma`.
- `backend/prisma/src/seed/seed-reports.mjs` (new) — seeds sample scam reports into `report_form`
  for local/testing use (`node prisma/src/seed/seed-reports.mjs`).

---

## 2. Saved reports (bookmarks)

**Purpose:** Let logged-in users bookmark reports from the feed and view them later on their profile.

- `backend/prisma/src/controllers/saved-reports.controller.js` (new) + `saved-reports.routes.js`
  (new): `POST /saved-reports/:id` (save), `DELETE /saved-reports/:id` (unsave),
  `GET /saved-reports` (list saved + `savedIds` set).
  Queries parallelized and report columns include the new anonymous fields.
- `frontend/src/lib/services.js` — `reportsApi.save / unsave / listSaved`.
- `frontend/src/components/reports-feed.jsx` — save/unsave icon button on each card (optimistic
  toggle, rollback on error).
- `frontend/src/components/user-profile.jsx` — "Saved Reports" tab listing bookmarked cards with
  inline unsave and skeleton loading.

---

## 3. Report feed & report form

**Purpose:** Complete the report lifecycle: upload proof screenshots, submit richer reports, and
optionally post anonymously.

- **Screenshot uploads**
  - `frontend/src/components/report-form.jsx` — screenshot picker; file uploaded first
    (`uploadsApi.screenshot`), then the returned URL is stored with the report.
  - `backend/prisma/src/routes/uploads.routes.js` (new) — `POST /uploads/screenshot` (multer,
    auth) returns the public storage URL.
  - `backend/prisma/src/services/storageService.js` — refactored to support both `screenshots` and
    `avatars` buckets; visitor asserts the bucket exists and fails with a clear message instead of
    a silent generic error.
- **Anonymous posting (opt-in)**
  - `frontend/src/lib/alias.js` (new) — `generateAlias()` (e.g. "Swift Fox") + `generateAvatarSeed()`.
  - `report-form.jsx` — "Post this report anonymously" checkbox above Submit + updated privacy
    notice; user_id is always stored as the real user.
  - `reports.controller.js` `createReport` — accepts `isAnonymous` / `displayName` /
    `displayAvatarSeed`, stores them.
  - `reports-feed.jsx` + `user-profile.jsx` — card author row: anonymous reports show alias +
    gray avatar + "Anonymous" badge; identified reports show the user-facing name.
  - `angket.css` — checkbox (`anon-box`/`anon-check`/`anon-sub`) and author-row
    (`browse-card-author/-avatar/-authorname/-anonbadge`) styles.
- **Feed/query work** — `reports.controller.js` `REPORT_COLUMNS`/`mapReport` and saved-reports
  controller now carry all new columns; category map + report query fetched in parallel for speed.
- **UI polish on feed** — bigger save icon, 2-line title clamp, skeleton loading, white "How Angket
  Helps" icons (`solution.jsx`).

---

## 4. User profile page

**Purpose:** Give signed-in users a profile where they can manage their public info and account.

- `frontend/src/components/user-profile.jsx` (new) — routed at `/profile` (`App.jsx`):
  - Avatar with camera overlay + upload (writes to `profile_image` + `users.avatar_url`).
  - Edit name & phone (`usersApi.updateMe`), change password (`usersApi.changePassword`).
  - Tabs: **Saved Reports** and **My Reports** (My Reports list is present but **not yet backed by
    a dedicated endpoint** — see Open Issues).
- `frontend/src/components/site-header.jsx` — logged-in user chip (initials avatar + name,
  links to `/profile`) replaces the "Log in" button in desktop and mobile navs.
- `backend/prisma/src/routes/users.routes.js` — new `PUT /users/me`, `POST /users/avatar` (multer),
  `POST /users/change-password` (all auth-guarded).
- `backend/prisma/src/controllers/users.controller.js` — implemented `updateMe`, `avatar`,
  `changePassword` (avatar upload is non-blocking: writes `profile_image` first, then
  `users.avatar_url`).

---

## 5. Admin dashboard wiring (real tables)

**Purpose:** Point admin pages at the live `users`/`category`/`report_form`/`subscription_*`
tables instead of legacy empty ones, and expose subscriptions/verifications to the admin UI.

- `backend/prisma/src/middlewares/adminMiddleware.js` — admin role check now reads `users` (by
  `user_id`) instead of legacy `profiles`.
- `admin.controller.js` — dashboard stats + user/report lists + status updates against
  `users`/`report_form`; introduces `ADMIN_REPORT_COLUMNS`.
- `categories.controller.js` — CRUD against `category` with slug `category_id`, duplicate → 409,
  and a delete guard that refuses to delete categories still referenced by reports.
- `subscriptions.controller.js` — `listSubscriptions`, `listVerifications`, `updateVerification`
  against `user_subscription`/`verifications` with joined user info.
- `admin.routes.js` — added `GET /admin/subscriptions`, `GET /admin/subscriptions/verifications`,
  `PATCH /admin/subscriptions/verifications/:id`.

---

## 6. Auth & sign-up hardening

**Purpose:** Improve login redirect behaviour and tighten sign-up validation.

- `frontend/src/lib/authBack.js` — new `consumeAuthOrigin()` (read-once origin) shared by
  `goAuthBack`.
- `frontend/src/pages/Login.jsx` — role-aware redirect: admins → `/admin/dashboard`, regular users
  → previous page or home; blocks non-admins from landing on admin routes.
- `frontend/src/pages/SignUp.jsx` — selectable country code (`+855` default), phone digits-only
  filter + `+855` format validation, password rules (≥8 chars, upper, lower, digit, special
  char), and server field errors mapped to inputs.
- `frontend/src/components/auth/Checkbox.jsx` — markup fix so the checkbox input sits outside the
  styled box (restores actual toggle behaviour).

---

## 7. Packaging, docs & icons

**Purpose:** Keep dev tooling and docs consistent with the new backend layout.

- `backend/package.json` — dev/start scripts point at `prisma/src/server.js`; added `multer`.
- `README.md` — declares `backend/schema.sql` as the source of truth and documents which tables
  the app actually uses (`users`, `category`) vs legacy ones, plus how to promote an admin.
- `frontend/src/components/icons.jsx` — added icons used by the profile page (camera, edit, eye,
  trash, log-out, user, settings, phone).
- `frontend/src/lib/data.js` — exported `scene()` helper for reuse.
- `frontend/src/styles/angket.css` — +400 lines covering profile, saved cards, skeletons, anon
  checkbox, author row, feed card polish.

---

## Open issues (parked)

- **Report submission still fails with "Internal server error"** — root cause when last tested:
  `report_form_id` inserted as `NULL` (error 23502) because the DB had no default and supabase-js
  (unlike Prisma) doesn't generate UUIDs. The server-side default was added to `sync_profile.sql`
  and applied via `db execute`, and an insert test succeeded, but the user reported the issue
  still occurring after that. **Next step when resumed:** confirm `sync_profile.sql` is applied,
  restart the backend, capture the exact backend console error, and re-verify.
- **"My Reports" tab on the profile** renders the user's reports but there is no dedicated
  `GET /reports/mine` endpoint yet — it needs wiring (e.g. query `report_form` by
  `user_id = req.user.id`).
- **Profile image upload** intermittently failed earlier ("Internal server error"); avatar flow was
  reworked with clearer bucket errors (`avatars` bucket may need creating) — needs a live re-check
  once the report-insert issue is resolved.
- **Anonymous author row on feed cards** uses an info icon + alias for anonymous reports; the
  seeded `display_avatar_seed` isn't yet used to render a deterministic blocky avatar.

---

*Status snapshot: Mon Sep 7, 2026 — covers all uncommitted changes in the working tree.*