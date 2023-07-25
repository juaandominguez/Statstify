"use client"
import { SpecificTrack, Track } from "@/utils/types";
import { access } from "fs";
import React, { useState, useEffect } from "react";

interface TopGenreProps {
  topTracks: Track[];
  session: any;
}
interface Genre {
  name: string;
  count: number;
}

const TopGenres: React.FC<TopGenreProps> = ({ topTracks, session }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const getTopGenres = async () => {
    try {
      const genres: Genre[] = [];
      await Promise.all(
        topTracks?.map(async (track) => {
          const res = await fetch(`https://api.spotify.com/v1/tracks/${track.id}?access_token=${session.accessToken}`)
          const data: SpecificTrack = await res.json();
          data?.album?.genres?.map((genre) => {
            const index = genres.findIndex((g) => (g.name === genre))
            if (index === -1) {
              genres.push({ name: genre, count: 1 });
            }
            else {
              genres[index].count++;
            }
          })
        })
      )
    }
    catch {
      console.log("TopGenres error fetch")
    }
    finally {
      return genres;
    }
  }
  useEffect(() => {
    getTopGenres().then((res) => {
      console.log(res)
      setGenres(res)
    });
  }, [topTracks]);

  return (
    <div className="flex w-full flex-grow flex-row overflow-x-scroll">
      {genres?.map((genre) => (
        <div key={genre.name}>{genre.name}</div>
      ))}
    </div>
  );
};

export default TopGenres;
