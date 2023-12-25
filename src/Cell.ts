export interface ICell {
  x: number;
  y: number;
  alive: boolean;
}

export class Cell implements ICell {
  constructor(public x: number, public y: number, public alive: boolean) {
    if (x < 0 || y < 0) {
      throw new Error("Coordinates must be non-negative");
    }

    this.x = x;
    this.y = y;
    this.alive = alive;
  }
}
