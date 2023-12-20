import React from "react";
import Image from "next/image";
import spotify from "@/public/assets/spotify.svg";
import { SpecificArtist } from "@/types/types";
interface Props {
  artist: SpecificArtist;
}

const ArtistMain: React.FC<Props> = ({ artist }) => {
  return (
    <section className="flex w-full flex-col items-center md:flex-row">
      <a
        href={artist?.external_urls?.spotify}
        target="_blank"
        className="flex w-[50vw] sm:w-[40vw] lg:w-[30vw] xl:w-[20vw]"
      >
        <Image
          priority
          src={artist?.images[0]?.url}
          alt="Artist Image"
          width={artist?.images[0]?.width}
          height={artist?.images[0]?.height}
          className="rounded-xl"
        />
      </a>
      <div className="m-10 flex flex-col space-y-3">
        <h2 className="text-2xl font-bold text-white">{artist?.name}</h2>
        <p className="font-semibold">
          {artist?.followers?.total.toLocaleString()} followers
        </p>
        <div className="h-8 w-8">
          <a href={artist?.external_urls?.spotify} target="_blank">
            <Image
              src={spotify}
              alt="Spotify"
              className="grayscale transition duration-300 hover:grayscale-0"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ArtistMain;
