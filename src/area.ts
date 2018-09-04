export enum Area {
  FrontTop,
  FrontBottom,
  BackTop,
  BackBottom
}

export function rotate(area: Area): Area {
  // tslint:disable-next-line:no-bitwise
  return area ^ 1;
}

export function flip(area: Area): Area {
  return (area + 2) % 4;
}
