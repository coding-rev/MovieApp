# Docs Module

This module contains all Swagger/OpenAPI documentation definitions for the Movies API application. It organizes endpoint specifications and generates a complete Swagger specification for the API.

---

## Folder Structure

```
docs/
├─ genre.docs.ts # Swagger definitions for genre-related endpoints
├─ health.docs.ts # Swagger definitions for health check endpoints
├─ metrics.docs.ts # Swagger definitions for metrics and Prometheus endpoints
├─ movie.docs.ts # Swagger definitions for movie-related endpoints
└─ swagger.ts # Aggregates all docs and generates the final Swagger spec
```


---

## Usage

Import the generated Swagger specification in your app:

```ts
import { swaggerSpec } from '@/docs/swagger';
