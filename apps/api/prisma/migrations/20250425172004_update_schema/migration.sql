/*
  Warnings:

  - You are about to drop the `_AchievementToUser` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `created_at` on table `Guest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_AchievementToUser" DROP CONSTRAINT "_AchievementToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_AchievementToUser" DROP CONSTRAINT "_AchievementToUser_B_fkey";

-- AlterTable
ALTER TABLE "Achievement" ADD COLUMN     "description" TEXT,
ADD COLUMN     "is_hidden" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMPTZ(6),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "DresscodeColor" ADD COLUMN     "updated_at" TIMESTAMPTZ(6),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "Guest" ADD COLUMN     "updated_at" TIMESTAMPTZ(6),
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "Quest" ADD COLUMN     "completed_at" TIMESTAMPTZ(6),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "RegistrationLink" ALTER COLUMN "expires_at" SET DATA TYPE TIMESTAMPTZ(6),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "SocialLink" ADD COLUMN     "updated_at" TIMESTAMPTZ(6),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "TimingEvent" ADD COLUMN     "description" TEXT,
ADD COLUMN     "updated_at" TIMESTAMPTZ(6),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "TransactionHistory" ADD COLUMN     "processed_at" TIMESTAMPTZ(6),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "Upload" ADD COLUMN     "size" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMPTZ(6),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updated_at" TIMESTAMPTZ(6),
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6);

-- DropTable
DROP TABLE "_AchievementToUser";

-- CreateTable
CREATE TABLE "UserAchievement" (
    "user_id" UUID NOT NULL,
    "achievement_id" UUID NOT NULL,
    "earned_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAchievement_pkey" PRIMARY KEY ("user_id","achievement_id")
);

-- CreateIndex
CREATE INDEX "Achievement_alias_idx" ON "Achievement"("alias");

-- CreateIndex
CREATE INDEX "Achievement_created_at_idx" ON "Achievement"("created_at");

-- CreateIndex
CREATE INDEX "DresscodeColor_hex_idx" ON "DresscodeColor"("hex");

-- CreateIndex
CREATE INDEX "DresscodeColor_hidden_idx" ON "DresscodeColor"("hidden");

-- CreateIndex
CREATE INDEX "DresscodeColor_owner_id_idx" ON "DresscodeColor"("owner_id");

-- CreateIndex
CREATE INDEX "Guest_side_idx" ON "Guest"("side");

-- CreateIndex
CREATE INDEX "Guest_role_idx" ON "Guest"("role");

-- CreateIndex
CREATE INDEX "Guest_created_at_idx" ON "Guest"("created_at");

-- CreateIndex
CREATE INDEX "Quest_type_idx" ON "Quest"("type");

-- CreateIndex
CREATE INDEX "Quest_status_idx" ON "Quest"("status");

-- CreateIndex
CREATE INDEX "Quest_created_at_idx" ON "Quest"("created_at");

-- CreateIndex
CREATE INDEX "Quest_actor_id_idx" ON "Quest"("actor_id");

-- CreateIndex
CREATE INDEX "RegistrationLink_owner_id_idx" ON "RegistrationLink"("owner_id");

-- CreateIndex
CREATE INDEX "SocialLink_alias_idx" ON "SocialLink"("alias");

-- CreateIndex
CREATE INDEX "SocialLink_creator_id_idx" ON "SocialLink"("creator_id");

-- CreateIndex
CREATE INDEX "TimingEvent_order_idx" ON "TimingEvent"("order");

-- CreateIndex
CREATE INDEX "TimingEvent_public_idx" ON "TimingEvent"("public");

-- CreateIndex
CREATE INDEX "TimingEvent_owner_id_idx" ON "TimingEvent"("owner_id");

-- CreateIndex
CREATE INDEX "TransactionHistory_status_idx" ON "TransactionHistory"("status");

-- CreateIndex
CREATE INDEX "TransactionHistory_created_at_idx" ON "TransactionHistory"("created_at");

-- CreateIndex
CREATE INDEX "TransactionHistory_issuer_id_idx" ON "TransactionHistory"("issuer_id");

-- CreateIndex
CREATE INDEX "TransactionHistory_achievement_id_idx" ON "TransactionHistory"("achievement_id");

-- CreateIndex
CREATE INDEX "Upload_owner_id_idx" ON "Upload"("owner_id");

-- CreateIndex
CREATE INDEX "Upload_created_at_idx" ON "Upload"("created_at");

-- CreateIndex
CREATE INDEX "User_telegram_id_idx" ON "User"("telegram_id");

-- CreateIndex
CREATE INDEX "User_status_idx" ON "User"("status");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_created_at_idx" ON "User"("created_at");

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
