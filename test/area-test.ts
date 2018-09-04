import { Area, flip, rotate } from '../src/area';

QUnit.module('Area');

QUnit.test('rotate', assert => {
  assert.equal(rotate(Area.FrontTop), Area.FrontBottom);
  assert.equal(rotate(Area.FrontBottom), Area.FrontTop);
  assert.equal(rotate(Area.BackTop), Area.BackBottom);
  assert.equal(rotate(Area.BackBottom), Area.BackTop);
});

QUnit.test('flip', assert => {
  assert.equal(flip(Area.FrontTop), Area.BackTop);
  assert.equal(flip(Area.FrontBottom), Area.BackBottom);
  assert.equal(flip(Area.BackTop), Area.FrontTop);
  assert.equal(flip(Area.BackBottom), Area.FrontBottom);
});
