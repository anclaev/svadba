-- AlterTable
ALTER TABLE "Guest" ALTER COLUMN "role" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "credentials" JSONB[] DEFAULT ARRAY[]::JSONB[];
