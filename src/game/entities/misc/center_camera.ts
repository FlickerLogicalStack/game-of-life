import { CELL_RECT_SIZE } from '../cells/cells.renderer';

import type { Camera } from '../camera/camera';
import type { Life } from '../life/life';

export const center_camera = (camera: Camera, life: Life, canvas_width: number, canvas_height: number) => {
  camera.x = canvas_width / 2 - (life.width * CELL_RECT_SIZE) / 2;
  camera.y = (life.height * CELL_RECT_SIZE) / 2 - canvas_height / 2;
};

// Cover the whole viewport with the board (no empty strips) and center on it.
export const fit_camera = (camera: Camera, life: Life, canvas_width: number, canvas_height: number) => {
  camera.zoom = Math.max(canvas_width / (life.width * CELL_RECT_SIZE), canvas_height / (life.height * CELL_RECT_SIZE));

  center_camera(camera, life, canvas_width, canvas_height);
};
