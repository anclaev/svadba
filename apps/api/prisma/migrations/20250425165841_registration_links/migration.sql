-- CreateEnum
CREATE TYPE "RegistrationLinkStatus" AS ENUM ('PENDING', 'APPLIED');

-- CreateTable
CREATE TABLE "RegistrationLink" (
    "id" UUID NOT NULL,
    "status" "RegistrationLinkStatus" NOT NULL DEFAULT 'PENDING',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta" JSONB NOT NULL,
    "owner_id" UUID NOT NULL,

    CONSTRAINT "RegistrationLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RegistrationLink_status_idx" ON "RegistrationLink"("status");

-- CreateIndex
CREATE INDEX "RegistrationLink_expires_at_idx" ON "RegistrationLink"("expires_at");

-- CreateIndex
CREATE INDEX "RegistrationLink_is_active_idx" ON "RegistrationLink"("is_active");

-- AddForeignKey
ALTER TABLE "RegistrationLink" ADD CONSTRAINT "RegistrationLink_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
