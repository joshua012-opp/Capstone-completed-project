# Serenia Real Estate Platform

Serenia is a responsive real-estate website and dashboard prototype built with React, TypeScript, Vite, Tailwind CSS, and React Router. The public pages introduce the communities and collect tour or brochure requests. The dashboard provides a demonstration interface for reviewing requests, monitoring metrics, and managing property types and clusters.

> **Project status:** This is a front-end prototype. It has no production backend, real authentication provider, or server-side database. Demo data is kept in the current browser.

## Requirements

- Node.js and npm
- A modern browser

## Run locally

Open a terminal in the `My-React-App` directory:

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). Keep the terminal running while using the app.

## Useful commands

```powershell
npm run typecheck  # Check TypeScript types
npm run lint       # Check source files with ESLint
npm run build      # Create a production build in dist/
npm run preview    # Preview the production build locally
```

## Pages and routes

| Route | Purpose |
| --- | --- |
| `/` | Public home page |
| `/properties` | Public properties page |
| `/aruna-residence` | Aruna Residence community page |
| `/aruna-residence/type-a` | Aruna Type A detail page |
| `/amenities` | Public facilities and amenities |
| `/gallery` | Public gallery |
| `/contact-us` | Public contact page |
| `/login` | Dashboard demo sign-in |
| `/forgot-password`, `/reset-password`, `/password-updated` | Authentication demonstration pages |
| `/dashboard` | Dashboard overview; requires a demo session |
| `/dashboard/requests` | Tour request list |
| `/dashboard/properties` | Dashboard property inventory |
| `/dashboard/properties/add` | Add a property type |
| `/dashboard/properties/:cluster` | Inventory for a selected cluster |
| `/dashboard/blogs`, `/dashboard/gallery`, `/dashboard/settings` | Dashboard placeholder sections |
| `/properties/new/1/basic-information` | Add-cluster wizard |
| `/properties/:clusterId/edit` | Edit-cluster wizard |

Dashboard pages redirect to `/login` when there is no active demo session.

## Demo sign-in

- **Email:** `harrison.wells@serenia.com`
- **Password:** `Serenia123!`

These credentials are hardcoded for demonstration only. They must not be used as real account credentials.

## Fake database and data flow

The fake database is a browser-local data layer designed to keep UI components separate from persistence:

1. A page or component calls a React hook.
2. The hook calls an asynchronous service function.
3. The service initializes the demo data when needed, reads or updates storage, then resolves or reports an error.
4. Data-change events let related views refresh without a full page reload.

Services are in `src/services`, React data hooks are in `src/hooks`, and shared data types are in `src/types`. Dashboard sections load independently and provide their own loading, retry, and error states.

### Where data is stored

- **Browser `localStorage`:** JSON collections using keys such as `serenia_clusters`, `serenia_property_types`, `serenia_requests`, `serenia_analytics`, and `serenia_session`.
- **IndexedDB:** Uploaded files, in the `serenia` database's `files` store.
- **Browser origin matters:** `localhost` and `127.0.0.1` have separate storage. Use the same development URL to see the same saved demo data.

Services add a short simulated API delay. Their storage operations are marked as the places to replace with `fetch` calls when a backend is introduced. Components should use the hooks and services rather than reading browser storage directly.

### Seed data and persistence

On first use, the data layer seeds sample clusters, property types, requests, dashboard analytics, settings, and the demo session collection. It only seeds missing collections for the current schema.

The current storage schema version is `2`. When the schema version changes, initialization clears keys beginning with `serenia_`, clears the app's IndexedDB file store, and writes a fresh demo dataset. This intentionally means that changing the schema version resets this prototype's saved browser data. Clearing browser site data also removes the demo data and uploaded files.

Because the prototype persists between reloads, a demo action such as adding a request or property type can affect later visits from the same browser. Use a fresh browser profile or clear this app's site data when you need a clean presentation.

## Main demo workflows

### Public request to dashboard

1. From the public site, use a tour-request action and submit the form.
2. The request service saves the request and updates the related dashboard analytics.
3. Sign in and open **Dashboard → Request lists** or the dashboard overview to see the updated data.

Brochure/contact inquiry actions update the inquiry totals. The public request form includes country calling codes and validates required selections.

### Add a property type

1. Sign in and open **Dashboard → Properties**.
2. Choose **Add property**.
3. Select an opened cluster, enter the required property details, and save.
4. The inventory and dashboard totals refresh from the updated data without a page reload.

### Add or edit a cluster

Open the add-cluster wizard at `/properties/new/1/basic-information` or choose an existing cluster's edit action. The wizard keeps form data in memory while it is open; it does not persist the wizard as a saved cluster in the fake database.

## Dashboard sample figures

The initial demo dashboard uses:

- 160 total units and 120 available units across five sample clusters.
- 45 upcoming tours and 21 new requests.
- Trend figures of 6%, 5%, 12%, and 20% for the four overview cards.
- Monthly and cluster tour-request charts.
- Inquiry counts split into answered, pending, and escalated.
- Sample requests including Alex Johnson and Miya Agustine.

New requests and property types can change some displayed totals during a demo session.

## Suggested defense walkthrough

1. Start the development server and introduce the public home page and community pages.
2. Submit a sample tour request and point out the confirmation.
3. Sign in with the demo credentials.
4. Show the dashboard's charts, independent section loading/error states, and latest requests.
5. Open **Request lists** to show the newly submitted request and its status controls.
6. Add a property type and show it in the inventory/dashboard without reloading.
7. Explain that the service and hook boundaries are intended to make a later API integration possible.
8. Show the wizard, search, responsive layouts, and remaining prototype limitations.

## Current limitations and next steps

- Data is local to one browser; it is not shared across devices or users.
- Demo sign-in is a hardcoded front-end check, not secure authentication.
- No remote API, server-side validation, authorization, or production database is connected.
- Some dashboard destinations and settings remain presentation placeholders.
- The cluster wizard is an in-memory front-end flow and does not create persisted cluster records yet.
- Replace storage implementations in `src/services` with backend API calls, then add server-side authentication, validation, and automated integration tests before production use.
