import React, { useState, useEffect, use } from "react";
import getTopTracks from "@/utils/fetchWebapi";

interface TopTracksProps {
  session: any;
  timeRange: "short_term" | "medium_term" | "long_term";
}

const TopTracks: React.FC<TopTracksProps> = ({ session, timeRange }) => {
  const token = session.accessToken;
  const [topTracks, setTopTracks] = useState([]);
  const [currentTopTracks, setCurrentTopTracks] = useState([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    async function fetchTopTracks() {
      const tracks = await getTopTracks(token, timeRange);
      setTopTracks(tracks);
    }
    fetchTopTracks();
  }, []);
  useEffect(() => {
    async function fetchTopTracks() {
      const tracks = await getTopTracks(token, timeRange);
      setTopTracks(tracks);
    }
    fetchTopTracks();
    setPage(1);
  }, [timeRange]);
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
      <div className="mr-[12vw] flex justify-end">
        {topTracks && (
          <>
            <button
              className={` btn ${page === 1 && "btn-disabled"}`}
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              Prev
            </button>
            <button
              className={`btn ${page === Math.ceil(topTracks.length / 6) && "btn-disabled"
                }`}
              onClick={handleNextPage}
              disabled={page === Math.ceil(topTracks.length / 6)}
            >
              Next
            </button>
          </>
        )}
      </div>
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <div className={`mx-[10vw] grid grid-cols-3 gap-x-8 lg:grid-cols-6`}>
          {currentTopTracks &&
            currentTopTracks.map((track: any, index) => (
              <div
                key={track.id}
                className="mb-10 flex flex-col items-center justify-start md:my-10"
              >
                <img
                  src={track.album.images[0].url}
                  alt="No image"
                  onClick={() => {
                    window.location = track.external_urls.spotify;
                  }}
                  className="cursor-pointer select-none"
                ></img>
                <h5
                  className="mt-4 line-clamp-2 max-h-[50px] cursor-pointer overflow-hidden text-center font-semibold text-white"
                  style={{
                    lineHeight: "25px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                  }}
                  onClick={() => {
                    window.location = track.external_urls.spotify;
                  }}
                >
                  {`${index + (page - 1) * 6 + 1}. ${track.name}`}
                </h5>
                <p
                  className="line-clamp-2 max-h-[50px] overflow-hidden text-center text-sm font-semibold"
                  style={{
                    lineHeight: "25px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                  }}
                >
                  {track.artists.map((artist: any, index: number) => (
                    <span
                      onClick={() =>
                        (window.location = artist.external_urls.href)
                      }
                      className="cursor-pointer hover:text-white"
                    >{`${artist.name}${index !== track.artists.length - 1 ? ", " : ""
                      }`}</span>
                  ))}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default TopTracks;
