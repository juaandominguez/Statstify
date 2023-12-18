import { Track } from "@/utils/types";
import React, { useRef } from "react";
import next from "@/public/assets/next.png";
import prev from "@/public/assets/prev.png";
import Image from "next/image";
interface TrackCarrouselProps {
  windowWidth: number;
  tracks?: Track[];
}

const TrackCarrousel: React.FC<TrackCarrouselProps> = ({
  windowWidth,
  tracks,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleNextClick = () => {
    if (ref.current) {
      const scrollAmount = windowWidth >= 900 ? 1000 : 200;
      ref.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handlePreviousClick = () => {
    if (ref.current) {
      const scrollAmount = windowWidth >= 900 ? 1000 : 200;
      ref.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <div
      className="mt-6 flex w-full flex-row items-center gap-3 overflow-x-hidden"
      ref={ref}
    >
      {tracks?.map((track) => (
        <div key={track.id} className="flex flex-col">
          <a
            className="h-[20vw] w-[20vw] lg:h-64 lg:w-64"
            href={`${process.env.NEXT_PUBLIC_URL}/track/${track.id}`}
          >
            <Image
              src={track?.album?.images[0]?.url}
              alt="album cover"
              width={track?.album?.images[0]?.width}
              height={track?.album?.images[0]?.height}
            />
          </a>
          <a
            className="mt-2 line-clamp-1 max-w-[20vw] font-semibold text-white"
            href={`${process.env.NEXT_PUBLIC_URL}/track/${track.id}`}
          >
            {track?.name}
          </a>
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
      ))}
      <button
        className="btn absolute right-[11vw] mb-10 h-3 w-12 rounded-full md:mb-[2.5vw] md:h-5 md:w-16"
        onClick={handleNextClick}
      >
        <Image
          src={next.src}
          alt="Next"
          width={next.width}
          height={next.height}
        />
      </button>
      <button
        className="btn absolute left-[11vw] mb-10 h-3 w-12 rounded-full md:mb-[2.5vw] md:h-5 md:w-16"
        onClick={handlePreviousClick}
      >
        <Image
          src={prev.src}
          alt="Previous"
          width={prev.width}
          height={prev.height}
        />
      </button>
    </div>
  );
};

export default TrackCarrousel;
