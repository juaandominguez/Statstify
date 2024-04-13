"use client";
import React, { useEffect, useState } from "react";
import TopTracks from "@/components/TopTracks";
import Heading from "@/components/Heading";
import TopGenres from "@/components/TopGenres";
import { Item, SpecificArtist, Track } from "@/types/types";
import TopArtists from "@/components/TopArtists";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import {
  getRecentlyPlayed,
  getTopTracks,
  getTopArtists,
} from "@/utils/fetchStubApi";
import { TimeRange } from "@/types/types";
interface HomePageProps {
  timeRange: TimeRange;
}

const HomePage: React.FC<HomePageProps> = ({ timeRange }) => {
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<SpecificArtist[]>([]);
  const [recentTracks, setTracks] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async function getTop() {
      // setIsLoading(true);
      const topTracks = await getTopTracks(timeRange);
      setTopTracks(topTracks);
      const topArtists = await getTopArtists(timeRange);
      setTopArtists(topArtists);
      const recentlyPlayed = await getRecentlyPlayed();
      setTracks(recentlyPlayed);
      setIsLoading(false);
    })();
  }, [timeRange]);

  if (isLoading) {
    return (
      <div className="flex h-[90dvh] w-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <Heading
        title="Top Tracks"
        description={`Your top tracks ${
          timeRange === "short_term"
            ? "of the last month"
            : timeRange === "medium_term"
              ? "of the last 6 months"
              : ""
        }`}
      />
      <TopTracks topTracks={topTracks} />
      <Heading
        title="Top Genres"
        description={`Your top genres ${
          timeRange === "short_term"
            ? "of the last month"
            : timeRange === "medium_term"
              ? "of the last 6 months"
              : ""
        }`}
      />
      <TopGenres topArtists={topArtists} />
      <Heading
        title="Top Artists"
        description={`Your top artists ${
          timeRange === "short_term"
            ? "of the last month"
            : timeRange === "medium_term"
              ? "of the last 6 months"
              : ""
        }`}
      />
      <TopArtists topArtists={topArtists} />
      <Heading
        title="Recent Streams"
        description={`Your recently played songs`}
      />
      <RecentlyPlayed recentTracks={recentTracks} />
    </div>
  );
};

export default HomePage;
