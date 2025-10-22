import { createApp } from '@/app/createApp';
import { connectDB } from '@/db/client';

const app = createApp();

(async () => {
  await connectDB();

  const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
})();
