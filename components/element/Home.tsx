"use client";

import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { MovieT } from "@/lib/types/HomeTypes";
import { useRouter } from "next/navigation";

const Home = () => {
  const [isInputShow, setIsInputShow] = useState(false);

  const [movie, setMovie] = useState<MovieT[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/movie/getall`
        );

        setMovie(response.data.movie);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchDetails();
  }, []);
  const router = useRouter();
  const handleRedirect = (id: number) => {
    router.push(`/tickets/${id}`);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="space-y-4 gap-2">
        <div>
          <h3 className="text-center">Movies</h3>
        </div>
        <div className="flex justify-start items-center">
          <Search onClick={() => setIsInputShow(!isInputShow)} />
          {isInputShow === true && (
            <input type="text" className=" p-1 border rounded-md" />
          )}
        </div>
        <div className="">
          <Tabs defaultValue="playing" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="playing">Now Playing</TabsTrigger>
              <TabsTrigger value="coming">Coming Soon</TabsTrigger>
            </TabsList>
            <TabsContent value="playing">
              {movie.map((movie: MovieT, id: number) => (
                <div
                  key={movie.id}
                  className="space-y-1"
                  onClick={() => handleRedirect(movie.id)}
                >
                  <img
                    src={`data:image/jpeg;base64,${movie.images}`}
                    alt={movie.title}
                    className="w-96 h-96 rounded cursor-pointer hover:opacity-80 transition"
                  />
                  <h3 className="hover:underline cursor-pointer">
                    {movie.title}
                  </h3>
                  <p>{movie.genre}</p>
                </div>
              ))}

              <div>
                <h3>Top Picks</h3>
                <div>
                  <div>Img</div>
                  <h3>All Of Us Are Dead</h3>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="coming">Change your password here.</TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Home;
