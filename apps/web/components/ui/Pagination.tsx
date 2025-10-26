'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


type Props = {
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
};

export default function Pagination({ total, totalPages, page, pageSize }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(start + pageSize - 1, total);

  return (
    <div className="flex items-center justify-between mt-6">
        <Popover>
            <PopoverTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-white/10 transition">
                    Page Size: {pageSize}
                </button>
            </PopoverTrigger>

            <PopoverContent className="w-[280px] space-y-4">
                {[5, 10, 15, 20].map(size => (
                    <button
                        key={size}
                        onClick={() => {
                            const params = new URLSearchParams(searchParams.toString());
                            params.set('pageSize', size.toString());
                            params.set('page', '1'); // Reset to first page
                            router.push(`?${params.toString()}`, { scroll: false });
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-700 transition
                            ${pageSize === size ? 'bg-gray-800 font-medium' : ''}`}
                    >
                        {size}
                    </button>
                ))}
            </PopoverContent>
        </Popover>
      <span className="text-sm text-gray-400">
        Showing <strong>{start}</strong>–<strong>{end}</strong> of{' '}
        <strong>{total}</strong>
      </span>

      <div className="flex items-center gap-2">
        {/* Prev button */}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className={`size-9 rounded-full flex items-center justify-center border border-gray-600 transition
            ${page <= 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-700'}`}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </button>

        {/* Current page indicator */}
        <span className="text-sm font-medium">{page} / {totalPages}</span>

        {/* Next button */}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className={`size-9 rounded-full flex items-center justify-center border border-gray-600 transition
            ${page >= totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-700'}`}
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
