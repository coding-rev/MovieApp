export interface Movie {
  id: string;
  title: string;
  year: number;
  genre: string;
  rating: number;
}

export interface MovieInput {
  title: string;
  year: number;
  genre: string;
  rating: number;
  thumbnail?: string;
}

export interface MovieUpdateInput {
  title?: string;
  year?: number;
  genre?: string;
  rating?: number;
}

export interface ApiError {
  status: number;
  message: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export type MoviesResponse = ApiResponse<Movie[]>;

export type MovieResponse = ApiResponse<Movie>;
