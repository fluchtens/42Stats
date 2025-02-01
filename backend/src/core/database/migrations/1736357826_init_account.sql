CREATE TABLE IF NOT EXISTS `account` (
  `id` INT NOT NULL,
  `login` VARCHAR(255) NOT NULL UNIQUE,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `image` VARCHAR(255) NOT NULL,
  `level` DOUBLE NOT NULL,
  `campus_id` INT NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)
