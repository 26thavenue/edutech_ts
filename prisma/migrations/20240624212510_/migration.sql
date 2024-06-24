/*
  Warnings:

  - A unique constraint covering the columns `[userId,courseId]` on the table `UserCourses` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `assessment` ADD COLUMN `passingMarker` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `question` ADD COLUMN `multichoice` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `numberOfCorrect` INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `UserAssessmentScore` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `assessmentId` VARCHAR(191) NOT NULL,
    `score` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UserAssessmentScore_userId_assessmentId_key`(`userId`, `assessmentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `UserCourses_userId_courseId_key` ON `UserCourses`(`userId`, `courseId`);

-- AddForeignKey
ALTER TABLE `UserAssessmentScore` ADD CONSTRAINT `UserAssessmentScore_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAssessmentScore` ADD CONSTRAINT `UserAssessmentScore_assessmentId_fkey` FOREIGN KEY (`assessmentId`) REFERENCES `Assessment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
