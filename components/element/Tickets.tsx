"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { MapPin } from "lucide-react";
import { AllMovie, Movie } from "@/lib/types/TicketTypes";

const Tickets = () => {
  const [detail, setDetail] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/detail/getall`
        );

        setDetail(response.data.detail);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchDetails();
  }, []);
  return (
    <div className="flex justify-center items-center">
      <div className="space-y-4">
        <h2>The Midnight Bloom</h2>
        <div>
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="showtimes">Showtimes</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="showtimes">
              <div className="space-y-4">
                {detail.map((movie: any, index: number) => (
                  <div className="space-y-4" key={index}>
                    <h2>Today</h2>
                    <div className="flex justify-start items-center gap-4">
                      <MapPin
                        className="bg-gray-600 p-2 rounded-md"
                        size={40}
                      />
                      <div className="flex flex-col justify-center items-center">
                        <h3>{movie.cinema_name}</h3>
                        <h2>{movie.cinema_place}</h2>
                      </div>
                    </div>
                    <div className="flex flex-col justify-start space-y-4">
                      <div className="flex justify-between items-center">
                        <p>{movie.first_time}</p>
                        <p className="bg-gray-600 p-1 w-20 text-center rounded-2xl">
                          2D
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p>{movie.second_time}</p>
                        <p className="bg-gray-600 p-1 w-20 text-center rounded-2xl">
                          2D
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p>{movie.third_time}</p>
                        <p className="bg-gray-600 p-1 w-20 text-center rounded-2xl">
                          2D
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p>{movie.fourth_time}</p>
                        <p className="bg-gray-600 p-1 w-20 text-center rounded-2xl">
                          2D
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="details">hi</TabsContent>
            <TabsContent value="reviews">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
