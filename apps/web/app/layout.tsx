import "./globals.css";
import type { ReactNode } from "react";
import TanStackQueryClientProvider from "./provider";
import { env } from "@/lib/env";
import ToasterProvider from "./ToastProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TanStackQueryClientProvider>
          <div className="fixed top-0 left-0 w-full h-[100dvh] pointer-events-none -z-10">
            <img src="https://images.unsplash.com/photo-1706508097764-80b9b7ee4d88?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987" alt="backMovie" className="size-full object-cover"/>
          </div>
          <div className="w-full min-h-full mx-auto flex flex-col items-center px-[100px] py-8 backdrop-blur-sm bg-gray-950">
            {children}
          </div>
          <ToasterProvider/>
        </TanStackQueryClientProvider>
      </body>
    </html>
  );
}
