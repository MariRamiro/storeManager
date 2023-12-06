const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesMiddleware = require('../../src/middlewares/sales.middlewares');

const { expect } = chai;
chai.use(sinonChai);

describe('Testing sales middleware', function () {
  it('if whithout "productId", should return error', async function () {
    const req = { body: [{ quantity: 1 }] };
    const res = {};
    const next = sinon.stub().returns();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    salesMiddleware.salesCheck(req, res, next);

    expect(res.status).to.been.calledWith(400);
    expect(res.json).to.been.calledWith({ message: '"productId" is required' });
    expect(next).not.to.have.been.calledWith();
  });

  it('if without "quantity", should return error', async function () {
    const req = { body: [{ productId: 1 }] };
    const res = {};
    const next = sinon.stub().returns();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    salesMiddleware.salesCheck(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    expect(next).not.to.have.been.calledWith();
  });

  it('"quantity" should be greater than or equal to 1', async function () {
    const req = { body: [{ productId: 1, quantity: 0 }] };
    const res = {};
    const next = sinon.stub().returns();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    salesMiddleware.salesQuantityCheck(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    expect(next).not.to.have.been.calledWith();
  });

  it('"quantity" should be correctly filled', async function () {
    const req = { body: [{ productId: 1, quantity: 1 }] };
    const res = {};
    const next = sinon.stub().returns();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    salesMiddleware.salesQuantityCheck(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  it('"productId" and "quantity" should be filled', async function () {
    const req = { body: [{ productId: 1, quantity: 1 }] };
    const res = {};
    const next = sinon.stub().returns();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    salesMiddleware.salesCheck(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  it('"productId" should be correctly filled', async function () {
    const req = { body: [{ productId: 1, quantity: 1 }] };
    const res = {};
    const next = sinon.stub().returns();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    salesMiddleware.salesQuantityCheck(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  afterEach(function () {
    sinon.restore();
  });
});