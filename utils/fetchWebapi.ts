import {
  TrackCall,
  ArtistCall,
  RecentlyPlayedCall,
  SpecificArtist,
  Track,
} from "./types";
import { TimeRange } from "./types";
async function fetchWebApi(
  endpoint: string,
  method: string,
  token: string,
  body?: string
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
    token
  );
  return tracks.items;
}

async function getTopArtists(token: string, timeRange: TimeRange) {
  const artists: ArtistCall = await fetchWebApi(
    `v1/me/top/artists?time_range=${timeRange}&limit=50`,
    "GET",
    token
  );
  return artists.items;
}

async function getRecentlyPlayed(token: string) {
  const tracks: RecentlyPlayedCall = await fetchWebApi(
    `v1/me/player/recently-played?limit=50`,
    "GET",
    token
  );
  return tracks.items;
}

async function getArtist(id: string) {
  const artist: SpecificArtist = await fetchWebApi(
    `v1/artists/${id}`,
    "GET",
    ""
  );
  return artist;
}

async function getTrack(id: string, token: string) {
  const track: Track = await fetchWebApi(`v1/tracks/${id}`, "GET", token);
  return track;
}

export { getTopTracks, getTopArtists, getRecentlyPlayed, getArtist, getTrack };
