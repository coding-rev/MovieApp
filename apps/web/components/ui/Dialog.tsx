import React from 'react'

export default function Dialog({open, content, close}: {open: boolean, content: React.ReactNode, close: ()=>void}) {
    if(!open) return null;
    return (
        <div className="fixed size-full h-[100dvh] left-0 top-0 bg-black bg-opacity-80 flex items-center justify-center z-50 overflow-hidden">
            <section className="bg-white text-black max-h-[80dvh] rounded-lg p-6 flex flex-col z-10 min-w-[300px] min-h-[150px] overflow-y-auto">
                {content}
            </section>
            <div className="absolute size-full inset-0" onClick={close}></div>
        </div>
    )
}
