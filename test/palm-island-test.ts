import hello from 'palm-island';

QUnit.module('palm-island tests');

QUnit.test('hello', assert => {
  assert.equal(hello(), 'Hello from palm-island');
});
