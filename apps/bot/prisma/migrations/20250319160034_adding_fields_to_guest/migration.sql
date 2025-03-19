/*
  Warnings:

  - A unique constraint covering the columns `[telegramId]` on the table `Guest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `side` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telegramId` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Guest` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Side" AS ENUM ('GROOM', 'BRIDE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('CREATED', 'ACCEPTED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('GUEST', 'PARENT', 'CLOSE', 'GROOM', 'BRIDE');

-- AlterTable
ALTER TABLE "Guest" ADD COLUMN     "answers" JSONB,
ADD COLUMN     "isTelegramVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'GUEST',
ADD COLUMN     "side" "Side" NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'CREATED',
ADD COLUMN     "telegramId" INTEGER NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Guest_telegramId_key" ON "Guest"("telegramId");
