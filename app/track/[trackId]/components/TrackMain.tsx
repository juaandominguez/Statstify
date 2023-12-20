import { Track } from "@/types/types";
import React from "react";
import Image from "next/image";
import spotify from "@/public/assets/spotify.svg";
interface Props {
  track: Track;
}
const TrackMain: React.FC<Props> = ({ track }) => {
  return (
    <section className="flex w-full flex-col items-center md:flex-row">
      <a
        href={track?.external_urls?.spotify}
        target="_blank"
        className="flex w-[50vw] sm:w-[40vw] lg:w-[30vw] xl:w-[20vw]"
      >
        <Image
          priority
          src={track?.album?.images[0]?.url}
          alt="Track image"
          width={track?.album?.images[0]?.width}
          height={track?.album?.images[0]?.height}
        />
      </a>
      <article className="m-10 flex flex-col space-y-3">
        <h2 className="text-2xl font-bold text-white">{track?.name}</h2>
        <p className="font-semibold">
          {track?.artists?.map((artist, index) => (
            <a
              href={`${process.env.NEXT_PUBLIC_URL}/artist/${artist.id}`}
              key={artist.id}
              className="duration-200 hover:text-white"
            >
              {artist.name}
              {index !== track?.artists?.length - 1 ? ", " : ""}
            </a>
          ))}
        </p>
        <div className="h-8 w-8">
          <a href={track?.external_urls?.spotify} target="_blank">
            <Image
              src={spotify}
              alt="Spotify"
              className="grayscale transition duration-300 hover:grayscale-0"
            />
          </a>
        </div>
      </article>
    </section>
  );
};

export default TrackMain;
