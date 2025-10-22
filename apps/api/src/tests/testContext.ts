import { prisma } from '@/db/client';

export async function withTestContext(testFn: (client: typeof prisma) => Promise<void>) {
  await prisma.$executeRaw`BEGIN;`;
  try {
    await testFn(prisma);
  } finally {
    await prisma.$executeRaw`ROLLBACK;`;
  }
}
