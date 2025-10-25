'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { routes } from '@/lib/routes';
import RatingBadge from '../ui/RatingBadge';

const sampleImages = [
    'https://i.pinimg.com/1200x/a6/cc/24/a6cc24918e5b8cfda24911d4624c5d96.jpg',
    'https://i.pinimg.com/1200x/27/fd/5b/27fd5bd6c72ea091d7fa99215a0481f1.jpg',
    'https://i.pinimg.com/736x/de/9e/75/de9e7579c3813dfcd7dd5df9060ad74f.jpg',
    'https://i.pinimg.com/736x/fd/0a/ad/fd0aadd04fe39c91c7cbd09020a0efd1.jpg',
    'https://i.pinimg.com/736x/c8/e7/88/c8e788d2f95c97d1d9dcdbac8c31549e.jpg'
]

const previewVideo = "https://cdn.pixabay.com/video/2022/02/12/107492-678970856_large.mp4";

export default function MovieCard({movie}:{movie:any}) {
    const router = useRouter();
    return <li onClick={()=>router.push(routes.moviesDetail(movie.id))} key={movie.id} className="rounded w-full flex flex-col gap-2">
            <div className="w-full h-[200px] rounded-xl overflow-hidden group relative cursor-pointer">
                <img 
                    src={movie?.thumbnail || sampleImages[Math.floor(Math.random() * sampleImages.length)]} 
                    alt={movie.title} 
                    className="size-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out "
                />
            </div>
            <div className="flex flex-col w-full">
                <div className="flex items-baseline justify-between">
                    <h2 className="text-lg font-medium">{movie.title}</h2>
                    <span className="text-sm text-gray-400">{movie.year}</span>
                </div>
                <div className="mt-1 text-sm text-gray-300">{movie.genre}</div>
                <RatingBadge rating={movie.rating}/>
            </div>
        </li>
}
