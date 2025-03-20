/*
  Warnings:

  - You are about to drop the column `isTelegramVerified` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `login` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `telegramId` on the `Guest` table. All the data in the column will be lost.
  - The `role` column on the `Guest` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[user_id]` on the table `Guest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Guest` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('CREATED', 'ACCEPTED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PUBLIC', 'ADMIN');

-- CreateEnum
CREATE TYPE "GuestRole" AS ENUM ('GUEST', 'PARENT', 'CLOSE', 'GROOM', 'BRIDE');

-- DropIndex
DROP INDEX "Guest_login_key";

-- DropIndex
DROP INDEX "Guest_telegramId_key";

-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "isTelegramVerified",
DROP COLUMN "login",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "status",
DROP COLUMN "telegramId",
ADD COLUMN     "user_id" INTEGER NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "GuestRole" NOT NULL DEFAULT 'GUEST';

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "telegram_id" INTEGER NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'CREATED',
    "role" "UserRole" NOT NULL DEFAULT 'PUBLIC',
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "telegram_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Upload" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "ext" TEXT NOT NULL,
    "mimetype" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner_id" INTEGER NOT NULL,

    CONSTRAINT "Upload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimingEvent" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "icon_id" INTEGER,
    "owner_id" INTEGER NOT NULL,

    CONSTRAINT "TimingEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DresscodeColor" (
    "id" SERIAL NOT NULL,
    "hex" TEXT NOT NULL,
    "description" TEXT,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner_id" INTEGER NOT NULL,

    CONSTRAINT "DresscodeColor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalLink" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner_id" INTEGER NOT NULL,

    CONSTRAINT "ExternalLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telegram_id_key" ON "User"("telegram_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "TimingEvent_order_key" ON "TimingEvent"("order");

-- CreateIndex
CREATE UNIQUE INDEX "DresscodeColor_hex_key" ON "DresscodeColor"("hex");

-- CreateIndex
CREATE UNIQUE INDEX "Guest_user_id_key" ON "Guest"("user_id");

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upload" ADD CONSTRAINT "Upload_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimingEvent" ADD CONSTRAINT "TimingEvent_icon_id_fkey" FOREIGN KEY ("icon_id") REFERENCES "Upload"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimingEvent" ADD CONSTRAINT "TimingEvent_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DresscodeColor" ADD CONSTRAINT "DresscodeColor_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalLink" ADD CONSTRAINT "ExternalLink_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
