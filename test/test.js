const chai = require('chai');
const chaiHttp = require('chai-http');
const {app} = require('../server');
const should = chai.should();

chai.use(chaiHttp);


describe('testing app endpoints', function() {
	it('should verify the GET endpoint as HTML', function() {
		let res;
		return chai.request(app)
		.get('/')
		.then(function(_res){
			let res = _res;
			res.should.have.status(200);
			res.should.be.html;
		});
	});
});