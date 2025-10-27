import { prisma, Prisma } from "@/db/client";
import {  PaginationQuery } from "@full-stack-interview/types";


const listMovies = async (params: PaginationQuery) => {

    const { page, pageSize, minRating, minYear, maxYear, genre, q, sortBy = 'title', order = 'asc' } = params; 

    const where: Prisma.MovieWhereInput = {
       ...(q && {
        title: { contains: q }
       }),
       ...(genre && {
        genre: { contains: genre }
       }),
       ...(minRating) && {
        rating: {
            gte: minRating
        }
       }
    }

    if (minYear && maxYear) {
        where.year =  { gte: minYear, lte: maxYear };
    }
    else if (minYear) {
        where.year = { gte: minYear}
    }
    else if (maxYear) {
        where.year = { lte: maxYear }
    }

    const validSortFields = ['title', 'year', 'rating'];
    const validateSortedBy = validSortFields.includes(sortBy) ? sortBy : 'title';
    const validatedOrder = order === 'desc' ? 'desc' : 'asc';
    const validatedPageSize = pageSize > 20 ? 20 : pageSize;

    // Get total count and movies in parallel
    const [total, movies] = await Promise.all([
        prisma.movie.count({ where }),
        prisma.movie.findMany({
            where,
            skip: (page - 1) * validatedPageSize,
            take: validatedPageSize,
            orderBy: { [validateSortedBy]: validatedOrder }
    })

    ]);

    const totalPages = Math.ceil(total / validatedPageSize);

    return {
        movies,
        total,
        totalPages,
        page,
        pageSize
    };;
};

export { listMovies };
