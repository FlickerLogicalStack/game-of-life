import { ZOOM_BREAKPOINT } from '../camera/camera';

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

  const offset_x = camera.x * zoom + (width / 2) * (ZOOM_BREAKPOINT - zoom);
  const offset_y = -camera.y * zoom + (height / 2) * (ZOOM_BREAKPOINT - zoom);

  // one extra cell on every side so partially visible cells keep their edges
  const min_x = Math.max(0, Math.floor((-cell_w - offset_x) / cell_w));
  const max_x = Math.min(life.width - 1, Math.ceil((width + cell_w - offset_x) / cell_w));
  const min_y = Math.max(0, Math.floor((-cell_h - offset_y) / cell_h));
  const max_y = Math.min(life.height - 1, Math.ceil((height + cell_h - offset_y) / cell_h));

  const front = life.front;
  const stride = life.stride;

  let color = '';

  for (let cy = min_y; cy <= max_y; cy++) {
    const row = (cy + 1) * stride + 1;
    const world_y = cy * CELL_RECT_SIZE;

    for (let cx = min_x; cx <= max_x; cx++) {
      if (front[row + cx] === 1) {
        const next_color = COLORS[(cx * cy) % COLORS.length];

        if (next_color !== color) {
          color = next_color;
          ctx.fillStyle = next_color;
        }

        const canvas_x = (cx * CELL_RECT_SIZE + camera.x) * zoom + (width / 2) * (ZOOM_BREAKPOINT - zoom);
        const canvas_y = (world_y - camera.y) * zoom + (height / 2) * (ZOOM_BREAKPOINT - zoom);

        ctx.fillRect(canvas_x, canvas_y, cell_w, cell_h);

        game.hud.renders++;
      }
    }
  }
};
