import { Cell } from "./Cell";

describe("Cell", () => {
  it("should create Cell object with correct coordinates & life status", () => {
    const x = 2;
    const y = 3;
    const alive = true;

    const cell = new Cell(x, y, alive);

    expect(cell.x).toBe(x);
    expect(cell.y).toBe(y);
    expect(cell.alive).toBe(alive);
  });

  it("should throw an if coordinates are negative", () => {
    const x = -1;
    const y = 2;
    const alive = true;

    expect(() => new Cell(x, y, alive)).toThrow(
      "Coordinates must be non-negative"
    );
  });
});
