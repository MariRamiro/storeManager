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

  it('should return an empty array', async function () {
    sinon.stub(model, 'getAllProducts').resolves([]);

    const { status, data } = await service.getAllProducts();

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.deep.equal([]);
  });

  it('should return a product by id', async function () {
    sinon.stub(model, 'getByIdProduct').resolves(productsMock[0]);

    const product = await service.getByIdProduct(1);

    expect(product.data).to.be.deep.equal(productsMock[0]);
    expect(product.status).to.be.equal('SUCCESSFUL');
  });

  it('should return "NOT_FOUND" if nonexistent id', async function () {
    sinon.stub(model, 'getByIdProduct').resolves();

    const { status, data } = await service.getByIdProduct(99);

    expect(status).to.be.equal('NOT_FOUND');
    expect(data.message).to.be.deep.equal('Product not found');
  });

  it('should delete a product', async function () {
    const id = 1;
    const affectedRows = 1;
    sinon.stub(model, 'deleteProduct').resolves(affectedRows);

    const product = await service.deleteProduct(id);

    expect(product.data).to.be.deep.equal(affectedRows);
    expect(product.status).to.be.equal('DELETED');
  });

  it('should not delete a nonexistent product', async function () {
    const id = 7;
    const affectedRows = 0;
    sinon.stub(model, 'deleteProduct').resolves(affectedRows);

    const product = await service.deleteProduct(id);

    expect(product.data.message).to.be.equal('Product not found');
    expect(product.status).to.be.equal('NOT_FOUND');
  });

  it('should insert a product', async function () {
    const insertId = 4;
    sinon.stub(model, 'insertProduct').resolves(insertId);

    const product = 'Roupa de banho';
    const { status, data } = await service.insertProduct(product);

    expect(status).to.be.equal('CREATED');
    expect(data).to.be.an('object');
    expect(data).to.be.deep.equal({ 
      id: 4, 
      name: 'Roupa de banho',
    });
  });

  it('should update a product', async function () {
    sinon.stub(model, 'updateProduct').resolves({ id: 4, name: 'Roupa de festa' });

    const id = 4;
    const product = 'Roupa de festa';
    const { status, data } = await service.updateProduct(id, product);

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal({
      id: 4, 
      name: 'Roupa de festa',
    });
    expect(data).to.be.an('object');
  });

  afterEach(function () {
    sinon.restore();
  });
});