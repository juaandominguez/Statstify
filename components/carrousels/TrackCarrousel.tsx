import { CarrouselItem, Track } from "@/types/types";
import React from "react";
import Carrousel from "./Carrousel";

interface Props {
  windowWidth: number;
  tracks: Track[];
}

const TrackCarrousel: React.FC<Props> = ({ windowWidth, tracks }) => {
  const items: CarrouselItem[] = tracks.map((track) => ({
    id: track.id,
    image: track.album.images[0]?.url,
    primary: track.name,
    artists: track.artists,
    type: "track",
  }));

  return <Carrousel windowWidth={windowWidth} items={items} />;
};

export default TrackCarrousel;
