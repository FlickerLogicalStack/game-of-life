import { center_camera } from '../misc/center_camera';
import { set_speed, toggle_pause } from './controls';

type ControlsRefs = {
  root: HTMLElement;
  speed: HTMLInputElement;
  speed_value: HTMLElement;
  pause: HTMLButtonElement;
  center: HTMLButtonElement;
  hud: HTMLInputElement;
  auto_spawn: HTMLInputElement;
};

let refs: ControlsRefs | null = null;

let last_speed = -1;
let last_running = -1;
let last_hud = -1;
let last_auto_spawn = -1;

export const mount_controls = (engine: GOL.EngineContext, game: GOL.GameState) => {
  const root = document.querySelector<HTMLElement>('#controls');
  const speed = document.querySelector<HTMLInputElement>('#controls-speed');
  const speed_value = document.querySelector<HTMLElement>('#controls-speed-value');
  const pause = document.querySelector<HTMLButtonElement>('#controls-pause');
  const center = document.querySelector<HTMLButtonElement>('#controls-center');
  const hud = document.querySelector<HTMLInputElement>('#controls-hud');
  const auto_spawn = document.querySelector<HTMLInputElement>('#controls-auto-spawn');

  if (!root || !speed || !speed_value || !pause || !center || !hud || !auto_spawn) {
    return;
  }

  refs = { root, speed, speed_value, pause, center, hud, auto_spawn };

  speed.addEventListener('input', () => {
    set_speed(game, Number(speed.value));
  });

  pause.addEventListener('click', () => {
    toggle_pause(game);
  });

  center.addEventListener('click', () => {
    center_camera(game.camera, game.life, engine.canvas.width, engine.canvas.height);
  });

  hud.addEventListener('change', () => {
    game.hud.enabled = hud.checked ? 1 : 0;
  });

  auto_spawn.addEventListener('change', () => {
    game.auto_spawn = auto_spawn.checked;
  });

  // Keep canvas interactions (zoom/pan) and hotkeys away from the panel.
  root.addEventListener('wheel', event => event.stopPropagation());
  root.addEventListener('keydown', event => event.stopPropagation());
  root.addEventListener('keyup', event => event.stopPropagation());
};

export const sync_controls = (game: GOL.GameState) => {
  if (!refs) {
    return;
  }

  const speed = Math.round(game.speed);

  if (speed !== last_speed) {
    last_speed = speed;

    if (refs.speed.value !== String(speed)) {
      refs.speed.value = String(speed);
    }

    refs.speed_value.textContent = speed > 0 ? `${speed} gen/s` : 'paused';
  }

  const running = game.speed > 0 ? 1 : 0;

  if (running !== last_running) {
    last_running = running;

    refs.pause.textContent = running ? 'pause' : 'resume';
    refs.root.classList.toggle('controls--paused', running === 0);
  }

  if (game.hud.enabled !== last_hud) {
    last_hud = game.hud.enabled;

    refs.hud.checked = game.hud.enabled === 1;
  }

  const auto_spawn = game.auto_spawn ? 1 : 0;

  if (auto_spawn !== last_auto_spawn) {
    last_auto_spawn = auto_spawn;

    refs.auto_spawn.checked = game.auto_spawn === true;
  }
};
