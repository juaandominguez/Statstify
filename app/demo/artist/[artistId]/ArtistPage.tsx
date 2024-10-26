"use client";
import React, { useEffect, useState } from "react";
import { Album, SpecificArtist, Track } from "@/types/types";
import {
  getArtist,
  getArtistTopAlbums,
  getArtistTopTracks,
  getRecommendedArtists,
} from "@/utils/fetchStubApi";
import Heading from "@/components/Heading";
import ArtistMain from "@/app/artist/[artistId]/components/ArtistMain";
import TrackCarrousel from "@/components/carrousels/TrackCarrousel";
import ArtistInfo from "@/app/artist/[artistId]/components/ArtistInfo";
import AlbumCarrousel from "@/components/carrousels/AlbumCarrousel";
import ArtistCarrousel from "@/components/carrousels/ArtistCarrousel";
const ArtistPage = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [artist, setArtist] = useState<SpecificArtist>();
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topAlbums, setTopAlbums] = useState<Album[]>([]);
  const [recommendedArtists, setRecommendedArtists] = useState<
    SpecificArtist[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        await Promise.all([
          getArtist(),
          getArtistTopTracks(),
          getArtistTopAlbums(),
          getRecommendedArtists(),
        ]).then(([artist, topTracks, topAlbums, recommendedArtists]) => {
          setArtist(artist);
          setTopTracks(topTracks);
          setTopAlbums(topAlbums);
          setRecommendedArtists(recommendedArtists);
        });
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  if (isLoading) {
    return (
      <div className="flex h-[90vh] w-[90vw] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  } else if (artist?.id === undefined) {
    return (
      <div className="flex h-[90vh] w-[90vw] items-center justify-center">
        <span className="text-2xl text-primary">Artist not found</span>
      </div>
    );
  }
  return (
    <article className="m-10 flex w-[80vw] flex-col items-center justify-center">
      <ArtistMain artist={artist} />
      <ArtistInfo artist={artist} />
      <section className="flex w-full flex-col items-start justify-start">
        <Heading
          title="Top Tracks"
          description={`${artist?.name} top tracks`}
          margin={false}
        />
        <TrackCarrousel windowWidth={windowWidth} tracks={topTracks} />
      </section>
      <section className="flex w-full flex-col items-start justify-start">
        <Heading
          title="Top albums"
          description={`${artist?.name} top albums`}
          margin={false}
        />
        <AlbumCarrousel windowWidth={windowWidth} albums={topAlbums} />
      </section>
      <section className="flex w-full flex-col items-start justify-start">
        <Heading
          title="Recommended artists"
          description={`Artists similar to ${artist?.name}`}
          margin={false}
        />
        <ArtistCarrousel
          windowWidth={windowWidth}
          artists={recommendedArtists}
        />
      </section>
    </article>
  );
};

export default ArtistPage;
