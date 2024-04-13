import {
  TimeRange,
  TrackCall,
  ArtistCall,
  RecentlyPlayedCall,
} from "../types/types";
async function fetchWebApi(endpoint: string, method: string, body?: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/${endpoint}`, {
    method,
    body: JSON.stringify(body),
  });
  return await res.json();
}

async function getTopTracks(timeRange: TimeRange) {
  const tracks: TrackCall = await fetchWebApi(
    `tracks?time_range=${timeRange}&limit=50`,
    "GET",
  );
  return tracks.items;
}

async function getTopArtists(timeRange: TimeRange) {
  const artists: ArtistCall = await fetchWebApi(
    `artists?time_range=${timeRange}&limit=50`,
    "GET",
  );
  return artists.items;
}

async function getRecentlyPlayed() {
  const tracks: RecentlyPlayedCall = await fetchWebApi(
    `recently-played?limit=50`,
    "GET",
  );
  return tracks.items;
}

export { getTopTracks, getTopArtists, getRecentlyPlayed };
