import { Request, Response } from 'express';
import { errorResponse, successResponse } from '@/utils/serverResponse'
import { listGenres } from '@/services/index';

class genreController {

  async listGenres(req: Request, res: Response): Promise<void> {
    try {
      const data = await listGenres();
      successResponse(res, data.map((g) => g.genre).sort());
    } catch (error: unknown) {
      errorResponse(res, error);
    }
  }

}

const genre = new genreController();

export { genre };
