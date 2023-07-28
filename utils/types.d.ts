export interface TrackCall {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
  items: Track[];
}

export interface ArtistCall {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
  items: SpecificArtist[];
}

export interface RecentlyPlayedCall {
  href: string;
  limit: number;
  next: string;
  cursors: Cursors;
  total: number;
  items: Item[];
}

interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface ExternalUrls {
  spotify: string;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

interface ExternalIDS {
  isrc: string;
}

interface SpecificArtist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

interface Followers {
  href: string;
  total: number;
}

interface Cursors {
  after: string;
  before: string;
}

interface Item {
  track: Track;
  played_at: string;
  context: Context;
}

interface Context {
  type: string;
  href: string;
  external_urls: ExternalUrls;
  uri: string;
}

interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restrictions;
  type: string;
  uri: string;
  copyrights: Copyright[];
  external_ids: ExternalIDS;
  genres: string[];
  label: string;
  popularity: number;
  album_group: string;
  artists: AlbumArtist[];
}

interface AlbumArtist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface Copyright {
  text: string;
  type: string;
}

interface Restrictions {
  reason: string;
}

export type TimeRange = "short_term" | "medium_term" | "long_term";

export interface Session {
  accessToken: string;
  user: {
    image: string;
    name: string;
    id: string;
  };
}
