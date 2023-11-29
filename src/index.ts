import "./css/style.css";
import { GameOfLife } from "./GameOfLife";
import { GameRenderer } from "./GameRender";
import { GameBoard } from "./GameBoard";

const gameContainer = document.getElementById("app")!;

const height: number = 50;
const width: number = 50;
const gameSpeed: number = 1000;

const board = new GameBoard(height, width);
const game = new GameOfLife(board, gameSpeed);
const renderer = new GameRenderer(gameContainer, board, game);

renderer.setGameBoard(board);
game.setRenderer(renderer);
