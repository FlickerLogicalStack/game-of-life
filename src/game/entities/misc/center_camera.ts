import { CELL_RECT_SIZE } from '../cells/cells.renderer';

import type { Camera } from '../camera/camera';
import type { Life } from '../life/life';

export const center_camera = (camera: Camera, life: Life, canvas_width: number, canvas_height: number) => {
  camera.x = canvas_width / 2 - (life.width * CELL_RECT_SIZE) / 2;
  camera.y = (life.height * CELL_RECT_SIZE) / 2 - canvas_height / 2;
};
