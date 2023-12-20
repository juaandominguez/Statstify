import { Track } from "@/types/types";
import React from "react";
interface Props {
  track: Track;
}
const TrackStats: React.FC<Props> = ({ track }) => {
  return (
    <section className="mt-3 flex w-[75vw] flex-wrap justify-between md:mt-10">
      <div className="mx-auto my-5 flex w-48 flex-col items-center justify-center md:mx-0 md:w-[17vw]">
        <h5 className="text-xl font-bold text-white">
          {track?.album?.release_date}
        </h5>
        <p className="font-semibold">Release date</p>
      </div>
      <div className="mx-auto my-5 flex w-48 flex-col items-center justify-center md:mx-0 md:w-[17vw]">
        <h5 className="text-xl font-bold text-white">{`${Math.floor(
          track?.duration_ms / 1000 / 60,
        )}:${Math.ceil((track?.duration_ms / 1000) % 60).toLocaleString(
          "en-US",
          {
            minimumIntegerDigits: 2,
            useGrouping: false,
          },
        )}`}</h5>
        <p className="font-semibold">Track length</p>
      </div>
      <div className="mx-auto my-5 flex w-48 flex-col items-center justify-center md:mx-0 md:w-[17vw]">
        <h5 className="text-xl font-bold text-white">
          {track?.popularity / 10}
        </h5>
        <p className="font-semibold">0-10 Popularity</p>
      </div>
      <div className="mx-auto my-5 flex w-48 flex-col items-center justify-center md:mx-0 md:w-[17vw]">
        <h5 className="text-xl font-bold text-white">
          {track?.explicit ? "Yes" : "No"}
        </h5>
        <p className="font-semibold">Explicit</p>
      </div>
    </section>
  );
};

export default TrackStats;
