/*
  Warnings:

  - You are about to drop the column `description` on the `assessment` table. All the data in the column will be lost.
  - You are about to drop the column `passingMarker` on the `assessment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `assessment` DROP COLUMN `description`,
    DROP COLUMN `passingMarker`,
    ADD COLUMN `passingMark` INTEGER NOT NULL DEFAULT 0;
