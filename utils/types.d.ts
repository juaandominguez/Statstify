export interface Spotify {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
    items: Track[];
}

export interface Track {
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

export interface Album {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: Date;
    release_date_precision: string;
    type: string;
    uri: string;
    artists: Artist[];
    genres: string[]
}

export interface Artist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface ExternalUrls {
    spotify: string;
}

export interface Image {
    url: string;
    height: number;
    width: number;
}

export interface ExternalIDS {
    isrc: string;
}

export interface SpecificTrack {
    album: Album;
    artists: Artist[];
    available_markets: any[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIDS;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    popularity: number;
    preview_url: null;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
}
