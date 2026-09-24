import { generate_glider } from './entities/life/glider.generator';
import { MAX_STEPS_PER_FRAME, step_simulation } from './entities/misc/step_simulation';

const GLIDER_EVERY = 10;

export const handle_gameplay = (engine: GOL.EngineContext, game: GOL.GameState) => {
  const hud = game.hud;

  hud.frames.push(engine.delta);

  const steps = step_simulation(hud, engine.delta, game.speed, MAX_STEPS_PER_FRAME);

  for (let step = 0; step < steps; step++) {
    const started = performance.now();

    game.life.tick(1);

    hud.ticks.push(performance.now() - started);

    if (game.life.epoch % GLIDER_EVERY === 0) {
      generate_glider(game.life);
    }
  }
};
