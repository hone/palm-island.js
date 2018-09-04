import { CardTemplate, Resource } from './card';

export const TEMPLATES: CardTemplate[] = [{
  name: 'Housing',
  areas: [{
    resources: [],
    store: null,
    rotate: [[Resource.Wood, Resource.Fish]],
    flip: null,
    upgradePoints: 0,
    victoryPoints: 0
  }, {
    resources: [],
    store: null,
    rotate: null,
    flip: [[Resource.Wood, Resource.Fish, Resource.Stone]],
    upgradePoints: 1,
    victoryPoints: 1
  }, {
    resources: [],
    store: null,
    rotate: null,
    flip: null,
    upgradePoints: 3,
    victoryPoints: 6
  }, {
    resources: [],
    store: null,
    rotate: [[Resource.Wood, Resource.Wood, Resource.Fish, Resource.Fish, Resource.Stone, Resource.Stone]],
    flip: null,
    upgradePoints: 2,
    victoryPoints: 3
  }]
}, {
  name: 'Market',
  areas: [{
    resources: [Resource.Stone],
    store: [[Resource.Wood], [Resource.Fish]],
    rotate: [[Resource.Wood, Resource.Wood]],
    flip: [[Resource.Fish, Resource.Fish]],
    upgradePoints: 0,
    victoryPoints: 0
  }, {
    resources: [Resource.Fish, Resource.Stone],
    store: [[Resource.Wood]],
    rotate: null,
    flip: [[Resource.Wood, Resource.Stone]],
    upgradePoints: 1,
    victoryPoints: 0
  }, {
    resources: [Resource.Wood, Resource.Stone],
    store: [[Resource.Fish]],
    rotate: [[Resource.Stone, Resource.Fish]],
    flip: null,
    upgradePoints: 1,
    victoryPoints: 0
  }, {
    resources: [Resource.Wood, Resource.Fish, Resource.Stone],
    store: [[Resource.Wood], [Resource.Fish], [Resource.Stone]],
    rotate: null,
    flip: null,
    upgradePoints: 2,
    victoryPoints: 0
  }]
}, {
  name: 'Canoe House',
  areas: [{
    resources: [Resource.Fish],
    store: [[]],
    rotate: [[Resource.Fish]],
    flip: [[Resource.Fish]],
    upgradePoints: 0,
    victoryPoints: 0
  }, {
    resources: [Resource.Fish, Resource.Fish],
    store: [[]],
    rotate: null,
    flip: [[Resource.Wood, Resource.Fish]],
    upgradePoints: 1,
    victoryPoints: 0
  }, {
    resources: [Resource.Wood, Resource.Fish],
    store: [[]],
    rotate: [[Resource.Wood, Resource.Fish]],
    flip: null,
    upgradePoints: 1,
    victoryPoints: 0
  }, {
    resources: [Resource.Wood, Resource.Fish, Resource.Fish],
    store: [[]],
    rotate: null,
    flip: null,
    upgradePoints: 2,
    victoryPoints: 0
  }]
}];
