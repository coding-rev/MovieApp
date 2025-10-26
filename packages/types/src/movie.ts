import { z } from "zod";

const currentYear = new Date().getFullYear();

export const movieCreateSchema = z.object({
  title: z.string().nonempty("Movie title is required"),
  year: z
    .number()
    .int()
    .min(1800, "Year cannot be less than 1888")
    .max(new Date().getFullYear(), `Max year cannot be greater than ${currentYear}`),
  genre: z.string().nonempty("Movie genre is required"),
  rating: z.number().min(0, "Rating must be a number between 0 and 10").max(10, "Rating must be a number between 0 and 10"),
  thumbnail: z.string().url("Thumbnail must be a valid URL").optional(),
});

export type MovieCreate = z.infer<typeof movieCreateSchema>;

export const movieUpdateSchema = z.object({
  title: z.string().nonempty("Movie title cannot be empty").optional(),
  year: z
    .number()
    .int()
    .min(1800, "Year cannot be less than 1800")
    .max(new Date().getFullYear(), `Year cannot be greater than ${currentYear}`)
    .optional(),
  genre: z.string().nonempty("Movie genre cannot be empty").optional(),
  rating: z.number().min(0, "Rating must be a number between 0 and 10").max(10, "Rating must be a number between 0 and 10").optional(),
  thumbnail: z.string().url("Thumbnail must be a valid URL").optional()
});

export type MovieUpdate = z.infer<typeof movieUpdateSchema>;

export const MovieQueryParamSchema = z.object({
  minRating: z.number().min(0).max(10).nullable().optional(),
  minYear: z.coerce
  .number()
  .min(1888, `Min year cannot be less than 1888`)
  .max(currentYear, `Max year cannot be greater than ${currentYear}`)
  .nullable().optional(),
  maxYear: z.coerce
  .number()
  .min(1888, `Max year cannot be less than 1888`)
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

