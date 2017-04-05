const router = require('express').Router();
const controller = require('./groceryListController');

router.param('id', controller.params)

router
		.route('/items')
		.get(controller.get)
		.post(controller.post)

router
		.route('/items/:id')
		.delete(controller.delete)

router
		.route('/items/update')
		.put(controller.put)

module.exports = router;