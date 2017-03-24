const GroceryList = require('./groceryListModel');
const _ = require('lodash');

exports.params = (req, res, next, id) => {
	GroceryList.findById(id)
	.then(function(groceryList){
		if(!groceryList){
			next(new Error("No grocery list item with that ID"))
		}
		else{
			req.groceryList = groceryList;
			next();
		}
	}, function(err){
		next(err);
	});
};

exports.get = (req, res, next) => {
	GroceryList
	.find()
	.then(function(groceryList){
		res.json(groceryList)
	},
	function(err){
		next(err);
	});

}

exports.post = (req, res, next) => {
	const newItem = req.body;
	GroceryList
	.create(newItem)
	.then(function(groceryList){
		res.json(groceryList);
	},
	function(err){
		next(err);
	})
};

exports.put = (req, res) => {
	const groceryList = req.groceryList;
	const update = req.body;

	_.merge(groceryList, update);

	GroceryList.save(function(err, saved){
		if(err){
			console.log(err);
		} 
		else {
			res.json(saved);
		}
	});
}

exports.delete = (req, res) => {

	req.groceryList.remove(function(err, removed){
		if(err){
			console.log(err);
		} 
		else{
			res.json(removed);
		}
	});
}
