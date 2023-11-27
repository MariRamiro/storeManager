const { expect } = require('chai');
const sinon = require('sinon');
const model = require('../../../src/models/sales.model');
const connection = require('../../../src/db/connection');
const salesMock = require('../mocks/sales.mocks');

describe('Testing sales model layer', function () {
  it('should return all sales', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock]);

    const sales = await model.getAllSales();

    expect(sales).to.be.an('array');
    expect(sales).to.be.deep.equal(salesMock);
  });

  it('should return sale by id', async function () {
    sinon.stub(connection, 'execute').resolves([[salesMock]][0]);

    const sales = await model.getByIdSale(1);

    expect(sales).to.be.an('array');
    expect(sales).to.be.deep.equal({
      saleId: 1,
      date: '2023-11-27T02:37:42.000Z',
      productId: 1,
      quantity: 5,
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});