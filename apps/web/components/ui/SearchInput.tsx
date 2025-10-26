'use client'

import React from 'react'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchInput() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = React.useState<string>('');

    React.useEffect(() => {
        const currentQuery = searchParams.get('q') || '';
        setSearchTerm(currentQuery);
    }, [searchParams]);

  // Debounce search updates
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (searchTerm.trim()) {
                params.set('q', searchTerm.trim());
            } else {
                params.delete('q');
            }
            router.push(`?${params.toString()}`, { scroll: false });
        }, 400);

        return () => clearTimeout(timeout);
    }, [searchTerm]);

    return <div className='flex items-center border rounded-full w-[250px] h-10 px-3 text-sm'>
        <Search className="size-4"/>
        <input value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} type="text" placeholder='Search...' className='w-full h-full outline-none ml-2 bg-transparent'/>
    </div>
}
