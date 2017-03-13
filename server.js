const express = require('express');
const app = express();
const {groceryList} = require('./models')
app.use(express.static(__dirname + '/public'));



app.get('/', (req, res) => {
	res.sendFile('index.html');
})



app.listen(process.env.PORT || 8080);

module.exports = {app};