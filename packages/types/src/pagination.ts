import { z } from "zod";

export const PaginationQuerySchema = z.object({
  q: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(10)
});

export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;
