-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Age" AS ENUM ('ADULT', 'CHILD');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'ADMIN');

-- CreateEnum
CREATE TYPE "Side" AS ENUM ('GROOM', 'BRIDE');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('COLLEAGUE', 'FRIEND', 'BEST_FRIEND', 'RELATIVE', 'CLOSE_RELATIVE', 'PARENT');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Family" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "side" "Side" NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'RELATIVE',
    "age" "Age" NOT NULL DEFAULT 'ADULT',
    "sex" "Sex" NOT NULL,
    "table" INTEGER,
    "transfer" BOOLEAN NOT NULL DEFAULT false,
    "accommodation" BOOLEAN NOT NULL DEFAULT false,
    "familyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "alias" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventToGuest" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Family_ownerId_key" ON "Family"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_index_key" ON "Event"("index");

-- CreateIndex
CREATE UNIQUE INDEX "Event_alias_key" ON "Event"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToGuest_AB_unique" ON "_EventToGuest"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToGuest_B_index" ON "_EventToGuest"("B");

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToGuest" ADD CONSTRAINT "_EventToGuest_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToGuest" ADD CONSTRAINT "_EventToGuest_B_fkey" FOREIGN KEY ("B") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
