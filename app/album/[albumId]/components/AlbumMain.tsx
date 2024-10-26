import React from "react";
import Image from "next/image";
import spotify from "@/public/assets/spotify.svg";
import { Album } from "@/types/types";
interface Props {
  album: Album;
  albumId: string;
  demo?: boolean;
}

const AlbumMain: React.FC<Props> = ({ album, albumId, demo = false }) => {
  return (
    <section className="flex w-full flex-col items-center md:flex-row">
      <a
        href={album?.external_urls?.spotify}
        target="_blank"
        className="flex w-[50vw] sm:w-[40vw] lg:w-[30vw] xl:w-[20vw]"
      >
        <Image
          priority
          src={album?.images[0]?.url}
          alt="album cover"
          width={album?.images[0]?.width}
          height={album?.images[0]?.height}
          className="rounded-xl"
        />
      </a>
      <div className="m-10 flex flex-col space-y-3">
        <h2 className="text-2xl font-bold text-white">{album?.name}</h2>
        <div className="flex flex-row">
          <div className="h-8 w-8">
            <a href={album?.external_urls?.spotify} target="_blank">
              <Image
                src={spotify}
                alt="Spotify"
                className="grayscale transition duration-300 hover:grayscale-0"
              />
            </a>
          </div>
          <a
            href={`${process.env.NEXT_PUBLIC_URL}/${demo ? "demo/" : ""}tierlist/album/${albumId}`}
            className=" my-auto ml-4 rounded-lg border px-4 py-1 text-center opacity-80 transition-all duration-300 hover:bg-[#A2A2A2]/20 hover:text-white"
          >
            Tierlist
          </a>
        </div>
      </div>
    </section>
  );
};

export default AlbumMain;
