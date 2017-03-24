const app = require('../server/server');
const request = require('supertest');
const expect = require('chai').expect;
const GroceryList = require('../server/api/GroceryList/GroceryListModel')



describe('[GROCERY LIST]', function(){
	it('should verify the root as HTML', function(done){
		request(app)
		.get('/')
		.set('Accept', 'application/json')
		.expect('Content-type', '/json/')
		.expect(200)
		.end(function(err, res){
			expect(res).to.be.html;
			done();
		})
	});

	it('should return all items on GET as an array', function(done){
		request(app)
		.get('/api/items')
		.set('Accept', 'application/json')
		.expect('Content-type', '/json/')
		.expect(200)
		.end(function(err, res){
			expect(res.body).to.be.an('array');
			done();
		})
	});

	// 	// it('should verify that each item on GET is an object', function(done){
	// 	// request(app)
	// 	// .get('api/items/:id')
	// 	// .set('Accept', 'application/json')
	// 	// .expect('Content-type', '/json/')
	// 	// .expect(200)
	// 	// .end(function(err, res){
	// 	// 	expect(res.groceryList).to.be.an('object');
	// 	// 	expect(res.groceryList).to.have.include.keys('name');
	// 	// 	done();
	// 	// })
	// });

})