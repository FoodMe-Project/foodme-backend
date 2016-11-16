// What to do when authId expires??

///////////////////////////////////////////////////////////////////////////////
// Promise query to the database
function makeConnQuery(connection) {
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
}

///////////////////////////////////////////////////////////////////////////////
// SQL queries
const insertUser = `
	INSERT INTO users
	(authId, username, createdAt, updatedAt)
	VALUES (?, ?, ?, ?)
`;

const selectUser = `
	SELECT * FROM users
	WHERE id = ?
`;

const insertIngredient = `
	INSERT INTO ingredients
	(apiId, name, createdAt, updatedAt)
	VALUES (?, ?, ?, ?)
`;

const selectIngredient = `
	SELECT * FROM ingredients
	WHERE id = ?
`;

const insertRecipe = `
	INSERT INTO recipes
	(apiId, name, url, createdAt, updatedAt)
	VALUES (?, ?, ?, ?, ?)
`;

const selectRecipe = `
	SLECT * FROM recipes
	WHERE id = ?
`;

const insertFridge = `
	INSERT INTO fridges
	(userId, createdAt, updatedAt)
	VALUES (?, ?, ?)
`;

const selectFridge = `
	SELECT * FROM fridges
	WHERE id = ?
`;

///////////////////////////////////////////////////////////////////////////////
module.exports = function sqlAPI(conn) {
	const sqlQuery = makeConnQuery(conn);

	return {

		createUser: (user) => {
			return sqlQuery(insertUser, [user.authId, user.username, new Date(), new Date()])
			.then(result => {
				return sqlQuery(selectUser, [result.insertId])
			})
			.then(userCreated => {
				return userCreated
			})
			.catch(error => {
				if (error.code === 'ER_DUP_ENTRY') {
					throw new Error('A user with this authId already exists');
				}
				else {
					throw new Error(error);
				}
			})
		},

		createIngredient: (ingredient) => {
			return sqlQuery(insertIngredient, [ingredient.apiId, ingredient.name, new Date(), new Date()])
			.then(result => {
				return sqlQuery(selectIngredient, [result.insertId])
			})
			.then(ingredientCreated => {
				return ingredientCreated
			})
			.catch(error => {
				if (error.code === 'ER_DUP_ENTRY') {
					throw new Error('An ingredient with this apiId or name already exists');
				}
				else {
					throw new Error(error);
				}
			})
		},

		createRecipe: (recipe) => {
			return sqlQuery(insertRecipe, [recipe.apiId, recipe.name, recipe.url, new Date(), new Date()])
			.then(result => {
				return sqlQuery(selectRecipe, [result.insertId])
			})
			.then(recipeCreated => {
				return recipeCreated
			})
			.catch(error => {
				if (error.code === 'ER_DUP_ENTRY') {
					throw new Error('An recipe with this apiId or name already exists');
				}
				else {
					throw new Error(error);
				}				
			})
		},

		createFridge: (user) => {
			return sqlQuery(insertFridge, [user.id, new Date(), new Date()])
			.then (result => {
				return sqlQuery(selectFridge, [result.insertId])
			})
			.then(fridgeCreated => {
				return fridgeCreated
			})
			.catch(error => {
				if (error.code === 'ER_DUP_ENTRY') {
					throw new Error('An recipe with this apiId or name already exists');
				}
				else {
					throw new Error(error);
				}				
			})
		},

		///////////////////////////////////////////////////////////////////////
		// Get user's saved recipes


		///////////////////////////////////////////////////////////////////////
		// Get user's saved ingredients


		///////////////////////////////////////////////////////////////////////
		// Add ingredient to user's fridge


		///////////////////////////////////////////////////////////////////////
		// Delete user from database


		///////////////////////////////////////////////////////////////////////
		// Delete ingredient from database


		///////////////////////////////////////////////////////////////////////
		// Delete recipe from database
	}
}