import { SPAWN_POOL } from './pattern.catalog';
import { r } from '../misc/utils';

import type { Life } from '../life/life';

const MARGIN = 5;

export const generate_pattern = (life: Life) => {
  const variant = SPAWN_POOL[r(0, SPAWN_POOL.length)];

  const max_x = Math.max(MARGIN, life.width - variant.width - MARGIN);
  const max_y = Math.max(MARGIN, life.height - variant.height - MARGIN);

  life.spawn(variant.cells, r(MARGIN, max_x + 1), r(MARGIN, max_y + 1));
};
