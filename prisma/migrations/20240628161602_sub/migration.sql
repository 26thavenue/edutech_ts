/*
  Warnings:

  - You are about to alter the column `subscribed` on the `subscription` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `subscription` MODIFY `subscribed` BOOLEAN NOT NULL DEFAULT false;
