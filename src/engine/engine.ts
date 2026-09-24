import { create_inputs, type Inputs } from './inputs';

const MAX_DELTA = 100;

export type EngineContext = {
  __raf: number;
  __prev_frame_time: number;

  canvas: {
    element: HTMLCanvasElement;
    width: number;
    height: number;
  };

  ctx: CanvasRenderingContext2D;
  inputs: Inputs;

  frame: number;
  delta: number;
  delta_mul: number;

  resources: unknown;
};

export const create_engine_context = (canvas: HTMLCanvasElement, resources: unknown): EngineContext => {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context (canvas.getContext(2d))');
  }

  return {
    __raf: 0,
    __prev_frame_time: 0,

    canvas: {
      element: canvas,
      width: canvas.width,
      height: canvas.height,
    },

    ctx,
    inputs: create_inputs(canvas),

    frame: 0,
    delta: 0,
    delta_mul: 0,

    resources,
  };
};

export type GameStateModule<TGame> = {
  create: (engine: EngineContext) => TGame;
  setup?: (engine: EngineContext, game: TGame) => void;
};

export const loop = async <TResources, TGame>(
  canvas_getter: () => HTMLCanvasElement,
  load_resources: () => Promise<TResources>,
  game_state: GameStateModule<TGame>,
  on_frame: (engine: EngineContext, game: TGame) => void,
) => {
  const canvas = canvas_getter();

  const engine = create_engine_context(canvas, await load_resources());

  const resize = () => {
    engine.canvas.width = canvas.clientWidth;
    engine.canvas.height = canvas.clientHeight;

    canvas.width = engine.canvas.width;
    canvas.height = engine.canvas.height;
  };

  window.addEventListener('resize', resize);

  document.addEventListener('visibilitychange', () => {
    engine.__prev_frame_time = performance.now() | 0;
  });

  resize();

  engine.__prev_frame_time = performance.now() | 0;

  const game = game_state.create(engine);

  game_state.setup?.(engine, game);

  window.__ENGINE__ = { engine, game };

  const frame = (time: number) => {
    engine.frame += 1;

    const raw_delta = (time - engine.__prev_frame_time) | 0;

    engine.delta = raw_delta > MAX_DELTA ? MAX_DELTA : raw_delta;
    engine.delta_mul = engine.delta / 1000;
    engine.__prev_frame_time = time | 0;

    on_frame(engine, game);

    engine.__raf = requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
};
