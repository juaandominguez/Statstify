import { SpecificArtist } from "@/utils/types";
import Image from "next/image";
import React, { useRef } from "react";
import next from "@/public/assets/next.png";
import prev from "@/public/assets/prev.png";
interface Props {
  artists: SpecificArtist[];
  windowWidth: number;
}
const ArtistCarrousel: React.FC<Props> = ({ artists, windowWidth }) => {
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
      {artists?.map((artist) => (
        <div key={artist?.id} className="flex flex-col">
          <a
            className="h-[20vw] w-[20vw] rounded-xl lg:h-64 lg:w-64"
            href={`${process.env.NEXT_PUBLIC_URL}/artist/${artist.id}`}
          >
            <div className="aspect-square">
              <Image
                src={artist?.images[0]?.url}
                alt="album cover"
                width={artist?.images[0]?.width}
                height={artist?.images[0]?.height}
                className="h-full w-full rounded-xl object-cover"
              />
            </div>
          </a>
          <a
            href={`${process.env.NEXT_PUBLIC_URL}/artist/${artist.id}`}
            className="mt-2 line-clamp-1 max-w-[20vw] cursor-pointer font-semibold text-white"
          >
            {artist?.name}
          </a>
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

export default ArtistCarrousel;
