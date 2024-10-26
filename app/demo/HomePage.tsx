"use client";
import React, { useEffect, useState } from "react";
import TopTracks from "@/components/TopTracks";
import Heading from "@/components/Heading";
import TopGenres from "@/components/TopGenres";
import { TimeRange, Item, SpecificArtist, Track } from "@/types/types";
import TopArtists from "@/components/TopArtists";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import {
  getRecentlyPlayed,
  getTopTracks,
  getTopArtists,
} from "@/utils/fetchStubApi";
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

  const getDescription = () => {
    if (timeRange === "short_term") {
      return "of the last month";
    } else if (timeRange === "medium_term") {
      return "of the last 6 months";
    } else {
      return "";
    }
  };

  return (
    <div className="mt-24">
      <Heading
        title="Top Tracks"
        description={`Your top tracks ${getDescription()}`}
      />
      <TopTracks topTracks={topTracks} demo={true} />
      <Heading
        title="Top Genres"
        description={`Your top genres ${getDescription()}`}
      />
      <TopGenres topArtists={topArtists} />
      <Heading
        title="Top Artists"
        description={`Your top artists ${getDescription()}`}
      />
      <TopArtists topArtists={topArtists} demo={true} />
      <Heading
        title="Recent Streams"
        description={`Your recently played songs`}
      />
      <RecentlyPlayed recentTracks={recentTracks} demo={true} />
    </div>
  );
};

export default HomePage;
