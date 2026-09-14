ALTER TABLE "subscription_order"
  ADD COLUMN IF NOT EXISTS "payment_method" TEXT;