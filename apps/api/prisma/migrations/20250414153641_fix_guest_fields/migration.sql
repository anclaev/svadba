/*
  Warnings:

  - Changed the type of `side` on the `Guest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "GuestSide" AS ENUM ('GROOM', 'BRIDE');

-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "side",
ADD COLUMN     "side" "GuestSide" NOT NULL;

-- DropEnum
DROP TYPE "Side";
