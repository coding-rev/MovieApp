import { prisma, Prisma } from "@/db/client";
import {  PaginationQuery } from "@full-stack-interview/types";


const listMovies = async (params: PaginationQuery) => {

    const { page, pageSize, minRating, minYear, maxYear, genre, q, sortBy, order } = params; 

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

    // Get total count and movies in parallel
    const [total, movies] = await Promise.all([
        prisma.movie.count({ where }),
        prisma.movie.findMany({
            where,
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { [validateSortedBy]: validatedOrder }
    })

    ]);

    const totalPages = Math.ceil(total / pageSize);

    return {
        movies,
        total,
        totalPages,
        page,
        pageSize
    };;
};

export { listMovies };
