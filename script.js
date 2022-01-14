import { TILES_STATUS, createBoard, markTile } from './minesweeper.js';

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
      listMinesLeft();
    });
  });
});

boardElemnt.style.setProperty('--size', BOARD_SIZE);
minesLeftText.textContent = NUMBER_OF_MINES;

function listMinesLeft() {
  const markedTilesCount = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILES_STATUS.MARKED).length
    );
  }, 0);

  minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount;
}
