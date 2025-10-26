# Routes Module

This module contains all route definitions for the Movies API application. Each router maps HTTP endpoints to controller actions.

---

## Folder Structure

```
routes/
├─ genreRouter.ts # Routes for genre-related endpoints
├─ healthRouter.ts # Routes for health check endpoints
├─ index.ts # Aggregates and exports all routers
└─ movieRouter.ts # Routes for movie-related endpoints
```


---

## Usage

Import routers in your main app file:

```ts
import { routers } from "@/routes/index"
