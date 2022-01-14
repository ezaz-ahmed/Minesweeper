import { createBoard, markTile } from './minesweeper.js';

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 2;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElemnt = document.querySelector('.board');
const minesLeftText = document.querySelector('[data-mine-count]');

board.forEach((row) => {
  row.forEach((tile) => {
    boardElemnt.append(tile.element);
    tile.element.addEventListener('click', () => {});
    tile.element.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      markTile(tile);
    });
  });
});

boardElemnt.style.setProperty('--size', BOARD_SIZE);
minesLeftText.textContent = NUMBER_OF_MINES;
