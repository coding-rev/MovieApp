import { PrismaClient } from '@prisma/client';
import { env } from '@/config/env';

export const prisma = new PrismaClient({
  datasources: { db: { url: env.DATABASE_URL } },
});


export async function connectDB() {
  try {
    await prisma.$connect();
    console.log('✅ Database connection has been established');
  } catch (err) {
    console.error('❌ Unable to connect to the database:');
    process.exit(1);
  }
}

export const shutdown = async () => {
  console.log('🛑 Closing database connection...');
  await prisma.$disconnect();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
