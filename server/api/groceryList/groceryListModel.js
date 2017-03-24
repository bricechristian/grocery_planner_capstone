const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

// clears out any existing mongoose data and schemas
// without it, I was getting a mongoose error in the terminal
// about mongoose being overwritten and it causing an error
mongoose.models = {};
mongoose.modelSchemas = {};

const GroceryListSchema = new Schema({
		name: {type: String, unique: true, required: true},
		price: {type: String, required: true}
});

module.exports = mongoose.model('groceryList', GroceryListSchema);
