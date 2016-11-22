module.exports = {

	// Query to mysql database as promise
	makeConnQuery: (connection) => {
		return function connQuery(thequery, params) {
			return new Promise((resolve, reject) => {
				connection.query(thequery, params, (err, result) => {
					if (err) {
						reject(err);
					}
					else {
						resolve(result);
					}
				})
			});
		}	
	},

	///////////////////////////////////////////////////////////////////////////
	// Mysql queries
	"insertFridge": `
		INSERT INTO fridges
		(clientId)
		VALUES (?)
	`,

	"selectFridge": `
		SELECT * FROM fridges
		WHERE clientId = ?
	`,

	"selectIngredient": `
		SELECT * FROM ingredients
		WHERE name = ?
	`,

	"insertIngredient": `
		INSERT INTO ingredients
		(name)
		VALUES (?)
		ON DUPLICATE KEY UPDATE
		name = name
	`,

	"saveIngredient": `
		INSERT INTO fridgeIngredients
		(fridgeId, ingredientName)
		VALUES (?, ?)
		ON DUPLICATE KEY UPDATE
		fridgeId = fridgeId,
		ingredientName = ingredientName
	`,	

	"fridgeContent": `
		SELECT ingredients.name  
		FROM ingredients 
		JOIN fridgeIngredients 
			ON fridgeIngredients.ingredientName = ingredients.name 
		WHERE fridgeIngredients.fridgeId = ?
	`,

	"deleteIngFridge": `
		DELETE FROM fridgeIngredients
		WHERE fridgeId = ?
		AND ingredientName = ?
	`,

	"saveRecipe": `
		INSERT INTO userRecipes
		(clientId, recipeId)
		VALUES (?, ?)
		ON DUPLICATE KEY UPDATE
		clientId = clientId,
		recipeId = recipeId
	`,

	"userRecipes": `
		SELECT * FROM userRecipes
		WHERE clientId = ?
	`,

	"selectRecipe": `
		SELECT * FROM recipes
		WHERE id = ?
	`,

	"insertRecipe": `
		INSERT INTO recipes
		(id)
		VALUES (?)
		ON DUPLICATE KEY UPDATE
		id = id
	`,

};