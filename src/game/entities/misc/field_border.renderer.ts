import { ZOOM_BREAKPOINT } from '../camera/camera';
import { CELL_RECT_SIZE } from '../cells/cells.renderer';

const BORDER_COLOR = 'rgba(96, 121, 242, 0.25)';
const BORDER_WIDTH = 1;

export const render_field_border = (engine: GOL.EngineContext, game: GOL.GameState) => {
  const camera = game.camera;
  const life = game.life;

  const width = engine.canvas.width;
  const height = engine.canvas.height;
  const zoom = camera.zoom;

  const offset_x = camera.x * zoom + (width / 2) * (ZOOM_BREAKPOINT - zoom);
  const offset_y = -camera.y * zoom + (height / 2) * (ZOOM_BREAKPOINT - zoom);

  engine.ctx.strokeStyle = BORDER_COLOR;
  engine.ctx.lineWidth = BORDER_WIDTH;
  engine.ctx.strokeRect(offset_x, offset_y, life.width * CELL_RECT_SIZE * zoom, life.height * CELL_RECT_SIZE * zoom);
};
