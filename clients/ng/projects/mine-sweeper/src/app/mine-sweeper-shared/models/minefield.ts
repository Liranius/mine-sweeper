import { Cell } from './cell';
import { Mine } from './mine';

export class Minefield {
  readonly cells: Cell[][];
  readonly mines: Mine[];

  constructor(public readonly width: number, public readonly height: number, public readonly mineCount: number) {
    if (mineCount > width * height) {
      throw new Error('[Minefield] Cannot create minefield with mines more than cells.');
    }

    this.cells = new Array(width).fill(null).map((_, x) => new Array(height).fill(null).map((__, y) => new Cell({ x, y })));
    this.mines = new Array(mineCount).fill(null);

    for (let i = 0; i < mineCount; i++) {
      this.placeAMine(i);
    }
  }

  private canPlaceMineIn(cell: Cell): boolean {
    if (cell.mine) {
      return false;
    }

    // TODO: Support custom game.
    return this.getNeighborCells(cell)
      .map(neighbor => neighbor.mine)
      .includes(undefined);
  }

  private getNeighborCells(cell: Cell): Cell[] {
    return this.cells
      .slice(cell.position.x - 1, cell.position.x + 2)
      .reduce((pre, cur) => pre.concat(cur.slice(cell.position.y - 1, cell.position.y + 2)), [])
      .filter(neighbor => !!neighbor);
  }

  private pickARandomCell(): Cell {
    const x = Math.floor(Math.random() * this.width);
    const y = Math.floor(Math.random() * this.height);

    return this.cells[x][y];
  }

  private placeAMine(mineIndex: number): void {
    let cell = this.pickARandomCell();

    while (!this.canPlaceMineIn(cell)) {
      cell = this.pickARandomCell();
    }

    cell.addMine(new Mine(cell));
    this.mines[mineIndex] = cell.mine!;
  }
}
