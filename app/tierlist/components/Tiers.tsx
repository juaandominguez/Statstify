"use client";
import React, { useEffect, useState } from "react";
import Tier from "./Tier";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { animations } from "@formkit/drag-and-drop";
import { getAlbum, getAlbumTracks, getPlaylist } from "@/utils/fetchWebapi";
import { TierTrack, TierType } from "@/types/types";
import Grabber from "@/icons/Grabber";

let tiersInput = ["Top", "Very Good", "Mid", "Bad"];

interface TierProps {
  tierType: TierType;
  id: string;
  session: any;
}
const Tiers: React.FC<TierProps> = ({ id, session, tierType }) => {
  const [items, setItems] = useState<TierTrack[][]>();
  const [name, setName] = useState<string>();
  const [list, tiers] = useDragAndDrop<HTMLUListElement, string>(tiersInput, {
    dragHandle: ".tier-handle",
    plugins: [animations()],
  });

  useEffect(() => {
    const getTrackFromAlbum = async () => {
      const album = await getAlbum(id, session.accessToken);
      const response = await getAlbumTracks(id, session.accessToken);
      const tracks = response.map((track) => ({
        id: track.id,
        name: track.name,
        image: album?.images[2]?.url,
      }));
      setItems([tracks]);
      setName(album?.name);
    };

    const getTrackFromPlaylist = async () => {
      const playlist = await getPlaylist(id, session.accessToken);
      const tracks = playlist?.tracks?.items.map((track) => ({
        id: track.track?.id,
        name: track.track?.name,
        image: track.track?.album?.images[2]?.url,
      }));
      setItems([tracks]);
      setName(playlist?.name);
    };
    if (tierType == "album") {
      getTrackFromAlbum();
    } else {
      getTrackFromPlaylist();
    }
  }, [id, session.accessToken, tierType]);

  return (
    <div className="flex w-full flex-col">
      <ul className="flex flex-col" ref={list}>
        {tiers.map((tier) => (
          <li
            key={tier}
            data-label={tier}
            className="mt-4 flex h-full w-full flex-row items-center justify-center space-x-4"
          >
            <Grabber className="tier-handle h-[30px] w-[30px] cursor-pointer" />
            <Tier items={[]} name={tier} />
          </li>
        ))}
      </ul>
      {items ? (
        <div className="mt-10">
          <Tier items={items[0] || []} name={name || "Album"} />
        </div>
      ) : (
        <p className="mt-10 text-center text-lg">Loading tracks...</p>
      )}
    </div>
  );
};

export default Tiers;
