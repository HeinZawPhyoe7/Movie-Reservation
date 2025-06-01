"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MovieDetailT, MovieT } from "@/lib/types/HomeTypes";

const MovieDetails = ({ movieId }: { movieId: string }) => {
  const [movie, setMovie] = useState<MovieT | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/movie/show/${movieId}`
        );
        setMovie(res.data.showmovie);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovie();
  }, [movieId]);

  const handleRedirect = () => {
    router.push(`/booking/${movieId}`);
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="px-4">
      <div className="space-y-4">
        <div className="space-y-4 flex flex-col justify-start items-start">
          <img
            src={`data:image/jpeg;base64,${movie.images}`}
            alt={movie.title}
            className="w-full h-96 rounded"
          />
          <h1>{movie.title}</h1>
          <p>{movie.genre}</p>
          <p>{movie.description}</p>
        </div>

        <div className="pt-4 flex items-end justify-end">
          <button
            className="bg-blue-700 p-3 rounded-2xl"
            onClick={handleRedirect}
          >
            Book Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
