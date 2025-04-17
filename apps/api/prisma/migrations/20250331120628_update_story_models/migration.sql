/*
  Warnings:

  - A unique constraint covering the columns `[alias]` on the table `Achievement` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `alias` to the `Achievement` table without a default value. This is not possible if the table is not empty.
  - Made the column `issuer_id` on table `TransactionHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TransactionHistory" DROP CONSTRAINT "TransactionHistory_issuer_id_fkey";

-- AlterTable
ALTER TABLE "Achievement" ADD COLUMN     "alias" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TransactionHistory" ALTER COLUMN "issuer_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_alias_key" ON "Achievement"("alias");

-- AddForeignKey
ALTER TABLE "TransactionHistory" ADD CONSTRAINT "TransactionHistory_issuer_id_fkey" FOREIGN KEY ("issuer_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
