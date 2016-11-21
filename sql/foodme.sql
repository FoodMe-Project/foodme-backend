CREATE TABLE `fridges` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`clientId` VARCHAR(100) NOT NULL,
	PRIMARY KEY (`id`, `clientId`),
	UNIQUE KEY `clientId` (`clientId`)
);

CREATE TABLE `recipes` (
	`id` VARCHAR(100) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `ingredients` (
	`id` VARCHAR(100) NOT NULL,
	`name` VARCHAR(50) DEFAULT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `name` (`name`)
);

CREATE TABLE `userRecipes` (
	`clientId` VARCHAR(100) NOT NULL,
	`recipeId` VARCHAR(100) NOT NULL,
	PRIMARY KEY (`clientId`, `recipeId`),
	FOREIGN KEY (`recipeId`) REFERENCES `recipes` (`id`)
);

CREATE TABLE `recipeIngredients` (
	`recipeId` VARCHAR(100) NOT NULL,
	`ingredientId` VARCHAR(100) NOT NULL,
	PRIMARY KEY (`recipeId`, `ingredientId`),
	FOREIGN KEY (`recipeId`) REFERENCES `recipes` (`id`),
	FOREIGN KEY (`ingredientId`) REFERENCES `ingredients` (`id`)
);

CREATE TABLE `fridgeIngredients` (
	`fridgeId` INT(11) NOT NULL,
	`ingredientId` VARCHAR(100) NOT NULL,
	PRIMARY KEY (`fridgeId`, `ingredientId`),
	FOREIGN KEY (`fridgeId`) REFERENCES `fridges` (`id`),
	FOREIGN KEY (`ingredientId`) REFERENCES `ingredients` (`id`)
);
