import { Spotify } from "./types";

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

async function getTopTracks(token: string, timeRange: string) {
  const tracks: Spotify = await fetchWebApi(
    `v1/me/top/tracks?time_range=${timeRange}&limit=50`,
    "GET",
    token,
  );
  return tracks.items;
}
export default getTopTracks;
