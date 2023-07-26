import React, { useState, useEffect } from "react";
import { Item, Track } from "@/utils/types";
import formatDate from "@/utils/formatDate";
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
      let years = Math.floor(daysAgo / 365);
      return years === 1 ? "1 year ago" : `${years} years ago`;
    } else if (daysAgo > 30) {
      let years = Math.floor(daysAgo / 30);
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
                <img
                  src={item.track.album.images[2].url}
                  className="cursor-pointer select-none"
                  onClick={() => window.open(item.track.external_urls.spotify)}
                ></img>
                <div className="ml-4 flex flex-col justify-center">
                  <h4
                    className="cursor-pointer font-bold text-white"
                    onClick={() =>
                      window.open(item.track.external_urls.spotify)
                    }
                  >
                    {item.track.name}
                  </h4>
                  <div className="flex flex-row">
                    {item?.track?.artists?.map((artist, index) => (
                      <p
                        className="mr-1 cursor-pointer text-sm font-semibold hover:text-white"
                        key={artist.id}
                        onClick={() =>
                          window.open(artist.external_urls.spotify)
                        }
                      >
                        {`${artist.name}${
                          index !== item.track.artists.length - 1 ? ", " : ""
                        }`}
                      </p>
                    ))}
                    <p className="ml-1 text-sm font-semibold">
                      •
                      <span
                        className="ml-1 cursor-pointer hover:text-white"
                        onClick={() =>
                          window.open(item.track.album.external_urls.spotify)
                        }
                      >
                        {item.track.album.name}
                      </span>
                    </p>
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
