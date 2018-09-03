import { Option } from 'ts-std';

export enum Resource {
  Fish,
  Stone,
  Wood
}

export enum Area {
  FrontTop,
  FrontBottom,
  BackTop,
  BackBottom
}

export function rotate(area: Area): Area {
  switch (area) {
    case Area.FrontTop:
      return Area.FrontBottom;
    case Area.FrontBottom:
      return Area.FrontTop;
    case Area.BackTop:
      return Area.BackBottom;
    case Area.BackBottom:
      return Area.BackTop;
  }
}

export function flip(area: Area): Area {
  return (area + 2) % 4;
}

interface CardTemplate {
  name: string;
  areas: [AreaStats, AreaStats, AreaStats, AreaStats];
}

export const TEMPLATES: CardTemplate[] = [{
  name: 'Canoe House',
  areas: [{
    resources: [Resource.Fish],
    store: [],
    rotate: [Resource.Fish],
    flip: [Resource.Fish],
    upgradePoints: 0,
    victoryPoints: 0
  }, {
    resources: [Resource.Fish, Resource.Fish],
    store: [],
    rotate: null,
    flip: [Resource.Wood, Resource.Fish],
    upgradePoints: 1,
    victoryPoints: 0
  }, {
    resources: [Resource.Wood, Resource.Fish],
    store: [],
    rotate: [Resource.Wood, Resource.Fish],
    flip: null,
    upgradePoints: 1,
    victoryPoints: 0
  }, {
    resources: [Resource.Wood, Resource.Fish, Resource.Fish],
    store: [],
    rotate: null,
    flip: null,
    upgradePoints: 2,
    victoryPoints: 0
  }]
}];

interface AreaStats {
  resources: Resource[];
  store: Option<Resource[]>;
  rotate: Option<Resource[]>;
  flip: Option<Resource[]>;
  upgradePoints: number;
  victoryPoints: number;
}

export class Card {
  constructor(
    private template: CardTemplate,
    private activeArea: Area = Area.FrontTop
  ) {}

  get name(): string {
    return this.template.name;
  }

  get resources(): Resource[] {
    return this.stats.resources;
  }

  get canFlip(): boolean {
    return this.stats.flip !== null;
  }

  get canRotate(): boolean {
    return this.stats.rotate !== null;
  }

  private get stats(): AreaStats {
    return this.template.areas[this.activeArea];
  }
}
