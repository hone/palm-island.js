import { Area, Card, Resource, TEMPLATES, flip, rotate } from 'palm-island';
import { expect } from 'ts-std';

QUnit.module('palm-island tests');

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

QUnit.test('card', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let card = new Card(canoeHouse);

  assert.equal(card.name, 'Canoe House');
  assert.deepEqual(card.resources, [Resource.Fish]);
  assert.equal(card.canRotate, true);
  assert.equal(card.canFlip, true);
});
