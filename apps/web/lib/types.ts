// Movies
export interface Movie {
  id: string;
  title: string;
  year: number;
  genre: string;
  rating: number;
  thumbnail: string;
}

export interface MoviesResponse {
  data: Movie[];
  page: number;
  pageSize: number;
  success: boolean;
  total: number;
  totalPages: number;
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

// Filters
export interface Filters {
  genre: string;
  minRating: number | '';
  minYear: number | '';
  maxYear: number | '';
  sortBy: string;
  order: 'asc' | 'desc';
}

