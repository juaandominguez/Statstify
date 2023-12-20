import { CarrouselItem } from "@/types/types";
import React, { useRef } from "react";
import next from "@/public/assets/next.png";
import prev from "@/public/assets/prev.png";
import Image from "next/image";
import { handleNextClick, handlePreviousClick } from "@/utils/CarrouselScroll";
interface Props {
  windowWidth: number;
  items: CarrouselItem[];
}

const Carrousel: React.FC<Props> = ({ windowWidth, items }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="mt-6 flex w-full flex-row items-center gap-3 overflow-x-hidden"
      ref={ref}
    >
      {items?.map((item) => (
        <div key={item.id} className="flex flex-col">
          <a
            className="h-[20vw] w-[20vw] lg:h-64 lg:w-64"
            href={`${process.env.NEXT_PUBLIC_URL}/${item.type}/${item.id}`}
          >
            {item.type === "artist" ? (
              <div className="aspect-square">
                <Image
                  src={item.image}
                  alt="Artist image"
                  width={640}
                  height={640}
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>
            ) : (
              <Image
                src={item.image}
                alt={`${item.type} image`}
                width={640}
                height={640}
              />
            )}
          </a>
          <a
            className="mt-2 line-clamp-1 max-w-[20vw] font-semibold text-white"
            href={`${process.env.NEXT_PUBLIC_URL}/${item.type}/${item.id}`}
          >
            {item.primary}
          </a>
          <p className="line-clamp-1 max-w-[20vw] text-xs font-semibold text-gray-400 md:text-base">
            {item.artists?.map((artist, index) => (
              <a
                href={`${process.env.NEXT_PUBLIC_URL}/artist/${artist.id}`}
                className="cursor-pointer transition duration-200 hover:text-white"
                key={artist.id}
              >{`${artist.name}${
                index !== item.artists.length - 1 ? ", " : ""
              }`}</a>
            ))}
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

export default Carrousel;
