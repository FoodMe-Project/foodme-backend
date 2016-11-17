module.exports = {

	"insertUser": `
		INSERT INTO users 
		(authId, username, createdAt, updatedAt) 
		VALUES (?, ?, ?, ?)
	`,

	"selectUser": `
		SELECT * FROM users 
		WHERE id = ?
	`,

	"insertIngredient": `
		INSERT INTO ingredients
		(apiId, name, createdAt, updatedAt)
		VALUES (?, ?, ?, ?)
	`,

	"selectIngredient": `
		SELECT * FROM ingredients
		WHERE id = ?
	`,

	"insertRecipe": `
		INSERT INTO recipes
		(apiId, name, url, createdAt, updatedAt)
		VALUES (?, ?, ?, ?, ?)
	`,

	"selectRecipe": `
		SELECT * FROM recipes
		WHERE id = ?
	`,

	"insertFridge": `
		INSERT INTO fridges
		(userId, createdAt, updatedAt)
		VALUES (?, ?, ?)
	`,

	"selectFridge": `
		SELECT * FROM fridges
		WHERE id = ?
	`,

	"saveRecipe": `
		INSERT INTO userRecipes
		(userId, recipeId)
		VALUES (?, ?)
	`,

	"userRecipes": `
		SELECT * FROM userRecipes
		WHERE userId = ?
	`,

	"saveIngredient": `
		INSERT INTO fridgeIngredients
		(fridgeId, ingredientId)
		VALUES (?, ?)
	`,

	"userFridge": `
		SELECT * FROM fridges
		WHERE userId = ?
	`,

	"fridgeIng": `
		SELECT * FROM fridgeIngredients
		WHERE fridgeId = ?
	`,

};