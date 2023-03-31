const board = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

/**
 * Checks if input board is a 9x9 matrix
 *
 * @param board matrix 9x9 of numbers
 * @returns true if valid
 */
function validate(
  board: Array<Array<number>>,
  update?: { row: number; col: number; newCellValue: number }
): boolean {
  for (let row = 0; row < board.length; row++) {
    if (board[row].length !== 9) {
      return false;
    }
    if (row > 8) {
      return false;
    }
  }

  // TODO check repeated numbers in line, column and 3x3 square
  if (update) {
    const { row, col, newCellValue } = update;
    // check line
    if (board[row].includes(newCellValue)) {
      return false;
    }
    // check column
    if (board.map((row) => row[col]).includes(newCellValue)) {
      return false;
    }
    // check 3x3 square
    const squareRow = Math.floor(row / 3) * 3;
    const squareCol = Math.floor(col / 3) * 3;
    for (let i = squareRow; i < squareRow + 3; i++) {
      for (let j = squareCol; j < squareCol + 3; j++) {
        if (board[i][j] === newCellValue) {
          return false;
        }
      }
    }
  }

  return true;
}

/**
 * Divides an array into smaller ones
 *
 * @param array any array
 * @param chunkSize size of the chunks
 * @returns array of arrays of size chunkSize
 */
function spliceIntoChunks(
  array: Array<any>,
  chunkSize: number
): Array<Array<string>> {
  const auxiliarArray = [...array];
  const result: any = [];
  while (auxiliarArray.length > 0) {
    const chunk = auxiliarArray.splice(0, chunkSize);
    result.push(chunk.join(" "));
  }
  return result;
}

/**
 * Pretty prints the board
 *
 * @param board matrix 9x9 of numbers
 */
function print(board: Array<Array<number>>): void {
  if (!validate(board)) {
    console.log("Invalid board");
    return;
  }

  const dashedLine = "- - - - - - - - - - - - -";
  for (let row = 0; row < 9; row++) {
    if (row % 3 === 0) {
      console.log(dashedLine);
    }
    console.log(`| ${spliceIntoChunks(board[row], 3).join(" | ")} |`);

    if (row === 8) {
      console.log(dashedLine);
    }
  }
}

/**
 * Returns the position of the first empty cell
 *
 * @param board matrix 9x9 of numbers
 * @returns [row, col] of the first empty cell. undefined if not found
 */
function getEmptyCell(board: Array<Array<number>>): Array<number> | undefined {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        return [row, col];
      }
    }
  }
}

/**
 *
 * @param board matrix 9x9 of numbers
 */
function solve(board: Array<Array<number>>): boolean {
  let auxiliarBoard = board;

  const emptyCell = getEmptyCell(auxiliarBoard);
  if (!emptyCell) {
    console.log("Solved!");
    print(auxiliarBoard);
    return true;
  }

  const [row, col] = emptyCell;
  for (let newCellValue = 1; newCellValue <= 9; newCellValue++) {
    if (validate(board, { row, col, newCellValue })) {
      auxiliarBoard[row][col] = newCellValue;
      if (solve(auxiliarBoard)) {
        return true;
      }
      auxiliarBoard[row][col] = 0;
    }
  }
  return false;
}

function main() {
  console.log("Initial board:");
  print(board);
  console.log("\n\n");
  console.time("Solving time");
  solve(board);
  console.timeEnd("Solving time");
}
main();
