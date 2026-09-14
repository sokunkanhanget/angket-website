-- ============================================================
-- Angket — app schema sync (idempotent)
-- Reuses the existing Prisma tables on the live Supabase DB.
-- Only new object created: `verifications` (no table existed).
--
-- Run with:  npx prisma db execute --file prisma/sync_app.sql --schema prisma/schema.prisma
-- (from backend/)
-- ============================================================

-- ---------- Verifications (new — no existing table) ----------
create table if not exists public.verifications (
  id           text        primary key default (gen_random_uuid()::text),
  user_id      text        references public.users (user_id) on delete cascade,
  type         text        not null default '',
  status       text        not null default 'pending'
               check (status in ('pending', 'approved', 'rejected')),
  submitted_at timestamptz not null default now(),
  reviewed_at  timestamptz
);

-- ---------- Subscription limits and usage ----------
alter table public.subscription_order
  add column if not exists payment_method text,
  add column if not exists idempotency_key text,
  add column if not exists qr_md5 text,
  add column if not exists transaction_id text;

create unique index if not exists subscription_order_idempotency_key_key
  on public.subscription_order (idempotency_key)
  where idempotency_key is not null;

create unique index if not exists subscription_order_transaction_id_key
  on public.subscription_order (transaction_id)
  where transaction_id is not null;

alter table public.subscription_plan
  add column if not exists max_members int not null default 1,
  add column if not exists daily_file_limit int not null default 3,
  add column if not exists daily_message_limit int not null default 10,
  add column if not exists daily_token_limit int not null default 15000,
  add column if not exists is_active boolean not null default true,
  add column if not exists supports_khmer boolean not null default true,
  add column if not exists supports_english boolean not null default true,
  add column if not exists supports_live_detection boolean not null default false;

create table if not exists public.subscription_usage (
  usage_id text primary key default (gen_random_uuid()::text),
  usage_date date not null,
  file_count int not null default 0,
  message_count int not null default 0,
  token_count int not null default 0,
  user_sub_id text not null references public.user_subscription (sub_id) on delete cascade,
  unique (user_sub_id, usage_date)
);

-- ---------- Seed the supported plans (idempotent) ----------
insert into public.subscription_plan
  (sub_plan_id, name, price, duration_days, max_members, daily_file_limit,
   daily_message_limit, daily_token_limit, is_active, supports_khmer, supports_english,
   supports_live_detection)
values
  ('free', 'Free', 0, 0, 1, 3, 10, 15000, true, true, true, false),
  ('individual', 'Individual', 1.99, 30, 1, 5, 15, 60000, true, true, true, false),
  ('family', 'Family', 5.99, 30, 5, 15, 50, 200000, true, true, true, false)
on conflict (sub_plan_id) do update set
  name = excluded.name,
  price = excluded.price,
  duration_days = excluded.duration_days,
  max_members = excluded.max_members,
  daily_file_limit = excluded.daily_file_limit,
  daily_message_limit = excluded.daily_message_limit,
  daily_token_limit = excluded.daily_token_limit,
  is_active = excluded.is_active,
  supports_khmer = excluded.supports_khmer,
  supports_english = excluded.supports_english,
  supports_live_detection = excluded.supports_live_detection;