import { prisma } from "@/db/client";

const listMovies = async (q: any, page: number, pageSize: number) => {
    const where = q
        ? { title: { contains: q, mode: "insensitive" as const } }
        : undefined;

    const movies = await prisma.movie.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { title: "asc" }
    });
    return movies;
};

export { listMovies };
