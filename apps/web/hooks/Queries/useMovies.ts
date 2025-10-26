'use client'

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import { MoviesResponse, Movie, MovieInput, MovieUpdateInput } from "@/lib/types";
import { ENDPOINTS } from "@/lib/endpoints";


export function useMovies() {
  const queryClient = useQueryClient();

  const listMovies = (filters?: string) =>
    useQuery<MoviesResponse>({
      queryKey: ["movies", filters ?? {}],
      queryFn: async () => {
        const res = await axiosInstance.get(ENDPOINTS.movies(filters));
        return res.data as MoviesResponse;
      },
    });

  const getMovie = (id: string) =>
    useQuery<Movie>({
      queryKey: ["movie", id],
      queryFn: async () => {
        const res = await axiosInstance.get(`/movies/${id}`);
        return res.data.data;
      },
    });

  const createMovie = useMutation({
    mutationFn: async (input: MovieInput) => {
      const res = await axiosInstance.post("/movies", input);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });

  const updateMovie = useMutation({
    mutationFn: async ({id, input,}: {id: string; input: MovieUpdateInput; }) => {
      const res = await axiosInstance.patch(`/movies/${id}`, input);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });

  const deleteMovie = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/movies/${id}`);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });

  const getGenres = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const res = await axiosInstance.get("/genres");
      return res.data.data;
    },
  });

  return {
    listMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie,
    getGenres,
  };
}
