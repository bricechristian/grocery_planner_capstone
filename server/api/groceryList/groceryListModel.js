const mongoose = require('mongoose');
const Schema = mongoose.Schema; 


const GroceryListSchema = new Schema({
		name: {type: String, required: true},
		price: {type: String, required: true}
});

module.exports = mongoose.model('groceryList', GroceryListSchema);
