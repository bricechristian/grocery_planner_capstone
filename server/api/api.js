const router = require('express').Router();

router.use('/groceries', require('./grocerylist/grocerylistRouter'));

module.exports = router; 	