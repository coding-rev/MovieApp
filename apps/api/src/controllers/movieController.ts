import { Request, Response } from 'express';
import { errorResponse, successResponse } from '@/utils/serverResponse'
import { listMovies, getMovie, createMovie, updateMovie, deleteMovie } from '@/services/index';
import { PaginationQuerySchema, PaginationQuery } from "@full-stack-interview/types";

class movieController {

  async listMovies(req: Request, res: Response): Promise<void> {
    try {
        const parseResult = PaginationQuerySchema.safeParse(req.query);
        if (!parseResult.success) {
          // get first error message.
        const message = parseResult.error.issues[0]?.message  ?? 'Invalid query';
            errorResponse(res, message , 400)
        }
        else {
            const params = parseResult.data as PaginationQuery;
            const {movies, ...rest} = await listMovies(params);
            successResponse(res, movies, 200, {...rest});
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
