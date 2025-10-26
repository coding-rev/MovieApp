import React from 'react'

export default function LoadingSkeleton() {
  return (
    <div className='w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6'>
        {
            Array.from({ length: 10 }).map((_, index) => (
                <div className='w-full flex flex-col gap-3'>
                    <div className="w-full h-[200px] rounded-xl bg-gray-500 animate-pulse"/>
                    <aside className="flex flex-col gap-1 w-full">
                        <span className="flex items-center gap-4 justify-between">
                            <div className='w-full rounded-xl h-2 bg-gray-500 animate-pulse'/>
                            <div className='min-w-[100px] rounded-xl h-2 bg-gray-500 animate-pulse'/>
                        </span>
                        <div className='w-[50%] rounded-xl h-2 bg-gray-500 animate-pulse'/>
                        <div className='w-[25%] rounded-xl h-2 bg-gray-500 animate-pulse'/>
                    </aside>
                </div>
            ))
        }
    </div>
  )
}
