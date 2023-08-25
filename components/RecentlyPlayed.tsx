"use client";
import React, { useState, useEffect } from "react";
import { Item } from "@/utils/types";
import formatDate from "@/utils/formatDate";
import Image from "next/image";
interface RecentlyPlayedProps {
  recentTracks: Item[];
}

const RecentlyPlayed: React.FC<RecentlyPlayedProps> = ({ recentTracks }) => {
  const [tracks, setTracks] = useState<Item[]>([]);
  let prevDate = "";
  useEffect(() => {
    setTracks(recentTracks);
  }, [recentTracks]);
  const getDaysAgo = (date: string) => {
    const today = new Date();
    const date2 = new Date(date);
    const diffTime = Math.abs(today.getTime() - date2.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  const getDaysAgoString = (date: string): string => {
    const daysAgo = getDaysAgo(date);
    if (daysAgo === 0) {
      return "Today";
    } else if (daysAgo === 1) {
      return "Yesterday";
    } else if (daysAgo > 365) {
      const years = Math.floor(daysAgo / 365);
      return years === 1 ? "1 year ago" : `${years} years ago`;
    } else if (daysAgo > 30) {
      const years = Math.floor(daysAgo / 30);
      return years === 1 ? "1 year ago" : `${years} years ago`;
    } else {
      return `${daysAgo} days ago`;
    }
  };
  return (
    <div className="mt-6 sm:mx-10 md:mx-20">
      {tracks?.map((item, index) => {
        const date = item.played_at.substring(0, 10);
        const shouldShowDate = date !== prevDate;
        prevDate = date;

        return (
          <div key={index} className=" mb-3 border-b border-b-gray-500 pb-3">
            {shouldShowDate && (
              <div className="mb-2 text-sm font-semibold">
                {formatDate(date)}
              </div>
            )}
            <div className="flex flex-row justify-between">
              <div className="flex">
                <a
                  href={`${process.env.NEXT_PUBLIC_URL}/track/${item.track.id}`}
                >
                  <Image
                    src={item?.track?.album?.images[2]?.url}
                    alt="No image"
                    className="cursor-pointer select-none"
                    width={item?.track?.album?.images[2]?.width}
                    height={item?.track?.album?.images[2]?.height}
                  />
                </a>
                <div className="ml-4 flex flex-col justify-center">
                  <a
                    href={`${process.env.NEXT_PUBLIC_URL}/track/${item.track.id}`}
                  >
                    <h4 className="cursor-pointer font-bold text-white">
                      {item?.track?.name}
                    </h4>
                  </a>
                  <div className="flex flex-row items-end">
                    <div
                      className="line-clamp-1 flex w-[120px] flex-row overflow-hidden overflow-ellipsis sm:w-[30vw] lg:w-auto"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                      }}
                    >
                      {item?.track?.artists?.map((artist, index) => (
                        <a
                          href={`${process.env.NEXT_PUBLIC_URL}/artist/${artist.id}`}
                          key={artist.id}
                          className="mr-1 cursor-pointer text-sm font-semibold duration-200 hover:text-white"
                        >
                          {`${artist.name}${
                            index !== item.track.artists.length - 1 ? ", " : ""
                          }`}
                        </a>
                      ))}
                    </div>
                    <a
                      href={item?.track?.album?.external_urls?.spotify}
                      target="_blank"
                      className="ml-1 mr-3 line-clamp-1 cursor-pointer text-sm font-semibold duration-200 hover:text-white"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        minWidth: "30px",
                      }}
                    >
                      • {item?.track?.album?.name}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center text-sm font-bold">
                {getDaysAgoString(date)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentlyPlayed;
