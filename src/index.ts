import "./css/style.css";
import { GameOfLife } from "./GameOfLife";
import { GameRenderer } from "./GameRender";
import { GameBoard } from "./GameBoard";

const gameContainer = document.getElementById("app")!;



const board = new GameBoard(50, 50);
const game = new GameOfLife(board);
const renderer = new GameRenderer(gameContainer, board, game);

renderer.setGameBoard(board);
game.setRenderer(renderer);
