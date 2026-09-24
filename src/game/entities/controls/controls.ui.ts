import { center_camera, fit_camera } from '../misc/center_camera';
import { set_speed, toggle_pause } from './controls';

type ControlsRefs = {
  root: HTMLElement;
  speed: HTMLInputElement;
  speed_value: HTMLElement;
  pause: HTMLButtonElement;
  center: HTMLButtonElement;
  fit: HTMLButtonElement;
  fullscreen: HTMLButtonElement;
  hud: HTMLInputElement;
  auto_spawn: HTMLInputElement;
  border: HTMLInputElement;
};

let refs: ControlsRefs | null = null;

let last_speed = -1;
let last_running = -1;
let last_hud = -1;
let last_auto_spawn = -1;
let last_border = -1;

const toggle_fullscreen = () => {
  if (document.fullscreenElement) {
    void document.exitFullscreen();
  } else {
    void document.documentElement.requestFullscreen();
  }
};

const sync_fullscreen = () => {
  if (refs) {
    refs.fullscreen.textContent = document.fullscreenElement ? 'exit' : 'enter';
  }
};

export const mount_controls = (engine: GOL.EngineContext, game: GOL.GameState) => {
  const root = document.querySelector<HTMLElement>('#controls')!;
  const speed = document.querySelector<HTMLInputElement>('#controls-speed')!;
  const speed_value = document.querySelector<HTMLElement>('#controls-speed-value')!;
  const pause = document.querySelector<HTMLButtonElement>('#controls-pause')!;
  const center = document.querySelector<HTMLButtonElement>('#controls-center')!;
  const fit = document.querySelector<HTMLButtonElement>('#controls-fit')!;
  const fullscreen = document.querySelector<HTMLButtonElement>('#controls-fullscreen')!;
  const hud = document.querySelector<HTMLInputElement>('#controls-hud')!;
  const auto_spawn = document.querySelector<HTMLInputElement>('#controls-auto-spawn')!;
  const border = document.querySelector<HTMLInputElement>('#controls-border')!;

  refs = { root, speed, speed_value, pause, center, fit, fullscreen, hud, auto_spawn, border };

  apply_defaults(game);
  sync_fullscreen();

  speed.addEventListener('input', () => {
    set_speed(game, Number(speed.value));
  });

  pause.addEventListener('click', () => {
    toggle_pause(game);
  });

  center.addEventListener('click', () => {
    center_camera(game.camera, game.life, engine.canvas.width, engine.canvas.height);
  });

  fit.addEventListener('click', () => {
    fit_camera(game.camera, game.life, engine.canvas.width, engine.canvas.height);
  });

  fullscreen.addEventListener('click', toggle_fullscreen);

  hud.addEventListener('change', () => {
    game.hud.enabled = hud.checked ? 1 : 0;
  });

  auto_spawn.addEventListener('change', () => {
    game.auto_spawn = auto_spawn.checked;
  });

  border.addEventListener('change', () => {
    game.border = border.checked;
  });

  window.addEventListener('keydown', event => {
    if (event.ctrlKey || event.metaKey || event.altKey) {
      return;
    }

    if (event.code === 'KeyF') {
      event.preventDefault();
      toggle_fullscreen();
    }
  });

  document.addEventListener('fullscreenchange', () => {
    sync_fullscreen();

    // Wait for the fullscreen resize to land, then refit so there are no empty strips.
    requestAnimationFrame(() => {
      fit_camera(game.camera, game.life, engine.canvas.width, engine.canvas.height);
    });
  });

  // Keep canvas interactions (zoom/pan) and hotkeys away from the panel.
  root.addEventListener('wheel', event => event.stopPropagation());
  root.addEventListener('keydown', event => event.stopPropagation());
  root.addEventListener('keyup', event => event.stopPropagation());
};

export const apply_defaults = (game: GOL.GameState) => {
  if (!refs) {
    return;
  }

  last_speed = Math.round(game.speed);
  refs.speed.value = String(last_speed);
  refs.speed_value.textContent = last_speed > 0 ? `${last_speed} gen/s` : 'paused';

  last_running = game.speed > 0 ? 1 : 0;
  refs.pause.textContent = last_running === 1 ? 'pause' : 'resume';
  refs.root.classList.toggle('controls--paused', last_running === 0);

  last_hud = game.hud.enabled;
  refs.hud.checked = game.hud.enabled === 1;

  last_auto_spawn = game.auto_spawn ? 1 : 0;
  refs.auto_spawn.checked = game.auto_spawn === true;

  last_border = game.border ? 1 : 0;
  refs.border.checked = game.border === true;
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

  const border = game.border ? 1 : 0;

  if (border !== last_border) {
    last_border = border;

    refs.border.checked = game.border === true;
  }
};
