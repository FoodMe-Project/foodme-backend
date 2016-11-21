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

	"saveRecipe": `
		INSERT INTO userRecipes
		(clientId, recipeId)
		VALUES (?, ?)
	`,

	"userRecipes": `
		SELECT * FROM userRecipes
		WHERE clientId = ?
	`,

	"selectIngredient": `
		SELECT * FROM ingredients
		WHERE id = ?
	`,

	"insertIngredient": `
		INSERT INTO ingredients
		(id, name)
		VALUES (?, ?)
	`,

	"saveIngredient": `
		INSERT INTO fridgeIngredients
		(fridgeId, ingredientId)
		VALUES (?, ?)
		ON DUPLICATE KEY UPDATE
		fridgeId = fridgeId,
		ingredientId = ingredientId

	`,

	"fridgeIng": `
		SELECT ingredients.id, ingredients.name  
		FROM ingredients 
		JOIN fridgeIngredients 
			ON fridgeIngredients.ingredientId = ingredients.id 
		WHERE fridgeIngredients.fridgeId = ?
	`,

	"deleteIngFridge": `
		DELETE FROM fridgeIngredients
		WHERE fridgeId = ?
		AND ingredientId = ?
	`,

};