import { Cell } from "./Cell";

export interface IGameBoard {
  getWidth(): number;
  getHeight(): number;
  getGrid(): Cell[][];
  updateGrid(grid: Cell[][]): void;
  setGameBoard(height: number, width: number): void;

}

export class GameBoard implements IGameBoard {
  private width: number;
  private height: number;
  private grid: Cell[][];

  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
    this.grid = this.initializeGrid();
  }

  private initializeGrid(): Cell[][] {
    const grid: Cell[][] = [];
    for (let x = 0; x < this.height; x++) {
      grid[x] = [];
      for (let y = 0; y < this.width; y++) {
        grid[x][y] = new Cell(x, y, false);
      }
    }
    return grid;
  }

  public getGrid(): Cell[][] {
    return this.grid;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public setGameBoard(height: number, width: number): void {
    this.width = width;
    this.height = height;
    this.grid = this.initializeGrid();
  }

  public updateGrid(grid: Cell[][]): void {
    this.grid = grid;
  }
}
