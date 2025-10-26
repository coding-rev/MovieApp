# Movies API

This is the Movies API application, built with Node.js, Express, and TypeScript. It provides endpoints for managing movies, genres, health checks, and metrics, with full Swagger/OpenAPI documentation and monitoring support.

---

## Project Structure

```
api/
├─ prisma/ # Prisma database schema and migrations
├─ src/
│ ├─ app/ # Express app creation (createApp.ts)
│ ├─ config/ # Environment variables and configuration
│ ├─ controllers/ # Controllers handling HTTP requests
│ ├─ db/ # Database client and helpers
│ ├─ docs/ # Swagger/OpenAPI documentation definitions
│ ├─ middleware/ # Custom middleware (logging, authentication, etc.)
│ ├─ routes/ # Route definitions mapping endpoints to controllers
│ ├─ services/ # Business logic and database operations
│ ├─ tests/ # Unit, integration, and performance tests
│ └─ utils/ # Utility functions (e.g., serverResponse)
├─ server.ts # Entry point to start the server
└─ prometheus.yml # Prometheus metrics configuration
```


---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a .env file based on .env.example:

### 3. Run Dev

```bash
npm run dev
```