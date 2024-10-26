import {
  TimeRange,
  TrackCall,
  ArtistCall,
  RecentlyPlayedCall,
} from "../types/types";
async function fetchWebApi(endpoint: string, method: string, body?: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/stub/${endpoint}`,
    {
      method,
      body: JSON.stringify(body),
    },
  );
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

async function getTrack() {
  const track = await fetchWebApi("track", "GET");
  return track.item;
}

async function getTrackFeatures() {
  const trackFeatures = await fetchWebApi("audio-features", "GET");
  return trackFeatures.item;
}

async function getRecommendedTracks() {
  const recommendedTracks = await fetchWebApi("recommended-tracks", "GET");
  return recommendedTracks.items;
}

async function getArtist() {
  const artist = await fetchWebApi("artist", "GET");
  return artist.item;
}

async function getArtistTopTracks() {
  const artistTopTracks = await fetchWebApi("artist-top-tracks", "GET");
  return artistTopTracks.items;
}

async function getArtistTopAlbums() {
  const artistTopAlbums = await fetchWebApi("artist-top-albums", "GET");
  return artistTopAlbums.items;
}

async function getRecommendedArtists() {
  const recommendedArtists = await fetchWebApi("recommended-artists", "GET");
  return recommendedArtists.items;
}

async function getAlbum() {
  const album = await fetchWebApi("album", "GET");
  return album.item;
}

async function getAlbumTracks() {
  const albumTracks = await fetchWebApi("album-tracks", "GET");
  return albumTracks.items;
}

export {
  getTopTracks,
  getTopArtists,
  getRecentlyPlayed,
  getTrack,
  getTrackFeatures,
  getRecommendedTracks,
  getArtist,
  getArtistTopTracks,
  getArtistTopAlbums,
  getRecommendedArtists,
  getAlbum,
  getAlbumTracks,
};
