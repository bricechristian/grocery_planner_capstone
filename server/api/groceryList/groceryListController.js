const GroceryList = require('./groceryListModel');
const _ = require('lodash');

exports.params = (req, res, next, id) => {

		if (req.body.hasOwnProperty('pk')) {
				id = req.body.pk
		}

		GroceryList
				.findById(id)
				.then(function (groceryList) {
						if (!groceryList) {
								next(new Error("No grocery list item with that ID"))
						} else {
								req.groceryList = groceryList;
								next();
						}
				}, function (err) {
						next(err);
				});
};

exports.get = (req, res, next) => {
		GroceryList
				.find()
				.then(function (groceryList) {
						res
								.status(200)
								.json(groceryList);
				})
				.catch(function (error) {
						next(error);
				});

}

exports.post = (req, res, next) => {
		const newItem = req.body;
		GroceryList
				.create(newItem)
				.then(function (groceryList) {
						res.json(groceryList);
				})
				.catch(function (error) {
						next(error);
				});
};

exports.put = (req, res, next) => {

		const toUpdate = {
				price: req.body.value
		};

		GroceryList
				.findByIdAndUpdate(req.body.pk, toUpdate)
				.then((success) => {
						res
								.status(201)
								.end();
				})
				.catch((error) => {
						console.log(error);
				});
}

exports.delete = (req, res) => {

		req
				.groceryList
				.remove(function (err, removed) {
						if (err) {
								console.log(err);
						} else {
								res.json(removed);
						}
				});
}