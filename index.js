const express = require('express');
const foodme = require('./js/foodme.js');
const morgan = require('morgan');
const mysql = require('mysql');
const favicon = require('serve-favicon');

const app = express();
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// Console.log every request to the web server
app.use(morgan('dev'));

// Access to the database
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'sqltemppassword',
	database: 'foodme'
});

const foodmeAPI = foodme(connection);

app.locals.pretty = true;
app.locals.title = "FoodMe";

///////////////////////////////////////////////////////////////////////////////
// Resources
app.get('/', function(request, response) {
	response.status(200).send('Server on');
})

///////////////////////////////////////////////////////////////////////////////
// Start web server
const server = app.listen((process.env.PORT || 4000), (process.env.IP || 'localhost'), function() {
	const host = server.address().address;
	const port = server.address().port;

	console.log('Web server listening at http://%s:%s', host, port);
})