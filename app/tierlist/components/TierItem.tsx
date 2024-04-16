import React from "react";
import Image from "next/image";
import { TierTrack } from "@/types/types";

interface TierItemProps {
  item: TierTrack;
}

const TierItem: React.FC<TierItemProps> = ({ item }) => {
  return (
    <div className="draggable-item flex cursor-pointer flex-col items-center ">
      <Image
        src={item.image}
        alt={item.name}
        className="mb-2 aspect-square"
        width={64}
        height={64}
      />
      <p className="line-clamp-3 w-24 break-words text-center text-xs font-semibold">
        {item.name}
      </p>
    </div>
  );
};

export default TierItem;
