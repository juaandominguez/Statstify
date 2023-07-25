"use client";
import React, { useEffect, useState } from "react";
import TopTracks from "./TopTracks";
import Heading from "./Heading";
import TopGenres from "./TopGenres";
import getTopTracks from "@/utils/fetchWebapi";
import { Track } from "@/utils/types";
interface HomePageProps {
  session: any;
  timeRange: "short_term" | "medium_term" | "long_term";
}

const HomePage: React.FC<HomePageProps> = ({ session, timeRange }) => {
  const token = session.accessToken;
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  useEffect(() => {
    async function fetchTopTracks() {
      const tracks = await getTopTracks(token, timeRange);
      setTopTracks(tracks);
    }
    fetchTopTracks();
  }, []);

  useEffect(() => {
    async function fetchTopTracks() {
      const tracks = await getTopTracks(token, timeRange);
      setTopTracks(tracks);
    }
    fetchTopTracks();
  }, [timeRange]);

  return (
    <div className="mt-10">
      <Heading
        title="Top Tracks"
        description={`Your top tracks ${timeRange === "short_term"
          ? "of the last month"
          : timeRange === "medium_term"
            ? "of the last 6 months"
            : ""
          }`}
      />
      <TopTracks topTracks={topTracks} />
      <Heading
        title="Top Genres"
        description={`Your top genres ${timeRange === "short_term"
          ? "of the last month"
          : timeRange === "medium_term"
            ? "of the last 6 months"
            : ""
          }`}
      />
      <TopGenres topTracks={topTracks} session={session} />
    </div>
  );
};

export default HomePage;
