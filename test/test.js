const app = require('../server');
const request = require('supertest');
const expect = require('chai').expect;
const GroceryList = require('../models')



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
		.get('/items')
		.set('Accept', 'application/json')
		.expect('Content-type', '/json/')
		.expect(200)
		.end(function(err, res){
			expect(res.body).to.be.a('object');
			done();
		})
	});

		it('should verify that each item on GET is an object', function(done){
		request(app)
		.get('/items/:id')
		.set('Accept', 'application/json')
		.expect('Content-type', '/json/')
		.expect(200)
		.end(function(err, res){
			expect(res.item).to.be.a('object');
			expect(res.item).to.have.property('name', 'price');
			done();
		})
	});

})