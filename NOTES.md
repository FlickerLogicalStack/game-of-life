# Notes

## TODO

### devicePixelRatio in engine resize
The dudol engine core resizes the canvas in CSS pixels only:

```js
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
```

On HiDPI (Retina) screens the drawing buffer is therefore upscaled by the browser and the
canvas looks blurry. When we return to this, make the resize DPR-aware:

```js
const dpr = window.devicePixelRatio || 1;
canvas.width = Math.floor(canvas.clientWidth * dpr);
canvas.height = Math.floor(canvas.clientHeight * dpr);
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
```

The game then keeps working in CSS pixels while the buffer renders at native resolution.
Remember: `camera` / culling math in renderers uses `engine.canvas.width/height` — keep those in
CSS pixels (single source of truth) and apply DPR only on the context transform.
