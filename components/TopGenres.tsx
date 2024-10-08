"use client";
import { SpecificArtist } from "@/types/types";
import React, { useState, useEffect } from "react";

interface TopGenreProps {
  topArtists: SpecificArtist[];
}
interface Genre {
  name: string;
  count: number;
}

const TopGenres: React.FC<TopGenreProps> = ({ topArtists }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  useEffect(() => {
    const countGenres = (genres: Genre[], genre: string) => {
      const index = genres.findIndex((g) => g.name === genre);
      if (index === -1) {
        genres.push({ name: genre, count: 1 });
      } else {
        genres[index].count++;
      }
    };

    const getTopGenres = () => {
      const genres: Genre[] = [];
      topArtists?.forEach((artist) => {
        artist.genres?.forEach((genre) => {
          countGenres(genres, genre);
        });
      });
      genres.sort((a, b) => (a.count > b.count ? -1 : 1));
      return genres;
    };

    setGenres(getTopGenres());
  }, [topArtists]);

  return (
    <>
      {genres.length > 0 ? (
        <div className="mt-6 flex w-full flex-grow flex-row items-center overflow-x-scroll px-12">
          {genres.map((genre) => (
            <div
              key={genre.name}
              className="btn mx-3 rounded-full px-5 py-3 font-semibold"
            >
              {genre.name}
            </div>
          ))}
        </div>
      ) : (
        <h2 className=" my-10 text-center text-xl">No genres found</h2>
      )}
    </>
  );
};

export default TopGenres;
