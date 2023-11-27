const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const controller = require('../../../src/controllers/products.controller');
const service = require('../../../src/services/products.service');
const productsMock = require('../mocks/products.mocks');

chai.use(sinonChai);
const { expect } = chai;

describe('Testing controller layer', function () {
  it('should return all products', async function () {
    sinon.stub(service, 'getAllProducts').resolves({ status: 200, data: productsMock });

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.getAllProducts(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.deep.calledWith(productsMock[0]);
  });

  it('should return a product by id', async function () {
    sinon.stub(service, 'getAllProducts').resolves({ status: 200, data: productsMock[0] });

    const req = {
      params: {
        id: 1,
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  
    await controller.getByIdProduct(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.deep.calledWith(productsMock[0]);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});