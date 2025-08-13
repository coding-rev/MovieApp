async function fetchMovies() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const res = await fetch(`${apiUrl}/api/movies?page=1&pageSize=12`, { next: { revalidate: 0 } });
  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }
  return res.json();
}

export default async function Page() {
  const { data } = await fetchMovies();
  return (
    <main>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((m: any) => (
          <li key={m.id} className="rounded border border-gray-700 p-4">
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-medium">{m.title}</h2>
              <span className="text-sm text-gray-400">{m.year}</span>
            </div>
            <div className="mt-1 text-sm text-gray-300">{m.genre}</div>
            <div className="mt-2 text-yellow-400">⭐ {m.rating}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
