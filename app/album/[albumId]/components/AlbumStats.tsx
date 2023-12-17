import { Album } from "@/utils/types";
import React from "react";
interface Props {
  album: Album;
}
const AlbumStats: React.FC<Props> = ({ album }) => {
  return (
    <section className="mt-3 flex w-[75vw] flex-wrap justify-between md:mt-10">
      <div className="mx-auto my-5 flex w-48 flex-col items-center justify-center md:mx-0 md:w-[17vw]">
        <h5 className="text-xl font-bold text-white">{album?.release_date}</h5>
        <p className="font-semibold">Release date</p>
      </div>
      <div className="mx-auto my-5 flex w-48 flex-col items-center justify-center md:mx-0 md:w-[17vw]">
        <h5 className="text-xl font-bold text-white">
          {album?.album_type.charAt(0).toUpperCase() +
            album?.album_type.slice(1)}
        </h5>
        <p className="font-semibold">Type of album</p>
      </div>
      <div className="mx-auto my-5 flex w-48 flex-col items-center justify-center md:mx-0 md:w-[17vw]">
        <h5 className="text-xl font-bold text-white">
          {album?.popularity / 10}
        </h5>
        <p className="font-semibold">0-10 Popularity</p>
      </div>
      <div className="mx-auto my-5 flex w-48 flex-col items-center justify-center md:mx-0 md:w-[17vw]">
        <h5 className="text-xl font-bold text-white">{album?.total_tracks}</h5>
        <p className="font-semibold">Tracks</p>
      </div>
    </section>
  );
};

export default AlbumStats;
