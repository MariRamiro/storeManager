const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const middlewares = require('../../src/middlewares/sales.middlewares');

chai.use(sinonChai);

const { expect } = chai;

describe('Testing sales check middlewares', function () {
  it('should return error message when quantity is empty', async function () {
    const data = {};
    const req = { body: data, params: { id:1, productId: 2 } };
    const res = { status:
      sinon.stub().returns({ json: sinon.stub() }) };
    const next = sinon.stub().returns();

    await middlewares.salesCheck(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.status().json).to.have.been.calledWith({ message: '"quantity" is required' });
  });

  afterEach(sinon.restore);
});