import React from 'react'

export default function ContentWrapper({content}:{content:React.ReactNode}) {
  return <div className={`xl:w-[1200px]`}>{content}</div>
}
