"use client";
import React, { useEffect, useState } from "react";
import Tier from "./Tier";
import Equal from "@/icons/Equal";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { animations } from "@formkit/drag-and-drop";
import { getAlbum, getAlbumTracks } from "@/utils/fetchWebapi";
import { TierTrack } from "@/types/types";

let tiersInput = ["Top", "Very Good", "Mid", "Bad"];

interface TierProps {
  albumId: string;
  session: any;
}
const Tiers: React.FC<TierProps> = ({ albumId, session }) => {
  const [items, setItems] = useState<TierTrack[][]>();
  const [albumName, setAlbumName] = useState<string>();
  const [list, tiers] = useDragAndDrop<HTMLUListElement, string>(tiersInput, {
    dragHandle: ".tier-handle",
    plugins: [animations()],
  });
  useEffect(() => {
    (async () => {
      const album = await getAlbum(albumId, session.accessToken);
      const response = await getAlbumTracks(albumId, session.accessToken);
      const tracks = response.map((track) => ({
        id: track.id,
        name: track.name,
        image: album?.images[2]?.url,
      }));
      setItems([tracks]);
      setAlbumName(album?.name);
    })();
  }, [albumId, session.accessToken]);

  return (
    <div className="flex w-full flex-col">
      <ul className="flex flex-col" ref={list}>
        {tiers.map((tier) => (
          <li
            key={tier}
            data-label={tier}
            className="mt-4 flex h-full w-full flex-row items-center justify-center space-x-4"
          >
            <Equal className="tier-handle h-[36px] w-[36px] cursor-pointer" />
            <Tier items={[]} name={tier} />
          </li>
        ))}
      </ul>
      {items && (
        <div className="mt-10">
          <Tier items={items[0] || []} name={albumName || "Album"} />
        </div>
      )}
    </div>
  );
};

export default Tiers;
