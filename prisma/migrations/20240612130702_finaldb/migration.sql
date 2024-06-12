/*
  Warnings:

  - You are about to drop the column `isCompleted` on the `chapter` table. All the data in the column will be lost.
  - You are about to drop the column `percentageCompleted` on the `chapter` table. All the data in the column will be lost.
  - You are about to drop the column `isCompleted` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `percentageCompleted` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `percentageCompleted` on the `progress` table. All the data in the column will be lost.
  - You are about to drop the column `courseAssessmentId` on the `question` table. All the data in the column will be lost.
  - You are about to drop the `courseassessment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `free` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EXP` to the `Progress` table without a default value. This is not possible if the table is not empty.
  - Made the column `assessmentId` on table `question` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `assessment` DROP FOREIGN KEY `Assessment_lessonId_fkey`;

-- DropForeignKey
ALTER TABLE `courseassessment` DROP FOREIGN KEY `CourseAssessment_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `Question_assessmentId_fkey`;

-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `Question_courseAssessmentId_fkey`;

-- AlterTable
ALTER TABLE `assessment` ADD COLUMN `courseId` VARCHAR(191) NULL,
    MODIFY `lessonId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `chapter` DROP COLUMN `isCompleted`,
    DROP COLUMN `percentageCompleted`;

-- AlterTable
ALTER TABLE `course` DROP COLUMN `isCompleted`,
    DROP COLUMN `percentageCompleted`,
    ADD COLUMN `free` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `progress` DROP COLUMN `percentageCompleted`,
    ADD COLUMN `EXP` INTEGER NOT NULL,
    ADD COLUMN `level` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `question` DROP COLUMN `courseAssessmentId`,
    MODIFY `assessmentId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `subscribed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `subscriptionDuration` ENUM('MONTHLY', 'YEARLY') NULL;

-- DropTable
DROP TABLE `courseassessment`;

-- CreateTable
CREATE TABLE `UserCourses` (
    `userId` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,
    `isCompleted` BOOLEAN NOT NULL DEFAULT false,
    `percentageCompleted` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`courseId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserCoursesChapters` (
    `userId` VARCHAR(191) NOT NULL,
    `chapterId` VARCHAR(191) NOT NULL,
    `isCompleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`chapterId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserCourses` ADD CONSTRAINT `UserCourses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCourses` ADD CONSTRAINT `UserCourses_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCoursesChapters` ADD CONSTRAINT `UserCoursesChapters_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCoursesChapters` ADD CONSTRAINT `UserCoursesChapters_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `Chapter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assessment` ADD CONSTRAINT `Assessment_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `Lesson`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Assessment` ADD CONSTRAINT `Assessment_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_assessmentId_fkey` FOREIGN KEY (`assessmentId`) REFERENCES `Assessment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
