import { loop } from '../engine/engine';
import { load_resources } from '../engine/resources/resources';
import { render_cells } from './entities/cells/cells.renderer';
import { render_debug } from './entities/debug/debug.renderer';
import { render_hud } from './entities/hud/hud.renderer';
import { render_background } from './entities/misc/background.renderer';
import { render_field_border } from './entities/misc/field_border.renderer';
import { handle_gameplay } from './game.gameplay';
import { handle_input } from './game.inputs';
import { create_game_state, setup_game_state } from './game.state';

const on_frame = (engine: GOL.EngineContext, game: GOL.GameState) => {
  handle_input(engine, game);
  handle_gameplay(engine, game);

  game.hud.renders = 0;

  render_background(engine, game);

  if (game.border === true) {
    render_field_border(engine, game);
  }

  render_cells(engine, game);

  if (game.hud.enabled === 1) {
    render_hud(engine, game);
  }

  if (game.debug.enabled === 1) {
    render_debug(engine, game);
  }
};

void loop(
  () => document.querySelector('canvas') as HTMLCanvasElement,
  load_resources,
  { create: create_game_state, setup: setup_game_state },
  on_frame,
);
