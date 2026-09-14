ALTER TABLE "subscription_plan"
  ADD COLUMN IF NOT EXISTS "is_active" BOOLEAN NOT NULL DEFAULT true;

ALTER TABLE "subscription_order"
  ADD COLUMN IF NOT EXISTS "idempotency_key" TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS "subscription_order_idempotency_key_key"
  ON "subscription_order"("idempotency_key")
  WHERE "idempotency_key" IS NOT NULL;