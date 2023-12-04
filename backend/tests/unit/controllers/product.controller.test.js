const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const controller = require('../../../src/controllers/products.controller');
const service = require('../../../src/services/products.service');
const productsMock = require('../mocks/products.mocks');

chai.use(sinonChai);
const { expect } = chai;

describe('Testing product controller layer', function () {
  it('should return all products', async function () {
    sinon.stub(service, 'getAllProducts').resolves({ status: 'SUCCESSFUL', data: productsMock });

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.getAllProducts(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.deep.calledWith(productsMock);
  });

  it('should return a product by id', async function () {
    sinon.stub(service, 'getByIdProduct').resolves({ status: 'SUCCESSFUL', data: productsMock[0] });

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

  it('should return "NOT_FOUND" status if nonexistent product', async function () {
    sinon.stub(service, 'getByIdProduct').resolves({ status: 'NOT_FOUND', data: { message: 'Product not found' } });

    const req = {
      params: {
        id: 7,
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  
    await controller.getByIdProduct(req, res);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.deep.calledWith({ message: 'Product not found' });
  });

  it('should delete a product', async function () {
    const res = {};
    const req = {
      params: 1,
    };

    const affectedRows = 1;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    sinon.stub(service, 'deleteProduct').resolves({ status: 'DELETED', data: affectedRows });

    await controller.deleteProduct(req, res);

    expect(res.status).to.be.calledWith(204);
    expect(res.json).to.be.deep.calledWith(affectedRows);
  });

  it('should not delete a nonexistent product', async function () {
    const res = {};
    const req = {
      params: 7,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    sinon.stub(service, 'deleteProduct').resolves({ status: 'NOT_FOUND', data: { message: 'Product not found' } });

    await controller.deleteProduct(req, res);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.deep.calledWith({ message: 'Product not found' });
  });

  it('should insert a product', async function () {
    sinon.stub(service, 'insertProduct').resolves({ 
      status: 'CREATED', 
      data: {
        id: 4,
        name: 'Roupa de banho',
      } });

    const req = {
      body: {
        name: 'Roupa de banho',
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.insertProduct(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.deep.calledWith({
      id: 4,
      name: 'Roupa de banho',
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});