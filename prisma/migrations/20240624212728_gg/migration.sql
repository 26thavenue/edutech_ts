/*
  Warnings:

  - You are about to drop the column `title` on the `option` table. All the data in the column will be lost.
  - Added the required column `option` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `option` DROP COLUMN `title`,
    ADD COLUMN `option` VARCHAR(191) NOT NULL,
    MODIFY `isCorrect` BOOLEAN NOT NULL DEFAULT false;
