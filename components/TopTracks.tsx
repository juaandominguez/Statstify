import React, { useState, useEffect, use } from "react";

interface TopTracksProps {
  session: any;
  timeRange: "short_term" | "medium_term" | "long_term";
}

const TopTracks: React.FC<TopTracksProps> = ({ session, timeRange }) => {
  const token = session.accessToken;
  const [topTracks, setTopTracks] = useState([]);
  const [currentTopTracks, setCurrentTopTracks] = useState([]);
  const [page, setPage] = useState(1);

  async function fetchWebApi(endpoint: string, method: string, body?: string) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body: JSON.stringify(body),
    });
    return await res.json();
  }

  async function getTopTracks() {
    const tracks = await fetchWebApi(
      `v1/me/top/tracks?time_range=${timeRange}&limit=50`,
      "GET"
    );
    return tracks.items;
  }

  useEffect(() => {
    async function fetchTopTracks() {
      const tracks = await getTopTracks();
      setTopTracks(tracks);
    }
    fetchTopTracks();
  }, []);
  useEffect(() => {
    async function fetchTopTracks() {
      const tracks = await getTopTracks();
      setTopTracks(tracks);
    }
    fetchTopTracks();
  }, [timeRange]);
  useEffect(() => {
    if(!topTracks) return;
    setCurrentTopTracks(topTracks.slice((page - 1) * 6, page*6));
  }, [topTracks,page]);

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="mx-[10vw] grid grid-cols-3 md:grid-cols-6 gap-x-8">
        {currentTopTracks && currentTopTracks.map((track: any, index) => (
                <div key={track.id} className="flex flex-col mb-10 md:my-10 items-center justify-start">
                <img src={track.album.images[0].url} alt='No image'></img>
                <h5 className="text-center mt-4 text-white font-semibold">{`${index+(page-1)*6+1}. ${track.name}`}</h5>
                <p className="text-center text-sm font-semibold max-h-[50px] overflow-hidden line-clamp-2" style={{ lineHeight: "25px", display: "-webkit-box", WebkitLineClamp: 2 }}>{track.artists.map((artist: any) => artist.name).join(", ")}</p>
              </div>

        ))}
      </div>
      <div className="join">
          {topTracks && Array.from({length: topTracks.length/6 + 1}).map((_, i) => (
            <button key={i} className={`join-item btn ${page === i+1 && 'btn-primary'}`} onClick={() => setPage(i+1)}>{i+1}</button>)
          )}
      </div>
    </div>
  );
};

export default TopTracks;