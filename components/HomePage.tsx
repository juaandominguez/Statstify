"use client";
import React, { use, useEffect, useState } from "react";
import TopTracks from "./TopTracks";
import Heading from "./Heading";
import TopGenres from "./TopGenres";
import { Item, SpecificArtist, Track } from "@/utils/types";
import TopArtists from "./TopArtists";
import RecentlyPlayed from "./RecentlyPlayed";
import { getTopTracks, getTopArtists, getRecentlyPlayed } from "@/utils/fetchWebapi";
import { TimeRange } from "@/utils/types";
interface HomePageProps {
  session: any;
  timeRange: TimeRange
}

const HomePage: React.FC<HomePageProps> = ({ session, timeRange }) => {
  const token = session.accessToken;
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<SpecificArtist[]>([]);
  const [recentTracks, setTracks] = useState<Item[]>([]);

  async function fetchTopTracks() {
    const tracks = await getTopTracks(token, timeRange);
    setTopTracks(tracks);
  }
  async function fetchTopArtists() {
    const tracks = await getTopArtists(token, timeRange);
    setTopArtists(tracks);
  }
  async function fetchRecentTracks() {
    const tracks = await getRecentlyPlayed(token);
    setTracks(tracks);
  }

  useEffect(() => {
    fetchTopTracks();
    fetchTopArtists();
  }, [timeRange]);
  useEffect(() => {
    fetchRecentTracks();
  }, [])

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
      <TopGenres topArtists={topArtists} />
      <Heading
        title="Top Artists"
        description={`Your top artists ${timeRange === "short_term"
          ? "of the last month"
          : timeRange === "medium_term"
            ? "of the last 6 months"
            : ""
          }`}
      />
      <TopArtists topArtists={topArtists} />
      <Heading
        title="Recently Played songs"
        description={`Your recently played songs`}
      />
      <RecentlyPlayed recentTracks={recentTracks} />
    </div>
  );
};

export default HomePage;
