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
    if(!topTracks) return;
    setCurrentTopTracks(topTracks.slice((page - 1) * 6, page*6));
  }, [topTracks,page]);

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
    <div className="flex justify-end mr-[12vw]">
          {topTracks && (
            <>
            <button className={` btn ${page === 1 && 'btn-disabled'}`} onClick={handlePrevPage} disabled={page === 1}>Prev</button>
            <button className={`btn ${page === Math.ceil(topTracks.length / 6) && 'btn-disabled'}`} onClick={handleNextPage} disabled={page === Math.ceil(topTracks.length / 6)}>Next</button>
          </>
          )}
      </div>
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className={`mx-[10vw] grid grid-cols-3 lg:grid-cols-6 gap-x-8`}>
        {currentTopTracks && currentTopTracks.map((track: any, index) => (
                <div key={track.id} className="flex flex-col mb-10 md:my-10 items-center justify-start">
                <img src={track.album.images[0].url} alt='No image' onClick={() => {window.location = track.external_urls.spotify}} className="cursor-pointer"></img>
                <h5 className="text-center mt-4 text-white font-semibold max-h-[50px] overflow-hidden line-clamp-2" style={{ lineHeight: "25px", display: "-webkit-box", WebkitLineClamp: 2 }}>{`${index+(page-1)*6+1}. ${track.name}`}</h5>
                <p className="text-center text-sm font-semibold max-h-[50px] overflow-hidden line-clamp-2" style={{ lineHeight: "25px", display: "-webkit-box", WebkitLineClamp: 2 }}>{track.artists.map((artist: any) => artist.name).join(", ")}</p>
              </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default TopTracks;