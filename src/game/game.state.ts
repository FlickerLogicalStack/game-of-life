import { DEFAULT_SPEED } from './entities/controls/controls';
import { mount_controls } from './entities/controls/controls.ui';
import { center_camera } from './entities/misc/center_camera';
import { create_camera } from './entities/camera/camera';
import { create_debug } from './entities/debug/debug';
import { create_hud } from './entities/hud/hud';
import { Life } from './entities/life/life';

export const create_game_state = (engine: GOL.EngineContext): GOL.GameState => {
  const life = new Life(256, 128);
  const camera = create_camera();

  center_camera(camera, life, engine.canvas.width, engine.canvas.height);

  return {
    life,
    camera,
    hud: create_hud(),
    debug: create_debug(),
    speed: DEFAULT_SPEED,
    last_speed: DEFAULT_SPEED,
  };
};

export const setup_game_state = (engine: GOL.EngineContext, game: GOL.GameState) => {
  mount_controls(engine, game);
};
