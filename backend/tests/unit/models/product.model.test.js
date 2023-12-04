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

  it('should insert a new product', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const newInsertId = await model.insertProduct('Roupa de banho');

    expect(newInsertId).to.be.a('number');
    expect(newInsertId).to.be.deep.equal(4);
  });

  it('should update a product', async function () {
    const newProduct = { id: 4, name: 'Roupa de banho' };
    sinon.stub(connection, 'execute').resolves({ affectedRows: 1 });

    const id = 4;
    const name = 'Roupa de banho';

    const product = await model.updateProduct(id, name);

    expect(product).to.be.a('object');
    expect(product).to.be.deep.equal(newProduct);
  });

  it('should delete a product', async function () {
    const id = 1;
    const affectedRows = 1;
    sinon.stub(connection, 'execute').resolves([{ affectedRows }]);

    const product = await model.deleteProduct(id);

    expect(product).to.be.deep.equal(affectedRows);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});