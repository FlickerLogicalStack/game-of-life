# game-of-life

Conway's Game of Life rendered on a canvas. Pan with drag or arrow keys, zoom with the mouse
wheel or `-` / `=`. Gliders are seeded automatically.

## Commands

```bash
bun install            # deps (@types/bun + typescript only)
bun run dev            # rebuild on change and serve http://localhost:3000
bun run build          # production build -> docs/ (single inlined index.html)
bun run check-types    # tsc --noEmit
bun run format         # prettier
bun test               # bun:test, Life logic only
```

## Deploy

Builds are committed to the repository — there is no CI. Build locally and push `docs/`:

```bash
bun run check-types
bun run build
git add docs
git commit -m "build: update docs"
git push
```

On GitHub set Settings → Pages → Source to **Deploy from a branch**, branch `master`, folder
`/docs`. The page is served at `https://flickerlogicalstack.github.io/game-of-life/`; assets are
inlined so relative paths work under the project subpath. `docs/.nojekyll` disables Jekyll
processing.
