import React, { useEffect, useState } from "react";
import AlbumMain from "./AlbumMain";
import { Album, Track } from "@/types/types";
import { getAlbum, getAlbumTracks } from "@/utils/fetchWebapi";
import AlbumStats from "./AlbumStats";
import AlbumTracks from "./AlbumTracks";
interface Props {
  albumId: string;
  session: any;
}

const AlbumPage: React.FC<Props> = ({ albumId, session }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [album, setAlbum] = useState<Album | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        setIsLoading(true);
        const albumFetch = await getAlbum(albumId, session.accessToken);
        const albumTracksFetch = await getAlbumTracks(
          albumId,
          session.accessToken,
        );
        setAlbum(albumFetch);
        setTracks(albumTracksFetch);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [albumId, session.accessToken]);
  if (isLoading) {
    return (
      <div className="flex h-[90vh] w-[90vw] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  } else if (album?.id === undefined) {
    return (
      <div className="flex h-[90vh] w-[90vw] items-center justify-center">
        <span className="text-2xl text-primary">Album not found</span>
      </div>
    );
  }
  return (
    <article className="m-10 flex w-[80vw] flex-col items-center justify-center">
      <AlbumMain album={album} albumId={albumId} />
      <AlbumStats album={album} />
      <AlbumTracks tracks={tracks} />
    </article>
  );
};

export default AlbumPage;
