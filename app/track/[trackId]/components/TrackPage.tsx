"use client";
import { getTrack } from "@/utils/fetchWebapi";
import { Track } from "@/utils/types";
import Image from "next/image";
import Heading from "@/components/Heading";
import React, { useEffect, useState } from "react";
interface TrackPageProps {
  trackId: string;
  session: any;
}
const TrackPage: React.FC<TrackPageProps> = ({ trackId, session }) => {
  const [track, setTrack] = useState<Track>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const tr = await getTrack(trackId, session.accessToken);
        setTrack(tr);
      } catch (e) {
        console.log(e);
      }
    })();
    setIsLoading(false);
  }, [trackId, session.accessToken]);
  if (isLoading) {
    return (
      <div className="flex h-[90vh] w-[90vw] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  } else if (track?.id === undefined) {
    return (
      <div className="flex h-[90vh] w-[90vw] items-center justify-center">
        <span className="text-2xl text-primary">Track not found</span>
      </div>
    );
  }
  return (
    <main className="m-10 flex w-[80vw] flex-col items-center justify-center border border-red-500">
      <section className="flex w-full flex-col items-center md:flex-row">
        <a
          href={track.external_urls.spotify}
          target="_blank"
          className="flex w-[50vw] sm:w-[40vw] lg:w-[30vw] xl:w-[20vw]"
        >
          <Image
            src={track.album.images[0].url}
            alt="album cover"
            width={track?.album.images[0].width}
            height={track?.album.images[0].height}
          />
        </a>
        <article className="m-10 flex flex-col space-y-3">
          <h2 className="text-2xl font-bold text-white">{track.name}</h2>
          <p className="font-semibold">
            {track.artists.map((artist, index) => (
              <a
                href={`${process.env.NEXT_PUBLIC_URL}/artist/${artist.id}`}
                key={artist.id}
                className="duration-200 hover:text-white"
              >
                {artist.name}
                {index !== track.artists.length - 1 ? ", " : ""}
              </a>
            ))}
          </p>
        </article>
      </section>
      <section className="mt-3 flex w-[75vw] flex-wrap justify-between md:mt-10">
        <div className="my-5 flex w-48 flex-col items-center justify-center border border-blue-500 md:w-[17vw]">
          <h5 className="text-xl font-bold text-white">
            {track.album.release_date}
          </h5>
          <p className="font-semibold">Release date</p>
        </div>
        <div className="my-5 flex w-48 flex-col items-center justify-center border border-blue-500 md:w-[17vw]">
          <h5 className="text-xl font-bold text-white">{`${Math.floor(
            track.duration_ms / 1000 / 60
          )}:${(track.duration_ms / 1000) % 60}`}</h5>
          <p className="font-semibold">Track length</p>
        </div>
        <div className="my-5 flex w-48 flex-col items-center justify-center border border-blue-500 md:w-[17vw]">
          <h5 className="text-xl font-bold text-white">
            {track.popularity / 10}
          </h5>
          <p className="font-semibold">0-10 Popularity</p>
        </div>
        <div className="my-5 flex w-48 flex-col items-center justify-center border border-blue-500 md:w-[17vw]">
          <h5 className="text-xl font-bold text-white">
            {track.explicit ? "Yes" : "No"}
          </h5>
          <p className="font-semibold">Explicit</p>
        </div>
      </section>
      <section className="flex w-full flex-col items-start justify-start">
        <Heading
          title="Appears on"
          description={`Albums featuring ${track.name}`}
          margin={false}
        />
        <a
          href={track.album.external_urls.spotify}
          target="_blank"
          className="mt-5 flex w-[40vw] sm:w-[30vw] lg:w-[20vw] xl:w-[10vw]"
        >
          <Image
            src={track.album.images[0].url}
            alt="album cover"
            width={track?.album.images[0].width}
            height={track?.album.images[0].height}
          />
        </a>
        <a href={track.album.external_urls.spotify} target="_blank">
          <p className="mt-3 text-white">{track.album.name}</p>
        </a>
      </section>
      <section className="flex w-full flex-col items-start justify-start">
        <Heading
          title="Audio Features"
          description="Audio features of the track"
          margin={false}
        />
      </section>
    </main>
  );
};

export default TrackPage;
