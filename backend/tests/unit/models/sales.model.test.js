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

  it('should return sale error message', async function () {
    sinon.stub(connection, 'execute').resolves([{ 'Sales not found': 'Sale not found ' }]);

    const sales = await model.getByIdSale(7);

    expect(sales).to.contain.property('Sales not found');
  });

  it('should insert a sale', async function () {
    const insertId = 3;
    sinon.stub(connection, 'execute').resolves([{ insertId }]);

    const sales = await model.insertSale(salesMockBody);

    expect(sales).to.be.an('number');
    expect(sales).to.be.deep.equal(insertId);
  });

  it('should delete a sale', async function () {
    const deleteId = 3;
    sinon.stub(connection, 'execute').resolves([[{ id: 3 }]]);

    const deletedSale = await model.deleteSale(deleteId);

    expect(deletedSale).to.be.a('number');
    expect(deletedSale).to.be.deep.equal(deleteId);
  });

  afterEach(function () {
    sinon.restore();
  });
});