const express = require('express');
const app = express();
const {groceryListSchema} = require('./models')
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
})



app.listen(process.env.PORT || 8080);

module.exports = {app};