import { LoopedArray } from '../misc/utils';

export type Hud = {
  enabled: number;
  frames: LoopedArray;
  ticks: LoopedArray;
  accumulator: number;
  renders: number;
};

export const create_hud = (): Hud => ({
  enabled: 1,
  frames: new LoopedArray(64),
  ticks: new LoopedArray(128),
  accumulator: 0,
  renders: 0,
});
