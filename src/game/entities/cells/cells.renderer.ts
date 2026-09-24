import { ZOOM_ANCHOR, to_screen_x, to_screen_y } from '../camera/camera';

export const CELL_RECT_SIZE = 10;

const COLORS = ['#263133', '#6079f2', '#6079f2', '#6079f2', '#6079f2'];

export const render_cells = (engine: GOL.EngineContext, game: GOL.GameState) => {
  const ctx = engine.ctx;
  const camera = game.camera;
  const life = game.life;

  const width = engine.canvas.width;
  const height = engine.canvas.height;

  const zoom = camera.zoom;
  const cell_w = CELL_RECT_SIZE * zoom;
  const cell_h = cell_w;

  const offset_x = camera.x * zoom + (width / 2) * (ZOOM_ANCHOR - zoom);
  const offset_y = -camera.y * zoom + (height / 2) * (ZOOM_ANCHOR - zoom);

  // one extra cell on every side so partially visible cells keep their edges
  const min_x = Math.max(0, Math.floor((-cell_w - offset_x) / cell_w));
  const max_x = Math.min(life.width - 1, Math.ceil((width + cell_w - offset_x) / cell_w));
  const min_y = Math.max(0, Math.floor((-cell_h - offset_y) / cell_h));
  const max_y = Math.min(life.height - 1, Math.ceil((height + cell_h - offset_y) / cell_h));

  const current_buffer = life.current_buffer;
  const row_size = life.row_size;

  let current_color = '';

  // Draw a horizontal run of live cells [from, to) as a single filled rect.
  const draw_run = (from: number, to: number, canvas_y: number, cell_y: number) => {
    const color = COLORS[(from * cell_y) % COLORS.length];

    if (color !== current_color) {
      current_color = color;
      ctx.fillStyle = color;
    }

    ctx.fillRect(to_screen_x(camera, width, from * CELL_RECT_SIZE), canvas_y, (to - from) * cell_w, cell_h);

    game.hud.renders++;
  };

  for (let cell_y = min_y; cell_y <= max_y; cell_y++) {
    const row = (cell_y + 1) * row_size + 1;
    const canvas_y = to_screen_y(camera, height, cell_y * CELL_RECT_SIZE);

    let run_start = -1;

    for (let cell_x = min_x; cell_x <= max_x; cell_x++) {
      if (current_buffer[row + cell_x] === 1) {
        if (run_start === -1) {
          run_start = cell_x;
        }

        continue;
      }

      if (run_start !== -1) {
        draw_run(run_start, cell_x, canvas_y, cell_y);
        run_start = -1;
      }
    }

    if (run_start !== -1) {
      draw_run(run_start, max_x + 1, canvas_y, cell_y);
    }
  }
};
