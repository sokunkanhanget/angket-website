-- ============================================================
-- Angket — profile features sync (idempotent)
--   * profile_image     -> stores profile images per user
--   * saved_reports     -> one row per user/report bookmark
--   * anonymous fields  -> report authorship anonymity
--
-- Run with:  npx prisma db execute --file prisma/sync_profile.sql --schema prisma/schema.prisma
-- (from backend/)
-- ============================================================

alter table public.users add column if not exists avatar_url text;

create table if not exists public.profile_image (
  id         uuid        primary key default gen_random_uuid(),
  user_id    uuid        not null references public.users (user_id) on delete cascade,
  image_url  text        not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_profile_image_user on public.profile_image (user_id);

create table if not exists public.saved_reports (
  id             text        primary key default (gen_random_uuid()::text),
  user_id        text        not null references public.users (user_id) on delete cascade,
  report_form_id text        not null references public.report_form (report_form_id) on delete cascade,
  created_at     timestamptz not null default now(),
  unique (user_id, report_form_id)
);

-- Anonymous posting support (defaults to identified)
alter table public.report_form
  add column if not exists is_anonymous boolean not null default false,
  add column if not exists display_name text,
  add column if not exists display_avatar_seed text;

-- Server-side id default so REST (supabase-js) inserts work without an explicit id
alter table public.report_form alter column report_form_id set default gen_random_uuid();