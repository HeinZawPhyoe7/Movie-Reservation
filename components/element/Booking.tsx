"use client";

import { MovieDetailT } from "@/lib/types/HomeTypes";
import { Movie } from "@/lib/types/TicketTypes";
import axios from "axios";
import { MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";

const Booking = ({ movieId }: { movieId: string }) => {
  const [detail, setDetail] = useState<MovieDetailT[]>([]);
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/movie/show/${movieId}`
        );
        setMovie(res.data.alldetail);
      } catch (err) {
        console.error(err);
      }
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/movie/detail/getall`
        );

        setDetail(response.data.movie_details);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, [movieId]);

  return (
    <div className="space-y-4">
      {detail.map((d, index) => (
        <div className="space-y-4" key={index}>
          <div className="flex justify-start items-center">
            <h2>{d.period_time}</h2>,<h2 className="">{d.show_day}</h2>
          </div>
          <div className="flex justify-start items-center gap-4">
            <MapPin className="bg-gray-600 p-2 rounded-md" size={40} />
            <div className="flex flex-col justify-center items-center">
              <h3>{d.cinema_name}</h3>
              <h2>{d.cinema_place}</h2>
            </div>
          </div>
          <div className="flex flex-col justify-start space-y-4">
            <div className=" space-y-4">
              {d.time_list.map((time, id) => (
                <div
                  className="flex justify-between items-center"
                  key={time.id}
                >
                  <p>{time.time}</p>
                  <p className="bg-gray-600 p-1 w-20 text-center rounded-2xl">
                    {time.dimension}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Booking;
