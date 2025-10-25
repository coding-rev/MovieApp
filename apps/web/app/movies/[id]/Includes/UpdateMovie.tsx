import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCcw } from "lucide-react";
import { useMovies } from "@/hooks/Queries/useMovies";
import Dialog from '@/components/ui/Dialog';
import { toast } from "react-hot-toast";
import { movieUpdateSchema, MovieUpdate } from '@full-stack-interview/types'


export default function UpdateMovie({open, movie, close}: {open:boolean, movie: any, close: (refetch?:boolean)=>void}) {
    const {updateMovie} = useMovies();
    const params = useParams();
  const [thumbnailPreview, setThumbnailPreview] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<MovieUpdate>({
    resolver: zodResolver(movieUpdateSchema),
    defaultValues: {
      title: movie?.title || "",
      genre: movie?.genre || "",
      year: movie?.year || new Date().getFullYear(),
      rating: movie?.rating || 0,
      thumbnail: movie?.thumbnail || "",
    },
  });

  // Watch thumbnail field for preview updates
  const thumbnailValue = watch("thumbnail");
  React.useEffect(() => {
    if (thumbnailValue) {
      setThumbnailPreview(thumbnailValue);
    }
  }, [thumbnailValue]);

  const onSubmit: SubmitHandler<MovieUpdate> = (data) => {
    console.log("Form Data:", data);
    updateMovie.mutate({id:params.id as string, input:data}, {
      onSuccess: ()=>{
        reset();
        setThumbnailPreview("");
        toast.success("Movie updated successfully!");
        close(true);
      },onError: (err)=>{
        toast.error("Failed to update movie.");
        console.log("Update Error:", err);
      }
    });
  };



    return <Dialog open={!!open} close={close} content={<div className='w-[500px] max-w-lg p-6 flex flex-col gap-4'>
        <h2 className='text-2xl font-bold'>Update Movie - {movie?.title}</h2>
        <p></p>
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
              className="w-full h-10 border text-black px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full h-10 border text-black px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full h-10 border text-black px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full h-10 border text-black px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full h-10 border text-black px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            {updateMovie.isPending ? "Updating..." : "Update Movie"}
          </button>
        </form>
    </div>} />
}
