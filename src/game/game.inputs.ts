import { clamp } from './entities/misc/utils';

const CAMERA_SPEED = 600;
const ZOOM_SPEED = 1.5;

const MIN_ZOOM = 0.02;
const MAX_ZOOM = 40;

export const handle_input = (engine: GOL.EngineContext, game: GOL.GameState) => {
  const { kb, mouse } = engine.inputs;
  const camera = game.camera;

  const delta = engine.delta_mul;
  const step = (CAMERA_SPEED * delta) / camera.zoom;

  if (kb.ArrowLeft === true) {
    camera.x += step;
  }

  if (kb.ArrowRight === true) {
    camera.x -= step;
  }

  if (kb.ArrowUp === true) {
    camera.y -= step;
  }

  if (kb.ArrowDown === true) {
    camera.y += step;
  }

  if (kb.Minus === true) {
    camera.zoom /= 1 + ZOOM_SPEED * delta;
  }

  if (kb.Equal === true) {
    camera.zoom *= 1 + ZOOM_SPEED * delta;
  }

  if (mouse.is_dragging === true) {
    camera.x += mouse.drag_x / camera.zoom;
    camera.y -= mouse.drag_y / camera.zoom;
  }

  if (mouse.wheel !== 0) {
    camera.zoom *= mouse.wheel < 0 ? 1.1 : 1 / 1.1;
  }

  camera.zoom = clamp(MIN_ZOOM, camera.zoom, MAX_ZOOM);

  mouse.drag_x = 0;
  mouse.drag_y = 0;
  mouse.wheel = 0;
};
