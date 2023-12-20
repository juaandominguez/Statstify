import { CarrouselItem, SpecificArtist } from "@/types/types";
import React from "react";
import Carrousel from "./Carrousel";

interface Props {
  windowWidth: number;
  artists: SpecificArtist[];
}

const AlbumCarrousel: React.FC<Props> = ({ windowWidth, artists }) => {
  const items: CarrouselItem[] = artists.map((artist) => ({
    id: artist.id,
    image: artist.images[0]?.url,
    primary: artist.name,
    artists: [],
    type: "artist",
  }));

  return <Carrousel windowWidth={windowWidth} items={items} />;
};

export default AlbumCarrousel;
