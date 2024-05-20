/*
  Warnings:

  - The primary key for the `likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_follows` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fullname` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `likes_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `posts_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_follows` DROP FOREIGN KEY `user_follows_followed_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_follows` DROP FOREIGN KEY `user_follows_user_id_fkey`;

-- AlterTable
ALTER TABLE `comments` MODIFY `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `likes` DROP PRIMARY KEY,
    MODIFY `user_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`post_id`, `user_id`);

-- AlterTable
ALTER TABLE `posts` MODIFY `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user_follows` DROP PRIMARY KEY,
    MODIFY `user_id` VARCHAR(191) NOT NULL,
    MODIFY `followed_user_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`user_id`, `followed_user_id`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    ADD COLUMN `address` TEXT NULL,
    ADD COLUMN `avatar` VARCHAR(191) NULL,
    ADD COLUMN `bio` MEDIUMTEXT NULL,
    ADD COLUMN `date_of_birth` DATE NULL,
    ADD COLUMN `fullname` VARCHAR(25) NOT NULL,
    ADD COLUMN `gender` ENUM('Male', 'Female') NULL,
    ADD COLUMN `phone_number` VARCHAR(12) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `profiles`;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_follows` ADD CONSTRAINT `user_follows_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_follows` ADD CONSTRAINT `user_follows_followed_user_id_fkey` FOREIGN KEY (`followed_user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
