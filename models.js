const mongoose = require('mongoose');

const groceryListSchema = mongoose.Schema({
	item: {type: String, required: true }
	price: {type: Number, required: true}
})

groceryListSchema.methods.apiRetrn = function () {
	return {
		this.item,
		this.price
	};
}


module.exports = {groceryListSchema};