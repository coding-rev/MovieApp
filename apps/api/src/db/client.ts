import { env } from '@/config/env';
import { PrismaClient as PrismaClientSql } from '../../prisma/prisma';
export { Prisma as PrismaSql } from '../../prisma/prisma';
import { PrismaClient } from '../../prisma/prisma_pg';
export { Prisma } from '../../prisma/prisma_pg';


let prisma: PrismaClient|PrismaClientSql;

if (env.USE_DB === 'production') {
  prisma = new PrismaClient();
} else {
  prisma = new PrismaClientSql();
}

export { prisma };

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
