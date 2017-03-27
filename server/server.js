const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _ = require('lodash');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const path = require('path');

// connection to mongo

mongoose.connect('mongodb://localhost/groceryList');

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static(path.join(__dirname, '../', 'public')));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/api', require('./api/groceryList/groceryListRouter'))


app.all('*', function(req, res, next){
	res.sendFile(path.join(__dirname, '../public/index.html'))
	next(err);
})

app.use(function(err, req, res, next){
	if(err){
		console.log(err);
		res.status(401).send('Oops! Try again.')
	}
	return;
})


app.listen(3000);
console.log('on port 3000');

module.exports = app;

