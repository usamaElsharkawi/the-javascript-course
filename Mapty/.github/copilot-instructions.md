# Copilot Instructions for Mapty (Map Your Workouts)

## Project Overview
- **Single-page JavaScript app** for mapping and logging workouts (running/cycling) on a map UI.
- Uses **Leaflet.js** (via CDN) for interactive map rendering and marker placement.
- No build system, backend, or package manager; all logic is in `script.js` and UI in `index.html`/`style.css`.

## Key Files
- `index.html`: Loads Leaflet, app JS, and CSS. Contains the sidebar, form, and map container.
- `script.js`: All app logic—geolocation, map setup, event handling, and workout marker creation.
- `style.css`: Layout, theming, and responsive design for sidebar, form, and map.

## Architecture & Data Flow
- On load, app requests geolocation and centers map on user.
- Clicking the map shows a form to log a workout at that location.
- Submitting the form adds a marker with a popup to the map.
- Form fields toggle (cadence/elevation) based on workout type.
- No persistent storage or server communication.

## Patterns & Conventions
- DOM elements are selected at the top of `script.js` and reused.
- All event listeners are registered in `script.js` (e.g., form submit, map click, type change).
- Uses strict mode and ES6+ features (const/let, arrow functions, destructuring).
- CSS classes like `.form.hidden` and `.form__row--hidden` control UI visibility.
- Leaflet popups use custom classes (`running-popup`, `cycling-popup`) for color theming.

## Developer Workflows
- **No build step**: Open `index.html` directly in a browser to run.
- **Debugging**: Use browser dev tools; console logs are present for map events.
- **No tests or CI**: Manual testing only.
- **External dependencies**: Only Leaflet.js (CDN in HTML head).

## Examples
- To add a new workout type, update the form in `index.html`, toggle logic in `script.js`, and add CSS for new popup styles.
- To persist workouts, implement localStorage logic in `script.js` (not present by default).

## Cautions
- All logic is in a single JS file; refactor with care to avoid breaking event flows.
- Geolocation is required; app will not function without browser location access.

---
For more details, see code comments in `script.js` and the UI structure in `index.html`.
