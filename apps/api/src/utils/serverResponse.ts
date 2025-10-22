import { Response } from 'express';

interface Pagination {
  page?: number;
  pageSize?: number;
}

export const successResponse = <T>(
    res: Response, data?: T, code: number = 200,
    pagination?: Pagination
): Response => {

    return res.status(code).json({
        data: data ?? 'OK',
        success: true,
        ...(pagination ? { ...pagination } : {}),
    });
};

export const errorResponse = (res: Response, error: unknown, code: number = 500): Response => {
  const message = error && typeof error === 'object' && 'message' in error
      ? (error as { message: string }).message
      : error;

  return res.status(code).json({
    error: message,
    success: false,
  });
};
