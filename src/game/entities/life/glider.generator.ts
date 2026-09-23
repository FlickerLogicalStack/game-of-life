import { PATTERNS } from './life.patterns';
import { r } from '../misc/utils';

import type { Life } from './life';

const GLIDERS = [PATTERNS.GLIDER_1, PATTERNS.GLIDER_2, PATTERNS.GLIDER_3, PATTERNS.GLIDER_4];

const MARGIN = 5;

export const generate_glider = (life: Life) => {
  const pivot_x = r(MARGIN, life.width - 1 - MARGIN);
  const pivot_y = r(MARGIN, life.height - 1 - MARGIN);

  life.onPattern(GLIDERS[r(0, GLIDERS.length)], pivot_x, pivot_y);
};
