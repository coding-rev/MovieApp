import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          errors: err.errors.map(e => ({
            field: e.path[0],
            message: e.message,
          })),
        });
      }
      // fallback for unexpected errors
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
