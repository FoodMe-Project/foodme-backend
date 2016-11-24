const q = require('./queries');

module.exports = function sqlAPI(connection) {
	const sqlQuery = q.makeConnQuery(connection);

	return {
		///////////////////////////////////////////////////////////////////////
		// Fridge
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

		displayFridge: fridgeId => {
			return sqlQuery(q.fridgeContent, [fridgeId])
			.then(ingredients => {
				return ingredients
			})
		},

		saveUserIngredient: ingredient => {
			let fridgeId = ingredient.fridgeId;
			let name = ingredient.ingredientName;
			return sqlQuery(q.selectIngredient, [name])
			.then(result => {
				if (!result[0]) {
					return sqlQuery(q.insertIngredient, [name])
					.then(result => {
						return sqlQuery(q.saveIngredient, [fridgeId, name])
					})
				}
				else {
					return sqlQuery(q.saveIngredient, [fridgeId, name])
				}
			})
			.then(ingredient => {
				return ingredient
			})
		},

		deleteIngredient: ingredient => {
			let fridgeId = ingredient.fridgeId;
			let name = ingredient.ingredientName;
			return sqlQuery(q.deleteIngFridge, [fridgeId, name])
			.then(result => {
				return result
			})
		},

		///////////////////////////////////////////////////////////////////////
		// Saved recipes

		displaySavedRecipe: clientId => {
			return sqlQuery(q.userRecipes, [clientId])
			.then(recipes => {
				return recipes
			})
		},

		saveUserRecipe: recipe => {
			let clientId = recipe.clientId;
			let recipeId = recipe.recipeId;
			return sqlQuery(q.selectRecipe, [recipeId])
			.then(result => {
				if (!result[0]) {
					return sqlQuery(q.insertRecipe, [recipeId])
					.then(result => {
						return sqlQuery(q.saveRecipe, [clientId, recipeId])
					})
				}
				else {
					return sqlQuery(q.saveRecipe, [clientId, recipeId])
				}
			})
			.then(recipe => {
				return recipe
			})
		},

		deleteRecipe: recipe => {
			let clientId = recipe.clientId;
			let recipeId = recipe.recipeId;
			return sqlQuery(q.deleteSavedRecipe, [clientId, recipeId])
			.then(result => {
				return result
			})
		}
	}
}