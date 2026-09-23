import { create_camera } from './entities/camera/camera';
import { create_debug } from './entities/debug/debug';
import { create_hud } from './entities/hud/hud';
import { Life } from './entities/life/life';

export const create_game_state = (_engine: GOL.EngineContext): GOL.GameState => {
  return {
    life: new Life(256, 128),
    camera: create_camera(),
    hud: create_hud(),
    debug: create_debug(),
  };
};
