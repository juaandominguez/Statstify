import {
  TrackCall,
  ArtistCall,
  RecentlyPlayedCall,
  SpecificArtist,
  Track,
  AudioFeatures,
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

async function getArtist(id: string, token: string) {
  const artist: SpecificArtist = await fetchWebApi(
    `v1/artists/${id}`,
    "GET",
    token
  );
  return artist;
}

async function getTrack(id: string, token: string) {
  const track: Track = await fetchWebApi(`v1/tracks/${id}`, "GET", token);
  return track;
}

async function getTrackFeatures(id: string, token: string) {
  const features: AudioFeatures = await fetchWebApi(
    `v1/audio-features/${id}`,
    "GET",
    token
  );
  return features;
}

async function getRecommendedTracks(seedTrack: string, token: string) {
  const tracks = await fetchWebApi(
    `v1/recommendations?limit=100&seed_tracks=${seedTrack}`,
    "GET",
    token
  );
  return tracks.tracks as Track[];
}
async function getArtistTopTracks(id: string, token: string) {
  const tracks = await fetchWebApi(
    `v1/artists/${id}/top-tracks?market=US`,
    "GET",
    token
  );
  return tracks.tracks as Track[];
}

async function getArtistTopAlbums(id: string, token: string) {
  const albums = await fetchWebApi(
    `v1/artists/${id}/albums?market=US`,
    "GET",
    token
  );
  return albums.items;
}

async function getRecommendedArtists(artistId: string, token: string) {
  const artists = await fetchWebApi(
    `v1/artists/${artistId}/related-artists`,
    "GET",
    token
  );
  return artists.artists as SpecificArtist[];
}

async function searchItems(query: string, token: string) {
  const items = await fetchWebApi(
    `v1/search?q=${query}&type=track,artist,album,playlist&limit=50`,
    "GET",
    token
  );
  return items;
}

export {
  getTopTracks,
  getTopArtists,
  getRecentlyPlayed,
  getArtist,
  getTrack,
  getTrackFeatures,
  getRecommendedTracks,
  getArtistTopTracks,
  getArtistTopAlbums,
  getRecommendedArtists,
  searchItems,
};
