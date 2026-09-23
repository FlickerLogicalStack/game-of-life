const HUD_STEP = 20;

export const render_hud = (engine: GOL.EngineContext, game: GOL.GameState) => {
  const ctx = engine.ctx;
  const camera = game.camera;
  const hud = game.hud;

  const fps_avg = hud.frames.avg();
  const aps_avg = hud.ticks.avg();

  ctx.fillStyle = 'white';
  ctx.font = '20px monospace';

  let cursor = 5;

  ctx.fillText(`fps: ${(fps_avg > 0 ? 1000 / fps_avg : 0).toFixed(1)}`, 10, (cursor += HUD_STEP));
  ctx.fillText(`aps: ${(aps_avg > 0 ? 1000 / aps_avg : 0).toFixed(1)}`, 10, (cursor += HUD_STEP));
  ctx.fillText(`renders: ${hud.renders}`, 10, (cursor += HUD_STEP));
  cursor += HUD_STEP;
  ctx.fillText(`x: ${camera.x.toFixed(3)}`, 10, (cursor += HUD_STEP));
  ctx.fillText(`y: ${camera.y.toFixed(3)}`, 10, (cursor += HUD_STEP));
  ctx.fillText(`zoom: ${camera.zoom.toFixed(3)}`, 10, (cursor += HUD_STEP));
  cursor += HUD_STEP;
  ctx.fillText(`epoch: ${game.life.epoch}`, 10, (cursor += HUD_STEP));
};
