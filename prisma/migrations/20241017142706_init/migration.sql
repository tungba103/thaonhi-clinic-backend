/*
  Warnings:

  - You are about to drop the column `birthdate` on the `customers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customers" DROP COLUMN "birthdate",
ADD COLUMN     "birth_date" TIMESTAMP(3);
