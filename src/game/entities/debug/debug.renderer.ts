import { render_debug_frame } from '../misc/debug_frame.renderer';
import { ZOOM_BREAKPOINT } from '../camera/camera';
import { CELL_RECT_SIZE } from '../cells/cells.renderer';

export const render_debug = (engine: GOL.EngineContext, game: GOL.GameState) => {
  const camera = game.camera;

  const width = engine.canvas.width;
  const height = engine.canvas.height;
  const zoom = camera.zoom;

  const canvas_x = camera.x * zoom + (width / 2) * (ZOOM_BREAKPOINT - zoom);
  const canvas_y = -camera.y * zoom + (height / 2) * (ZOOM_BREAKPOINT - zoom);

  render_debug_frame(
    engine.ctx,
    canvas_x,
    canvas_y,
    game.life.width * CELL_RECT_SIZE * zoom,
    game.life.height * CELL_RECT_SIZE * zoom,
  );

  engine.ctx.fillStyle = 'red';
  engine.ctx.font = '16px monospace';
  engine.ctx.fillText(`board: ${game.life.width}x${game.life.height}  alive: -`, canvas_x + 4, canvas_y - 6);
};
