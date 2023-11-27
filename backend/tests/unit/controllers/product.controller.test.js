// const sinon = require('sinon');
// const { expect } = require('chai');
// const controller = require('../../../src/controllers/products.controller');
// const service = require('../../../src/services/products.service');
// const productsMock = require('../mocks/products.mocks');

// describe('Testing controller layer', function () {
//   it('should return all products', async function () {
//     sinon.stub(service, 'getAllProducts').resolves({ status: 'SUCCESSFUL', data: productsMock });

//     const req = {};
//     const res = {};

//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);

//     await controller.getAllProducts(req, res);

//     expect(res.status.calledWith(200)).to.be.equal(true);
//     expect(res.json.calledWith(productsMock[0])).to.be.equal(true);
//   });

//   it('should return a product by id', async function () {
//     sinon.stub(service, 'getAllProducts').resolves({ status: 'SUCCESSFUL', data: productsMock[0] });

//     const req = {
//       params: {
//         id: 1,
//       },
//     };
//     const res = {};

//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
  
//     await controller.getByIdProduct(req, res);

//     expect(res.status.calledWith(200)).to.be.equal(true);
//     expect(res.json.calledWith(productsMock[0])).to.be.equal(true);
//   });

//   afterEach(function () {
//     sinon.restore();
//   });
// });