import { describe, expect, test } from 'bun:test';

import { PATTERN_BY_ID, PATTERNS, SPAWN_POOL } from './pattern.catalog';
import { parse_pattern, rotate_cells } from './pattern';

describe('parse_pattern', () => {
  test('normalizes indentation and bounding box', () => {
    const parsed = parse_pattern(`
          # 
           #
         ###
    `);

    expect(parsed.width).toBe(3);
    expect(parsed.height).toBe(3);
    expect(parsed.cells).toEqual([1, 0, 2, 1, 0, 2, 1, 2, 2, 2]);
  });

  test('keeps interior dead rows', () => {
    const parsed = parse_pattern('#\n \n#');

    expect(parsed.width).toBe(1);
    expect(parsed.height).toBe(3);
    expect(parsed.cells).toEqual([0, 0, 0, 2]);
  });
});

describe('rotate_cells', () => {
  test('rotates a horizontal blinker into a vertical one', () => {
    expect(rotate_cells([0, 0, 1, 0, 2, 0], 3, 1)).toEqual([0, 0, 0, 1, 0, 2]);
  });

  test('four rotations return the original cells', () => {
    const cells = PATTERN_BY_ID.get('glider')!.cells;

    const rotated = rotate_cells(rotate_cells(rotate_cells(rotate_cells(cells, 3, 3), 3, 3), 3, 3), 3, 3);

    expect(rotated).toEqual(cells);
  });
});

describe('pattern catalog', () => {
  const expected = {
    glider: { width: 3, height: 3, cells: 5 },
    lwss: { width: 5, height: 4, cells: 9 },
    blinker: { width: 3, height: 1, cells: 3 },
    toad: { width: 4, height: 2, cells: 6 },
    beacon: { width: 4, height: 4, cells: 8 },
    pulsar: { width: 13, height: 13, cells: 48 },
    block: { width: 2, height: 2, cells: 4 },
  } as const;

  test('every pattern has a valid, precompiled shape', () => {
    expect(PATTERNS.length).toBe(Object.keys(expected).length);

    for (const [id, size] of Object.entries(expected)) {
      const pattern = PATTERN_BY_ID.get(id);

      expect(pattern).toBeDefined();
      expect(pattern!.width).toBe(size.width);
      expect(pattern!.height).toBe(size.height);
      expect(pattern!.cells.length).toBe(size.cells * 2);
      expect(pattern!.variants.length).toBe(4);
    }
  });

  test('the spawn pool holds every rotation variant', () => {
    expect(SPAWN_POOL.length).toBe(PATTERNS.length * 4);
  });
});
