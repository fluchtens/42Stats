CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL,
  `login` VARCHAR(255) NOT NULL UNIQUE,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) DEFAULT NULL,
  `pool_month` VARCHAR(255) NOT NULL,
  `pool_year` VARCHAR(255) NOT NULL,
  `level` DOUBLE NOT NULL,
  `campus_id` INT NOT NULL,
  `blackholed` BIT(1) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_campus_id` FOREIGN KEY (`campus_id`) REFERENCES `campus`(`id`) 
  ON DELETE CASCADE
  ON UPDATE CASCADE
)
