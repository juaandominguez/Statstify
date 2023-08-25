"use client";
import Chart from "chart.js/auto";
import { RadialLinearScale } from "chart.js";

import {
  getRecommendedTracks,
  getTrack,
  getTrackFeatures,
} from "@/utils/fetchWebapi";
import { AudioFeatures, Track } from "@/utils/types";
import Heading from "@/components/Heading";
import React, { useEffect, useState } from "react";
import TrackCarrousel from "@/components/TrackCarrousel";
import TrackStats from "./TrackStats";
import TrackMain from "./TrackMain";
import TrackAudioFeatures from "./TrackAudioFeatures";
import TrackAppearsOn from "./TrackAppearsOn";

Chart.register(RadialLinearScale);

interface TrackPageProps {
  trackId: string;
  session: any;
}
const TrackPage: React.FC<TrackPageProps> = ({ trackId, session }) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [track, setTrack] = useState<Track>();
  const [trackFeatures, setTrackFeatures] = useState<AudioFeatures>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recommendedTracks, setRecommendedTracks] = useState<Track[]>([]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const tr = await getTrack(trackId, session.accessToken);
        setTrack(tr);
        const tf = await getTrackFeatures(trackId, session.accessToken);
        setTrackFeatures(tf);
        const rt = await getRecommendedTracks(trackId, session.accessToken);
        setRecommendedTracks(rt);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [trackId, session.accessToken]);
  if (isLoading) {
    return (
      <div className="flex h-[90vh] w-[90vw] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  } else if (track?.id === undefined || trackFeatures?.id === undefined) {
    return (
      <div className="flex h-[90vh] w-[90vw] items-center justify-center">
        <span className="text-2xl text-primary">Track not found</span>
      </div>
    );
  }
  return (
    <article className="m-10 flex w-[80vw] flex-col items-center justify-center">
      <TrackMain track={track} />
      <TrackStats track={track} />
      <TrackAppearsOn track={track} />
      <TrackAudioFeatures trackFeatures={trackFeatures} />
      <section className="flex w-full flex-col items-start justify-start">
        <Heading
          title="Recommended Tracks"
          description="Tracks similar to this one"
          margin={false}
        />
        <TrackCarrousel windowWidth={windowWidth} tracks={recommendedTracks} />
      </section>
    </article>
  );
};

export default TrackPage;
