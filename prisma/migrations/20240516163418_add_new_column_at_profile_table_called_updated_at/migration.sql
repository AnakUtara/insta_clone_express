/*
  Warnings:

  - Added the required column `updated_at` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `updated_at` DATETIME(3) NOT NULL;
