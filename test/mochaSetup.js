const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

before('Setup test environment', () => {
  chai.use(sinonChai);
  chai.use(chaiAsPromised);

  process.env.NODE_ENV = 'test';
});
