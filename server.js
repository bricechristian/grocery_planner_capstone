const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const _ = require('lodash');
const app = express();
const GroceryList = require('./models')

// middleware (error handling goes last in stack)
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

// connection to DB
mongoose.connect('mongodb://localhost/grocery-list');


app.get('/items', (req, res, next) => {
	GroceryList
	.find()
	.then(function(item){
		res.json(item)
	},
	function(err){
		next(err);
	});

})

// app.get('/items/:id', (req, res) => {
// 	GroceryList
// 	.findById(req.params.id)
// 	.then()
// })

app.post('/items', (req, res, next) => {
	const newItem = req.body;
	GroceryList
	.create(newItem)
	.then(function(item){
		res.json(item);
	},
	function(err){
		next(err);
	})
});

app.put('/items', (req, res) => {
	const item = req.item;
	const update = req.body;

	_.merge(item, update);
	console.log(item)

	item.save(function(err, saved){
		if(err){
			console.log(err);
		} 
		// else {
		// 	res.json(saved);
		// }
	});
	// GroceryList
	// .findbyIdAndUpdate(req.params.item_id, {$set:req.body}, function(err))
	// 

})

app.delete('/items', (req, res) => {

	req.item.remove(function(err, removed){
		if(err){
			console.log(err);
		} 
		// else{
		// 	res.json(removed);
		// }
	});
	
	// GroceryList
	// .findByIdAndRemove()
})

// error handling middlware
app.use(function(err,req,res,next){
	console.log(err);
	res.status(500);
})

app.listen(process.env.PORT || 8080);

module.exports = app;