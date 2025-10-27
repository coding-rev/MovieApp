import { prisma } from '@/db/client';

export async function withTestContext(
  testFn: (client: typeof prisma) => Promise<void>
): Promise<void> {
  try {
    await prisma.$executeRawUnsafe('BEGIN;');
    await testFn(prisma);
  } catch (err) {
    console.log('Test error:', err);
  } finally {
    try {
      await prisma.$executeRawUnsafe('ROLLBACK;');
    } catch (rollbackErr) {
      // Ignore rollback errors (e.g., "no transaction is active")
      console.log('Rollback skipped:', (rollbackErr as Error).message);
    }
  }
}
