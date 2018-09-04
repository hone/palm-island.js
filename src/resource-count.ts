import { Resource } from './card';

export class ResourceCount {
  static from(resources: Resource[]): ResourceCount {
    let wood = 0;
    let fish = 0;
    let stone = 0;

    resources.forEach(resource => {
      switch (resource) {
        case Resource.Wood:
          wood++;
          break;
        case Resource.Fish:
          fish++;
          break;
        case Resource.Stone:
          stone++;
          break;
      }
    });

    return new ResourceCount(wood, fish, stone);
  }

  constructor(
    readonly wood = 0,
    readonly fish = 0,
    readonly stone = 0
  ) {}

  add(other: ResourceCount): ResourceCount {
    return new ResourceCount(
      this.wood + other.wood,
      this.fish + other.fish,
      this.stone + other.stone
    );
  }

  canSatisfy(requirement: ResourceCount): boolean {
    return this.wood >= requirement.wood &&
      this.fish >= requirement.fish &&
      this.stone >= requirement.stone;
  }

  equals(other: ResourceCount): boolean {
    return this.wood === other.wood &&
      this.fish === other.fish &&
      this.stone === other.stone;
  }
}
