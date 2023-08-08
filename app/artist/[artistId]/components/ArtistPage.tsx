"use client";
import React, { useEffect, useRef, useState } from "react";
import spotify from "@/public/assets/spotify.svg";
import { Album, SpecificArtist, Track } from "@/utils/types";
import {
  getArtist,
  getArtistTopAlbums,
  getArtistTopTracks,
  getRecommendedArtists,
} from "@/utils/fetchWebapi";
import Image from "next/image";
import Heading from "@/components/Heading";
import next from "@/public/assets/next.png";
import prev from "@/public/assets/prev.png";

interface TrackPageProps {
  artistId: string;
  session: any;
}
const ArtistPage: React.FC<TrackPageProps> = ({ artistId, session }) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [artist, setArtist] = useState<SpecificArtist>();
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topAlbums, setTopAlbums] = useState<Album[]>([]);
  const [recommendedArtists, setRecommendedArtists] = useState<
    SpecificArtist[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const topTracksRef = useRef<HTMLDivElement>(null);
  const topAlbumsRef = useRef<HTMLDivElement>(null);
  const recommendedArtistsRef = useRef<HTMLDivElement>(null);

  const handleNextClick = () => {
    if (topTracksRef.current) {
      const scrollAmount = windowWidth >= 900 ? 1000 : 200;
      topTracksRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handlePreviousClick = () => {
    if (topTracksRef.current) {
      const scrollAmount = windowWidth >= 900 ? 1000 : 200;
      topTracksRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleNextAlbumClick = () => {
    if (topAlbumsRef.current) {
      const scrollAmount = windowWidth >= 900 ? 1000 : 200;
      topAlbumsRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handlePreviousAlbumClick = () => {
    if (topAlbumsRef.current) {
      const scrollAmount = windowWidth >= 900 ? 1000 : 200;
      topAlbumsRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleNextArtistClick = () => {
    if (recommendedArtistsRef.current) {
      const scrollAmount = windowWidth >= 900 ? 1000 : 200;
      recommendedArtistsRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handlePreviousArtistClick = () => {
    if (recommendedArtistsRef.current) {
      const scrollAmount = windowWidth >= 900 ? 1000 : 200;
      recommendedArtistsRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

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
        const art = await getArtist(artistId, session.accessToken);
        setArtist(art);
        const tt = await getArtistTopTracks(artistId, session.accessToken);
        setTopTracks(tt);
        const ta = await getArtistTopAlbums(artistId, session.accessToken);
        setTopAlbums(ta);
        const ra = await getRecommendedArtists(artistId, session.accessToken);
        setRecommendedArtists(ra);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [artistId, session.accessToken]);
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
    <main className="m-10 flex w-[80vw] flex-col items-center justify-center">
      <section className="flex w-full flex-col items-center md:flex-row">
        <a
          href={artist.external_urls.spotify}
          target="_blank"
          className="flex w-[50vw] sm:w-[40vw] lg:w-[30vw] xl:w-[20vw]"
        >
          <Image
            priority
            src={artist.images[0].url}
            alt="album cover"
            width={artist.images[0].width}
            height={artist.images[0].height}
            className="rounded-xl"
          />
        </a>
        <article className="m-10 flex flex-col space-y-3">
          <h2 className="text-2xl font-bold text-white">{artist.name}</h2>
          <p className="font-semibold">
            {artist.followers.total.toLocaleString()} followers
          </p>
          <div className="h-8 w-8">
            <a href={artist.external_urls.spotify} target="_blank">
              <Image
                src={spotify}
                alt="Spotify"
                className="grayscale transition duration-300 hover:grayscale-0"
              />
            </a>
          </div>
        </article>
      </section>
      <section className="mt-3 flex w-[75vw] flex-wrap justify-center md:mt-10">
        <div className="mx-auto my-5 flex w-48 flex-col items-center justify-center md:mx-0 md:w-[17vw]">
          <h5 className="text-xl font-bold text-white">
            {artist.popularity / 10}
          </h5>
          <p className="font-semibold">0-10 Popularity</p>
        </div>
      </section>
      <section className="mt-3 flex w-full flex-col justify-start md:mt-10">
        <Heading
          title="Genres"
          description={`${artist.name} genres`}
          margin={false}
        />
        <article className="mt-3 flex flex-row overflow-x-hidden">
          {artist.genres.map((genre) => (
            <div key={genre} className="btn">
              {genre}
            </div>
          ))}
        </article>
      </section>
      <section className="flex w-full flex-col items-start justify-start">
        <Heading
          title="Top Tracks"
          description={`${artist.name} top tracks`}
          margin={false}
        />
        <article
          className="mt-6 flex w-full flex-row items-center gap-3 overflow-x-hidden"
          ref={topTracksRef}
        >
          {topTracks?.map((track) => (
            <div key={track.id} className="flex flex-col">
              <a
                className="h-[20vw] w-[20vw] lg:h-64 lg:w-64"
                href={`${process.env.NEXT_PUBLIC_URL}/track/${track.id}`}
              >
                <Image
                  src={track.album.images[0].url}
                  alt="album cover"
                  width={track?.album.images[0].width}
                  height={track?.album.images[0].height}
                />
              </a>
              <h4 className="mt-2 line-clamp-1 max-w-[20vw] text-xs font-semibold text-white md:text-base">
                {track.name}
              </h4>
              <p className="line-clamp-1 max-w-[20vw] text-xs font-semibold text-gray-400 md:text-base">
                {track.artists.map((artist, index) => (
                  <a
                    href={`${process.env.NEXT_PUBLIC_URL}/artist/${artist.id}`}
                    className="cursor-pointer transition duration-200 hover:text-white"
                    key={artist.id}
                  >{`${artist.name}${
                    index !== track.artists.length - 1 ? ", " : ""
                  }`}</a>
                ))}
              </p>
            </div>
          ))}
          <button
            className="btn absolute right-[11vw] mb-10 h-3 w-12 rounded-full md:mb-[2.5vw] md:h-5 md:w-16"
            onClick={handleNextClick}
          >
            <Image
              src={next.src}
              alt="Next"
              width={next.width}
              height={next.height}
            />
          </button>
          <button
            className="btn absolute left-[11vw] mb-10 h-3 w-12 rounded-full md:mb-[2.5vw] md:h-5 md:w-16"
            onClick={handlePreviousClick}
          >
            <Image
              src={prev.src}
              alt="Previous"
              width={prev.width}
              height={prev.height}
            />
          </button>
        </article>
      </section>
      <section className="flex w-full flex-col items-start justify-start">
        <Heading
          title="Top albums"
          description={`${artist.name} top albums`}
          margin={false}
        />
        <article
          className="mt-6 flex w-full flex-row items-center gap-3 overflow-x-hidden"
          ref={topAlbumsRef}
        >
          {topAlbums?.map((album) => (
            <div key={album.id} className="flex flex-col">
              <a
                className="h-[20vw] w-[20vw] lg:h-64 lg:w-64"
                href={album.external_urls.spotify}
                target="_blank"
              >
                <Image
                  src={album.images[0].url}
                  alt="album cover"
                  width={album.images[0].width}
                  height={album.images[0].height}
                />
              </a>
              <h4 className="mt-2 line-clamp-1 max-w-[20vw] font-semibold text-white">
                {album.name}
              </h4>
              <p className="line-clamp-1 max-w-[20vw] text-xs font-semibold text-gray-400 md:text-base">
                {album.artists.map((artist, index) => (
                  <a
                    href={`${process.env.NEXT_PUBLIC_URL}/artist/${artist.id}`}
                    className="cursor-pointer transition duration-200 hover:text-white"
                    key={artist.id}
                  >{`${artist.name}${
                    index !== album.artists.length - 1 ? ", " : ""
                  }`}</a>
                ))}
              </p>
            </div>
          ))}
          <button
            className="btn absolute right-[11vw] mb-10 h-3 w-12 rounded-full md:mb-[2.5vw] md:h-5 md:w-16"
            onClick={handleNextAlbumClick}
          >
            <Image
              src={next.src}
              alt="Next"
              width={next.width}
              height={next.height}
            />
          </button>
          <button
            className="btn absolute left-[11vw] mb-10 h-3 w-12 rounded-full md:mb-[2.5vw] md:h-5 md:w-16"
            onClick={handlePreviousAlbumClick}
          >
            <Image
              src={prev.src}
              alt="Previous"
              width={prev.width}
              height={prev.height}
            />
          </button>
        </article>
      </section>
      <section className="flex w-full flex-col items-start justify-start">
        <Heading
          title="Recommended artists"
          description={`Artists similar to ${artist.name}`}
          margin={false}
        />
        <article
          className="mt-6 flex w-full flex-row items-center gap-3 overflow-x-hidden"
          ref={recommendedArtistsRef}
        >
          {recommendedArtists?.map((artist) => (
            <div key={artist.id} className="flex flex-col">
              <a
                className="h-[20vw] w-[20vw] rounded-xl lg:h-64 lg:w-64"
                href={`${process.env.NEXT_PUBLIC_URL}/artist/${artist.id}`}
              >
                <div className="aspect-square">
                  <Image
                    src={artist.images[0].url}
                    alt="album cover"
                    width={artist.images[0].width}
                    height={artist.images[0].height}
                    className="h-full w-full rounded-xl object-cover"
                  />
                </div>
              </a>
              <h4 className="mt-2 line-clamp-1 max-w-[20vw] font-semibold text-white">
                {artist.name}
              </h4>
            </div>
          ))}
          <button
            className="btn absolute right-[11vw] mb-10 h-3 w-12 rounded-full md:mb-[2.5vw] md:h-5 md:w-16"
            onClick={handleNextArtistClick}
          >
            <Image
              src={next.src}
              alt="Next"
              width={next.width}
              height={next.height}
            />
          </button>
          <button
            className="btn absolute left-[11vw] mb-10 h-3 w-12 rounded-full md:mb-[2.5vw] md:h-5 md:w-16"
            onClick={handlePreviousArtistClick}
          >
            <Image
              src={prev.src}
              alt="Previous"
              width={prev.width}
              height={prev.height}
            />
          </button>
        </article>
      </section>
    </main>
  );
};

export default ArtistPage;
