# App Module

This module is responsible for creating and configuring the Express application for the Movies API. It sets up middleware, routes, documentation, and error handling.

---

## File Structure

```
app/
└─ createApp.ts # Creates and configures the Express app
```


---

## Usage

Import and start the app in your server entry point:

```ts
import { createApp } from '@/app/createApp';

const app = createApp();
