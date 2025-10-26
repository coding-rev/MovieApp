'use client';

import React from "react";
import { useMovies } from "@/hooks/Queries/useMovies";
import { ChevronDown, Play, ListFilter, Funnel, ChevronLeft, ChevronRight } from "lucide-react";
import ContentWrapper from "@/components/common/ContentWrapper";
import MovieGrid from '@/components/movies/MovieGrid';
import Header from "@/components/common/Header";
import FilterBar from "@/components/movies/FilterBar";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";
import { useSearchParams } from 'next/navigation';
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import useMain from "@/hooks/useMain";


export default function Page() {
  const {innerwidth} = useMain()
  const { listMovies, getGenres } = useMovies();
  const searchParams = useSearchParams();
  const [filterQuery, setFilterQuery] = React.useState<string>('page=1&pageSize=12');
  const { data, isLoading, error, refetch } = listMovies(filterQuery);
  const { data: genres } = getGenres;
  const [movies, setMovies] = React.useState<any>(null);

  React.useEffect(() => {
    if (data) {
      setMovies(data?.data ?? []);
    }
  }, [data]);
  
React.useEffect(() => {
  // Make a copy of searchParams so we can mutate it
  const params = new URLSearchParams(searchParams.toString());

  // Add defaults if missing
  if (!params.has("page")) params.set("page", "1");
  if (!params.has("pageSize")) params.set("pageSize", "15");

  // Convert back to query string
  const finalQuery = params.toString() ? `&${params.toString()}` : "";

  // Update filterQuery
  setFilterQuery(finalQuery);
}, [searchParams]);


  React.useEffect(() => {
    refetch();
  }, [filterQuery]);


  if (isLoading) return <p>Loading movies...</p>;
  if (error) return <p>Failed to load movies.</p>;
  return (
    <ContentWrapper content={
      <main className="w-full flex flex-col gap-3 text-white">
      <Header/>

      <section className="w-full flex lg:flex-row flex-col gap-6 px-5 lg:px-0">
        <div className="h-[400px] lg:w-auto w-full min-w-full lg:min-w-[500px] rounded-2xl relative overflow-hidden">
          <div className="absolute size-full top-0 left-0">
            <img src="https://veredneta.com/wp-content/uploads/2022/10/Peaky-Blinders-Header-1024x576.webp" alt="" className="size-full object-cover" />
          </div>
          <div className="relative size-full p-6 flex flex-col justify-center gap-7 bg-gradient-to-br from-black z-10">
            <div className="flex flex-col">
              <h2 className="text-4xl font-bold mb-2 w-[70%]">Peaky Blinders: The Rise</h2>
              <p className="text-white/80 text-sm w-[70%]">Follow Tommy Shelby and the notorious Peaky Blinders gang as they rise to power in post-WWI Birmingham. A tale of ambition, family loyalty, and the price of success.</p>
            </div>
            <span className="flex items-center">
              <button className="size-10 rounded-full bg-black shadow tex-white flex items-center justify-center hover:bg-white transitio">
                <Play className="size-4 ml-1"/>
              </button>
              <span className="ml-4">Let Play Moview</span>
            </span>
          </div>
        </div>
        <div className="h-[400px] w-full rounded-2xl relative overflow-hidden">
          <div className="absolute size-full flex flex-col bg-gradient-to-br from-black">
            <div className="absolute size-full top-0 left-0">
              <video muted playsInline autoPlay loop src="https://cdn.pixabay.com/video/2022/07/12/123938-729425659_large.mp4" className="size-full object-cover" />
            </div>
            <div className="relative size-full p-6 flex flex-col justify-center gap-7 bg-gradient-to-br from-black z-10">
              <div className="flex flex-col">
          <h2 className="text-4xl font-bold mb-2 w-[70%]">Inception: Mind Heist</h2>
          <p className="text-white/80 text-sm w-[70%]">Dom Cobb is a skilled thief who enters people's dreams to steal their secrets. Now he must perform the impossible: inception - planting an idea instead of stealing one.</p>
              </div>
              <span className="flex items-center">
          <button className="size-10 rounded-full bg-black shadow tex-white flex items-center justify-center hover:bg-white transitio">
            <Play className="size-4 ml-1"/>
          </button>
          <span className="ml-4">Let Play Movie</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-2 py-5">
        <span className="flex items-center gap-2">View All <ChevronDown className="size-4"/></span>
        <div className="w-full flex items-center gap-4 overflow-x-auto py-2">
          {
            genres.map((g:any, idx:any)=><button className="flex items-center gap-2 px-8 h-14 text-nowrap  bg-white/10 text-white text-center rounded-full hover:bg-white/20 transition" key={`genre-btn-${idx}`}>
              {g||''}
            </button>)
          }
        </div>
      </section>

      <section className="w-full flex flex-col py-4 gap-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-semibold">Recommended Movies</h3>
            <Pagination total={data?.total || 0} totalPages={data?.totalPages || 0} page={data?.page ?? 1} pageSize={data?.pageSize ?? 5}/>
          </div>

          <aside className="flex items-center gap-4">
            <SearchInput/>
            <div className="rounded-full h-12 bg-black px-6 flex items-center gap-4 text-sm border">
              <button><ListFilter className="size-4"/></button>
              <FilterBar setFilterQuery={(query:string)=>{
                setFilterQuery(prev=>`${prev}&${query}`);
              }}/>
            </div>
          </aside>

        </div>
      </section>
      {
        isLoading ? <LoadingSkeleton/> : 
        <MovieGrid movies={movies || []} columnCount={
          innerWidth > 1200 ? 5 : 
          innerWidth > 992 ? 4 :
          innerWidth > 768 ? 3 :
          innerWidth > 576 ? 2 : 1
        } />
      }
    </main>
    }/>
  );
}
