import { SpecificArtist } from "@/types/types";
import React from "react";
import Heading from "@/components/Heading";
interface Props {
  artist: SpecificArtist;
}
const ArtistInfo: React.FC<Props> = ({ artist }) => {
  return (
    <>
      <section className="mt-3 flex w-[75vw] flex-wrap justify-center md:mt-10">
        <div className="mx-auto my-5 flex w-48 flex-col items-center justify-center md:mx-0 md:w-[17vw]">
          <h5 className="text-xl font-bold text-white">
            {artist?.popularity / 10}
          </h5>
          <p className="text-center font-semibold">0-10 Popularity</p>
        </div>
      </section>
      <section className="mt-3 flex w-full flex-col justify-start md:mt-10">
        <Heading
          title="Genres"
          description={`${artist?.name} genres`}
          margin={false}
        />
        <div className="mt-3 flex flex-row overflow-x-hidden">
          {artist?.genres?.map((genre) => (
            <div key={genre} className="btn">
              {genre}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ArtistInfo;
