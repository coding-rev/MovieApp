# Server Response Utility

This module provides a centralized utility for formatting HTTP responses in the Movies API application. It standardizes success, error, and other response structures across controllers.

---

## File
```
utils/
└─ serverResponse.ts # Utility functions to send structured HTTP responses
```


---

## Usage

Import the utility in your controllers:

```ts
import { errorResponse, successResponse } from '@/utils/serverResponse'

