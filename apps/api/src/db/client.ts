import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function connectDB() {
  try {
    await prisma.$connect();
    console.log('✅ Database connection has been established');
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err);
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
