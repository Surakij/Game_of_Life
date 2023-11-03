export interface ICell {
  x: number;
  y: number;
  alive: boolean;
}

export class Cell implements ICell {
  constructor(public x: number, public y: number, public alive: boolean) {}
}
