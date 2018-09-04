import { expect } from 'ts-std';

import { Card, Resource } from '../src/card';
import { TEMPLATES } from '../src/templates';

QUnit.module('Card');

QUnit.test('id', assert => {
  let card = new Card(TEMPLATES[0], 3);

  assert.equal(card.id, 3);
});

QUnit.test('name', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let card = new Card(canoeHouse, 1);

  assert.equal(card.name, 'Canoe House');
});

QUnit.test('resources', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let card = new Card(canoeHouse, 1);

  assert.deepEqual(card.resources, [Resource.Fish]);
});

QUnit.test('store', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let card = new Card(canoeHouse, 1);

  assert.equal(card.canRotate, true);
  assert.equal(card.canFlip, true);
  assert.equal(card.canStore, true);

  card.store();
  assert.equal(card.canRotate, false);
  assert.equal(card.canFlip, false);
  assert.equal(card.canStore, false);

  card.unstore();
  assert.equal(card.canRotate, true);
  assert.equal(card.canFlip, true);
  assert.equal(card.canStore, true);
});

QUnit.test('storeRequirements', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let card = new Card(canoeHouse, 1);

  assert.deepEqual(card.storeRequirements, [[]]);
});

QUnit.test('rotateRequirements', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let card = new Card(canoeHouse, 1);

  assert.deepEqual(card.rotateRequirements, [[Resource.Fish]]);
});

QUnit.test('flipRequirements', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let card = new Card(canoeHouse, 1);

  assert.deepEqual(card.flipRequirements, [[Resource.Fish]]);
});

QUnit.test('flip', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let card = new Card(canoeHouse, 1);

  card.flip();
  assert.deepEqual(card.resources, [Resource.Wood, Resource.Fish]);
});

QUnit.test('rotate', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let card = new Card(canoeHouse, 1);

  card.rotate();
  assert.deepEqual(card.resources, [Resource.Fish, Resource.Fish]);
});
