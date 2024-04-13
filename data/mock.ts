import { Item, SpecificArtist, Track } from "@/types/types";
const mockTrack: Track = {
  album: {
    album_type: "album",
    total_tracks: 10,
    available_markets: ["US"],
    external_urls: {
      spotify: "https://open.spotify.com/track/7MjSipTto9QljYzZnloXOn",
    },
    href: "https://open.spotify.com/track/7MjSipTto9QljYzZnloXOn",
    id: "1",
    images: [
      {
        url: "https://i.scdn.co/image/ab67616d0000b2739416ed64daf84936d89e671c",
        height: 640,
        width: 640,
      },
      {
        url: "https://i.scdn.co/image/ab67616d0000b2739416ed64daf84936d89e671c",
        height: 64,
        width: 64,
      },
      {
        url: "https://i.scdn.co/image/ab67616d0000b2739416ed64daf84936d89e671c",
        height: 64,
        width: 64,
      },
    ],
    name: "Album 1",
    release_date: "2022-01-01",
    release_date_precision: "day",
    restrictions: {
      reason: "market",
    },
    type: "album",
    uri: "spotify:album:1",
    copyrights: [
      {
        text: "2022 Label",
        type: "C",
      },
    ],
    external_ids: {
      isrc: "USUM72200001",
    },
    genres: [],
    label: "Label",
    popularity: 80,
    album_group: "album",
    artists: [
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
        },
        href: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
        id: "1",
        name: "Drake",
        type: "artist",
        uri: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
      },
    ],
  },
  artists: [
    {
      external_urls: {
        spotify: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
      },
      href: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
      id: "1",
      name: "Drake",
      type: "artist",
      uri: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
    },
  ],
  available_markets: ["US"],
  disc_number: 1,
  duration_ms: 200000,
  explicit: false,
  external_ids: {
    isrc: "USUM72200001",
  },
  external_urls: {
    spotify: "https://open.spotify.com/track/7MjSipTto9QljYzZnloXOn",
  },
  href: "https://open.spotify.com/track/7MjSipTto9QljYzZnloXOn",
  id: "1",
  name: "Track 1",
  popularity: 80,
  preview_url: "https://open.spotify.com/track/7MjSipTto9QljYzZnloXOn",
  track_number: 1,
  type: "track",
  uri: "https://open.spotify.com/track/7MjSipTto9QljYzZnloXOn",
  is_local: false,
};

const mockArtist: SpecificArtist = {
  external_urls: {
    spotify: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
  },
  followers: {
    href: "",
    total: 1000000,
  },
  genres: ["pop"],
  href: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
  id: "1",
  images: [
    {
      url: "https://i.scdn.co/image/ab67616d0000b2739416ed64daf84936d89e671c",
      height: 640,
      width: 640,
    },
  ],
  name: "Drake",
  popularity: 80,
  type: "artist",
  uri: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
};

const mockRecentTracks: Item = {
  track: mockTrack,
  played_at: "2022-01-01T00:00:00Z",
  context: {
    external_urls: {
      spotify: "https://open.spotify.com/track/7MjSipTto9QljYzZnloXOn",
    },
    href: "https://open.spotify.com/track/7MjSipTto9QljYzZnloXOn",
    type: "album",
    uri: "https://open.spotify.com/track/7MjSipTto9QljYzZnloXOn",
  },
};

export { mockTrack, mockArtist, mockRecentTracks };
