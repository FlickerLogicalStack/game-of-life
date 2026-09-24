export class Life {
  readonly width: number;
  readonly height: number;
  readonly stride: number;

  epoch = 0;

  front: Uint8Array;

  #back: Uint8Array;

  constructor(width = 16, height = 16) {
    this.width = width;
    this.height = height;
    this.stride = width + 2;

    const size = (width + 2) * (height + 2);

    this.front = new Uint8Array(size);
    this.#back = new Uint8Array(size);
  }

  index = (x: number, y: number) => (y + 1) * this.stride + (x + 1);

  on = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
      return;
    }

    this.front[this.index(x, y)] = 1;
  };

  spawn = (cells: number[], x: number, y: number) => {
    const stride = this.stride;
    const width = this.width;
    const height = this.height;
    const front = this.front;

    for (let i = 0; i < cells.length; i += 2) {
      const cell_x = x + cells[i];
      const cell_y = y + cells[i + 1];

      if (cell_x < 0 || cell_y < 0 || cell_x >= width || cell_y >= height) {
        continue;
      }

      front[(cell_y + 1) * stride + (cell_x + 1)] = 1;
    }
  };

  is_alive = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < this.width && y < this.height && this.front[this.index(x, y)] === 1;

  tick = (n = 1) => {
    const width = this.width;
    const height = this.height;
    const stride = this.stride;

    for (let iteration = 0; iteration < n; iteration++) {
      const src = this.front;
      const dst = this.#back;

      for (let y = 1; y <= height; y++) {
        let idx = y * stride + 1;

        for (let x = 1; x <= width; x++, idx++) {
          const neighbors =
            src[idx - stride - 1] +
            src[idx - stride] +
            src[idx - stride + 1] +
            src[idx - 1] +
            src[idx + 1] +
            src[idx + stride - 1] +
            src[idx + stride] +
            src[idx + stride + 1];

          dst[idx] = neighbors === 3 || (neighbors === 2 && src[idx] === 1) ? 1 : 0;
        }
      }

      this.front = dst;
      this.#back = src;
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
