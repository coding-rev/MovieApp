'use client';

import React from 'react';
import { Grid, type CellComponentProps } from 'react-window';
import MovieCard from './MovieCard';
import { Movie } from '@/lib/types';

interface MovieGridProps {
    movies: Movie[];
    columnCount?: number;
}

function CellComponent({
    movies,
    columnIndex,
    rowIndex,
    style,
}: CellComponentProps<{ movies: Movie[] }>) {
    const { length } = movies;
    const movieIndex = rowIndex * 4 + columnIndex;
    if (movieIndex >= length) return null;

    const movie = movies[movieIndex];
    return (
        <div style={style} className="flex justify-center p-2">
        <MovieCard movie={movie} />
        </div>
    );
}

export default function MovieGrid({ movies, columnCount = 4 }: MovieGridProps) {
    const rowCount = Math.ceil(movies.length / columnCount);
    const columnWidth = 220;
    const rowHeight = 320;

    return (
        <div className="rounded-lg overflow-hidden h-[600px] w-full">
        <Grid
            cellComponent={CellComponent}
            cellProps={{ movies }}
            columnCount={columnCount}
            columnWidth={columnWidth}
            rowCount={rowCount}
            rowHeight={rowHeight}
            className="w-full h-full"
        />
        </div>
    );
}
