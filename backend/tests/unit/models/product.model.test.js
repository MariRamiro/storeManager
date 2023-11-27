const { expect } = require('chai');
const sinon = require('sinon');
const model = require('../../../src/models/products.model');
const productsMock = require('../mocks/products.mocks');

const connection = require('../../../src/db/connection');

describe('Testing product model layer', function () {
  it('should return all products', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock]);

    const allProducts = await model.getAllProducts();

    expect(allProducts).to.be.an('array');
    expect(allProducts).to.be.deep.equal(productsMock);
  });

  it('should return a product by id', async function () {
    sinon.stub(connection, 'execute').resolves([[productsMock]][0]);

    const product = await model.getByIdProduct(1);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal({
      id: 1,
      name: 'Martelo de Thor',
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});