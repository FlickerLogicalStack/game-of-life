import { generate_glider } from './entities/life/glider.generator';

const GEN_INTERVAL = 1000 / 60;
const GLIDER_EVERY = 10;

export const handle_gameplay = (engine: GOL.EngineContext, game: GOL.GameState) => {
  const hud = game.hud;

  hud.frames.push(engine.delta);

  if (game.paused === true) {
    hud.accumulator = 0;

    return;
  }

  hud.accumulator += engine.delta;

  while (hud.accumulator >= GEN_INTERVAL) {
    const started = performance.now();

    game.life.tick(1);

    hud.ticks.push(performance.now() - started);
    hud.accumulator -= GEN_INTERVAL;

    if (game.life.epoch % GLIDER_EVERY === 0) {
      generate_glider(game.life);
    }
  }
};
