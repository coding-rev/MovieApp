import { Request, Response } from 'express';
import { errorResponse, successResponse } from '@/utils/serverResponse'
import { PaginationQuerySchema } from "@full-stack-interview/types";
import {
  listMovies, listGenres
} from '@/services/index';

class movieController {

  async listMovies(req: Request, res: Response): Promise<void> {
    try {
        const parseResult = PaginationQuerySchema.safeParse(req.query);
        if (!parseResult.success) {
            errorResponse(res, 'Invalid query', 400)
        }else{
            const { q, page, pageSize } = parseResult.data;
            const data = await listMovies(q, page, pageSize);
            successResponse(res, data, 200, { page: page, pageSize: page });
        }
    } catch (error: unknown) {
        errorResponse(res, error);
    }
  }
 
  async listGenres(req: Request, res: Response): Promise<void> {
    try {
      const data = await listGenres();
      successResponse(res, data.map((g) => g.genre).sort());
    } catch (error: unknown) {
      errorResponse(res, error);
    }
  }

}

const movie = new movieController();

export { movie };
