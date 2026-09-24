import { generate_pattern } from './entities/pattern/pattern.generator';
import { MAX_STEPS_PER_FRAME, step_simulation } from './entities/misc/step_simulation';

const SPAWN_EVERY = 10;

export const handle_gameplay = (engine: GOL.EngineContext, game: GOL.GameState) => {
  const hud = game.hud;

  if (hud.enabled === 1) {
    hud.frames.push(engine.delta);
  }

  const steps = step_simulation(game, engine.delta, game.speed, MAX_STEPS_PER_FRAME);

  if (hud.enabled === 1) {
    hud.steps.push(steps);
  }

  for (let step = 0; step < steps; step++) {
    game.life.tick(1);

    if (game.auto_spawn === true && game.life.epoch % SPAWN_EVERY === 0) {
      generate_pattern(game.life);
    }
  }
};
