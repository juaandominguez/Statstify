import React, { useState, useEffect } from "react";
import { Item, Track } from "@/utils/types";
import formatDate from "@/utils/formatDate";
interface RecentlyPlayedProps {
    recentTracks: Item[];
}

const RecentlyPlayed: React.FC<RecentlyPlayedProps> = ({ recentTracks }) => {
    const [tracks, setTracks] = useState<Item[]>([]);
    let prevDate = "";
    useEffect(() => {
        setTracks(recentTracks);
        console.log(recentTracks)
    }, [recentTracks]);
    return (
        <>
            {tracks?.map((item) => {
                const date = item.played_at.substring(0, 10);
                const shouldShowDate = date !== prevDate;
                prevDate = date;

                return (
                    <div key={item.track.id}>
                        {shouldShowDate && <div className="text-white">{formatDate(date)}</div>}
                        <div>{item.track.name}</div>
                    </div>
                );
            })}
        </>
    );
};

export default RecentlyPlayed;
