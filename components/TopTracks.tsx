import React, { useState, useEffect } from "react";
import Pagination from '@mui/material/Pagination';

interface TopTracksProps {
  session: any;
}

const TopTracks: React.FC<TopTracksProps> = ({ session }) => {
  const token = session.accessToken;
  const [topTracks, setTopTracks] = useState([]);
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
      "v1/me/top/tracks?time_range=short_term&limit=50",
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

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h3 className="text-3xl">Top Tracks</h3>
      <div className="mx-20 grid grid-cols-3 lg:grid-cols-5 gap-8 items-center border justify-center">
        {topTracks && topTracks.map((track: any, index: number) => (
            index < page*5 && index >= (page-1)*5 && (
                <div key={track.id} className="flex flex-col my-10">
                    <h5 className="text-center mb-4">{track.name}</h5>
                    <img src={track.album.images[0].url} alt='No image'></img>
                </div>
            )
        ))}
        <Pagination count={10} variant="outlined" color="primary" onChange={() => setPage(page => page +1)}/>
      </div>
    </div>
  );
};

export default TopTracks;