const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();
const {groceryList} = require('./models')
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());


mongoose.connect('mongodb://bricechristian:brice2006@ds129090.mlab.com:29090/grocery-list')


app.get('/', (req, res) => {
	res.sendFile('index.html');
})

app.get('/', (req, res) => {
	groceryList
	.find()
})

app.post('/', (req, res) => {

})

app.put('/', (req, res) => {

})

app.delete('/', (req, res) => {

})



app.listen(process.env.PORT || 8080);

module.exports = {app};