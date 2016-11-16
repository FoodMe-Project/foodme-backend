const express = require('express');
const foodme = require('./js/foodme.js');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const favicon = require('serve-favicon');

const app = express();
app.set('view engine', 'pug');
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

// Console.log every request to the web server, USEFULL??
app.use(morgan('dev'));

// Access to the database
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'sqltemppassword',
	database: 'foodme'
});
const sqlAPI = foodme(connection);

///////////////////////////////////////////////////////////////////////////////
// Documentation
app.get('/', function(req, res) {
	res.status(200).render('index');
});

// Create user
app.get('/newuser', (req, res) => {
	sqlAPI.createUser(req.query)
	.then(user => {
		res.send(user[0]);
	})
	.catch(err => {
		res.status(500).send(err.stack);
	})
});

// Create ingredient
app.get('/newingredient', (req, res) => {
	sqlAPI.createIngredient(req.query)
	.then(ingredient => {
		res.send(ingredient[0]);
	})
	.catch(err => {
		res.status(500).send(err.stack);
	})
});

// Create recipe
app.get('/newrecipe', (req, res) => {
	sqlAPI.createRecipe(req.query)
	.then(recipe => {
		res.send(recipe[0]);
	})
	.catch(err => {
		res.status(500).send(err.stack);
	})
});

// Create fridge
app.get('/newfridge', (req, res) => {
	sqlAPI.createFridge(req.query)
	.then(fridge => {
		res.send(fridge[0]);
	})
	.catch(err => {
		res.status(500).send(err.stack);
	})
});

// User save recipe
app.get('/saverecipe', (req, res) => {
	sqlAPI.saveUserRecipe(req.query)
	.then(savedRecipe => {
		res.send(savedRecipe[0]);
	})
	.catch(err => {
		res.status(500).send(err.stack);
	})
})

// Get user saved recipes
app.get('/userrecipe', (req, res) => {
	sqlAPI.getUserSavedRecipes(req.query)
	.then(recipes => {
		res.send(recipes);
	})
	.catch(err => {
		res.status(500).send(err.stack);
	})
})	

///////////////////////////////////////////////////////////////////////////////
const server = app.listen((process.env.PORT || 4000), (process.env.IP || 'localhost'), () => {
	const host = server.address().address;
	const port = server.address().port;
	console.log('Web server listening at http://%s:%s', host, port);
});