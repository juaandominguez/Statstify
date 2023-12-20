import { CarrouselItem, Album } from "@/types/types";
import React from "react";
import Carrousel from "./Carrousel";

interface Props {
  windowWidth: number;
  albums: Album[];
}

const AlbumCarrousel: React.FC<Props> = ({ windowWidth, albums }) => {
  const items: CarrouselItem[] = albums.map((album) => ({
    id: album.id,
    image: album.images[0]?.url,
    primary: album.name,
    artists: album.artists,
    type: "album",
  }));

  return <Carrousel windowWidth={windowWidth} items={items} />;
};

export default AlbumCarrousel;
