import { Option, assert, expect } from 'ts-std';

import { Card, Resource } from './card';
import { ResourceCount } from './resource-count';

enum PlayableCard {
  First,
  Second
}

export class Game {
  constructor(
    private drawPile: Card[] = [],
    private discardPile: Card[] = []
  ) {}

  get top(): Option<Card> {
    return this.drawPile[0];
  }

  canDiscard(): boolean {
    return this.drawPile.length > 0;
  }

  discard(): void {
    assert(this.canDiscard());
    let card = expect(this.drawPile.pop());
    if (card.isStored) {
      card.unstore();
    }
    this.discardPile.push(card);
  }

  canStore(index: PlayableCard, resourceCards = this.storedPile): boolean {
    let card = this.drawPile[index];

    return card !== undefined && card.canStore && this.canAfford(expect(card.storeRequirements), resourceCards);
  }

  store(index: PlayableCard, removeCard?: Card): void {
    if (removeCard) {
      assert(removeCard.isStored);
      assert(this.cards().indexOf(removeCard) !== -1);
      removeCard.unstore();
    }

    assert(this.canStore(index));
    let card = expect(this.drawPile.splice(index, 1)[0]);
    card.store();
    this.discardPile.push(card);
  }

  get storedPile(): Card[] {
    return this.cards().filter(card => card.isStored);
  }

  canRotate(index: PlayableCard): boolean {
    let card = this.drawPile[index];

    return card !== undefined && card.canRotate && this.canAfford(expect(card.rotateRequirements));
  }

  rotate(index: PlayableCard): void {
    assert(this.canRotate(index));
    let card = expect(this.drawPile.splice(index, 1)[0]);
    card.rotate();
    this.discardPile.push(card);
  }

  canFlip(index: PlayableCard): boolean {
    let card = this.drawPile[index];

    return card !== undefined && card.canFlip && this.canAfford(expect(card.flipRequirements));
  }

  flip(index: PlayableCard): void {
    assert(this.canFlip(index));
    let card = expect(this.drawPile.splice(index, 1)[0]);
    card.flip();
    this.discardPile.push(card);
  }

  private canAfford(requirements: Resource[][], cards = this.storedPile): boolean {
    let budget = cards.reduce((resourceCount, card) => {
      return resourceCount.add(ResourceCount.from(card.resources));
    }, new ResourceCount());

    return requirements.some(requirementSet => {
      return budget.canSatisfy(ResourceCount.from(requirementSet));
    });
  }

  private cards(): Card[] {
    return this.drawPile.concat(this.discardPile);
  }
}
