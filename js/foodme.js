const q = require('./queries');

module.exports = function sqlAPI(connection) {
	const sqlQuery = q.makeConnQuery(connection);

	return {

		// when component fridge mount => findorCreateFridge then displayFridge
		// when user enter ingredient => saveUserIngredient then displayFridge

		findOrCreateFridge: clientId => {
			return sqlQuery(q.selectFridge, [clientId])
			.then(result => {
				if(!result[0]) {
					return sqlQuery(q.insertFridge, [clientId])
					.then(result => {
						return result.insertId
					})
				}
				else {
					return result[0].id
				}
			})
			.catch(err => {
				throw new Error(err)
			})
		},

		displayFridge: (fridgeId) => {
			return sqlQuery(fridgeIng, [fridgeId])
			.then(ingredients => {
				return ingredients
			})
			.then(err => {
				throw new Error(err)
			})
		},

		saveUserIngredient: (ingredient) => {
			let fridgeId = ingredient.fridgeId;
			let apiId = ingredient.apiId;
			let name = ingredient.name;
			return sqlQuery(q.selectIngredient, [apiId])
			.then(result => {
				if (!result[0]) {
					return sqlQuery(q.insertIngredient, [apiId])
					.then(result => {
						return sqlQuery(q.saveIngredient, [fridgeId, apiId])
					})
				}
				else {
					return sqlQuery(q.saveIngredient, [fridgeId, apiId])
				}
			})
			.then(result => {
				return result
			})
			.catch(err => {
				throw new Error(err);
			})
		},

		// When component saved recipe mount => displaySavedRecipe
		// when user add recipe => saveUserRecipe then displaySavedRecipe

	}
}