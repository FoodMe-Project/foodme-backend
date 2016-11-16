// What to do when authId expires??
// Test server request??
// Passing object in server request??

///////////////////////////////////////////////////////////////////////////////
// Query to the database
function makeConnQuery(connection) {
	return function connQuery(thequery, params) {
		return new Promise(function(resolve, reject) {
			connection.query(thequery, params, function(err, result) {
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

function stringifyQuery(query) {
	return (
		connectionQuery(query)
		.then(function(result) {
			var actualQuery = JSON.stringify(result, null, 4);
			return actualQuery;
		})
	);
}

///////////////////////////////////////////////////////////////////////////////
// SQL queries
const insertUser = `
	INSERT INTO users
	(authId, username, createdAt, updatedAt)
	VALUES (?, ?, ?, ?)
`;

const insertIngredient = `
	INSERT INTO ingredients
	(apiId, name, createdAt, updatedAt)
	VALUES (?, ?, ?, ?)
`;

const insertRecipe = `
	INSERT INTO recipes
	(apiId, name, url, createdAt, updatedAt)
	VALUES (?, ?, ?, ?, ?)
`;

///////////////////////////////////////////////////////////////////////////////
// API functions
module.exports = function FoodMeAPI(conn) {
	const connQuery = makeConnQuery(conn);

	return {

		createUser: (user) => {
			return connQuery(insertUser, [user.authId, user.username, new Date(), new Date()])
			.then(result => {
				return result
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
			return connQuery(insertIngredient, [ingredient.apiId, ingredient.name, new Date(), new Date()])
			.then(result => {
				return result
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
			return connQuery(insertRecipe, [recipe.apiId, recipe.name, recipe.url, new Date(), new Date()])
			.then(result => {
				return result
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
		// Create user's fridge


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