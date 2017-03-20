const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const GroceryListSchema = new Schema({
		name: {type: String, unique: true, required: true},
		price: {type: String, required: true}
});

module.exports = mongoose.model('GroceryList', GroceryListSchema);
