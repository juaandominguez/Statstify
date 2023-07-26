"use client";
import { SpecificArtist, SpecificTrack, Track } from "@/utils/types";
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
  const getTopGenres = () => {
    const genres: Genre[] = [];
    {
      topArtists?.map((artist) => {
        artist.genres?.map((genre) => {
          const index = genres.findIndex((g) => g.name === genre);
          if (index === -1) {
            genres.push({ name: genre, count: 1 });
          } else {
            genres[index].count++;
          }
        });
      });
    }
    genres.sort((a, b) => {
      return a.count > b.count ? -1 : 1;
    });
    return genres;
  };
  useEffect(() => {
    setGenres(getTopGenres());
  }, [topArtists]);

  return (
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
  );
};

export default TopGenres;