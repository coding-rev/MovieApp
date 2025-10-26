# Controllers Module

This module contains all controller logic for handling incoming HTTP requests and returning responses for the Movies API application.

## Folder Structure
```
controllers/
├─ genreController.ts # Handles Retrieval of movie genres
├─ healthController.ts # Provides health check endpoints for the API
├─ index.ts # Aggregates and exports all controllers
└─ movieController.ts # Handles CRUD operations for movies
```


## Usage

Import controllers in your routes:

```ts
import { movie, genre, health } from '@/controllers/index';
