/*
  Warnings:

  - You are about to alter the column `level` on the `FortyTwoUser` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "FortyTwoUser" ALTER COLUMN "level" SET DATA TYPE DOUBLE PRECISION;
