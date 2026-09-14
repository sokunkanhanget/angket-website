ALTER TABLE "subscription_order"
  ADD COLUMN IF NOT EXISTS "qr_md5" TEXT,
  ADD COLUMN IF NOT EXISTS "transaction_id" TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS "subscription_order_transaction_id_key"
  ON "subscription_order"("transaction_id")
  WHERE "transaction_id" IS NOT NULL;