import { Request, Response } from 'express';
import { successResponse } from '@/utils/serverResponse'

class healthController {

  async getHealth(req: Request, res: Response): Promise<void> {
    successResponse(res, 'ok')
  }

}

const health = new healthController();

export { health };
