# AGENTS

## Repo Shape
- This repo is not a JS monorepo. The active app lives in `frontend/`.
- The frontend entrypoint is `frontend/src/index.js` -> `frontend/src/App.js` -> `frontend/src/pages/HomePage.jsx`.
- The app uses React Router with home at `/` and case-study pages at `/work/:slug`.
- Most homepage content is hard-coded in `frontend/src/data/mock.js`; work-sample case-study data lives in `frontend/src/data/workSamples.js`.

## Frontend Commands
- Run frontend commands from `frontend/`, not repo root.
- Trust `frontend/package.json`, not `frontend/README.md`: the app runs through `craco`, not plain `react-scripts`.
- Package manager is declared as `npm@11.12.1` in `frontend/package.json`.
- Dev server: `npm start`
- Production build: `npm run build`
- Tests: `npm test`
- One-off CRA test run: `CI=true npm test -- --watch=false`

## Frontend Conventions
- Import alias `@` points to `frontend/src` via `frontend/craco.config.js`. Prefer `@/...` imports over long relative paths.
- Tailwind scans only `frontend/src/**/*.{js,jsx,ts,tsx}` and `frontend/public/index.html`.
- The theme is defined with CSS variables in `frontend/src/index.css`; custom fonts are `playfair` and `lato` in `frontend/tailwind.config.js`.
- `frontend/public/index.html` contains PostHog initialization and a custom error guard script. Treat that file as operational, not template-only CRA boilerplate.

## Frontend Quirks
- `ENABLE_HEALTH_CHECK=true` enables custom dev-server health endpoints from `frontend/plugins/health-check/`.
- With health checks enabled, the webpack dev server exposes `/health`, `/health/simple`, `/health/ready`, `/health/live`, `/health/errors`, and `/health/stats`.

## Testing Reality
- There is no committed frontend test config beyond the default `craco test` script, and the root `tests/` package is effectively empty.
- `test_result.md` contains a repo-local testing protocol for coordination between agents. If you are asked to do substantial testing work here, read it first and follow its update requirements.
