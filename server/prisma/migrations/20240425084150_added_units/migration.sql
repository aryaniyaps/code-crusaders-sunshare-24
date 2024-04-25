/*
  Warnings:

  - Added the required column `unitsavailable` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Provider" ADD COLUMN     "unitsavailable" INTEGER NOT NULL;
