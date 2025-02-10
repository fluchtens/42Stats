CREATE TABLE IF NOT EXISTS `account_role` (
  `account_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`account_id`, `role_id`),
  FOREIGN KEY (`account_id`) REFERENCES `account`(`id`),
  FOREIGN KEY (`role_id`) REFERENCES `role`(`id`)
);
