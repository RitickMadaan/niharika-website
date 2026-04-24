# AGENTS

## Repo Shape
- This repo is not a JS monorepo. The active app lives in `frontend/`.
- The frontend entrypoint is `frontend/index.html` -> `frontend/src/index.jsx` -> `frontend/src/App.jsx` -> `frontend/src/pages/HomePage.jsx`.
- The app uses React Router with home at `/` and case-study pages at `/work/:slug`.
- Most homepage content is hard-coded in `frontend/src/data/mock.js`; work-sample case-study data lives in `frontend/src/data/workSamples.js`.

## Frontend Commands
- Run frontend commands from `frontend/`, not repo root.
- Trust `frontend/package.json`: the app runs through Vite and Vitest.
- Package manager is declared as `npm@11.12.1` in `frontend/package.json`.
- Dev server: `npm start`
- Production build: `npm run build`
- Tests: `npm test`

## Frontend Conventions
- Import alias `@` points to `frontend/src` via `frontend/vite.config.js`. Prefer `@/...` imports over long relative paths.
- Tailwind scans only `frontend/src/**/*.{js,jsx,ts,tsx}` and `frontend/index.html`.
- The theme is defined with CSS variables in `frontend/src/index.css`; custom fonts are `playfair` and `lato` in `frontend/tailwind.config.js`.
- `frontend/index.html` contains the custom error guard script and SPA redirect bridge. Treat that file as operational, not boilerplate.

## Frontend Quirks
- `ENABLE_HEALTH_CHECK=true` enables custom Vite dev-server health endpoints.
- With health checks enabled, the dev server exposes `/health`, `/health/simple`, `/health/ready`, `/health/live`, `/health/errors`, and `/health/stats`.

## Testing Reality
- The frontend uses Vitest with jsdom for smoke tests.
- `test_result.md` contains a repo-local testing protocol for coordination between agents. If you are asked to do substantial testing work here, read it first and follow its update requirements.
