import React from "react";
import TierItem from "./TierItem";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { TierTrack } from "@/types/types";
interface TierProps {
  items: TierTrack[];
  name: string;
}

const Tier: React.FC<TierProps> = ({ items, name }) => {
  const [tier, songs] = useDragAndDrop<HTMLUListElement, TierTrack>(items, {
    group: "tier",
    dragHandle: ".draggable-item",
  });
  return (
    <div className="flex w-full flex-row rounded-md border border-gray-700">
      <div className="flex min-h-full w-32 min-w-[7rem] items-center justify-center border-r border-gray-700">
        <p className="line-clamp-6 w-full break-words px-2 text-center font-semibold">
          {name}
        </p>
      </div>
      <ul
        className="flex h-full min-h-[8rem] w-full flex-wrap items-start gap-x-4 pb-4 pl-2 pt-6"
        ref={tier}
      >
        {songs?.map((item) => (
          <li data-label={item} key={item.id}>
            <TierItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tier;
