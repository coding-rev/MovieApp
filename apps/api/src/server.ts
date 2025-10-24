import { createApp } from '@/app/createApp';
import { connectDB } from '@/db/client';
import { logger } from '@/middleware/logger';
import { env } from '@/config/env';

const app = createApp();

(async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    logger.info(`API listening on http://localhost:${env.PORT}`);
  });

})();
