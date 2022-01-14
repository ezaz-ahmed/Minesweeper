import {
  TILES_STATUS,
  createBoard,
  markTile,
  revealTile,
  checkWin,
  checkLose,
} from './minesweeper.js';

const BOARD_SIZE = 10;
const NUMBER_OF_MINES = 10;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
const boardElemnt = document.querySelector('.board');
const text = document.querySelector('.subtext');
const minesLeftText = document.querySelector('[data-mine-count]');

board.forEach((row) => {
  row.forEach((tile) => {
    boardElemnt.append(tile.element);
    tile.element.addEventListener('click', () => {
      revealTile(board, tile);
      checkGameEnd();
    });
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

function checkGameEnd() {
  const win = checkWin(board);
  const lose = checkLose(board);

  if (win || lose) {
    boardElemnt.addEventListener('click', stopProp, { capture: true });
    boardElemnt.addEventListener('contextmenu', stopProp, { capture: true });
  }

  if (win) {
    text.textContent = 'You Win! 🙌';
  }

  if (lose) {
    text.textContent = 'You Lose 😞';
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status === TILES_STATUS.MARKED) markTile(tile);
        if (tile.mine) revealTile(board, tile);
      });
    });
  }
}

function stopProp(event) {
  event.stopImmediatePropagation();
}
