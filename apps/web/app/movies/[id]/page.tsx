'use client';

import { useMovies } from '@/hooks/Queries/useMovies';
import { useParams } from 'next/navigation';
import React from 'react'
import Link from 'next/link';
import { Bell, ChevronDown, Star, Trash } from 'lucide-react';
import Dialog from '@/components/ui/Dialog';
import UpdateMovie from './Includes/UpdateMovie';
import { toast } from 'react-hot-toast';
import Header from '@/components/common/Header';

export default function MoviesDetails() {
    const params = useParams();
    const movieId = params.id as string;

    const { getMovie, deleteMovie } = useMovies();
    const { data: movie, isLoading, error, refetch } = getMovie(movieId);
    const [deleteState, setDeleteState] = React.useState<any>(null)
    const [update, setUpdate] = React.useState<any>(null)

    const handleDelete = () => {
        deleteMovie.mutate(movieId, {
            onSuccess: () => {
                toast.success('Movie deleted successfully');
                setDeleteState(null);
                window.history.back();
            }
        });
    }

    if (isLoading) return <p>Loading movies...</p>;
    if (error) return <p>Failed to load movies.</p>;
    return (<>
        <UpdateMovie movie={movie} open={update} close={(fetch?:boolean)=>{
            setUpdate(null);
            if(fetch) refetch();
        }} />
        <Dialog open={!!deleteState} close={()=>setDeleteState(null)} content={<div className={`w-full flex flex-col items-center gap-5`}>
            <aside className="flex flex-col items-center gap-2">
                <div className="size-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center">
                    <Trash className="size-6"/>
                </div>
                <h2 className="text-2xl font-bold">Delete Movie</h2>
            </aside>
            <p>Are you sure you want to delete the movie <b>{deleteState?.title}</b>? This action cannot be undone.</p>
            <div className="w-full flex items-center justify-end gap-4">
                <button onClick={()=>setDeleteState(null)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button onClick={()=>handleDelete()} className="px-4 py-2 bg-red-600 text-white rounded-lg">{deleteMovie.isPending ? 'Deleting...' : 'Delete'}</button>
            </div>
        </div>} />

        <div className='w-full flex flex-col items-center'>
            <Header/>
            <section className="w-full flex flex-col gap-4">
                <div className="w-full flex items-center justify-between gap-3 py-3">
                    <button onClick={()=>window.history.back()} className="flex items-center gap-2 h-10">
                        <span className="text-sm">← Back to Movies</span>
                    </button>
                    <div className='flex items-center gap-4'>
                        <button onClick={()=>setUpdate(true)}className="flex items-center gap-2 h-9 px-3 h-10 border rounded-xl">
                            <Star className="size-4"/>
                            <span className="text-sm">Update</span>
                        </button>
                        <button onClick={()=>setDeleteState(movie)} className="flex items-center gap-2 h-9 px-3 h-10 border rounded-xl">
                            <Trash className="size-4"/>
                            <span className="text-sm">Delete</span>
                        </button>
                    </div>
                </div>
                <div className="w-full h-[70dvh] overflow-hidden rounded-xl relative">
                    <div className="flex items-end justify-between w-full py-4">
                        <span className="flex flex-col">
                            <h1 className="text-3xl font-bold">{movie?.title}</h1>
                            <p className="text- text-white/80">{movie?.year} - {movie?.genre}</p>
                        </span>
                        <span className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                            ⭐️
                            <span className="text-sm">{movie?.rating}/10</span>
                        </span>
                    </div>
                    {
                        (movie?.thumbnail ?? '') ? <img src={movie?.thumbnail} alt={movie?.title} className="size-full object-cover"/> : 
                        <video playsInline autoPlay loop src="https://cdn.pixabay.com/video/2021/01/07/61413-498529688_large.mp4" className="size-full object-cover"></video>
                    }
                </div>
            </section>
        </div>
    </>
    )
}
