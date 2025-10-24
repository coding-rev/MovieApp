import { prisma } from "@/db/client";

const listGenres = async () => {
    const genres = await prisma.movie.findMany({
        select: { genre: true },
        distinct: ["genre"]
    });
    return genres;
};

export { listGenres };
