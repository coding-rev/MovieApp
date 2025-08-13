import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto max-w-5xl px-4 py-8">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold">Movies</h1>
            <p className="text-sm text-gray-400">Minimal baseline for interview project</p>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
