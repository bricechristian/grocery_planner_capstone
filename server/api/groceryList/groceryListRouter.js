const router = require('express').Router();
const controller = require('./groceryListController');

router.param('id',controller.params)

router.route('/items')
	.get(controller.get)
	.post(controller.post)

router.route('/items/:id')
	.put(controller.put)
	.delete(controller.delete)

module.exports = router;