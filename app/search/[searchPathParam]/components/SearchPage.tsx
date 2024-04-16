"use client";
import AlbumCarrousel from "@/components/carrousels/AlbumCarrousel";
import ArtistCarrousel from "@/components/carrousels/ArtistCarrousel";
import Heading from "@/components/Heading";
import TrackCarrousel from "@/components/carrousels/TrackCarrousel";
import { searchItems } from "@/utils/fetchWebapi";
import React, { useEffect, useState } from "react";
import PlaylistCarrousel from "@/components/carrousels/PlaylistCarrousel";
interface Props {
  searchPathParam: string;
  session: any;
}

const SearchPage: React.FC<Props> = ({ searchPathParam, session }) => {
  const [searchResults, setSearchResults] = useState<any>();
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const items = await searchItems(searchPathParam, session.accessToken);
        setSearchResults(items);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [searchPathParam, session.accessToken]);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[90vh] w-[90vw] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  } else if (searchResults?.tracks?.items?.length === 0) {
    return (
      <div className="flex h-[90vh] w-[90vw] items-center justify-center">
        <span className="text-2xl text-primary">Could not find tracks</span>
      </div>
    );
  }

  return (
    <article className="m-10 flex w-[80vw] flex-col items-center justify-center">
      <section className="flex w-full flex-col items-start justify-start">
        <Heading
          title="Tracks"
          description={`Tracks including ${searchPathParam}`}
          margin={false}
        />
        <TrackCarrousel
          windowWidth={windowWidth}
          tracks={searchResults?.tracks?.items}
        />
      </section>
      <section className="flex w-full flex-col items-start justify-start">
        <Heading
          title="Artists"
          description={`Artists including ${searchPathParam}`}
          margin={false}
        />
        <ArtistCarrousel
          windowWidth={windowWidth}
          artists={searchResults?.artists?.items}
        />
      </section>
      <section className="flex w-full flex-col items-start justify-start">
        <Heading
          title="Albums"
          description={`Albums including ${searchPathParam}`}
          margin={false}
        />
        <AlbumCarrousel
          windowWidth={windowWidth}
          albums={searchResults?.albums?.items}
        />
      </section>
      <section className="flex w-full flex-col items-start justify-start">
        <Heading
          title="Playlists"
          description={`Playlists including ${searchPathParam}`}
          margin={false}
        />
        <PlaylistCarrousel
          windowWidth={windowWidth}
          playlists={searchResults?.playlists?.items}
        />
      </section>
    </article>
  );
};

export default SearchPage;
