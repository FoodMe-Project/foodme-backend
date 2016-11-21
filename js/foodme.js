const q = require('./queries');

module.exports = function sqlAPI(connection) {
	const sqlQuery = q.makeConnQuery(connection);

	return {

		findOrCreateFridge: clientId => {
			return sqlQuery(q.selectFridge, [clientId])
			.then(result => {
				if (!result[0]) {
					return sqlQuery(q.insertFridge, [clientId])
					.then(result => {
						return result.insertId
					})
				}
				else {
					return result[0].id
				}
			})
		},

		displayFridge: (fridgeId) => {
			return sqlQuery(q.fridgeIng, [fridgeId])
			.then(ingredients => {
				return ingredients
			})
		},

		saveUserIngredient: (ingredient) => {
			let fridgeId = ingredient.fridgeId;
			let ingredientId = ingredient.ingredientId;
			let name = ingredient.name;
			return sqlQuery(q.selectIngredient, [ingredientId])
			.then(result => {
				if (!result[0]) {
					return sqlQuery(q.insertIngredient, [ingredientId, name])
					.then(result => {
						return sqlQuery(q.saveIngredient, [ingredientId, apiId])
					})
				}
				else {
					return sqlQuery(q.saveIngredient, [fridgeId, ingredientId])
				}
			})
			.then(ingredient => {
				return ingredient
			})
		},

		// When component saved recipe mount => displaySavedRecipe
		// when user add recipe => saveUserRecipe then displaySavedRecipe

	}
}