import { LoopedArray } from '../misc/utils';

export type Hud = {
  enabled: number;
  frames: LoopedArray;
  steps: LoopedArray;
  accumulator: number;
  renders: number;
};

export const create_hud = (): Hud => ({
  enabled: 0,
  frames: new LoopedArray(64),
  steps: new LoopedArray(64),
  accumulator: 0,
  renders: 0,
});
