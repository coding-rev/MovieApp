import React from 'react'

export default function RatingBadge({rating}:{rating:number}) {
  return (
    <div className="mt-2 text-yellow-400">⭐ {rating}</div>
  )
}
