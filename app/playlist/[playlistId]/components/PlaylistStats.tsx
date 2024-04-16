import { PlaylistCall } from "@/types/types";
import React from "react";
interface Props {
  playlist: PlaylistCall;
}
const PlaylistStats: React.FC<Props> = ({ playlist }) => {
  return (
    <section className="mt-3 flex w-[75vw] flex-wrap justify-between md:mt-10">
      <div className="mx-auto my-5 flex w-48 flex-col items-center justify-center md:mx-0 md:w-[17vw]">
        <h5 className="text-xl font-bold text-white">
          {playlist?.followers?.total}
        </h5>
        <p className="text-center font-semibold">Number of followers</p>
      </div>
      <div className="mx-auto my-5 flex w-48 flex-col items-center justify-center md:mx-0 md:w-[17vw]">
        <h5 className="text-xl font-bold text-white">
          {playlist?.owner?.display_name}
        </h5>
        <p className="text-center font-semibold">Owner</p>
      </div>
      <div className="mx-auto my-5 flex w-48 flex-col items-center justify-center md:mx-0 md:w-[17vw]">
        <h5 className="text-xl font-bold text-white">
          {playlist?.collaborative ? "Yes" : "No"}
        </h5>
        <p className="text-center font-semibold">Is Collaborative</p>
      </div>
      <div className="mx-auto my-5 flex w-48 flex-col items-center justify-center md:mx-0 md:w-[17vw]">
        <h5 className="text-xl font-bold text-white">
          {playlist?.tracks?.total}
        </h5>
        <p className="text-center font-semibold">Tracks</p>
      </div>
    </section>
  );
};

export default PlaylistStats;
