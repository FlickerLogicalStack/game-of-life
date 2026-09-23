export const ZOOM_BREAKPOINT = 1;

export type Camera = {
  x: number;
  y: number;
  zoom: number;
};

export const create_camera = (): Camera => ({
  x: 0,
  y: 0,
  zoom: 0.36,
});
