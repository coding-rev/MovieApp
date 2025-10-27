import { z } from "zod";

const currentYear = new Date().getFullYear();

export const PaginationQuerySchema = z.object({
  q: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10),
  minRating: z.coerce.number().min(0).max(10).nullable().optional(),
  minYear: z.coerce
  .number()
  .min(1888, `Min year cannot be lesser than 1888`)
  .max(currentYear, `Min year cannot be greater than ${currentYear}`)
  .nullable().optional(),
  maxYear: z.coerce
  .number()
  .min(1888, `Max year cannot be lesser than 1888`)
  .max(currentYear, `Max year cannot be greater than ${currentYear}`)
  .nullable().optional(),
  genre: z.string().min(1).nullable().optional()    ,
  sortBy: z.enum(['title', 'year', 'rating'], {
    invalid_type_error: 'Only title, year and rating can be sorted'
  }).default('title').optional(),
  order: z.enum(['asc', 'desc'], {
      invalid_type_error: 'only asc and desc ordering are supported'
  }).default('asc').optional()
}).refine(data => {
  if (data.minYear && data.maxYear) {
    return data.minYear <= data.maxYear;
  }
  return true;
}, {
  message: 'Start year can not be greater than end year',
  path:  ['minYear']
});

export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;
export {};

