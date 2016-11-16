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
const selectUser = `
	SELECT id, authId, username, createAt, updatedAt
	FROM users
	WHERE id = ?
`;

const insertUser = `
	INSERT INTO users
	(authId, username, createdAt, updatedAt)
	VALUES (?, ?, ?, ?)
`;

///////////////////////////////////////////////////////////////////////////////
// API functions
module.exports = function FoodMeAPI(conn) {
	const connQuery = makeConnQuery(conn);

	return {

		///////////////////////////////////////////////////////////////////////
		// Insert user in database (only if doesn't exist)
		createUser: function createUser(user) {
			return connQuery(insertUser, [user.authId, user.username, new Date(), new Date()])
			.then(result => {
				return result
			})
			.catch(error => {
				if (error.code === 'ER_DUP_ENTRY') {
					throw new Error('A user with this authId already exist');
				}
				else {
					throw new Error(error);
				}
			})
		},

		///////////////////////////////////////////////////////////////////////
		// Insert ingredient into database (only if doesn't exist)


		///////////////////////////////////////////////////////////////////////
		// Insert recipe into database (only if doesn't exist)


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