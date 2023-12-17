import { Track } from "@/utils/types";
import React from "react";
import Heading from "@/components/Heading";

interface Props {
  tracks: Track[];
}

const AlbumTracks: React.FC<Props> = ({ tracks }) => {
  return (
    <section className="flex w-full flex-col items-start justify-start">
      <Heading title="Album content" description={`Tracks`} margin={false} />
      <article className="grid w-[100%] grid-cols-3">
        {tracks?.map((track, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-center"
          >
            <div className="m-5 flex w-60 flex-row justify-start">
              <p className="mr-5 text-lg font-semibold">{index + 1}.</p>
              <div className="flex flex-col">
                <p className="line-clamp-1 text-lg font-semibold text-white">
                  {track.name}
                </p>
                <p className="line-clamp-1 max-w-[20vw] text-xs font-semibold text-gray-400 md:text-base">
                  {track.artists.map((artist, index) => (
                    <a
                      href={`${process.env.NEXT_PUBLIC_URL}/artist/${artist.id}`}
                      className="cursor-pointer transition duration-200 hover:text-white"
                      key={artist.id}
                    >{`${artist.name}${
                      index !== track?.artists?.length - 1 ? ", " : ""
                    }`}</a>
                  ))}
                </p>
              </div>
            </div>
          </div>
        ))}
      </article>
    </section>
  );
};

export default AlbumTracks;
