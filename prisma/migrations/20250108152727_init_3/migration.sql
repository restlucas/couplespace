/*
  Warnings:

  - You are about to drop the `couplepage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `couplepage` DROP FOREIGN KEY `CouplePage_userId_fkey`;

-- DropTable
DROP TABLE `couplepage`;

-- CreateTable
CREATE TABLE `Couple` (
    `id` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `about` VARCHAR(191) NOT NULL,
    `pathImage` VARCHAR(191) NULL,
    `date` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Couple_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Couple` ADD CONSTRAINT `Couple_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
