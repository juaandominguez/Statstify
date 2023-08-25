import React from "react";
import Image from "next/image";
import Heading from "@/components/Heading";
import { Track } from "@/utils/types";
interface Props {
  track: Track;
}
const TrackAppearsOn: React.FC<Props> = ({ track }) => {
  return (
    <section className="flex w-full flex-col items-start justify-start">
      <Heading
        title="Appears on"
        description={`Albums featuring ${track.name}`}
        margin={false}
      />
      <a
        href={track?.album.external_urls?.spotify}
        target="_blank"
        className="mt-5 flex w-[40vw] sm:w-[30vw] lg:w-[20vw] xl:w-[10vw]"
      >
        <Image
          src={track?.album?.images[0]?.url}
          alt="album cover"
          width={track?.album?.images[0]?.width}
          height={track?.album?.images[0]?.height}
        />
      </a>
      <a href={track?.album?.external_urls?.spotify} target="_blank">
        <p className="mt-3 font-semibold text-white">{track?.album?.name}</p>
      </a>
    </section>
  );
};

export default TrackAppearsOn;
