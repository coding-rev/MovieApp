'use client';

import MovieCard from "@/components/movies/MovieCard";
import MovieGrid from "@/components/movies/MovieGrid";
import Link from "next/link";
import { useMovies } from "@/hooks/Queries/useMovies";
import { Bell, ChevronDown, Play, Flame, Swords, Smile, Shrimp, VenusAndMars, Atom, Clipboard, ListFilter, Funnel, ChevronLeft, ChevronRight } from "lucide-react";
import ContentWrapper from "@/components/common/ContentWrapper";
import MovieListVisualization from '@/components/movies/MovieListVisualization';

export default function Page() {
  const { listMovies } = useMovies();
  const { data: movies, isLoading, error } = listMovies("page=1&pageSize=12");

  if (isLoading) return <p>Loading movies...</p>;
  if (error) return <p>Failed to load movies.</p>;

  console.log("Movie data:", movies);

  return (
    <ContentWrapper content={
      <main className="w-full flex flex-col gap-3 text-white">
      <header className="w-full flex items-center justify-between py-4">
        <span className="xl min-w-[220px]"><b className="text-4xl">Movies</b>app</span>

        <div className="w-full flex justify-center">
          <section className="flex items-center justify-between gap-4 h-12 w-[300px] border border-gray-500 bg-black text-white/80 rounded-full px-6">
            <Link href="#" className="hover:text-white transition text-sm">Movies</Link>
            <Link href="#" className="hover:text-white transition text-sm">Series</Link>
            <Link href="#" className="hover:text-white transition text-sm">Originals</Link>
          </section>
        </div>

        <section className="flex items-center gap-3 min-w-[220px] justify-end">
          {/* Notifications */}
          <button className="relative size-12 rounded-full backdrop-blur-sm bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition">
            <Bell className="size-4"/>
            <span className="absolute top-1 right-1 size-3 rounded-full bg-red-500 shadow-sm flex items-center justify-center">3</span>
          </button>

          {/* User Profile Picture */}
          <div className="size-12 rounded-full overflow-hidden overflow-hidden">
            <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="User avatar" className="w-full h-full object-cover"/>
          </div>

          {/* Active User */}
          <div className="flex items-center gap-2">
            <span className="flex flex-col">
              <p className="text-sm">Manuel.O</p>
              <small className="text-xs">Premium</small>
            </span>
            <ChevronDown className="size-4"/>
          </div>
        </section>
      </header>

      <section className="w-full flex gap-6">
        <div className="h-[400px] min-w-[500px] rounded-2xl relative overflow-hidden">
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
            [
              {
                genre: "Trending",
                icon: (props: any) => <Flame {...props} />
              },
              {
                genre: "Action",
                icon: (props: any) => <Swords {...props} />,
              },
              {
                genre: "Comedy",
                icon: (props: any) => <Smile {...props} />,
              },
              {
                genre: "Horror",
                icon: (props: any) => <Shrimp {...props} />,
              },
              {
                genre: "Romance",
                icon: (props: any) => <VenusAndMars {...props} />,
              },
              {
                genre: "Sci-Fi",
                icon: (props: any) => <Atom {...props} />,
              },
              {
                genre: "Drama",
                icon: (props: any) => <Clipboard {...props} />,
              }
            ].map((g, idx)=><button className="flex items-center gap-2 px-8 h-14 min-w-[150px] bg-white/10 text-white rounded-full hover:bg-white/20 transition" key={`genre-btn-${idx}`}>
              <g.icon className="size-5 mr-2"/>
              <span>{g.genre}</span>
            </button>)
          }
        </div>
      </section>

      <section className="w-full flex flex-col py-4 gap-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-semibold">Recommended Movies</h3>
            <div className="flex items-center gap-2">
              <span></span>
              <button className="size-10 rounded-full flex items-center justify-center bg-white/20 hover:bg-white hover:text-white">
                <ChevronLeft className="size-4"/>
              </button>
              <button className="size-10 rounded-full flex items-center justify-center bg-white/20 hover:bg-white hover:text-white">
                <ChevronRight className="size-4"/>
              </button>
              <span>1-50 out of 23,039</span>
            </div>
          </div>
          <div className="rounded-full h-12 bg-black px-6 flex items-center gap-4 text-sm border">
            <button><ListFilter className="size-4"/></button>
            Filter
            <button><Funnel className="size-4"/></button>
          </div>
        </div>
      </section>

      
      {/* <MovieGrid >
        {movies?.map((m) => (
          <MovieCard key={`movie-${m.id}`} movie={movies} />
        ))}
      </MovieGrid> */}
      <MovieListVisualization movies={movies || []} columnCount={5} />
    </main>
    }/>
  );
}
