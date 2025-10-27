import { env } from '@/config/env';
import { PrismaClient } from '@prisma/client';
export { Prisma } from '@prisma/client';

// In dev, reuse a single instance across HMR restarts
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'production' ? ['error'] : ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;


export async function connectDB() {
  try {
    await prisma.$connect();
    console.log('✅ Database connection has been established');
  } catch (err) {
    console.error('❌ Unable to connect to the database:', {err});
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

// Unhandled Promise Rejection
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, 'reason:', reason);
  // Don't exit the process, log and continue
});

// Uncaught Exception
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);

  // Shutdown
  shutdown();
})
