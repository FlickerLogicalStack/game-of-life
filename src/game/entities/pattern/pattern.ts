export type PatternCategory = 'still-life' | 'oscillator' | 'spaceship' | 'gun';

export type PatternVariant = {
  width: number;
  height: number;
  cells: number[];
};

export type Pattern = {
  id: string;
  name: string;
  category: PatternCategory;
  width: number;
  height: number;
  cells: number[];
  variants: PatternVariant[];
};

export type ParsedPattern = {
  width: number;
  height: number;
  cells: number[];
};

const ALIVE = '#';

export const parse_pattern = (source: string): ParsedPattern => {
  const raw_lines = source.split('\n');

  let start = 0;
  let end = raw_lines.length;

  while (start < end && raw_lines[start].trim() === '') {
    start += 1;
  }

  while (end > start && raw_lines[end - 1].trim() === '') {
    end -= 1;
  }

  const lines = raw_lines.slice(start, end).map(line => line.replace(/\s+$/, ''));

  let indent = Infinity;

  for (const line of lines) {
    if (line === '') {
      continue;
    }

    const leading = line.length - line.trimStart().length;

    if (leading < indent) {
      indent = leading;
    }
  }

  if (!Number.isFinite(indent)) {
    indent = 0;
  }

  const grid = lines.map(line => line.slice(indent));

  let min_x = Infinity;
  let min_y = Infinity;
  let max_x = -Infinity;
  let max_y = -Infinity;

  for (let y = 0; y < grid.length; y++) {
    const line = grid[y];

    for (let x = 0; x < line.length; x++) {
      if (line[x] !== ALIVE) {
        continue;
      }

      if (x < min_x) min_x = x;
      if (x > max_x) max_x = x;
      if (y < min_y) min_y = y;
      if (y > max_y) max_y = y;
    }
  }

  if (min_x === Infinity) {
    return { width: 0, height: 0, cells: [] };
  }

  const width = max_x - min_x + 1;
  const height = max_y - min_y + 1;
  const cells: number[] = [];

  for (let y = min_y; y <= max_y; y++) {
    const line = grid[y];

    for (let x = min_x; x <= max_x; x++) {
      if (line[x] === ALIVE) {
        cells.push(x - min_x, y - min_y);
      }
    }
  }

  return { width, height, cells };
};

export const rotate_cells = (cells: number[], width: number, height: number): number[] => {
  const rotated: number[] = [];

  for (let i = 0; i < cells.length; i += 2) {
    const x = cells[i];
    const y = cells[i + 1];

    rotated.push(height - 1 - y, x);
  }

  return rotated;
};

export const build_variants = (cells: number[], width: number, height: number): PatternVariant[] => {
  const variants: PatternVariant[] = [];

  let current_cells = cells;
  let current_width = width;
  let current_height = height;

  for (let turn = 0; turn < 4; turn++) {
    variants.push({ width: current_width, height: current_height, cells: current_cells });

    const next_cells = rotate_cells(current_cells, current_width, current_height);

    const next_width = current_height;
    const next_height = current_width;

    current_cells = next_cells;
    current_width = next_width;
    current_height = next_height;
  }

  return variants;
};
