# Frontend

This frontend now runs on Vite with React.

## Available Scripts

In the project directory, you can run:

### `npm start`

Starts the Vite development server.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\
If you need the local health endpoints, start the server with `ENABLE_HEALTH_CHECK=true npm start`.

### `npm test`

Runs the Vitest test suite.

### `npm run build`

Builds the app for production to the `build` folder.\
The GitHub Pages workflow publishes that folder.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Notes

- The HTML entrypoint is `frontend/index.html`.
- The React entrypoint is `frontend/src/index.jsx`.
- The app is configured for root-hosted custom-domain deployment.
