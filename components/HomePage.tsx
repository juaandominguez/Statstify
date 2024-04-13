"use client";
import React, { useEffect, useState } from "react";
import TopTracks from "./TopTracks";
import Heading from "./Heading";
import TopGenres from "./TopGenres";
import { TimeRange, Item, SpecificArtist, Track } from "@/types/types";
import TopArtists from "./TopArtists";
import RecentlyPlayed from "./RecentlyPlayed";
import {
  getRecentlyPlayed,
  getTopTracks,
  getTopArtists,
} from "@/utils/fetchWebapi";
interface HomePageProps {
  session: any;
  timeRange: TimeRange;
}

const HomePage: React.FC<HomePageProps> = ({ session, timeRange }) => {
  const token = session.accessToken;
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<SpecificArtist[]>([]);
  const [recentTracks, setTracks] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async function getTop() {
      const topTracks = await getTopTracks(token, timeRange);
      setTopTracks(topTracks);
      const topArtists = await getTopArtists(token, timeRange);
      setTopArtists(topArtists);
      const recentlyPlayed = await getRecentlyPlayed(token);
      setTracks(recentlyPlayed);
      setIsLoading(false);
    })();
  }, [timeRange, token]);

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
    <div className="mt-10">
      <Heading
        title="Top Tracks"
        description={`Your top tracks ${getDescription()}`}
      />
      <TopTracks topTracks={topTracks} />
      <Heading
        title="Top Genres"
        description={`Your top genres ${getDescription()}`}
      />
      <TopGenres topArtists={topArtists} />
      <Heading
        title="Top Artists"
        description={`Your top artists ${getDescription()}`}
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
