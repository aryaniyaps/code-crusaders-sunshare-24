/*
  Warnings:

  - Added the required column `providerId` to the `Consumer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerId` to the `SolarPanel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Consumer" DROP CONSTRAINT "Consumer_id_fkey";

-- DropForeignKey
ALTER TABLE "SolarPanel" DROP CONSTRAINT "SolarPanel_id_fkey";

-- AlterTable
ALTER TABLE "Consumer" ADD COLUMN     "providerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SolarPanel" ADD COLUMN     "providerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Consumer" ADD CONSTRAINT "Consumer_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolarPanel" ADD CONSTRAINT "SolarPanel_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
