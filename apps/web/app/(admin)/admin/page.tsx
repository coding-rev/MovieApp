"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCcw } from "lucide-react";
import { useMovies } from "@/hooks/Queries/useMovies";
import { MovieCreate, movieCreateSchema } from '@full-stack-interview/types'
import toast from "react-hot-toast";


export default function AdminPage() {
  const {createMovie} = useMovies();
  const [thumbnailPreview, setThumbnailPreview] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<MovieCreate>({
    resolver: zodResolver(movieCreateSchema),
  });

  // Watch thumbnail field for preview updates
  const thumbnailValue = watch("thumbnail");
  React.useEffect(() => {
    if (thumbnailValue) {
      setThumbnailPreview(thumbnailValue);
    }
  }, [thumbnailValue]);

  const onSubmit: SubmitHandler<MovieCreate> = (data) => {
    createMovie.mutate(data, {
      onSuccess: ()=>{
        reset();
        setThumbnailPreview("");
        toast.success("Movie created successfully!");
      }
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-8 py-10 text-white">
      {/* Header */}
      <section className="flex items-center justify-between text-center border-b pb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-400 text-sm">Manage and add new movies</p>
      </section>

      {/* Form Section */}
      <section className="rounded-lg w-full p-6 bg-transparent border border-gray-700">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-6" >
          {/* Thumbnail Preview */}
          {thumbnailPreview && (
            <div className="w-full overflow-hidden rounded-xl relative h-[200px] flex items-center justify-center border border-gray-600">
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="w-full h-full object-cover absolute top-0 left-0 z-10"
              />
              <div className="flex flex-col">
                <RefreshCcw className="size-4 animate-spin"/>
                <span className="text-white text-sm mt-2">Loading Preview...</span>
              </div>
            </div>
          )}

          {/* Thumbnail Input */}
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm font-medium">Thumbnail URL</label>
            <input
              type="url"
              {...register("thumbnail")}
              className="w-full h-10 bg-transparent text-white border border-white px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter thumbnail URL"
            />
            {errors.thumbnail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.thumbnail.message}
              </p>
            )}
          </div>

          {/* Title */}
          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              {...register("title")}
              className="w-full h-10 bg-transparent text-white border border-white px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter movie title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Genre */}
          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Genre</label>
            <input
              type="text"
              {...register("genre")}
              className="w-full h-10 bg-transparent text-white border border-white px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter movie genre"
            />
            {errors.genre && (
              <p className="text-red-500 text-sm mt-1">
                {errors.genre.message}
              </p>
            )}
          </div>

          {/* Rating */}
          <div className="w-full">
            <label className="block text-sm font-medium mb-1">
              Rating (0 - 10)
            </label>
            <input
              type="number"
              step="0.1"
              {...register("rating", { valueAsNumber: true })}
              className="w-full h-10 bg-transparent text-white border border-white px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter rating"
            />
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">
                {errors.rating.message}
              </p>
            )}
          </div>

          {/* Year */}
          <div className="w-full">
            <label className="block text-sm font-medium mb-1">Year</label>
            <input
              type="number"
              {...register("year", { valueAsNumber: true })}
              className="w-full h-10 bg-transparent text-white border border-white px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter release year"
            />
            {errors.year && (
              <p className="text-red-500 text-sm mt-1">
                {errors.year.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Movie
          </button>
        </form>
      </section>
    </div>
  );
}
