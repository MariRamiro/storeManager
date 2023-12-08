const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const middlewares = require('../../src/middlewares/products.check.middlewares');

chai.use(sinonChai);

const { expect } = chai;

describe('Testing products check middlewares', function () {
  it('if without "name",should return error message', function () {
    const req = { 
      body: {},
    };
    const res = {};
    const next = sinon.stub().returns();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    middlewares(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.status().json).to.have.been.calledWith({ message: '"name" is required' });
    expect(next).not.to.have.been.calledWith();
  });

  it('"name" should be at least 5 characters long', async function () {
    const req = { 
      body: {
        name: 'test',
      },
    };
    const res = {};
    const next = sinon.stub().returns();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    middlewares(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.status().json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    expect(next).not.to.have.been.calledWith();
  });

  it('"next" should work correctly', async function () {
    const req = { 
      body: {
        name: 'active',
      },
    };
    const res = {};
    const next = sinon.stub().returns();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    middlewares(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  afterEach(sinon.restore);
});