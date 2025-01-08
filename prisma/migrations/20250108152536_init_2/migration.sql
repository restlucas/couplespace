/*
  Warnings:

  - Added the required column `about` to the `CouplePage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `CouplePage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `couplepage` ADD COLUMN `about` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `pathImage` VARCHAR(191) NULL;
