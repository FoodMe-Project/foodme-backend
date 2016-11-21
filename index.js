const express = require('express');
const foodme = require('./js/foodme.js');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Access to the database
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'foodme',
	password: 'foodme',
	database: 'foodme'
});
const sqlAPI = foodme(connection);

///////////////////////////////////////////////////////////////////////////////
// Documentation
app.get('/', function(req, res) {
	res.status(200).render('index');
});

app.post('/insert-into-fridge/', (req, res) => {
	sqlAPI.saveUserIngredient(req.body)
	.then(result => {
		res.send(result);
	})
	.catch(err => {
		res.send(500).send(err.stack);
	})
});

app.post('/get-fridge/:clientId', (req, res) => {
	sqlAPI.findorCreateFridge(req.params.clientId)
	.then(result => {
		res.send(result);
	})
	.catch(err => {
		res.status(500).send(err.stack);
	})
});

app.post('/display-fridge/:fridgeId', (req, res) => {
	sqlAPI.displayFridge(req.params.fridgeId)
	.then(result => {
		res.send(result);
	})
	.catch(err => {
		res.status(500).send(err.stack);
	})
});


// // Create user
// app.post('/new-user/:profileID', (req, res) => {
// 	sqlAPI.createUser(req.param.profileID)
// 	.then(user => {
// 		res.send(user[0]);
// 	})
// 	.catch(err => {
// 		res.status(500).send(err.stack);
// 	})
// });

// // Delete a user
// app.post('/delete-user', (req, res) => {
// 	sqlAPI.deleteUser(req.body)
// 	.then(confirmation => {
// 		res.send(confirmation);
// 	})
// 	.catch(err => {
// 		res.status(500).send(err.stack);
// 	})
// });

// // Create ingredient
// app.post('/new-ingredient', (req, res) => {
// 	sqlAPI.createIngredient(req.body)
// 	.then(ingredient => {
// 		res.send(ingredient[0]);
// 	})
// 	.catch(err => {
// 		res.status(500).send(err.stack);
// 	})
// });

// // Create recipe
// app.post('/new-recipe', (req, res) => {
// 	sqlAPI.createRecipe(req.body)
// 	.then(recipe => {
// 		res.send(recipe[0]);
// 	})
// 	.catch(err => {
// 		res.status(500).send(err.stack);
// 	})
// });

// // Create fridge
// app.post('/new-fridge', (req, res) => {
// 	sqlAPI.createFridge(req.body)
// 	.then(fridge => {
// 		res.send(fridge[0]);
// 	})
// 	.catch(err => {
// 		res.status(500).send(err.stack);
// 	})
// });

// // User save recipe
// app.post('/save-recipe', (req, res) => {
// 	sqlAPI.saveUserRecipe(req.body)
// 	.then(savedRecipe => {
// 		res.send(savedRecipe[0]);
// 	})
// 	.catch(err => {
// 		res.status(500).send(err.stack);
// 	})
// });

// // Get user saved recipes
// app.post('/user-recipe', (req, res) => {
// 	sqlAPI.getUserSavedRecipes(req.body)
// 	.then(recipes => {
// 		res.send(recipes);
// 	})
// 	.catch(err => {
// 		res.status(500).send(err.stack);
// 	})
// });

// // Save ingredient to fridge
// app.post('/save-ingredient', (req, res) => {
// 	sqlAPI.saveUserIngredient(req.body)
// 	.then(savedIngredient => {
// 		res.send(savedIngredient[0]);
// 	})
// 	.catch(err => {
// 		res.status(500).send(err.stack);
// 	})
// });

// // delete ingredient from fridge
// app.post('/delete-ingredient-fridge', (req, res) => {
// 	sqlAPI.deleteIngredientFridge(req.body)
// 	.then(confirmation => {
// 		res.send(confirmation);
// 	})
// 	.catch(err => {
// 		res.status(500).send(err.stack);
// 	})
// });

// // Get user saved ingredients
// app.post('/user-fridge', (req, res) => {
// 	sqlAPI.getUserFridge(req.body)
// 	.then(fridge => {
// 		res.send(fridge);
// 	})
// 	.catch(err => {
// 		res.status(500).send(err.stack);
// 	})
// });

///////////////////////////////////////////////////////////////////////////////
const server = app.listen((process.env.PORT || 4000), (process.env.IP || 'localhost'), () => {
	const host = server.address().address;
	const port = server.address().port;
	console.log('Web server listening at http://%s:%s', host, port);
});