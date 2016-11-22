const express = require('express');
const foodme = require('./js/foodme.js');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.set('view engine', 'pug');

app.use(cors());
app.use(morgan('dev'));
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

///////////////////////////////////////////////////////////////////////////////
// Fridge

// On mount
app.post('/get-fridge/:clientId', (req, res) => {
	sqlAPI.findOrCreateFridge(req.params.clientId)
	.then(result => {
		res.json({fridgeId: result});
	})
	.catch(err => {
		res.status(500).send(err.stack);
	})
});

// On mount and update
app.post('/display-fridge/:fridgeId', (req, res) => {
	sqlAPI.displayFridge(req.params.fridgeId)
	.then(result => {
		res.json(result);
	})
	.catch(err => {
		res.status(500).send(err.stack);
	})
});

// On user ingredient input
app.post('/insert-into-fridge/', (req, res) => {
	sqlAPI.saveUserIngredient(req.body)
	.then(result => {
		res.json(result);
	})
	.catch(err => {
		res.status(500).send(err.stack);
	})
});

// Delete ingredient from fridge
app.post('/delete-ingredient', (req, res) => {
	sqlAPI.deleteIngredient(req.body)
	.then(result => {
		res.json(result);
	})
	.catch(err => {
		res.status(500).send(err.stack);
	})
})

///////////////////////////////////////////////////////////////////////////////
// Saved recipes

// On mount and update
app.post('/display-recipes/:clientId', (req, res) => {
	sqlAPI.displaySavedRecipe(req.params.clientId)
	.then(recipes => {
		res.json(recipes);
	})
	.catch(err => {
		res.status(500).send(err.stack);
	})
});

// On user save recipe input
app.post('/insert-save-recipe/', (req, res) => {
	sqlAPI.saveUserRecipe(req.body)
	.then(result => {
		res.json(result);
	})
	.catch(err => {
		res.status(500).send(err.stack);
	})
});

// Delete saved recipe
app.post('/delete-recipe/', (req, res) => {
	sqlAPI.deleteRecipe(req.body)
	.then(result => {
		res.json(result);
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