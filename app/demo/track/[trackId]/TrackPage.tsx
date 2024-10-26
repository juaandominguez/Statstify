"use client";
import Chart from "chart.js/auto";
import { RadialLinearScale } from "chart.js";
import {
  getRecommendedTracks,
  getTrack,
  getTrackFeatures,
} from "@/utils/fetchStubApi";
import { AudioFeatures, Track } from "@/types/types";
import Heading from "@/components/Heading";
import React, { useEffect, useState } from "react";
import TrackCarrousel from "@/components/carrousels/TrackCarrousel";
import TrackStats from "@/app/track/[trackId]/components/TrackStats";
import TrackMain from "@/app/track/[trackId]/components/TrackMain";
import TrackAudioFeatures from "@/app/track/[trackId]/components/TrackAudioFeatures";
import TrackAppearsOn from "@/app/track/[trackId]/components/TrackAppearsOn";

Chart.register(RadialLinearScale);

const TrackPage = () => {
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
        await Promise.all([
          getTrack(),
          getTrackFeatures(),
          getRecommendedTracks(),
        ]).then(([track, trackFeatures, recommendedTracks]) => {
          setTrack(track);
          setTrackFeatures(trackFeatures);
          setRecommendedTracks(recommendedTracks);
        });
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
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
      <TrackMain track={track} demo={true} />
      <TrackStats track={track} />
      <TrackAppearsOn track={track} demo={true} />
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
