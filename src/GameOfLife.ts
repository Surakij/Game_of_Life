import { GameRenderer } from "./GameRender";
import { GameBoard } from "./GameBoard";
import { Cell } from "./Cell";

export interface IGame {
  setCell(x: number, y: number, alive: boolean): void;
  isCellAlive(x: number, y: number): boolean;
  getNextGeneration(): void;
  countAliveNeighbors(x: number, y: number): number;
  toggleCell(x: number, y: number): void;
  stopGame(): void;
  startGame(): void;
}

export class GameOfLife implements IGame {
  private width: number;
  private height: number;
  public grid: Cell[][];
  private isGameRunning: boolean = false;
  private gameIntervalId: NodeJS.Timeout | null = null;
  private renderer: GameRenderer | null;
  private gameBoard: GameBoard;

  constructor(gameBoard: GameBoard) {
    this.renderer = null;
    this.gameBoard = gameBoard;
    this.height = this.gameBoard.getHeight();
    this.width = this.gameBoard.getWidth();
    this.grid = this.gameBoard.getGrid();
  }

  setRenderer(render: GameRenderer): void {
    this.renderer = render;
  }

  isCellAlive(x: number, y: number): boolean {
    this.grid = this.gameBoard.getGrid();
    return this.grid[x][y].alive;
  }

  setCell(x: number, y: number, alive: boolean): void {
    this.grid[x][y].alive = alive;
  }

  toggleCell(x: number, y: number): void {
    const currentAlive = this.isCellAlive(x, y);
    this.setCell(x, y, !currentAlive);
    this.gameBoard.updateGrid(this.grid);
  }

  getNextGeneration() {
    this.grid = this.gameBoard.getGrid();
    this.height = this.gameBoard.getHeight();
    this.width = this.gameBoard.getWidth();
    const newGird: Cell[][] = Array.from({ length: this.height }, () =>
      Array.from({ length: this.width }, () => new Cell(0, 0, false))
    );
    console.log("newGrid at GameOfLife: ", newGird);
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const cell: Cell = this.grid[i][j];
        const neighbors = this.countAliveNeighbors(i, j);
        console.log("cell: ", cell, "neighbors: ", neighbors);

        if (cell.alive) {
          if (neighbors < 2 || neighbors > 3) {
            //умирает
            newGird[i][j].alive = false;
          } else {
            //отсается живой
            newGird[i][j].alive = true;
          }
        } else {
          if (neighbors === 3) {
            //клетка оживает
            newGird[i][j].alive = true;
          } else {
            newGird[i][j].alive = false;
          }
        }
      }
    }
    this.gameBoard.updateGrid(newGird);
  }

  countAliveNeighbors(x: number, y: number) {
    let result = 0;

    const xMoveUp = (x: number): number => (x === 0 ? this.height - 1 : x - 1);
    const xMoveDown = (x: number): number =>
      x === this.height - 1 ? 0 : x + 1;
    const yMoveLeft = (y: number): number => (y === 0 ? this.width - 1 : y - 1);
    const yMoveRight = (y: number): number =>
      y === this.width - 1 ? 0 : y + 1;

    //up
    if (this.grid[xMoveUp(x)][y].alive) {
      result++;
    }
    //down
    if (this.grid[xMoveDown(x)][y].alive) {
      result++;
    }
    //left
    if (this.grid[x][yMoveLeft(y)].alive) {
      result++;
    }
    //Right
    if (this.grid[x][yMoveRight(y)].alive) {
      result++;
    }
    //up-left
    if (this.grid[xMoveUp(x)][yMoveLeft(y)].alive) {
      result++;
    }
    //up-right
    if (this.grid[xMoveUp(x)][yMoveRight(y)].alive) {
      result++;
    }
    //down-left
    if (this.grid[xMoveDown(x)][yMoveLeft(y)].alive) {
      result++;
    }
    //down-right
    if (this.grid[xMoveDown(x)][yMoveRight(y)].alive) {
      result++;
    }
    return result;
  }

  public startGame(interval: number = 100) {
    if (this.isGameRunning) {
      console.log("Игра уже запущена.");
      return;
    }

    this.isGameRunning = true;

    this.gameIntervalId = setInterval(() => {
      this.getNextGeneration();
      if (this.renderer) {
        this.renderer.draw();
      }
    }, interval);
  }

  stopGame() {
    if (!this.isGameRunning) {
      console.log("Игра не была запущена.");
      return;
    }

    if (this.gameIntervalId !== null) {
      clearInterval(this.gameIntervalId);
    }

    this.isGameRunning = false;
  }
}
