import { createBoard } from './minesweeper.js';

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 2;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElemnt = document.querySelector('.board');

board.forEach((row) => {
  row.forEach((tile) => {
    boardElemnt.append(tile.element);
  });
});

boardElemnt.style.setProperty('--size', BOARD_SIZE);
