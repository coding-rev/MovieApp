'use client';

import React from 'react';
import { Funnel } from 'lucide-react';
import { useMovies } from '@/hooks/Queries/useMovies';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Filters } from '@/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';

interface FiltersContextType {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  resetFilters: () => void;
}

const defaultFilters: Filters = {
  genre: '',
  minRating: '',
  minYear: '',
  maxYear: '',
  sortBy: 'title',
  order: 'asc',
};

export default function FilterBar({setFilterQuery}: {setFilterQuery: (query: string) => void}) {
  const [filters, setFilters] = React.useState<Filters>(defaultFilters);
  const router = useRouter();
  const searchParams = useSearchParams();
  const {getGenres} = useMovies();
  const {data: genres} = getGenres;

  const resetFilters = () => {
    setFilters(defaultFilters);
    router.push('/');
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(filters).forEach(([key, value]) => {
      if (value === '' || value === undefined || value === null) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    const finalQuery = params.toString();

    setFilterQuery(finalQuery ? `?${finalQuery}` : '');
    router.push(`/${finalQuery ? `?${finalQuery}` : ''}`);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]:
        name.includes('Rating') || name.includes('Year')
          ? value === '' ? '' : Number(value)
          : value,
    }));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition">
          <Funnel className="size-4" />
          <span className="text-sm">Filter</span>
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-[280px] space-y-4">
        {/* Genre */}
        <aside className="flex flex-col gap-1">
          <p className="text-sm font-medium">Genre</p>
          <select
            value={filters.genre}
            onChange={handleChange}
            name="genre"
            id="genre"
            className="w-full h-10 border rounded-lg bg-transparent px-2 text-sm"
          >
            <option value="">Select Genre</option>
            {genres?.map((genre:any) => (
              <option key={genre} value={genre} className='capitalize'>
                {genre}
              </option>
            ))}
          </select>
        </aside>

        {/* Year */}
        <aside className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <p className="text-sm font-medium">Min Year</p>
            <input
              type="number"
              name="minYear"
              value={filters.minYear}
              onChange={handleChange}
              className="w-full h-9 border rounded-lg bg-transparent px-2 text-sm"
              placeholder="2000"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Max Year</p>
            <input
              type="number"
              name="maxYear"
              value={filters.maxYear}
              onChange={handleChange}
              className="w-full h-9 border rounded-lg bg-transparent px-2 text-sm"
              placeholder="2025"
            />
          </div>
        </aside>

        <div className="flex-1">
            <p className="text-sm font-medium">Min Rating</p>
            <input
              type="number"
              name="minRating"
              value={filters.minRating}
              onChange={handleChange}
              min={0}
              max={10}
              className="w-full h-9 border rounded-lg bg-transparent px-2 text-sm"
              placeholder="0"
            />
          </div>

        {/* Sorting */}
        <aside className="flex flex-col gap-1">
          <p className="text-sm font-medium">Sort By</p>
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleChange}
            className="w-full h-10 border rounded-lg bg-transparent px-2 text-sm"
          >
            <option value="title">Title</option>
            <option value="year">Year</option>
            <option value="rating">Rating</option>
          </select>
        </aside>

        {/* Order */}
        <aside className="flex flex-col gap-1">
          <p className="text-sm font-medium">Order</p>
          <select
            name="order"
            value={filters.order}
            onChange={handleChange}
            className="w-full h-10 border rounded-lg bg-transparent px-2 text-sm"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </aside>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={resetFilters}
            className="flex-1 h-10 border border-gray-500 rounded-lg text-sm hover:bg-gray-100/10 transition"
          >
            Reset
          </button>
          <button
            onClick={applyFilters}
            className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
          >
            Apply
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
