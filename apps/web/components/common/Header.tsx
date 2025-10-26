import React from 'react'
import Link from "next/link";
import { Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="w-[100dvw] flex items-center justify-between py-4">
        <span className=" xl:min-w-[220px]"><b className="text-4xl">Movies</b>app</span>

        <div className="w-fit flex justify-center">
          <section className="flex items-center justify-between gap-4 h-12 w-[300px] border border-gray-500 bg-black text-white/80 rounded-full px-6">
            <Link href="#" className="hover:text-white transition text-sm">Movies</Link>
            <Link href="#" className="hover:text-white transition text-sm">Series</Link>
            <Link href="#" className="hover:text-white transition text-sm">Originals</Link>
          </section>
        </div>

        <section className="flex items-center gap-3 xl:min-w-[220px] justify-end">
          {/* Notifications */}
          <button className="relative size-12 rounded-full backdrop-blur-sm bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition">
            <Bell className="size-4"/>
            <span className="absolute top-1 right-1 size-3 rounded-full bg-red-500 shadow-sm flex items-center justify-center">3</span>
          </button>

          {/* User Profile Picture */}
          <div className="size-12 rounded-full overflow-hidden overflow-hidden">
            <img src="https://avatars.githubusercontent.com/u/66572915?v=4" alt="User avatar" className="w-full h-full object-cover"/>
          </div>

          {/* Active User */}
          <div className="flex items-center gap-2">
            <span className="flex flex-col">
              <p className="text-sm">Emmanuel</p>
              <small className="text-xs">Premium</small>
            </span>
            {/* <ChevronDown className="size-4"/> */}
          </div>
        </section>
    </header>
  )
}
