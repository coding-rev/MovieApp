# Services Module

This module contains all business logic and service functions for the Movies API application. Each service handles the core operations and interacts with the database or external systems.

## Folder Structure
```
services/
├─ createMovie.ts # Service to create a new movie record
├─ deleteMovie.ts # Service to delete an existing movie
├─ getMovie.ts # Service to fetch a single movie by ID
├─ index.ts # Aggregates and exports all services
├─ listGenres.ts # Service to list all movie genres
├─ listMovies.ts # Service to list all movies, supports filtering and pagination
├─ prometheus.ts # Service for metrics collection and Prometheus integration
└─ updateMovie.ts # Service to update an existing movie
```


## Usage

Import services in your controllers:

```ts
import { createMovie, deleteMovie, getMovie, listGenres, listMovies, updateMovie } from '@/services/index';
