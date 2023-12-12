import "jest-canvas-mock";
import { GameBoard } from "./GameBoard";
import { GameOfLife } from "./GameOfLife";
import { GameRenderer } from "./GameRender";

describe("GameRenderer", () => {
  let container: HTMLElement;
  let gameBoard: GameBoard;
  let gameOfLife: GameOfLife;
  let gameRenderer: GameRenderer;
  let startButton: HTMLButtonElement;
  let stopButton: HTMLButtonElement;
  let clearButton: HTMLButtonElement;
  let canvas: HTMLCanvasElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    gameBoard = new GameBoard(10, 10);
    gameOfLife = new GameOfLife(gameBoard, 100);
    gameRenderer = new GameRenderer(container, gameBoard, gameOfLife);

    const canvasContainer = document.createElement("div");
    const divMenu = document.createElement("div");
    canvas = document.querySelector("#game-canvas") as HTMLCanvasElement;
    stopButton = document.querySelector(".button-stop") as HTMLButtonElement;
    startButton = document.querySelector(".button-start") as HTMLButtonElement;
    clearButton = document.querySelector(".button-clear") as HTMLButtonElement;

    divMenu.appendChild(stopButton);
    divMenu.appendChild(startButton);
    divMenu.appendChild(clearButton);
    canvasContainer.appendChild(canvas);
    container.appendChild(canvasContainer);
    container.prepend(divMenu);
  });

  afterEach(() => {
    jest.clearAllMocks();
    container.innerHTML = "";
  });

  it("should create a valid GameRenderer instance", () => {
    expect(gameRenderer).toBeDefined();
  });

  it("should set the game board when calling setGameBoard", () => {
    const newGameBoard = new GameBoard(5, 5);
    gameRenderer.setGameBoard(newGameBoard);
    expect(gameRenderer["gameBoard"]).toBe(newGameBoard);
  });

  it("should get the speed when calling getSpeed", () => {
    const speed = gameRenderer.getSpeed();
    expect(speed).toEqual(gameRenderer["speed"]);
  });

  it("should bind event listener to stop button", () => {
    const stoptSpy = jest.fn();
    gameOfLife.stopGame = stoptSpy;
    stopButton.dispatchEvent(new Event("click"));
    expect(stoptSpy).toHaveBeenCalledTimes(1);
  });

  it("should bind event listener to start button", () => {
    const startSpy = jest.fn();
    gameOfLife.startGame = startSpy;
    startButton.dispatchEvent(new Event("click"));
    expect(startSpy).toHaveBeenCalledTimes(1);
  });

  it("should bind event listener to clear button", () => {
    const clearSpy = jest.fn();
    gameOfLife.clearGameField = clearSpy;
    clearButton.dispatchEvent(new Event("click"));
    expect(clearSpy).toHaveBeenCalledTimes(1);
  });
});
