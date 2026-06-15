# CI/CD with GitHub Actions

**Intern ID:** CITS706  
**Intern Name:** Mohammad Arif  
**Duration:** 1 Week  
**Project Name:** URL Shortner  
**Project Scope:** CI/CD with Github Actions  

A learning project to understand and GitHub Actions for CI/CD pipelines.

## Overview

This project demonstrates a complete CI/CD pipeline using GitHub Actions:

- **CI (Continuous Integration)**: Runs on every push and pull request to `main` branch
- **CD (Continuous Deployment)**: Runs on every push to `main` to build and deploy Docker images

## Learning Objectives

By exploring this project, you'll learn:

1. **CI Pipeline Design**
   - Running tests on multiple environments (backend + frontend)
   - Service dependency management (PostgreSQL)
   - Caching strategies for dependency installation
   - Test coverage and linting

2. **CD Pipeline Design**
   - Docker image building with Buildx
   - GitHub Container Registry (GHCR) integration
   - Multi-stage builds and image tagging strategies
   - Deployment automation via webhooks

3. **GitHub Actions Best Practices**
   - Job dependencies (`needs:`)
   - Environment variables and secrets
   - Reusable workflows and actions
   - Runner selection and services

## Project Structure

| Directory/File | Purpose |
|----------------|---------|
| `backend/` | Express API application |
| `frontend/` | React application |
| `database/` | PostgreSQL migrations and schema |
| `.github/workflows/ci.yml` | CI pipeline definition |
| `.github/workflows/cd.yml` | CD pipeline definition |
| `docker-compose.yml` | Local development setup |

## CI Pipeline (`.github/workflows/ci.yml`)

### Triggers
- Push to `main` branch
- Pull requests to `main` branch

### Jobs
| Job | Description |
|-----|-------------|
| `backend` | Lint, test, and database setup for Express API |
| `frontend` | Lint and build React application |

### Key Concepts
- **Services**: PostgreSQL container for backend testing
- **Caching**: `actions/cache@v4` for `node_modules`
- **Dependencies**: `npm ci` for reproducible builds

## CD Pipeline (`.github/workflows/cd.yml`)

### Triggers
- Push to `main` branch only

### Jobs
| Job | Description |
|-----|-------------|
| `build-and-publish` | Build and push Docker images to GHCR |
| `deploy` | Trigger deployments via webhooks |

### Key Concepts
- **Docker Buildx**: Advanced build capabilities
- **GitHub Packages**: Container registry integration
- **Image Tagging**: `latest` + `sha` for versioning
- **Webhook Deployment**: External service integration

## Required Secrets and Variables

| Type | Name | Purpose |
|------|------|---------|
| `secrets` | `GITHUB_TOKEN` | Automatic authentication for GHCR |
| `secrets` | `RENDER_BACKEND_DEPLOY_HOOK` | Render deployment webhook for backend |
| `secrets` | `RENDER_FRONTEND_DEPLOY_HOOK` | Render deployment webhook for frontend |
| `variables` | `REGISTRY` | Container registry path |
| `variables` | `IMAGE_OWNER` | Container image owner |
| `variables` | `VITE_API_BASE_URL` | Frontend build-time environment |

## Running Locally

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:4000

## GitHub Actions Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax Reference](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [Available Actions](https://github.com/actions)
