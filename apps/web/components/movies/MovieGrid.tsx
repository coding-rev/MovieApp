'use client';

import React from 'react'

export default function MovieGrid({children}:{children: React.ReactNode}) {
  return (
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {children}
    </ul>
  )
}
