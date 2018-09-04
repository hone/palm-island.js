import { ResourceCount } from '../src/resource-count';

QUnit.module('ResourceCount');

QUnit.test('from', assert => {
  let resourceCount = new ResourceCount(1, 2, 3);

  assert.equal(resourceCount.wood, 1);
  assert.equal(resourceCount.fish, 2);
  assert.equal(resourceCount.stone, 3);
});

QUnit.test('add', assert => {
  let first = new ResourceCount(1, 2, 3);
  let second = new ResourceCount(4, 5, 6);
  assert.equal(first.add(second).equals(new ResourceCount(5, 7, 9)), true);
});

QUnit.test('canSatisfy', assert => {
  let budget = new ResourceCount(1, 2, 2);

  assert.equal(budget.canSatisfy(new ResourceCount(1, 1, 1)), true);
  assert.equal(budget.canSatisfy(new ResourceCount(1, 2, 2)), true);
  assert.equal(budget.canSatisfy(new ResourceCount(2, 2, 2)), false);
});
