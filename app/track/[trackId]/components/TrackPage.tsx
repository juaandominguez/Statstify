"use client";
import Chart from "chart.js/auto";
import { RadialLinearScale } from "chart.js";
import { Radar } from "react-chartjs-2";
import {
  getRecommendedTracks,
  getTrack,
  getTrackFeatures,
} from "@/utils/fetchWebapi";
import { AudioFeatures, Track } from "@/utils/types";
import Image from "next/image";
import Heading from "@/components/Heading";
import React, { useEffect, useState, useRef } from "react";
import { audioFeatures } from "@/utils/AudioFeatures";
import next from "@/public/assets/next.png";
import prev from "@/public/assets/prev.png";

Chart.register(RadialLinearScale);

interface TrackPageProps {
  trackId: string;
  session: any;
}
const TrackPage: React.FC<TrackPageProps> = ({ trackId, session }) => {
  const [track, setTrack] = useState<Track>();
  const [trackFeatures, setTrackFeatures] = useState<AudioFeatures>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recommendedTracks, setRecommendedTracks] = useState<Track[]>([]);
  const recommendedTracksRef = useRef<HTMLDivElement>(null);

  const handleNextClick = () => {
    if (recommendedTracksRef.current) {
      recommendedTracksRef.current.scrollBy({
        left: 1000,
        behavior: "smooth",
      });
    }
  };

  const handlePreviousClick = () => {
    if (recommendedTracksRef.current) {
      recommendedTracksRef.current.scrollBy({
        left: -1000,
        behavior: "smooth",
      });
    }
  };
  const mapKeys = (n: number) => {
    switch (n) {
      case 0:
        return "C";
      case 1:
        return "C♯/D♭";
      case 2:
        return "D";
      case 3:
        return "D♯/E♭";
      case 4:
        return "E";
      case 5:
        return "F";
      case 6:
        return "F♯/G♭";
      case 7:
        return "G";
      case 8:
        return "G♯/A♭";
      case 9:
        return "A";
      case 10:
        return "A♯/B♭";
      case 11:
        return "B";
      default:
        return "";
    }
  };
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
        console.log(e);
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
    <main className="m-10 flex w-[80vw] flex-col items-center justify-center">
      <section className="flex w-full flex-col items-center md:flex-row">
        <a
          href={track.external_urls.spotify}
          target="_blank"
          className="flex w-[50vw] sm:w-[40vw] lg:w-[30vw] xl:w-[20vw]"
        >
          <Image
            src={track.album.images[0].url}
            alt="album cover"
            width={track?.album.images[0].width}
            height={track?.album.images[0].height}
          />
        </a>
        <article className="m-10 flex flex-col space-y-3">
          <h2 className="text-2xl font-bold text-white">{track.name}</h2>
          <p className="font-semibold">
            {track.artists.map((artist, index) => (
              <a
                href={`${process.env.NEXT_PUBLIC_URL}/artist/${artist.id}`}
                key={artist.id}
                className="duration-200 hover:text-white"
              >
                {artist.name}
                {index !== track.artists.length - 1 ? ", " : ""}
              </a>
            ))}
          </p>
        </article>
      </section>
      <section className="mt-3 flex w-[75vw] flex-wrap justify-between md:mt-10">
        <div className="my-5 flex w-48 flex-col items-center justify-center md:w-[17vw]">
          <h5 className="text-xl font-bold text-white">
            {track.album.release_date}
          </h5>
          <p className="font-semibold">Release date</p>
        </div>
        <div className="my-5 flex w-48 flex-col items-center justify-center md:w-[17vw]">
          <h5 className="text-xl font-bold text-white">{`${Math.floor(
            track.duration_ms / 1000 / 60
          )}:${Math.ceil((track.duration_ms / 1000) % 60)}`}</h5>
          <p className="font-semibold">Track length</p>
        </div>
        <div className="my-5 flex w-48 flex-col items-center justify-center md:w-[17vw]">
          <h5 className="text-xl font-bold text-white">
            {track.popularity / 10}
          </h5>
          <p className="font-semibold">0-10 Popularity</p>
        </div>
        <div className="my-5 flex w-48 flex-col items-center justify-center md:w-[17vw]">
          <h5 className="text-xl font-bold text-white">
            {track.explicit ? "Yes" : "No"}
          </h5>
          <p className="font-semibold">Explicit</p>
        </div>
      </section>
      <section className="flex w-full flex-col items-start justify-start">
        <Heading
          title="Appears on"
          description={`Albums featuring ${track.name}`}
          margin={false}
        />
        <a
          href={track.album.external_urls.spotify}
          target="_blank"
          className="mt-5 flex w-[40vw] sm:w-[30vw] lg:w-[20vw] xl:w-[10vw]"
        >
          <Image
            src={track.album.images[0].url}
            alt="album cover"
            width={track?.album.images[0].width}
            height={track?.album.images[0].height}
          />
        </a>
        <a href={track.album.external_urls.spotify} target="_blank">
          <p className="mt-3 font-semibold text-white">{track.album.name}</p>
        </a>
      </section>
      <section className="flex w-full flex-col items-start justify-start">
        <Heading
          title="Audio Features"
          description="Audio features of the track"
          margin={false}
        />
        <article className="mt-6 flex w-full flex-row flex-wrap items-center justify-around">
          <div className="flex flex-col">
            <div className="grid w-full grid-cols-2 gap-4">
              {audioFeatures.map((feature: string, index) => (
                <div className="flex flex-col" key={index}>
                  <p className="font-semibold">
                    {feature.charAt(0).toUpperCase() + feature.slice(1)}
                  </p>
                  <progress
                    className="progress-primary progress w-40 sm:w-56"
                    value={Math.abs(trackFeatures[feature]) * 100}
                    max="100"
                  ></progress>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
              <div className="h-42 flex h-[10vh] flex-col items-center justify-center rounded-xl bg-[#18181C]">
                <h3 className="text-4xl font-semibold text-primary">
                  {trackFeatures.loudness.toFixed(1)}
                </h3>
                <p className="font-semibold">Loudness</p>
              </div>
              <div className="h-42 flex h-[10vh] flex-col items-center justify-center rounded-xl bg-[#18181C]">
                <h3 className="text-4xl font-semibold text-primary">
                  {mapKeys(trackFeatures.key)}
                </h3>
                <p className="font-semibold">Key/s</p>
              </div>
              <div className="h-42 flex h-[10vh] flex-col items-center justify-center rounded-xl bg-[#18181C]">
                <h3 className="text-4xl font-semibold text-primary">
                  {trackFeatures.mode === 1 ? "Major" : "Minor"}
                </h3>
                <p className="font-semibold">Mode</p>
              </div>
              <div className="h-42 flex h-[10vh] flex-col items-center justify-center rounded-xl bg-[#18181C]">
                <h3 className="text-4xl font-semibold text-primary">
                  {`${trackFeatures.time_signature}/4`}
                </h3>
                <p className="font-semibold">Time Signature</p>
              </div>
              <div className="h-42 flex h-[10vh] flex-col items-center justify-center rounded-xl bg-[#18181C]">
                <h3 className="text-4xl font-semibold text-primary">
                  {trackFeatures.tempo.toFixed(1)}
                </h3>
                <p className="font-semibold">BPM</p>
              </div>
            </div>
          </div>
          <aside className="flex h-80 w-80 items-center justify-center lg:h-[30vw] lg:w-[30vw]">
            <Radar
              data={{
                labels: [
                  "Danceable",
                  "Energetic",
                  "Lively",
                  "Speechful",
                  "Acoustic",
                  "Valence",
                ],
                datasets: [
                  {
                    data: [
                      trackFeatures.danceability * 100,
                      trackFeatures.energy * 100,
                      trackFeatures.liveness * 100,
                      trackFeatures.speechiness * 100,
                      trackFeatures.acousticness * 100,
                      trackFeatures.valence * 100,
                    ],
                    fill: true,
                    backgroundColor: "rgba(80, 228, 122, 0.2)",
                    borderColor: "rgba(80, 228, 122, 1)",
                    pointBackgroundColor: "rgba(80, 228, 122, 1)",
                    pointHoverBorderColor: "rgba(80, 228, 122, 1)",
                    pointBorderColor: "rgba(0, 0, 0, 0.1)",
                  },
                ],
              }}
              options={{
                scales: {
                  r: {
                    max: 100,
                    pointLabels: {
                      color: "white",
                    },
                    grid: {
                      color: "rgba(100, 100, 100, 0.1)",
                    },
                    angleLines: {
                      color: "rgba(255, 255, 255, 0.1)",
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
              width={700}
              height={700}
            />
          </aside>
        </article>
      </section>
      <section className="flex w-full flex-col items-start justify-start">
        <Heading
          title="Recommended Tracks"
          description="Tracks similar to this one"
          margin={false}
        />
        <article
          className="mt-6 flex w-full flex-row items-center gap-3 overflow-x-hidden"
          ref={recommendedTracksRef}
        >
          {recommendedTracks?.map((track) => (
            <div key={track.id} className="flex flex-col">
              <a
                className="h-[20vw] w-[20vw] lg:h-64 lg:w-64"
                href={`${process.env.NEXT_PUBLIC_URL}/track/${track.id}`}
              >
                <Image
                  src={track.album.images[0].url}
                  alt="album cover"
                  width={track?.album.images[0].width}
                  height={track?.album.images[0].height}
                />
              </a>
              <p className="mt-2 font-semibold text-white">{track.name}</p>
              <p className="font-semibold text-gray-400">
                {track.artists[0].name}
              </p>
            </div>
          ))}
          <button
            className="btn absolute right-[11vw] h-10 w-20 rounded-full"
            onClick={handleNextClick}
          >
            <Image
              src={next.src}
              alt="Next"
              width={next.width}
              height={next.height}
            />
          </button>
          <button
            className="btn absolute left-[11vw] h-10 w-20 rounded-full"
            onClick={handlePreviousClick}
          >
            <Image
              src={prev.src}
              alt="Previous"
              width={prev.width}
              height={prev.height}
            />
          </button>
        </article>
      </section>
    </main>
  );
};

export default TrackPage;
