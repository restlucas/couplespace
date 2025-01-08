/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `Publication` (
    `id` VARCHAR(191) NOT NULL,
    `coupleId` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Song` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `coupleId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Picture` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `coupleId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Account_user_id_key` ON `Account`(`user_id`);

-- AddForeignKey
ALTER TABLE `Publication` ADD CONSTRAINT `Publication_coupleId_fkey` FOREIGN KEY (`coupleId`) REFERENCES `Couple`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Song` ADD CONSTRAINT `Song_coupleId_fkey` FOREIGN KEY (`coupleId`) REFERENCES `Couple`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Picture` ADD CONSTRAINT `Picture_coupleId_fkey` FOREIGN KEY (`coupleId`) REFERENCES `Couple`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
