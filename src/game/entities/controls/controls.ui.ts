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

const query = <T extends Element>(selector: string) => document.querySelector<T>(selector)!;

// Built once, with its final shape, so V8 never sees hidden-class transitions on `refs`.
const refs: ControlsRefs = {
  root: query<HTMLElement>('#controls'),
  speed: query<HTMLInputElement>('#controls-speed'),
  speed_value: query<HTMLElement>('#controls-speed-value'),
  pause: query<HTMLButtonElement>('#controls-pause'),
  center: query<HTMLButtonElement>('#controls-center'),
  fit: query<HTMLButtonElement>('#controls-fit'),
  fullscreen: query<HTMLButtonElement>('#controls-fullscreen'),
  hud: query<HTMLInputElement>('#controls-hud'),
  auto_spawn: query<HTMLInputElement>('#controls-auto-spawn'),
  border: query<HTMLInputElement>('#controls-border'),
};

const toggle_fullscreen = () => {
  if (document.fullscreenElement) {
    void document.exitFullscreen();
  } else {
    void document.documentElement.requestFullscreen();
  }
};

const sync_fullscreen = () => {
  refs.fullscreen.textContent = document.fullscreenElement ? 'exit' : 'enter';
};

export const mount_controls = (engine: GOL.EngineContext, game: GOL.GameState) => {
  refresh_controls(game);
  sync_fullscreen();

  refs.speed.addEventListener('input', () => {
    set_speed(game, Number(refs.speed.value));
    refresh_controls(game);
  });

  refs.pause.addEventListener('click', () => {
    toggle_pause(game);
    refresh_controls(game);
  });

  refs.center.addEventListener('click', () => {
    center_camera(game.camera, game.life, engine.canvas.width, engine.canvas.height);
  });

  refs.fit.addEventListener('click', () => {
    fit_camera(game.camera, game.life, engine.canvas.width, engine.canvas.height);
  });

  refs.fullscreen.addEventListener('click', toggle_fullscreen);

  refs.hud.addEventListener('change', () => {
    game.hud.enabled = refs.hud.checked ? 1 : 0;
  });

  refs.auto_spawn.addEventListener('change', () => {
    game.auto_spawn = refs.auto_spawn.checked;
  });

  refs.border.addEventListener('change', () => {
    game.border = refs.border.checked;
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
  refs.root.addEventListener('wheel', event => event.stopPropagation());
  refs.root.addEventListener('keydown', event => event.stopPropagation());
  refs.root.addEventListener('keyup', event => event.stopPropagation());
};

export const refresh_controls = (game: GOL.GameState) => {
  const speed = Math.round(game.speed);

  refs.speed.value = String(speed);
  refs.speed_value.textContent = speed > 0 ? `${speed} gen/s` : 'paused';

  const running = game.speed > 0;

  refs.pause.textContent = running ? 'pause' : 'resume';
  refs.root.classList.toggle('controls--paused', !running);

  refs.hud.checked = game.hud.enabled === 1;
  refs.auto_spawn.checked = game.auto_spawn;
  refs.border.checked = game.border;
};
