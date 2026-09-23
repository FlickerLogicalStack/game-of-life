export const render_debug_frame = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
) => {
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 1;

  ctx.strokeRect(x, y, width, height);
};
