"use client";

import { useEffect, useState } from "react";
import { MovieT } from "@/lib/types/HomeTypes";
import axios from "axios";

const MovieDetails = ({ movieId }: { movieId: string }) => {
  const [movie, setMovie] = useState<MovieT | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/detail/show/${movieId}`
        );
        setMovie(res.data.alldetail);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="px-4">
      <div className="space-y-4">
        <div className="space-y-4 flex flex-col justify-start items-start">
          <img
            src={`data:image/jpeg;base64,${JSON.parse(movie.images)}`}
            alt={movie.title}
            className="w-full h-96 rounded"
          />
          <h1>{movie.title}</h1>
          <p>{movie.genre}</p>
          <p>{movie.description}</p>
        </div>
        <div className="flex flex-col justify-start items-start space-y-4">
          <h3>Showtimes</h3>
          <div className="flex justify-between items-center gap-4">
            <p className="bg-gray-800 p-3 rounded-2xl">
              {movie.period_of_time}
            </p>
            <p className="bg-gray-800 p-3 rounded-2xl">Tomorrow</p>
            <p className="bg-gray-800 p-3 rounded-2xl">Next Week</p>
          </div>
          <div className="flex justify-between items-center gap-4">
            <p className="bg-gray-800 p-3 rounded-2xl">{movie.first_time}</p>
            <p className="bg-gray-800 p-3 rounded-2xl">{movie.second_time}</p>
            <p className="bg-gray-800 p-3 rounded-2xl">{movie.third_time}</p>
            <p className="bg-gray-800 p-3 rounded-2xl">{movie.fourth_time}</p>
          </div>
        </div>
        <div className="pt-4 flex items-end justify-end">
          <button className="bg-blue-700 p-4 rounded-2xl">Book Tickets</button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
