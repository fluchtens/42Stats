/*
  Warnings:

  - Added the required column `country` to the `Campus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campus" ADD COLUMN     "country" VARCHAR(255) NOT NULL;
