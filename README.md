# AI Orchestrator: NestJS + React + n8n + PostgreSQL

This project is a full-stack AI task orchestration system using NestJS, React, and n8n, all containerized with Docker.

## 🚀 Quick Start

### 1. Prerequisites
- Docker & Docker Compose installed.

### 2. Environment Setup
Create or update the `.env` file in the root directory:
```bash
DB_USER=n8n_user
DB_PASSWORD=n8n_secure_password
DB_NAME=n8n_db
PORT=3000

# Prisma
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@db:5432/${DB_NAME}?schema=public

# n8n
N8N_WEBHOOK_URL=http://n8n:5678/webhook/your-id

# Public IP (If no domain)
PUBLIC_IP=132.145.81.59
```

### 3. Run the Project
```bash
docker compose up -d
```

## 🔗 Connection Information

Due to varying local environment settings, you can access the services either via **Direct Ports** (recommended) or **Traefik Domains**.

### Direct Access (Stable)
| Service | URL |
| :--- | :--- |
| **Frontend (App)** | [http://localhost:5173](http://localhost:5173) |
| **n8n Automation** | [http://localhost:5678](http://localhost:5678) |
| **Backend API** | [http://localhost:3000](http://localhost:3000) |

### Traefik Domain Access
> [!NOTE]
> Requires adding `127.0.0.1 app.localhost api.localhost n8n.localhost` to your `/etc/hosts` file.

| Service | URL |
| :--- | :--- |
| **Frontend (App)** | [http://app.localhost](http://app.localhost) |
| **Backend API** | [http://api.localhost](http://api.localhost) |
| **n8n Automation** | [http://n8n.localhost](http://n8n.localhost) |
| **Traefik Dashboard** | [http://localhost:8080](http://localhost:8080) |

## ✨ Features
- **Premium UI**: Sleek glassmorphism theme built with React and Tailwind CSS.
- **Secure Auth**: Session-based authentication using PostgreSQL.
- **AI Integration**: Backend integration with n8n via Webhooks.
- **Modern Infrastructure**: Prisma 7.5.0 with PostgreSQL adapter for high performance.

## 📂 Project Structure
- `backend/`: NestJS server with Prisma ORM.
- `frontend/`: React single-page application.
- `docker-compose.yml`: Orchestrates DB, n8n, Traefik, and App services.

## 🤖 CI/CD Pipeline (GitHub Actions)

This project includes a GitHub Actions workflow for automated deployment to OCI.

### Setup Steps:
1.  **Push to GitHub**: Create a repository and push your code.
2.  **Configure GitHub Secrets**: Go to **Settings > Secrets and variables > Actions** and add:
    - `GH_PAT`: Personal Access Token with `packages` scope (for server to login to GHCR).
    - `OCI_SSH_IP`, `OCI_SSH_USER`, `OCI_SSH_KEY`
3.  **Automatic Deployment**: Every push to the `main` branch will now build images and deploy them to your OCI instance.
