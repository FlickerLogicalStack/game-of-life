export class Life {
  readonly width: number;
  readonly height: number;
  readonly row_size: number;

  epoch = 0;

  current_buffer: Uint8Array;

  #next_buffer: Uint8Array;

  constructor(width = 16, height = 16) {
    this.width = width;
    this.height = height;
    this.row_size = width + 2;

    const size = (width + 2) * (height + 2);

    this.current_buffer = new Uint8Array(size);
    this.#next_buffer = new Uint8Array(size);
  }

  index = (x: number, y: number) => (y + 1) * this.row_size + (x + 1);

  on = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
      return;
    }

    this.current_buffer[this.index(x, y)] = 1;
  };

  spawn = (cells: number[], x: number, y: number) => {
    const row_size = this.row_size;
    const width = this.width;
    const height = this.height;
    const current_buffer = this.current_buffer;

    for (let i = 0; i < cells.length; i += 2) {
      const cell_x = x + cells[i];
      const cell_y = y + cells[i + 1];

      if (cell_x < 0 || cell_y < 0 || cell_x >= width || cell_y >= height) {
        continue;
      }

      current_buffer[(cell_y + 1) * row_size + (cell_x + 1)] = 1;
    }
  };

  is_alive = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < this.width && y < this.height && this.current_buffer[this.index(x, y)] === 1;

  tick = (n = 1) => {
    const width = this.width;
    const height = this.height;
    const row_size = this.row_size;

    for (let iteration = 0; iteration < n; iteration++) {
      const current_buffer = this.current_buffer;
      const next_buffer = this.#next_buffer;

      for (let y = 1; y <= height; y++) {
        let cell_index = y * row_size + 1;

        for (let x = 1; x <= width; x++, cell_index++) {
          const neighbors =
            current_buffer[cell_index - row_size - 1] +
            current_buffer[cell_index - row_size] +
            current_buffer[cell_index - row_size + 1] +
            current_buffer[cell_index - 1] +
            current_buffer[cell_index + 1] +
            current_buffer[cell_index + row_size - 1] +
            current_buffer[cell_index + row_size] +
            current_buffer[cell_index + row_size + 1];

          next_buffer[cell_index] = neighbors === 3 || (neighbors === 2 && current_buffer[cell_index] === 1) ? 1 : 0;
        }
      }

      this.current_buffer = next_buffer;
      this.#next_buffer = current_buffer;
      this.epoch++;
    }
  };

  __print = () => {
    console.log('[EPOCH]', this.epoch);

    for (let y = 0; y < this.height; y++) {
      let line = '';

      for (let x = 0; x < this.width; x++) {
        line += this.is_alive(x, y) ? '#' : ' ';
      }

      console.log(line);
    }
  };
}
