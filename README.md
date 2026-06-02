# URL Shortener

![CI](https://github.com/<your-org>/<your-repo>/actions/workflows/ci.yml/badge.svg)
![CD](https://github.com/<your-org>/<your-repo>/actions/workflows/cd.yml/badge.svg)

A URL shortening service with frontend, backend, PostgreSQL, and CI/CD pipeline.

## Structure

- `frontend/` — React application
- `backend/` — Express API
- `database/` — database scripts and migrations
- `.github/workflows/` — CI/CD workflows
- `docker-compose.yml` — local development containers
- `.env.example` — environment variable examples

## Local development

1. Copy `.env.example` to `backend/.env` or create `backend/.env` with the backend variables from `.env.example`.
2. Start PostgreSQL, backend, and frontend containers:

```bash
cd a:/intern/url
docker compose up --build
```

3. Open the frontend at `http://localhost:3000` and the backend API at `http://localhost:4000`.

## Dockerization

- `backend/Dockerfile` builds the Express API image.
- `frontend/Dockerfile` builds the React app and serves it with Nginx.
- `docker-compose.yml` now includes `postgres`, `backend`, and `frontend` services.

## CI/CD

- `.github/workflows/ci.yml` runs backend lint, backend tests, frontend lint, and frontend build.
- `.github/workflows/cd.yml` builds and publishes backend and frontend Docker images to GitHub Container Registry.
- Deployment is modeled in `cd.yml`; it performs a mock deploy when deployment secrets are not configured.

## Environment variables

- `DATABASE_URL` — Postgres connection string used by the backend.
- `VITE_API_BASE_URL` — API endpoint used by the frontend build.

## Notes

- The project is browser-specific: each client is identified by a persistent `clientId` saved in local storage.
- Database schema is defined in `database/init.sql` and initialized by `backend/src/db/setup.js`.
