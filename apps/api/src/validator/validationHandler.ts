import expressValidator from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '@/utils/serverResponse';

const { validationResult } = expressValidator;

export const validationChecker = (req: Request, res: Response, next: NextFunction) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) return errorResponse(res, error.array());
    next();
  } catch (error) {
    return errorResponse(res, error);
  }
};
