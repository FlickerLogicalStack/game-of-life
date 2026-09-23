import { LoopedArray } from '../misc/utils';

export type Hud = {
  frames: LoopedArray;
  ticks: LoopedArray;
  accumulator: number;
  renders: number;
};

export const create_hud = (): Hud => ({
  frames: new LoopedArray(64),
  ticks: new LoopedArray(128),
  accumulator: 0,
  renders: 0,
});
