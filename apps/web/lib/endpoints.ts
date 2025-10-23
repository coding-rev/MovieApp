export const ENDPOINTS = {
    movies: (filters?: string) => `/movies${filters ? `?${filters}` : ""}`,
    movie: (id: string) => `/movies/${id}`,
};