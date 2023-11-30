const { expect } = require('chai');
const sinon = require('sinon');
const service = require('../../../src/services/products.service');
const model = require('../../../src/models/products.model');
const productsMock = require('../mocks/products.mocks');

describe('Testing product service layer', function () {
  it('should return all products', async function () {
    sinon.stub(model, 'getAllProducts').resolves(productsMock);
    
    const allProducts = await service.getAllProducts();
  
    expect(allProducts.data).to.be.deep.equal(productsMock);
    expect(allProducts.status).to.be.equal('SUCCESSFUL');
  });

  it('should return a product by id', async function () {
    sinon.stub(model, 'getByIdProduct').resolves(productsMock[0]);

    const product = await service.getByIdProduct(1);

    expect(product.data).to.be.deep.equal(productsMock[0]);
    expect(product.status).to.be.equal('SUCCESSFUL');
  });

  it('should delete a product', async function () {
    const id = 1;
    const affectedRows = 1;
    sinon.stub(model, 'deleteProduct').resolves(affectedRows);

    const product = await service.deleteProduct(id);

    expect(product.data).to.be.deep.equal(affectedRows);
    expect(product.status).to.be.equal('DELETED');
  });

  it('should not delete a product that not exists', async function () {
    const id = 7;
    const affectedRows = 0;
    sinon.stub(model, 'deleteProduct').resolves(affectedRows);

    const product = await service.deleteProduct(id);

    expect(product.data.message).to.be.equal('Product not found');
    expect(product.status).to.be.equal('NOT_FOUND');
  });

  afterEach(function () {
    sinon.restore();
  });
});