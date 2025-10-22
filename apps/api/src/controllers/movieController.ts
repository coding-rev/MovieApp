import { Request, Response } from 'express';
import { errorResponse, successResponse } from '@/utils/serverResponse'
import { PaginationQuerySchema } from "@full-stack-interview/types";
import { listMovies, getMovie, createMovie, updateMovie, deleteMovie } from '@/services/index';

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

   async get(req: Request, res: Response): Promise<void|Response> {
    const movie = await getMovie(req.params.id);
    if (!movie) return errorResponse(res, "Not found", 404)
    successResponse(res, movie);
  }

  async create(req: Request, res: Response): Promise<void> {
    const movie = await createMovie(req.body);
    successResponse(res, movie, 201);
  }

  async update(req: Request, res: Response): Promise<void> {
    const movie = await updateMovie(req.params.id, req.body);
    successResponse(res, movie);
  }

  async delete(req: Request, res: Response): Promise<void> {
    await deleteMovie(req.params.id);
    successResponse(res, movie, 204);
  }
}

const movie = new movieController();
export { movie };
