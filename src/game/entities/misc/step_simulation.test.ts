import { describe, expect, test } from 'bun:test';

import { step_simulation } from './step_simulation';

const state = () => ({ step_accumulator: 0 });

describe('step_simulation', () => {
  test('speed 0 never steps and clears the accumulator', () => {
    const s = state();

    s.step_accumulator = 123;

    expect(step_simulation(s, 100, 0, 32)).toBe(0);
    expect(s.step_accumulator).toBe(0);
  });

  test('60 gen/s steps once for a ~16.7ms delta', () => {
    expect(step_simulation(state(), 1000 / 60, 60, 32)).toBe(1);
  });

  test('accumulates leftover time between frames', () => {
    const s = state();

    expect(step_simulation(s, 10, 60, 32)).toBe(0);
    expect(step_simulation(s, 10, 60, 32)).toBe(1);
  });

  test('144 gen/s catches up multiple generations after a long frame', () => {
    expect(step_simulation(state(), 100, 144, 32)).toBe(14);
  });

  test('caps steps per frame', () => {
    expect(step_simulation(state(), 10_000, 144, 5)).toBe(5);
  });
});
