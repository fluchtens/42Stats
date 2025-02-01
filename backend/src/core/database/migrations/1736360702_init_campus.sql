CREATE TABLE IF NOT EXISTS `campus` (
  `id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL UNIQUE,
  `country` VARCHAR(255) NOT NULL,
  `user_count` INT NOT NULL,
  `student_count` INT NOT NULL,
  `average_level` DOUBLE NOT NULL,
  PRIMARY KEY (`id`)
);
