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

-- ---------- Seed subscription plans (flatten into existing table) ----------
insert into public.subscription_plan (sub_plan_id, name, price, duration_days)
select v.sub_plan_id, v.name, v.price, v.duration_days
from (values
  ('free', 'Free', 0, 0),
  ('premium-monthly', 'Premium Monthly', 4.99, 30),
  ('premium-annual', 'Premium Annual', 3.99, 365)
) as v (sub_plan_id, name, price, duration_days)
where not exists (select 1 from public.subscription_plan sp where sp.sub_plan_id = v.sub_plan_id);