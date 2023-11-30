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

  it('should insert a sale', async function () {
    const insertId = 3;
    sinon.stub(connection, 'execute').resolves([{ insertId }]);

    const sales = await model.insertSale(salesMockBody);

    expect(sales).to.be.an('number');
    expect(sales).to.be.deep.equal(insertId);
  });

  afterEach(function () {
    sinon.restore();
  });
});