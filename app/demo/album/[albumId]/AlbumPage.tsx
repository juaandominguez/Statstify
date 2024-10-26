import React, { useEffect, useState } from "react";
import { Album, Track } from "@/types/types";
import { getAlbum, getAlbumTracks } from "@/utils/fetchStubApi";
import AlbumMain from "@/app/album/[albumId]/components/AlbumMain";
import AlbumStats from "@/app/album/[albumId]/components/AlbumStats";
import AlbumTracks from "@/app/album/[albumId]/components/AlbumTracks";

interface AlbumPageProps {
  albumId: string;
}

const AlbumPage: React.FC<AlbumPageProps> = ({ albumId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [album, setAlbum] = useState<Album | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        await Promise.all([getAlbum(), getAlbumTracks()]).then(
          ([albumFetch, albumTracksFetch]) => {
            setAlbum(albumFetch);
            setTracks(albumTracksFetch);
          },
        );
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
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
      <AlbumMain album={album} albumId={albumId} demo={true} />
      <AlbumStats album={album} />
      <AlbumTracks tracks={tracks} />
    </article>
  );
};

export default AlbumPage;
