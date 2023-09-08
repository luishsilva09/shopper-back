-- DropForeignKey
ALTER TABLE `packs` DROP FOREIGN KEY `packs_ibfk_1`;

-- DropForeignKey
ALTER TABLE `packs` DROP FOREIGN KEY `packs_ibfk_2`;

-- AddForeignKey
ALTER TABLE `packs` ADD CONSTRAINT `packs` FOREIGN KEY (`pack_id`) REFERENCES `products`(`code`) ON DELETE NO ACTION ON UPDATE NO ACTION;
