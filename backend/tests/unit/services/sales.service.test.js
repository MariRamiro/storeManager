const { expect } = require('chai');
const sinon = require('sinon');
const model = require('../../../src/models/sales.model');
const service = require('../../../src/services/sales.service');
const { salesMock, salesMockBody, salesMockRes } = require('../mocks/sales.mocks');

describe('Testing sales service layer', function () {
  it('should return all sales', async function () {
    sinon.stub(model, 'getAllSales').resolves([salesMock]);

    const sales = await service.getAllSales();

    expect(sales.data).to.be.deep.equal([salesMock]);
    expect(sales.status).to.be.equal('SUCCESSFUL');
  });

  it('should return an empty array', async function () {
    sinon.stub(model, 'getAllSales').resolves([]);

    const { status, data } = await service.getAllSales();

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.deep.equal([]);
  });

  it('should return "NOT_FOUND" if nonexistent id', async function () {
    sinon.stub(model, 'getByIdSale').resolves();

    const { status, data } = await service.getByIdSale(99);

    expect(status).to.be.equal('NOT_FOUND');
    expect(data.message).to.be.deep.equal('Sale not found');
  });

  it('should return sale by id', async function () {
    sinon.stub(model, 'getByIdSale').resolves([salesMock]);

    const { status, data } = await service.getByIdSale(1);

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal([salesMock]);
  });

  it('should insert a sale', async function () {
    const insertId = 3;
    sinon.stub(model, 'insertSale').resolves(insertId);

    const { status, data } = await service.insertSale(salesMockBody);

    expect(status).to.be.equal('CREATED');
    expect(data).to.be.deep.equal(salesMockRes);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});