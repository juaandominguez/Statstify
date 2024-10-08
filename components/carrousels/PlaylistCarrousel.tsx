import { Playlist } from "@/types/types";
import React, { useRef } from "react";
import next from "@/public/assets/next.webp";
import prev from "@/public/assets/prev.webp";
import Image from "next/image";
import { handleNextClick, handlePreviousClick } from "@/utils/CarrouselScroll";
interface Props {
  windowWidth: number;
  playlists?: Playlist[];
}

const PlaylistCarrousel: React.FC<Props> = ({ windowWidth, playlists }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="mt-6 flex w-full flex-row items-center gap-3 overflow-x-hidden"
      ref={ref}
    >
      {playlists?.map((playlist) => (
        <div key={playlist.id} className="flex flex-col">
          <a
            className="h-[20vw] w-[20vw] lg:h-64 lg:w-64"
            href={`${process.env.NEXT_PUBLIC_URL}/playlist/${playlist.id}`}
          >
            <Image
              src={playlist?.images[0]?.url}
              alt="Playlist image"
              width={playlist?.images[0]?.width || 300}
              height={playlist?.images[0]?.height || 300}
            />
          </a>
          <p className="mt-2 line-clamp-1 max-w-[20vw] font-semibold text-white">
            {playlist?.name}
          </p>
          <p className="line-clamp-1 max-w-[20vw] text-xs font-semibold text-gray-400 md:text-base">
            {playlist?.owner?.display_name}
          </p>
        </div>
      ))}
      <button
        className="btn absolute right-[11vw] mb-10 h-3 w-12 rounded-full md:mb-[2.5vw] md:h-5 md:w-16"
        onClick={() => handleNextClick(ref, windowWidth)}
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
        onClick={() => handlePreviousClick(ref, windowWidth)}
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

export default PlaylistCarrousel;
