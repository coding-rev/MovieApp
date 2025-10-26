# Test Module

This module contains all tests for the Movies API application, organized into **unit**, **integration**, and **performance** tests.

---

## Folder Structure

```
test/
├─ integration/
│ ├─ limiter.test.ts # Tests for rate limiting middleware
│ ├─ movies_feat.test.ts # Feature tests for movie-related endpoints (query params specifically)
│ └─ movies.test.ts # Integration tests for movie CRUD operations
├─ performance/
│ └─ performance.test.ts # Performance and load testing for the API
├─ unit/
│ └─ movies.test.ts # Unit tests for movie-related services and logic
├─ health.test.ts # Health check endpoint tests
└─ testContext.ts # Setup for transactional test environment, database, and mocks
```


---

## Usage

- **Run all tests**:

```bash
npm run test
