"use client";
import { SpecificArtist } from "@/types/types";
import React, { useState, useEffect } from "react";
import Image from "next/image";
interface TopArtistsProps {
  topArtists: SpecificArtist[];
  demo?: boolean;
}

const TopArtists: React.FC<TopArtistsProps> = ({
  topArtists,
  demo = false,
}) => {
  const [currentTopArtists, setCurrentTopArtists] = useState<SpecificArtist[]>(
    [],
  );
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    setPage(1);
  }, [topArtists]);
  useEffect(() => {
    if (!topArtists) return;
    setCurrentTopArtists(topArtists.slice((page - 1) * 6, page * 6));
  }, [topArtists, page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < Math.ceil(topArtists.length / 6)) {
      setPage(page + 1);
    }
  };

  return (
    <>
      {topArtists?.length > 0 ? (
        <section>
          <div className="mr-[12vw] mt-2 flex justify-end">
            {topArtists && (
              <>
                <button
                  className={`btn mr-3 ${page === 1 && "btn-disabled"}`}
                  onClick={handlePrevPage}
                  disabled={page === 1}
                >
                  Prev
                </button>
                <button
                  className={`btn ${
                    page === Math.ceil(topArtists.length / 6) && "btn-disabled"
                  }`}
                  onClick={handleNextPage}
                  disabled={page === Math.ceil(topArtists.length / 6)}
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
              {currentTopArtists?.map((artist, index) => (
                <div
                  key={artist.id}
                  className="mb-10 flex flex-col items-center justify-start md:my-10"
                >
                  <a
                    href={`${process.env.NEXT_PUBLIC_URL}/${demo ? "demo/" : ""}artist/${artist.id}`}
                  >
                    <div className="flex h-[9rem] w-[9rem] items-center justify-center overflow-hidden rounded-full sm:h-[11rem] sm:w-[11rem]">
                      <Image
                        src={artist?.images[0]?.url}
                        alt="No image"
                        className="h-full w-full cursor-pointer select-none object-cover"
                        width={artist?.images[0]?.width}
                        height={artist?.images[0]?.height}
                        loading="eager"
                      />
                    </div>
                  </a>
                  <a
                    href={`${process.env.NEXT_PUBLIC_URL}/${demo ? "demo/" : ""}artist/${artist.id}`}
                    target="_blank"
                    className="mt-4 line-clamp-2 max-h-[50px] cursor-pointer overflow-hidden text-center font-semibold text-white"
                    style={{
                      lineHeight: "25px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                    }}
                  >
                    {`${index + (page - 1) * 6 + 1}. ${artist?.name}`}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <h2 className=" my-10 text-center text-xl">No artists found</h2>
      )}
    </>
  );
};

export default TopArtists;
