-- AlterTable
ALTER TABLE `users` MODIFY `username` VARCHAR(55) NOT NULL,
    MODIFY `password` VARCHAR(55) NOT NULL,
    MODIFY `email` VARCHAR(55) NOT NULL,
    MODIFY `fullname` VARCHAR(55) NOT NULL;
