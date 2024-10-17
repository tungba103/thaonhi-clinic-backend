/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `refresh_tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_value_key" ON "refresh_tokens"("value");
