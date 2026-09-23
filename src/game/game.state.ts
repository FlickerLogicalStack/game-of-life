import { CELL_RECT_SIZE } from './entities/cells/cells.renderer';
import { create_camera } from './entities/camera/camera';
import { create_debug } from './entities/debug/debug';
import { create_hud } from './entities/hud/hud';
import { Life } from './entities/life/life';

export const create_game_state = (engine: GOL.EngineContext): GOL.GameState => {
  const life = new Life(256, 128);
  const camera = create_camera();

  const board_width = life.width * CELL_RECT_SIZE;
  const board_height = life.height * CELL_RECT_SIZE;

  camera.x = engine.canvas.width / 2 - board_width / 2;
  camera.y = board_height / 2 - engine.canvas.height / 2;

  return {
    life,
    camera,
    hud: create_hud(),
    debug: create_debug(),
  };
};
