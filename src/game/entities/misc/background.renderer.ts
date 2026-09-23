export const render_background = (engine: GOL.EngineContext, _game: GOL.GameState) => {
  engine.ctx.fillStyle = 'black';
  engine.ctx.fillRect(0, 0, engine.canvas.width, engine.canvas.height);
};
