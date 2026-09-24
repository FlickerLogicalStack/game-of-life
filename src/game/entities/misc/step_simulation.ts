export const MAX_STEPS_PER_FRAME = 32;

export const step_simulation = (
  state: { step_accumulator: number },
  delta: number,
  speed: number,
  max_steps: number,
) => {
  if (speed <= 0) {
    state.step_accumulator = 0;

    return 0;
  }

  const interval = 1000 / speed;

  let accumulator = state.step_accumulator + delta;
  let steps = 0;

  while (accumulator >= interval && steps < max_steps) {
    accumulator -= interval;
    steps += 1;
  }

  state.step_accumulator = accumulator;

  return steps;
};
