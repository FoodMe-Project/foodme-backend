CREATE TABLE `users` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`authId` VARCHAR(50) NOT NULL,
	`username` VARCHAR(50) NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `authId` (`authId`) 
);

CREATE TABLE `fridges` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`userId` INT(11) NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`id`),
	KEY `userId` (`userId`),
	FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
);

CREATE TABLE `recipes` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`apiId` VARCHAR(50) NOT NULL,
	`name` VARCHAR(50) DEFAULT NULL,
	`url` VARCHAR(50) DEFAULT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `apiId` (`apiId`),
	UNIQUE KEY `name` (`name`)
);

CREATE TABLE `ingredients` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`apiId` VARCHAR(50) NOT NULL,
	`name` VARCHAR(50) DEFAULT NULL,
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `apiId` (`apiId`),
	UNIQUE KEY `name` (`name`)
);

CREATE TABLE `userRecipes` (
	`userId` INT NOT NULL,
	`recipeId` INT NOT NULL,
	PRIMARY KEY (`userId`, `recipeId`),
	FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
	FOREIGN KEY (`recipeId`) REFERENCES `recipes` (`id`)
);

CREATE TABLE `recipeIngredients` (
	`recipeId` INT NOT NULL,
	`ingredientId` INT NOT NULL,
	PRIMARY KEY (`recipeId`, `ingredientId`),
	FOREIGN KEY (`recipeId`) REFERENCES `recipes` (`id`),
	FOREIGN KEY (`ingredientId`) REFERENCES `ingredients` (`id`)
);

CREATE TABLE `fridgeIngredients` (
	`fridgeId` INT NOT NULL,
	`ingredientId` INT NOT NULL,
	PRIMARY KEY (`fridgeId`, `ingredientId`),
	FOREIGN KEY (`fridgeId`) REFERENCES `fridges` (`id`),
	FOREIGN KEY (`ingredientId`) REFERENCES `ingredients` (`id`)
);
