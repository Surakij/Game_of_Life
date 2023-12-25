import { GameBoard, IGameBoard } from "./GameBoard";
import { Cell } from "./Cell";

describe("GameBoard", () => {
  let gameBoard: IGameBoard;

  beforeEach(() => {
    gameBoard = new GameBoard(3, 3);
  });

  it("should initialize the grid correctly", () => {
    const expectedGrid: Cell[][] = [
      [new Cell(0, 0, false), new Cell(0, 1, false), new Cell(0, 2, false)],
      [new Cell(1, 0, false), new Cell(1, 1, false), new Cell(1, 2, false)],
      [new Cell(2, 0, false), new Cell(2, 1, false), new Cell(2, 2, false)],
    ];

    expect(gameBoard.getGrid()).toEqual(expectedGrid);
  });

  it("should get the correct width", () => {
    const expectedWidth = 3;

    expect(gameBoard.getWidth()).toBe(expectedWidth);
  });

  it("should get the correct height", () => {
    const expectedHeight = 3;

    expect(gameBoard.getHeight()).toBe(expectedHeight);
  });

  it("should update the grid correctly", () => {
    const newGrid: Cell[][] = [
      [new Cell(0, 0, false), new Cell(0, 1, false), new Cell(0, 2, true)],
      [new Cell(1, 0, false), new Cell(1, 1, true), new Cell(1, 2, false)],
      [new Cell(2, 0, true), new Cell(2, 1, false), new Cell(2, 2, false)],
    ];

    gameBoard.updateGrid(newGrid);

    expect(gameBoard.getGrid()).toEqual(newGrid);
  });

  it("should set the game board correctly", () => {
    const newHeight = 4;
    const newWidth = 4;

    gameBoard.setGameBoard(newHeight, newWidth);

    const expectedGrid: Cell[][] = [
      [
        new Cell(0, 0, false),
        new Cell(0, 1, false),
        new Cell(0, 2, false),
        new Cell(0, 3, false),
      ],
      [
        new Cell(1, 0, false),
        new Cell(1, 1, false),
        new Cell(1, 2, false),
        new Cell(1, 3, false),
      ],
      [
        new Cell(2, 0, false),
        new Cell(2, 1, false),
        new Cell(2, 2, false),
        new Cell(2, 3, false),
      ],
      [
        new Cell(3, 0, false),
        new Cell(3, 1, false),
        new Cell(3, 2, false),
        new Cell(3, 3, false),
      ],
    ];

    expect(gameBoard.getHeight()).toBe(newHeight);
    expect(gameBoard.getWidth()).toBe(newWidth);
    expect(gameBoard.getGrid()).toEqual(expectedGrid);
  });
});
