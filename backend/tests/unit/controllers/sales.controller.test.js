const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const service = require('../../../src/services/sales.service');
const controller = require('../../../src/controllers/sales.controller');
const { salesMock, salesMockBody, salesMockRes } = require('../mocks/sales.mocks');

chai.use(sinonChai);
const { expect } = chai;

describe('Testing sales controller layer', function () {
  it('should return sales', async function () {
    sinon.stub(service, 'getAllSales').resolves({ status: 'SUCCESSFUL', data: salesMock });

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.getAllSales(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.deep.calledWith(salesMock);
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

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.deep.calledWith(salesMock[0]);
  });

  it('should return error message', async function () {
    sinon.stub(service, 'getByIdSale').resolves({ status: 'NOT_FOUND', data: { message: 'Sale not found' } });
    
    const req = {
      params: {
        id: 7,
      },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.getByIdSale(req, res);

    expect(res.status).to.be.calledWith(404);
  });

  it('should insert a sale', async function () {
    const res = {};
    const req = {
      body: { 
        salesMockBody,
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    sinon.stub(service, 'insertSale').resolves({ status: 'CREATED', data: salesMockRes });

    await controller.insertSale(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.deep.calledWith(salesMockRes);
  });

  it('should delete a sale', async function () {
    sinon.stub(service, 'deleteSale').resolves({ status: 'DELETED' });

    const req = {
      params: {
        id: 3,
      },
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.deleteSale(req, res);

    expect(res.status).to.be.calledWith(204);
  });

  it('should return error if didn t delete a sale', async function () {
    sinon.stub(service, 'deleteSale').resolves({ status: 'NOT_FOUND' });

    const req = {
      params: {
        id: 7,
      },
    };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    await controller.deleteSale(req, res);

    expect(res.status).to.be.calledWith(404);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});