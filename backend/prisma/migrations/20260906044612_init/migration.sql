-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "bot_subscriber" (
    "user_sub_id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "platform_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "bot_subscriber_pkey" PRIMARY KEY ("user_sub_id")
);

-- CreateTable
CREATE TABLE "report_form" (
    "report_form_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "report_form_pkey" PRIMARY KEY ("report_form_id")
);

-- CreateTable
CREATE TABLE "report_image" (
    "report_image_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "report_form_id" TEXT NOT NULL,

    CONSTRAINT "report_image_pkey" PRIMARY KEY ("report_image_id")
);

-- CreateTable
CREATE TABLE "category" (
    "category_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "subscription_plan" (
    "sub_plan_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "duration_days" INTEGER NOT NULL,

    CONSTRAINT "subscription_plan_pkey" PRIMARY KEY ("sub_plan_id")
);

-- CreateTable
CREATE TABLE "user_subscription" (
    "sub_id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "payment_ref" TEXT,
    "end_date" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "previous_sub_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "sub_plan_id" TEXT NOT NULL,

    CONSTRAINT "user_subscription_pkey" PRIMARY KEY ("sub_id")
);

-- CreateTable
CREATE TABLE "subscription_order" (
    "order_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "status" TEXT NOT NULL,
    "proof_ref" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paid_at" TIMESTAMP(3),
    "bot_sub_id" TEXT NOT NULL,
    "sub_plan_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "subscription_order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "subscription_member" (
    "member_id" TEXT NOT NULL,
    "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "removed_at" TIMESTAMP(3),
    "user_sub_id" TEXT NOT NULL,
    "sub_id" TEXT NOT NULL,

    CONSTRAINT "subscription_member_pkey" PRIMARY KEY ("member_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "bot_subscriber" ADD CONSTRAINT "bot_subscriber_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_form" ADD CONSTRAINT "report_form_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_form" ADD CONSTRAINT "report_form_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_image" ADD CONSTRAINT "report_image_report_form_id_fkey" FOREIGN KEY ("report_form_id") REFERENCES "report_form"("report_form_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subscription" ADD CONSTRAINT "user_subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subscription" ADD CONSTRAINT "user_subscription_sub_plan_id_fkey" FOREIGN KEY ("sub_plan_id") REFERENCES "subscription_plan"("sub_plan_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subscription" ADD CONSTRAINT "user_subscription_previous_sub_id_fkey" FOREIGN KEY ("previous_sub_id") REFERENCES "user_subscription"("sub_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription_order" ADD CONSTRAINT "subscription_order_bot_sub_id_fkey" FOREIGN KEY ("bot_sub_id") REFERENCES "bot_subscriber"("user_sub_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription_order" ADD CONSTRAINT "subscription_order_sub_plan_id_fkey" FOREIGN KEY ("sub_plan_id") REFERENCES "subscription_plan"("sub_plan_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription_order" ADD CONSTRAINT "subscription_order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription_member" ADD CONSTRAINT "subscription_member_user_sub_id_fkey" FOREIGN KEY ("user_sub_id") REFERENCES "bot_subscriber"("user_sub_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription_member" ADD CONSTRAINT "subscription_member_sub_id_fkey" FOREIGN KEY ("sub_id") REFERENCES "user_subscription"("sub_id") ON DELETE RESTRICT ON UPDATE CASCADE;
