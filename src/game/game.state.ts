import { DEFAULT_SPEED } from './entities/controls/controls';
import { mount_controls } from './entities/controls/controls.ui';
import { fit_camera } from './entities/misc/center_camera';
import { create_camera } from './entities/camera/camera';
import { create_debug } from './entities/debug/debug';
import { create_hud } from './entities/hud/hud';
import { Life } from './entities/life/life';

// Target on-screen size of one cell at start: the board is sized to the window in cells of
// `START_CELL_SCREEN_SIZE` pixels and zoomed to cover it.
const START_CELL_SCREEN_SIZE = 5;

export const create_game_state = (engine: GOL.EngineContext): GOL.GameState => {
  const canvas_width = engine.canvas.width;
  const canvas_height = engine.canvas.height;

  const width = Math.max(1, Math.floor(canvas_width / START_CELL_SCREEN_SIZE));
  const height = Math.max(1, Math.floor(canvas_height / START_CELL_SCREEN_SIZE));

  const life = new Life(width, height);
  const camera = create_camera();

  fit_camera(camera, life, canvas_width, canvas_height);

  return {
    life,
    camera,
    hud: create_hud(),
    debug: create_debug(),
    speed: DEFAULT_SPEED,
    last_speed: DEFAULT_SPEED,
    auto_spawn: true,
    border: false,
  };
};

export const setup_game_state = (engine: GOL.EngineContext, game: GOL.GameState) => {
  mount_controls(engine, game);
};
