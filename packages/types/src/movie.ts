import { z } from "zod";

export const MovieSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  year: z.number().int().min(1888),
  genre: z.string().min(1),
  rating: z.number().min(0).max(10)
});

export type Movie = z.infer<typeof MovieSchema>;
