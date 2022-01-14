// Logic

const TILES_STATUS = {
  HIDDEN: 'hidden',
  MINE: 'mine',
  NUMBER: 'number',
  MARKED: 'marked',
};

export function createBoard(boardSize, numberOfMines) {
  const board = [];
  const minePositions = getMinesPosition(boardSize, numberOfMines);
  console.log(minePositions);

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
  } else {
    tile.status = TILES_STATUS.MARKED;
  }
}

function getMinesPosition(boardSize, numberOfMines) {
  const positions = [];

  console.log(positions.length, numberOfMines);

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
