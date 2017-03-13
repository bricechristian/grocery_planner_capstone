const mongoose = require('mongoose');

const groceryListSchema = mongoose.Schema({
	item: {
		name: {type: String, required: true},
		price: {type: String, required: true}
	}
})


groceryListSchema.methods.apiRetrn = function () {
	return {
		name: this.item.name,
		price: this.item.price
	};
}


module.exports = {groceryListSchema};