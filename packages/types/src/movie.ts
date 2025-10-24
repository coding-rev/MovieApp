import { z } from "zod";

export const MovieSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  year: z.number().int().min(1888),
  genre: z.string().min(1),
  rating: z.number().min(0).max(10)
});

export type Movie = z.infer<typeof MovieSchema>;

const currentYear = new Date().getFullYear();

export const MovieQueryParamSchema = z.object({
  minRating: z.number().min(0).max(10).nullable().optional(),
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
  genre: z.string().min(1).nullable().optional()    
}).refine(data => {
  if (data.minYear && data.maxYear) {
    return data.minYear <= data.maxYear;
  }
  return true;
}, {
  message: 'Start year can not be greater than end year',
  path:  ['minYear']
});

export type MovieQueryParams = z.infer<typeof MovieQueryParamSchema>;

