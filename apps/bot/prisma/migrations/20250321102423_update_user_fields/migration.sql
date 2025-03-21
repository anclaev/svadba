-- AlterTable
ALTER TABLE "Guest" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "telegram_id" DROP NOT NULL,
ALTER COLUMN "created_at" DROP NOT NULL;
