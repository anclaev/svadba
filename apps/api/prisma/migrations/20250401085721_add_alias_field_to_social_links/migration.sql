/*
  Warnings:

  - A unique constraint covering the columns `[alias]` on the table `SocialLink` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `alias` to the `SocialLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SocialLink" ADD COLUMN     "alias" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SocialLink_alias_key" ON "SocialLink"("alias");
