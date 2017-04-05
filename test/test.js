const app = require('../server/server');
const request = require('supertest');
const expect = require('chai').expect;
const GroceryList = require('../server/api/groceryList/groceryListModel')



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

	it('should return each item on the GET as an object with correct keys', function(done){

		request(app)
		.get('/api/items')
		.set('Accept', 'application/json')
		.expect('Content-type', '/json/')
		.expect(200)
		.end(function(err, res){
				for(var i = 0; i < res.body.length; i++){
					expect(res.body[i]).to.be.an('object');
					expect(res.body[i]).to.have.any.keys('name', 'price');
				}
				if(res.body.length === 0){
					expect(res.body).to.be.empty;
				}
			done();		
		})
	});

	
	it('should post a grocery item as an object with correct keys', function(done){

		var item2 = {name: 'fried green tomatoes', price: '5.99'}

		request(app)
		.post('/api/items')
		.send(item2)
		.expect('Content-type', '/json/')
		.expect(200)
		.end(function(err, res){
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.any.keys('name', 'price');
			done();		
		})
	});

	
	
	it('should delete a grocery item', function(done){

		var item3 = {name: 'chicken blt', price: '6.99'}

		request(app)
		.post('/api/items')
		.send(item3)
		.expect('Content-type', '/json/')
		.expect(200)
		.end(function(err, res){
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.any.keys('name', 'price');
					request(app)
					.del('/api/items')
						.end(function(err, res){
							expect(res.body).to.be.empty;
							done();
						})
			})
	});


	// 	it('should update a grocery item', function(done){

	// 	var item = {name: 'candy', price: '4.99'}

	// 	request(app)
	// 	.post('/api/items')
	// 	.expect('Content-type', '/json/')
	// 	.expect(200)
	// 	.end(function(err, res){
	// 				expect(res.body).to.be.an('object');
	// 				expect(res.body).to.have.any.keys('name', 'price');
	// 				request(app)
	// 				.put('/api/items/update')
	// 					.send({price: '2.99'})
	// 					.end(function(err, res){
	// 						expect(item.price).to.equal('2.99');
	// 						done();
	// 					})
	// 		})
	// });


})