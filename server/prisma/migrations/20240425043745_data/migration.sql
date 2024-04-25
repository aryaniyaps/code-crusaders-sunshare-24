/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Verified', 'Denied');

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Provider" (
    "id" SERIAL NOT NULL,
    "userid" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pending',
    "income" DOUBLE PRECISION,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consumer" (
    "id" SERIAL NOT NULL,
    "userid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "subscription" DOUBLE PRECISION NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pending',
    "powergained" INTEGER NOT NULL,

    CONSTRAINT "Consumer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolarPanel" (
    "id" SERIAL NOT NULL,
    "userid" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "dimensions" INTEGER[],
    "outputpower" INTEGER NOT NULL,
    "warranty" INTEGER NOT NULL,

    CONSTRAINT "SolarPanel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Consumer" ADD CONSTRAINT "Consumer_id_fkey" FOREIGN KEY ("id") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolarPanel" ADD CONSTRAINT "SolarPanel_id_fkey" FOREIGN KEY ("id") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
