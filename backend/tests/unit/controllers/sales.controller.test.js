const { expect } = require('chai');
const sinon = require('sinon');
const service = require('../../../src/services/sales.service');
const controller = require('../../../src/controllers/sales.controller');
const salesMock = require('../mocks/sales.mocks');

describe('Testing sales controller layer', function () {
  it('should return sales', async function () {
    sinon.stub(service, 'getAllSales').resolves({ status: 'SUCCESSFUL', data: salesMock });

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.getAllSales(req, res);

    expect(res.status.calledWith(200)).to.be.equal.apply(true);
    expect(res.json.calledWith(salesMock)).to.be.equal(true);
  });

  it('should return sale by id', async function () {
    sinon.stub(service, 'getByIdSale').resolves({ status: 'SUCCESSFUL', data: salesMock[0] });

    const req = {
      params: {
        id: 2,
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.getByIdSale(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.status.calledWith(salesMock[0])).to.be.equal(true);
  });

  afterEach(function () {
    sinon.restore();
  });
});
