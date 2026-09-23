import type { create_engine_context } from '../engine/engine';
import type { Camera } from '../game/entities/camera/camera';
import type { Debug } from '../game/entities/debug/debug';
import type { Hud } from '../game/entities/hud/hud';
import type { Life } from '../game/entities/life/life';

declare global {
  namespace GOL {
    type EngineContext = ReturnType<typeof create_engine_context>;

    type GameState = {
      life: Life;
      camera: Camera;
      hud: Hud;
      debug: Debug;
      paused: boolean;
    };
  }

  interface Window {
    __ENGINE__?: { engine: GOL.EngineContext; game: unknown };
  }
}
