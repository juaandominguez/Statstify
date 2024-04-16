import React, { useEffect, useState } from "react";
import PlaylistMain from "./PlaylistMain";
import { PlaylistCall } from "@/types/types";
import { getPlaylist } from "@/utils/fetchWebapi";
import PlaylistStats from "./PlaylistStats";
import PlaylistTracks from "./PlaylistTracks";
interface Props {
  playlistId: string;
  session: any;
}

const PlaylistPage: React.FC<Props> = ({ playlistId, session }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<PlaylistCall | null>(null);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        setIsLoading(true);
        const playlistFetch = await getPlaylist(
          playlistId,
          session.accessToken,
        );
        setPlaylist(playlistFetch);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [playlistId, session.accessToken]);
  if (isLoading) {
    return (
      <div className="flex h-[90vh] w-[90vw] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  } else if (playlist?.id === undefined) {
    return (
      <div className="flex h-[90vh] w-[90vw] items-center justify-center">
        <span className="text-2xl text-primary">Playlist not found</span>
      </div>
    );
  }
  return (
    <article className="m-10 flex w-[80vw] flex-col items-center justify-center">
      <PlaylistMain playlist={playlist} playlistId={playlistId} />
      <PlaylistStats playlist={playlist} />
      <PlaylistTracks tracks={playlist.tracks.items} />
    </article>
  );
};

export default PlaylistPage;
