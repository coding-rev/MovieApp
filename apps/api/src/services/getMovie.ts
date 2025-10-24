import { prisma } from "@/db/client";
import type { Movie } from '@prisma/client';

export async function getMovie(id: string): Promise<Movie | null> {
  return prisma.movie.findUnique({ where: { id } });
}
