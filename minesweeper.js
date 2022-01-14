// Logic

export const TILES_STATUS = {
  HIDDEN: 'hidden',
  MINE: 'mine',
  NUMBER: 'number',
  MARKED: 'marked',
};

export function createBoard(boardSize, numberOfMines) {
  const board = [];
  const minePositions = getMinesPosition(boardSize, numberOfMines);

  for (let x = 0; x < boardSize; x++) {
    const row = [];
    for (let y = 0; y < boardSize; y++) {
      const element = document.createElement('div');
      element.dataset.status = TILES_STATUS.HIDDEN;
      const tile = {
        element,
        x,
        y,
        mine: minePositions.some(positionMatch.bind(null, { x, y })),

        get status() {
          return this.element.dataset.status;
        },

        set status(value) {
          this.element.dataset.status = value;
        },
      };
      row.push(tile);
    }
    board.push(row);
  }

  return board;
}

export function markTile(tile) {
  if (
    tile.status !== TILES_STATUS.HIDDEN &&
    tile.status !== TILES_STATUS.MARKED
  ) {
    return;
  }

  if (tile.status === TILES_STATUS.MARKED) {
    tile.status = TILES_STATUS.HIDDEN;
    tile.element.textContent = '';
  } else {
    tile.status = TILES_STATUS.MARKED;
    tile.element.textContent = '🚩';
    // tile.element.style.fontSize = '24px';
  }
}

export function revealTile(board, tile) {
  if (tile.status !== TILES_STATUS.HIDDEN) {
    return;
  }

  if (tile.mine) {
    tile.element.textContent = '💣';
    // tile.element.style.fontSize = '24px';
    tile.status = TILES_STATUS.MINE;
    return;
  }

  tile.status = TILES_STATUS.NUMBER;
  const adjacentTiles = nearbyTiles(board, tile);
  const mines = adjacentTiles.filter((t) => t.mine);
  if (mines.length === 0) {
    adjacentTiles.forEach(revealTile.bind(null, board));
  } else {
    tile.element.textContent = mines.length;
  }
}

export function checkWin(board) {
  return board.every((row) => {
    return row.every((tile) => {
      return (
        tile.status === TILES_STATUS.NUMBER ||
        (tile.mine &&
          (tile.status === TILES_STATUS.MARKED || TILES_STATUS.HIDDEN))
      );
    });
  });
}

export function checkLose(board) {
  return board.some((row) => {
    return row.some((tile) => {
      return tile.status === TILES_STATUS.MINE;
    });
  });
}

function getMinesPosition(boardSize, numberOfMines) {
  const positions = [];

  while (positions.length < numberOfMines) {
    const position = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize),
    };

    if (!positions.some(positionMatch.bind(null, position))) {
      positions.push(position);
    }
  }

  return positions;
}

function positionMatch(a, b) {
  return a.x === b.x && a.y === b.y;
}

function randomNumber(size) {
  return Math.floor(Math.random() * size);
}

function nearbyTiles(board, { x, y }) {
  const tiles = [];

  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const tile = board[x + xOffset]?.[y + yOffset];
      if (tile) tiles.push(tile);
    }
  }

  return tiles;
}
