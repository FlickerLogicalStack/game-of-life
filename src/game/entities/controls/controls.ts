export const DEFAULT_SPEED = 60;
export const MAX_SPEED = 144;

export const set_speed = (game: GOL.GameState, speed: number) => {
  if (speed > 0) {
    game.last_speed = speed;
  }

  game.speed = speed;
};

export const toggle_pause = (game: GOL.GameState) => {
  game.speed = game.speed > 0 ? 0 : game.last_speed || DEFAULT_SPEED;
};
