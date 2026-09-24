import { to_screen_x, to_screen_y } from '../camera/camera';
import { CELL_RECT_SIZE } from '../cells/cells.renderer';

const BORDER_COLOR = 'rgba(96, 121, 242, 0.25)';
const BORDER_WIDTH = 1;

export const render_field_border = (engine: GOL.EngineContext, game: GOL.GameState) => {
  const camera = game.camera;
  const life = game.life;

  const width = engine.canvas.width;
  const height = engine.canvas.height;
  const zoom = camera.zoom;

  engine.ctx.strokeStyle = BORDER_COLOR;
  engine.ctx.lineWidth = BORDER_WIDTH;
  engine.ctx.strokeRect(
    to_screen_x(camera, width, 0),
    to_screen_y(camera, height, 0),
    life.width * CELL_RECT_SIZE * zoom,
    life.height * CELL_RECT_SIZE * zoom,
  );
};
