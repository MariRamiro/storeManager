const { expect } = require('chai');
const sinon = require('sinon');
const service = require('../../../src/services/products.service');
const model = require('../../../src/models/products.model');
const productsMock = require('../mocks/products.mocks');

describe('Testing service layer', function () {
  it('should return all products', async function () {
    sinon.stub(model, 'getAllProducts').resolves(productsMock);
    
    const allProducts = await service.getAllProducts();
  
    expect(allProducts.data).to.be.deep.equal(productsMock);
    expect(allProducts.status).to.be.equal(200);
  });

  it('should return a product by id', async function () {
    sinon.stub(model, 'getByIdProduct').resolves(productsMock[0]);

    const product = await service.getByIdProduct(1);

    expect(product.data).to.be.deep.equal(productsMock[0]);
    expect(product.status).to.be.equal(200);
  });

  afterEach(function () {
    sinon.restore();
  });
});