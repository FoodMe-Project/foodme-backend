const q = require('./queries');

module.exports = function sqlAPI(connection) {
	const sqlQuery = q.makeConnQuery(connection);

	return {

		createIngredient: (ingredient) => {
			return sqlQuery(q.insertIngredient, [ingredient.apiId, ingredient.name, new Date(), new Date()])
			.then(result => {
				return sqlQuery(q.selectIngredient, [result.insertId])
			})
			.then(ingredientCreated => {
				return ingredientCreated
			})
			.catch(error => {
				if (err.code === 'ER_DUP_ENTRY') {
					throw new Error('An ingredient with this apiId or name already exists');
				}
				else {
					throw new Error(err);
				}
			})
		},

		createRecipe: (recipe) => {
			return sqlQuery(q.insertRecipe, [recipe.apiId, new Date(), new Date()])
			.then(result => {
				return sqlQuery(q.selectRecipe, [result.insertId])
			})
			.then(recipeCreated => {
				return recipeCreated
			})
			.catch(err => {
				if (err.code === 'ER_DUP_ENTRY') {
					throw new Error('A recipe with this apiId or name already exists');
				}
				else {
					throw new Error(err);
				}				
			})
		},

		createFridge: (user) => {
			return sqlQuery(q.insertFridge, [user.id, new Date(), new Date()])
			.then (result => {
				return sqlQuery(q.selectFridge, [result.insertId])
			})
			.then(fridgeCreated => {
				return fridgeCreated
			})
			.catch(err => {
				if (err.code === 'ER_DUP_ENTRY') {
					throw new Error('An recipe with this apiId or name already exists');
				}
				else {
					throw new Error(err);
				}				
			})
		},

		saveUserRecipe: (recipe) => {
			let recipeId = recipe.recipeId;
			return sqlQuery(q.saveRecipe, [recipe.userId, recipe.recipeId])
			.then(result => {
				return sqlQuery(q.selectRecipe, [recipeId])
			})
			.then(savedRecipe => {
				return savedRecipe
			})
			.catch(err => {
				if (err.code === 'ER_DUP_ENTRY') {
					throw new Error('This recipe is already saved');
				}
				else {
					throw new Error(err);
				}
			})
		},

		getUserSavedRecipes: (user) => {
			return sqlQuery(q.userRecipes, [user.id])
			.then(recipes => {
				return recipes
			})
			.catch(err => {
				throw new Error(err);
			})
		},

		saveUserIngredient: (ingredient) => {
			let ingredientId = ingredient.ingredientId
			return sqlQuery(q.userFridge, [ingredient.userId]) 
			.then(fridge => {
				return sqlQuery(q.saveIngredient, [fridge.id, ingredientId])				
			})
			.then(result => {
				return sqlQuery(q.selectIngredient, [ingredientId])
			})
			.then(savedIngredient => {
				return savedIngredient
			})
			.catch(err => {
				if (err.code === 'ER_DUP_ENTRY') {
					throw new Error('This ingredient is already saved');
				}
				else {
					throw new Error(err);
				}
			})
		},

		deleteIngredientFridge: (ingredient) => {
			let ingredientId = ingredient.ingredientId
			return sqlQuery(q.userFridge, [ingredient.userId])
			.then(fridge => {
				return sqlQuery(q.deleteIngFridge, [fridge[0].id, ingredientId])
			})
			.then(confirmation => {
				return confirmation
			})
			.catch(err => {
				throw new Error(err);
			})
		},

		getUserFridge: (user) => {
			return sqlQuery(q.userFridge, [user.userId])
			.then(fridge => {
				return sqlQuery(q.fridgeIng, [fridge[0].id])
			})
			.then(ingredients => {
				return ingredients
			})
			.catch(err => {
				throw new Error(err);
			})
		},

		deleteUser: (user) => {
			return sqlQuery(q.deleteUser, [user.id])
			.then(result => {
				return result
			})
			.catch(err => {
				throw new Error(err);
			})
		},


		///////////////////////////////////////////////////////////////////////
		// Delete recipe from database 
	}
}