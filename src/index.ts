import "./css/style.css";
import { GameOfLife } from "./GameOfLife";
import { GameRenderer } from "./GameRender";
import { GameBoard } from "./GameBoard";

const gameContainer: HTMLElement | null = document.getElementById("app");
if (!gameContainer) {
  throw new Error("Element with id 'app' was not found.");
}

const height = 50;
const width = 50;
const gameSpeed = 1000;

const board = new GameBoard(height, width);
const game = new GameOfLife(board, gameSpeed);
const renderer = new GameRenderer(gameContainer, board, game);

renderer.setGameBoard(board);
game.setRenderer(renderer);
