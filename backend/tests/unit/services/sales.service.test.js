const { expect } = require('chai');
const sinon = require('sinon');
const model = require('../../../src/models/sales.model');
const service = require('../../../src/services/sales.service');
const salesMock = require('../mocks/sales.mocks');

describe('Testing sales service layer', function () {
  it('should return all sales', async function () {
    sinon.stub(model, 'getAllSales').resolves([salesMock]);

    const sales = await service.getAllSales();

    expect(sales.data).to.be.deep.equal([salesMock]);
    expect(sales.status).to.be.equal(200);
  });

  it('should return sale by id', async function () {
    sinon.stub(model, 'getByIdSale').resolves(salesMock[2]);

    const { status, data } = await service.getByIdSale(2);

    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.an('array');
    expect(data).to.be.deep.equal({
      saleId: 2,
      date: '2023-11-27T02:37:42.000Z',
      productId: 3,
      quantity: 15,
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});