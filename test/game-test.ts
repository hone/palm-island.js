import { expect } from 'ts-std';
import { Card, Resource } from '../src/card';
import { Game } from '../src/index';
import { TEMPLATES } from '../src/templates';

QUnit.module('Game');

QUnit.test('top empty', assert => {
  let game = new Game([]);

  assert.equal(game.top, null);
});

QUnit.test('top not empty', assert => {
  let top = new Card(TEMPLATES[0], 1);
  let bottom = new Card(TEMPLATES[1], 2);
  let game = new Game([top, bottom]);

  assert.equal(game.top, top);
});

QUnit.test('canDiscard is true if there are cards in the deck', assert => {
  let card = new Card(TEMPLATES[0], 1);
  let game = new Game([card]);

  assert.equal(game.canDiscard(), true);
});

QUnit.test('canDiscard is false if there are no more cards in the deck', assert => {
  let game = new Game([]);

  assert.equal(game.canDiscard(), false);
});

QUnit.test('discard moves card off the card pile', assert => {
  let card = new Card(TEMPLATES[0], 1);
  let game = new Game([card]);

  game.discard();

  assert.equal(game.top, null);
});

QUnit.test('discard unstores card', assert => {
  let template = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let card = new Card(template, 1);
  let game = new Game([card]);

  card.store();
  assert.equal(card.isStored, true);

  game.discard();

  assert.equal(card.isStored, false);
});

QUnit.test('canStore storable top card', assert => {
  let template = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let card = new Card(template, 1);
  let game = new Game([card]);

  assert.equal(game.canStore(0), true);
});

QUnit.test('canStore returns false for unstorable card', assert => {
  let template = expect(TEMPLATES.find(t => t.name === 'Housing'));
  let card = new Card(template, 1);
  let game = new Game([card]);

  assert.equal(game.canStore(0), false);
});

QUnit.test('canStore returns false if the index doesn\'t exist', assert => {
  let template = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let card = new Card(template, 1);
  let game = new Game([card]);

  assert.equal(game.canStore(1), false);
});

QUnit.test('canStore returns false if don\'t meet cost requirements', assert => {
  let template = expect(TEMPLATES.find(t => t.name === 'Market'));
  let card = new Card(template, 1);
  let game = new Game([card]);

  assert.equal(game.canStore(0), false);
});

QUnit.test('canStore returns when passing in the right resources', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Market'));
  let topCard = new Card(canoeHouse, 1);
  let resource = new Card(canoeHouse, 2);
  let game = new Game([topCard, resource]);
  resource.store();

  assert.equal(game.canStore(0, [resource]), true);
});

QUnit.test('store top card', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let market = expect(TEMPLATES.find(t => t.name === 'Market'));
  let first = new Card(canoeHouse, 1);
  let second = new Card(market, 2);
  let game = new Game([first, second]);

  game.store(0);

  assert.equal(game.top, second);
  assert.deepEqual(game.storedPile, [first]);
  assert.equal(first.isStored, true);
});

QUnit.test('store second card', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let market = expect(TEMPLATES.find(t => t.name === 'Market'));
  let first = new Card(market, 1);
  let second = new Card(canoeHouse, 2);
  let game = new Game([first, second]);

  game.store(1);

  assert.equal(game.top, first);
  assert.deepEqual(game.storedPile, [second]);
  assert.equal(second.isStored, true);
});

QUnit.test('store replace card in discard pile', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let first = new Card(canoeHouse, 1);
  let second = new Card(canoeHouse, 2);
  let third = new Card(canoeHouse, 3);
  let game = new Game([second, third], [first]);
  first.store();

  game.store(0, first);

  assert.deepEqual(game.storedPile, [second]);
  assert.equal(first.isStored, false);
  assert.equal(second.isStored, true);
});

QUnit.test('store replace card in draw pile', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let first = new Card(canoeHouse, 1);
  let second = new Card(canoeHouse, 2);
  let third = new Card(canoeHouse, 3);
  let game = new Game([second, third], [first]);
  third.store();

  game.store(0, third);

  assert.deepEqual(game.storedPile, [second]);
  assert.equal(third.isStored, false);
  assert.equal(second.isStored, true);
});

QUnit.test('storedPile includes both discard and deck', assert => {
  let template = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let first = new Card(template, 1);
  let second = new Card(template, 2);
  let third = new Card(template, 3);
  let game = new Game([first, second], [third]);
  second.store();
  third.store();

  assert.deepEqual(game.storedPile, [second, third]);
});

QUnit.test('canRotate the first card', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let resource = new Card(canoeHouse, 1);
  let rotateCard = new Card(canoeHouse, 2);
  let game = new Game([rotateCard, resource]);
  resource.store();

  assert.equal(game.canRotate(0), true);
});

QUnit.test('canRotate the second card', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let housing = expect(TEMPLATES.find(t => t.name === 'Housing'));
  let resource = new Card(canoeHouse, 1);
  let rotateCard = new Card(canoeHouse, 2);
  let topCard = new Card(housing, 3);
  let game = new Game([topCard, rotateCard, resource]);
  resource.store();

  assert.equal(game.canRotate(1), true);
});

QUnit.test('canRotate returns false if the deck is empty', assert => {
  let game = new Game([]);

  assert.equal(game.canRotate(1), false);
});

QUnit.test('canRotate returns false if can\'t afford', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let rotateCard = new Card(canoeHouse, 1);
  let game = new Game([rotateCard]);

  assert.equal(game.canRotate(0), false);
});

QUnit.test('rotates first card', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let resource = new Card(canoeHouse, 1);
  let rotateCard = new Card(canoeHouse, 2);
  let game = new Game([rotateCard, resource]);
  resource.store();

  game.rotate(0);

  assert.equal(game.top, resource);
  assert.deepEqual(rotateCard.resources, [Resource.Fish, Resource.Fish]);
});

QUnit.test('rotates second card', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let housing = expect(TEMPLATES.find(t => t.name === 'Housing'));
  let resource = new Card(canoeHouse, 1);
  let rotateCard = new Card(canoeHouse, 2);
  let topCard = new Card(housing, 3);
  let game = new Game([topCard, rotateCard, resource]);
  resource.store();

  game.rotate(1);

  assert.equal(game.top, topCard);
  assert.deepEqual(rotateCard.resources, [Resource.Fish, Resource.Fish]);
});

QUnit.test('can flip the first card', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let resource = new Card(canoeHouse, 1);
  let flipCard = new Card(canoeHouse, 2);
  let game = new Game([flipCard, resource]);
  resource.store();

  assert.equal(game.canFlip(0), true);
});

QUnit.test('can flip the second card', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let housing = expect(TEMPLATES.find(t => t.name === 'Housing'));
  let resource = new Card(canoeHouse, 1);
  let rotateCard = new Card(canoeHouse, 2);
  let topCard = new Card(housing, 3);
  let game = new Game([topCard, rotateCard, resource]);
  resource.store();

  assert.equal(game.canFlip(1), true);
});

QUnit.test('can\'t flip if the deck is empty', assert => {
  let game = new Game([]);

  assert.equal(game.canFlip(1), false);
});

QUnit.test('can\'t flip if not enough resources', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let rotateCard = new Card(canoeHouse, 1);
  let game = new Game([rotateCard]);

  assert.equal(game.canFlip(0), false);
});

QUnit.test('flip the first card', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let resource = new Card(canoeHouse, 1);
  let flipCard = new Card(canoeHouse, 2);
  let game = new Game([flipCard, resource]);
  resource.store();

  game.flip(0);

  assert.equal(game.top, resource);
  assert.deepEqual(flipCard.resources, [Resource.Wood, Resource.Fish]);
});

QUnit.test('flip the second card', assert => {
  let canoeHouse = expect(TEMPLATES.find(t => t.name === 'Canoe House'));
  let housing = expect(TEMPLATES.find(t => t.name === 'Housing'));
  let resource = new Card(canoeHouse, 1);
  let flipCard = new Card(canoeHouse, 2);
  let topCard = new Card(housing, 3);
  let game = new Game([topCard, flipCard, resource]);
  resource.store();

  game.flip(1);

  assert.equal(game.top, topCard);
  assert.deepEqual(flipCard.resources, [Resource.Wood, Resource.Fish]);
});
