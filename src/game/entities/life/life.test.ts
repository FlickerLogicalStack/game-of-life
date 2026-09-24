import { describe, expect, test } from 'bun:test';

import { Life } from './life';

const GLIDER = [1, 0, 2, 1, 0, 2, 1, 2, 2, 2];

const set_cells = (life: Life, cells: ReadonlyArray<readonly [number, number]>) => {
  for (const [x, y] of cells) {
    life.on(x, y);
  }
};

const alive_cells = (life: Life) => {
  const cells: string[] = [];

  for (let y = 0; y < life.height; y++) {
    for (let x = 0; x < life.width; x++) {
      if (life.is_alive(x, y)) {
        cells.push(`${x},${y}`);
      }
    }
  }

  return cells.join(' ');
};

describe('Life', () => {
  test('a block is a still life', () => {
    const life = new Life(8, 8);

    set_cells(life, [
      [1, 1],
      [2, 1],
      [1, 2],
      [2, 2],
    ]);

    const before = alive_cells(life);

    life.tick();

    expect(alive_cells(life)).toBe(before);
  });

  test('a blinker oscillates', () => {
    const life = new Life(5, 5);

    set_cells(life, [
      [2, 1],
      [2, 2],
      [2, 3],
    ]);

    life.tick();
    expect(alive_cells(life)).toBe('1,2 2,2 3,2');

    life.tick();
    expect(alive_cells(life)).toBe('2,1 2,2 2,3');
  });

  test('a glider translates by one cell every four ticks', () => {
    const life = new Life(12, 12);

    life.spawn(GLIDER, 1, 1);

    life.tick(4);

    expect(alive_cells(life)).toBe('3,2 4,3 2,4 3,4 4,4');
  });

  test('spawn ignores out of bounds cells', () => {
    const life = new Life(4, 4);

    life.spawn(GLIDER, -1, -1);

    expect(alive_cells(life)).toBe('1,0 0,1 1,1');
  });

  test('borders are dead, not wrapped', () => {
    const life = new Life(4, 4);

    life.on(0, 0);

    life.tick();

    expect(life.is_alive(0, 0)).toBe(false);
  });

  test('on() ignores out of bounds coordinates', () => {
    const life = new Life(4, 4);

    life.on(-1, 0);
    life.on(0, -1);
    life.on(4, 0);
    life.on(0, 4);
    life.on(0, 0);

    expect(alive_cells(life)).toBe('0,0');
  });

  test('non-square boards use width as the row size', () => {
    const life = new Life(6, 4);

    set_cells(life, [
      [1, 1],
      [2, 1],
      [3, 1],
    ]);

    life.tick();

    expect(alive_cells(life)).toBe('2,0 2,1 2,2');
  });

  test('epoch advances once per tick', () => {
    const life = new Life(4, 4);

    life.tick(3);

    expect(life.epoch).toBe(3);
  });
});
