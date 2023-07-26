import axios from "axios";
import { TrackCall, ArtistCall, SpecificArtist, Track, RecentlyPlayedCall } from "./types";
import { TimeRange } from "./types";
async function fetchWebApi(
  endpoint: string,
  method: string,
  token: string,
  body?: string,
) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });
  return await res.json();
}

async function getTopTracks(token: string, timeRange: TimeRange) {
  const tracks: TrackCall = await fetchWebApi(
    `v1/me/top/tracks?time_range=${timeRange}&limit=50`,
    "GET",
    token,
  );
  return tracks.items;
}

async function getTopArtists(token: string, timeRange: TimeRange) {
  const artists: ArtistCall = await fetchWebApi(
    `v1/me/top/artists?time_range=${timeRange}&limit=50`,
    "GET",
    token,
  );
  return artists.items;
}

async function getRecentlyPlayed(token: string) {
  const tracks: RecentlyPlayedCall = await fetchWebApi(
    `v1/me/player/recently-played?limit=50`,
    "GET",
    token,
  );
  return tracks.items;
}

// async function getTopTracks(timeRange: TimeRange) {
//   let res: Track[] = []
//   try {
//     res = await axios(`http://localhost:3000/api/topTracks/${timeRange}`)
//   }
//   finally {
//     return res;
//   }
// }

// async function getTopArtists(timeRange: TimeRange) {
//   let res: SpecificArtist[] = []
//   try {
//     res = await axios(`http://localhost:3000/api/topArtists/${timeRange}`)
//   }
//   finally {
//     return res;
//   }
// }

export { getTopTracks, getTopArtists, getRecentlyPlayed };

