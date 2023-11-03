import { IGameBoard } from "./GameBoard";
import { IGame } from "./GameOfLife";

export interface IGameRenderer {
  draw(): void;
  setGameBoard(gameBoard: IGameBoard): void;
}

export class GameRenderer implements IGameRenderer {
  private container: HTMLElement;
  private canvasContainer: HTMLElement;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private cellSize = 10;
  private gameBoard!: IGameBoard;
  private gameOfLife: IGame;
  private width!: number;
  private height!: number;

  constructor(
    container: HTMLElement,
    gameBoard: IGameBoard,
    gameOfLife: IGame
  ) {
    this.container = container;
    this.canvasContainer = document.createElement("div");
    this.canvasContainer.classList.add("div-field");
    this.container.appendChild(this.canvasContainer);
    this.canvas = document.createElement("canvas");
    this.canvas.id = "game-canvas";
    this.canvas.width = 0;
    this.canvas.height = 0;
    this.canvasContainer.appendChild(this.canvas);
    this.context = this.canvas.getContext("2d")!;
    this.gameBoard = gameBoard;
    this.gameOfLife = gameOfLife;
    this.width = this.gameBoard.getWidth();
    this.height = this.gameBoard.getHeight();

    const divMenu = document.createElement("div");

    const inputHeight = document.createElement("input");
    const inputWidth = document.createElement("input");
    const spanHeight = document.createElement("span");
    const spanWidth = document.createElement("span");
    const lableWidth = document.createElement("lable");
    const lableHeight = document.createElement("lable");
    const stopButton = document.createElement("button");
    const startButton = document.createElement("button");

    container.appendChild(divMenu);

    divMenu.appendChild(lableHeight);
    divMenu.appendChild(inputHeight);
    divMenu.appendChild(spanHeight);
    divMenu.appendChild(lableWidth);
    divMenu.appendChild(inputWidth);
    divMenu.appendChild(spanWidth);
    divMenu.appendChild(stopButton);
    divMenu.appendChild(startButton);

    divMenu.classList.add("div-menu");
    stopButton.classList.add("button-stop");
    startButton.classList.add("button-start");
    spanHeight.classList.add("span-value-height");
    spanWidth.classList.add("span-value-width");

    //кнопки старт и стоп
    stopButton.textContent = "Stop";
    startButton.textContent = "Start";

    //присвоение класса и типа для инпут высота

    inputWidth.classList.add("width-range");
    inputWidth.type = "range";
    inputWidth.min = "10";
    inputWidth.max = "100";
    inputWidth.step = "1";
    inputWidth.value = "50";
    inputWidth.id = "width-input";
    spanWidth.textContent = inputWidth.value;
    lableWidth.setAttribute("for", "width-input");
    lableWidth.textContent = "width: ";

    //присвоение класса и типа для инпут ширина

    inputHeight.classList.add("height-range");
    inputHeight.type = "range";
    inputHeight.min = "10";
    inputHeight.max = "100";
    inputHeight.step = "1";
    inputHeight.value = "50";
    inputHeight.id = "height-input";
    spanHeight.textContent = inputHeight.value;
    lableHeight.setAttribute("for", "height-input");
    lableHeight.textContent = "height: ";

    inputHeight.addEventListener("input", () => {
      spanHeight.textContent = inputHeight.value;
      this.height = +inputHeight.value;
      this.gameBoard.setGameBoard(this.height, this.width);
      this.draw();
    });

    inputWidth.addEventListener("input", () => {
      spanWidth.textContent = inputWidth.value;
      this.width = +inputWidth.value;
      this.gameBoard.setGameBoard(this.height, this.width);
      this.draw();
    });

    startButton.addEventListener("click", () => {
      this.gameOfLife.startGame();
    });

    stopButton.addEventListener("click", () => {
      this.gameOfLife.stopGame();
    });

    this.canvas.addEventListener("click", this.onClick.bind(this));
  }

  public draw(): void {
    if (!this.gameBoard) {
      console.warn("GameBoard is not set.");
      return;
    }

    this.canvas.height = this.height * this.cellSize;
    this.canvas.width = this.width * this.cellSize;
    this.context.clearRect(0, 0, this.canvas.height, this.canvas.width);

    const grid = this.gameBoard.getGrid();

    for (let x = 0; x < this.height; x++) {
      for (let y = 0; y < this.width; y++) {
        this.context.fillStyle = grid[x][y].alive ? "black" : "white";
        this.context.fillRect(
          y * this.cellSize,
          x * this.cellSize,
          this.cellSize,
          this.cellSize
        );
      }
    }
  }

  private onClick = (event: MouseEvent): void => {
    const y = Math.floor(event.offsetX / this.cellSize);
    const x = Math.floor(event.offsetY / this.cellSize);

    console.log(`Click at canvas. Cell coords: ['x: '${x}, 'y: '${y}]`);
    this.gameOfLife.toggleCell(x, y);
    this.draw();
  };

  public setGameBoard(gameBoard: IGameBoard): void {
    this.gameBoard = gameBoard;
    this.width = this.gameBoard.getWidth();
    this.height = this.gameBoard.getHeight();
    this.draw();
  }
}
