import { Request, Response } from 'express';
import { errorResponse, successResponse } from '@/utils/serverResponse'
import { prisma } from '@/db/client';

class healthController {

  async getHealthLive(req: Request, res: Response): Promise<void> {
    successResponse(res, 'ok')
  }

  async getHealthReady(req: Request, res: Response): Promise<void> {
    try {
      await prisma.$queryRaw`SELECT 1`;
      successResponse(res, 'ready');
    } catch (err) {
      console.error('DB connection failed', err);
      errorResponse(res, 'not ready', 503);
    }
  }

}

const health = new healthController();

export { health };
