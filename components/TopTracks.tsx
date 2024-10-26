"use client";
import React, { useState, useEffect } from "react";
import { Artist, Track } from "@/types/types";
import Image from "next/image";
interface TopTracksProps {
  topTracks: Track[];
  demo?: boolean;
}

const TopTracks: React.FC<TopTracksProps> = ({ topTracks, demo = false }) => {
  const [currentTopTracks, setCurrentTopTracks] = useState<Track[]>(topTracks);
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    setPage(1);
  }, [topTracks]);
  useEffect(() => {
    if (!topTracks) return;
    setCurrentTopTracks(topTracks.slice((page - 1) * 6, page * 6));
  }, [topTracks, page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < Math.ceil(topTracks.length / 6)) {
      setPage(page + 1);
    }
  };

  return (
    <>
      {currentTopTracks?.length > 0 ? (
        <section>
          <div className="mr-[12vw] mt-2 flex justify-end">
            {topTracks && (
              <>
                <button
                  className={` btn mr-3 ${page === 1 && "btn-disabled"}`}
                  onClick={handlePrevPage}
                  disabled={page === 1}
                >
                  Prev
                </button>
                <button
                  className={`btn ${
                    page === Math.ceil(topTracks.length / 6) && "btn-disabled"
                  }`}
                  onClick={handleNextPage}
                  disabled={page === Math.ceil(topTracks.length / 6)}
                >
                  Next
                </button>
              </>
            )}
          </div>
          <div className="mt-4 flex min-h-[50vh] flex-col items-center justify-center">
            <div
              className={`mx-[10vw] grid grid-cols-2 gap-x-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6`}
            >
              {currentTopTracks?.map((track, index) => (
                <div
                  key={track.id}
                  className="mb-10 flex flex-col items-center justify-start md:my-10"
                >
                  <a
                    href={`${process.env.NEXT_PUBLIC_URL}/${demo ? "demo/" : ""}track/${track.id}`}
                  >
                    <Image
                      priority
                      src={track?.album?.images[0]?.url}
                      alt="No image"
                      className="cursor-pointer select-none"
                      width={track?.album?.images[0]?.width}
                      height={track?.album?.images[0]?.height}
                      loading="eager"
                    />
                  </a>
                  <a
                    href={`${process.env.NEXT_PUBLIC_URL}/${demo ? "demo/" : ""}track/${track.id}`}
                    className="mt-4 line-clamp-2 max-h-[50px] cursor-pointer overflow-hidden text-center font-semibold text-white"
                    style={{
                      lineHeight: "25px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                    }}
                  >
                    {`${index + (page - 1) * 6 + 1}. ${track?.name}`}
                  </a>
                  <p
                    className="line-clamp-2 max-h-[50px] overflow-hidden text-center text-sm font-semibold"
                    style={{
                      lineHeight: "25px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                    }}
                  >
                    {track?.artists?.map((artist: Artist, index: number) => (
                      <a
                        href={`${process.env.NEXT_PUBLIC_URL}/${demo ? "demo/" : ""}artist/${artist.id}`}
                        key={artist.id}
                        className="cursor-pointer duration-200 hover:text-white"
                      >{`${artist.name}${
                        index !== track?.artists?.length - 1 ? ", " : ""
                      }`}</a>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <h2 className=" my-10 text-center text-xl">No tracks found</h2>
      )}
    </>
  );
};

export default TopTracks;
