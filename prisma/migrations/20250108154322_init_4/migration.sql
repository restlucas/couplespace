/*
  Warnings:

  - You are about to drop the column `pathImage` on the `couple` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `couple` DROP COLUMN `pathImage`,
    ADD COLUMN `picture` TEXT NULL;
