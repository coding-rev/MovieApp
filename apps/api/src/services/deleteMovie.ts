import { prisma } from "@/db/client";
import type { Movie } from '@prisma/client';

export async function deleteMovie(id: string): Promise<Movie> {
  return prisma.movie.delete({ where: { id } });
}
