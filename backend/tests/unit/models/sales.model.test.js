const { expect } = require('chai');
const sinon = require('sinon');
const model = require('../../../src/models/sales.model');
const connection = require('../../../src/db/connection');
const { salesMock, salesMockBody } = require('../mocks/sales.mocks');

describe('Testing sales model layer', function () {
  it('should return all sales', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock]);

    const sales = await model.getAllSales();

    expect(sales).to.be.an('array');
    expect(sales).to.be.deep.equal(salesMock);
  });

  it('should return sale by id', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock]);

    const sales = await model.getByIdSale(1);

    expect(sales).to.be.an('array');
    expect(sales).to.be.deep.equal(salesMock);
  });

  it('should create a sale', async function () {
    const createId = 3;
    sinon.stub(connection, 'execute').resolves([{ createId }]);

    const sales = await model.createSale(salesMockBody);

    expect(sales).to.be.an('array');
    expect(sales).to.be.deep.equal(createId);
  });

  afterEach(function () {
    sinon.restore();
  });
});