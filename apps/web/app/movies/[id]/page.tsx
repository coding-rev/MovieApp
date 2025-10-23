'use client';

import { useMovies } from '@/hooks/Queries/useMovies';
import { useParams } from 'next/navigation';
import React from 'react'

export default function MoviesDetails() {
    const params = useParams();
    const movieId = params.id as string;

    const { getMovie } = useMovies();
    const { data: movie, isLoading, error } = getMovie(movieId);

    if (isLoading) return <p>Loading movies...</p>;
    if (error) return <p>Failed to load movies.</p>;
    


    return (
        <div>
            <h1>MoviesDetails</h1>
            <p>{ movie?.title }</p>
        </div>
    )
}
