const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

// CLEARS OUT THE SCHEMA. ELIMINATES A SCHEMA OVERWRITE ISSUE I HAD WHEN TRYING TO RUN THE SERVER.

mongoose.models = {};
mongoose.modelSchemas = {};

const GroceryListSchema = new Schema({
		name: {type: String, required: true},
		price: {type: String, required: true}
});

module.exports = mongoose.model('groceryList', GroceryListSchema);
