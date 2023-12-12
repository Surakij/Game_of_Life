import { GameRenderer, IGameRenderer } from "./GameRender";
import { GameBoard } from "./GameBoard";
import { Cell } from "./Cell";

export interface IGame {
  // [x: string]: any;
  setCell(x: number, y: number, alive: boolean): void;
  isCellAlive(x: number, y: number): boolean;
  getNextGeneration(): void;
  countAliveNeighbors(x: number, y: number): number;
  toggleCell(x: number, y: number): void;
  stopGame(): void;
  startGame(): void;
  clearGameField(): void;
  areAnyCellAlive(grid: Cell[][]): boolean;
  getSpeed(): number;
  setRenderer(render: IGameRenderer): void
}

export class GameOfLife implements IGame {
  private width: number;
  private height: number;
  public grid: Cell[][];
  private isGameRunning: boolean = false;
  private gameIntervalId: NodeJS.Timeout | null = null;
  private renderer: GameRenderer | null;
  private gameBoard: GameBoard;
  private hasChanges: boolean = true;
  private interval: number;

  constructor(gameBoard: GameBoard, gameSpeed: number) {
    this.renderer = null;
    this.gameBoard = gameBoard;
    this.interval = gameSpeed;
    this.height = this.gameBoard.getHeight();
    this.width = this.gameBoard.getWidth();
    this.grid = this.gameBoard.getGrid();
  }

  public getSpeed(): number {
    return this.interval;
  }

  public setRenderer(render: GameRenderer): void {
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

    this.hasChanges = false;

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const cell: Cell = this.grid[i][j];
        const neighbors = this.countAliveNeighbors(i, j);

        if (cell.alive) {
          if (neighbors < 2 || neighbors > 3) {
            //умирает
            newGird[i][j].alive = false;
            this.hasChanges = true;
          } else {
            //отсается живой
            newGird[i][j].alive = true;
          }
        } else {
          if (neighbors === 3) {
            //клетка оживает
            newGird[i][j].alive = true;
            this.hasChanges = true;
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

  public startGame() {
    if (this.isGameRunning) {
      console.log("Игра уже запущена.");
      return;
    }

    this.isGameRunning = true;

    if (this.renderer) {
      const speed = this.renderer.getSpeed();

      if (speed) {
        this.gameIntervalId = setInterval(() => {
          if (!this.areAnyCellAlive(this.grid)) {
            this.stopGame();
            console.log("Игра остановлена: все клетки мертвы.");
            return;
          }

          this.getNextGeneration();
          if (!this.hasChanges) {
            this.stopGame();
            console.log("Игра остановлена: состояние не изменилось.");
            return;
          }
          if (this.renderer) {
            this.renderer.draw();
          }
        }, speed);
      }
    }
  }

  public stopGame() {
    if (!this.isGameRunning) {
      console.log("Игра не была запущена.");
      return;
    }

    if (this.gameIntervalId !== null) {
      clearInterval(this.gameIntervalId);
    }

    this.isGameRunning = false;
  }

  clearGameField(): void {
    if (this.isGameRunning) {
      this.stopGame();
    }
    this.gameBoard.setGameBoard(
      this.gameBoard.getHeight(),
      this.gameBoard.getWidth()
    );
    if (this.renderer) {
      this.renderer.draw();
    } else {
      console.log("No renderer");
      return;
    }
  }

  areAnyCellAlive(grid: Cell[][]): boolean {
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        if (grid[x][y].alive) {
          return true;
        }
      }
    }
    return false;
  }
}
