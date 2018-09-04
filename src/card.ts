import { Option, assert, expect } from 'ts-std';

import { Area, flip, rotate } from './area';

export enum Resource {
  Fish,
  Stone,
  Wood
}

interface AreaStats {
  resources: Resource[];
  store: Option<Resource[][]>;
  rotate: Option<Resource[][]>;
  flip: Option<Resource[][]>;
  upgradePoints: number;
  victoryPoints: number;
}

export interface CardTemplate {
  name: string;
  areas: [AreaStats, AreaStats, AreaStats, AreaStats];
}

export class Card {
  constructor(
    private template: CardTemplate,
    private _id: number,
    private activeArea = Area.FrontTop,
    private _isStored = false
  ) {}

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this.template.name;
  }

  get resources(): Resource[] {
    return this.stats.resources;
  }

  get isStored(): boolean {
    return this._isStored;
  }

  get canStore(): boolean {
    return this.stats.store !== null && !this.isStored;
  }

  get storeRequirements(): Option<Resource[][]> {
    return expect(this.stats.store);
  }

  store(): void {
    assert(this.canStore);
    this._isStored = true;
  }

  unstore(): void {
    assert(this.isStored);
    this._isStored = false;
  }

  get canFlip(): boolean {
    return this.stats.flip !== null && !this.isStored;
  }

  get flipRequirements(): Option<Resource[][]> {
    return expect(this.stats.flip);
  }

  flip(): void {
    assert(this.canFlip);
    this.activeArea = flip(this.activeArea);
  }

  get canRotate(): boolean {
    return this.stats.rotate !== null && !this.isStored;
  }

  get rotateRequirements(): Option<Resource[][]> {
    return expect(this.stats.rotate);
  }

  rotate(): void {
    assert(this.canRotate);
    this.activeArea = rotate(this.activeArea);
  }

  private get stats(): AreaStats {
    return this.template.areas[this.activeArea];
  }
}
