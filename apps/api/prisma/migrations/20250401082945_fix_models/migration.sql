/*
  Warnings:

  - You are about to drop the column `created_by_id` on the `SocialLink` table. All the data in the column will be lost.
  - Added the required column `creator_id` to the `SocialLink` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SocialLink" DROP CONSTRAINT "SocialLink_created_by_id_fkey";

-- AlterTable
ALTER TABLE "SocialLink" DROP COLUMN "created_by_id",
ADD COLUMN     "creator_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
