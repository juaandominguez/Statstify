import React from "react";
import Heading from "@/components/Heading";
import { AudioFeatures } from "@/utils/types";
import { audioFeatures } from "@/utils/AudioFeatures";
import mapKeys from "@/utils/mapKeys";
import { Radar } from "react-chartjs-2";
interface Props {
  trackFeatures: AudioFeatures;
}
const TrackAudioFeatures: React.FC<Props> = ({ trackFeatures }) => {
  return (
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
                {trackFeatures?.loudness?.toFixed(1)}
              </h3>
              <p className="font-semibold">Loudness</p>
            </div>
            <div className="h-42 flex h-[10vh] flex-col items-center justify-center rounded-xl bg-[#18181C]">
              <h3 className="text-4xl font-semibold text-primary">
                {mapKeys(trackFeatures?.key)}
              </h3>
              <p className="font-semibold">Key/s</p>
            </div>
            <div className="h-42 flex h-[10vh] flex-col items-center justify-center rounded-xl bg-[#18181C]">
              <h3 className="text-4xl font-semibold text-primary">
                {trackFeatures?.mode === 1 ? "Major" : "Minor"}
              </h3>
              <p className="font-semibold">Mode</p>
            </div>
            <div className="h-42 flex h-[10vh] flex-col items-center justify-center rounded-xl bg-[#18181C]">
              <h3 className="text-4xl font-semibold text-primary">
                {`${trackFeatures?.time_signature}/4`}
              </h3>
              <p className="font-semibold">Time Signature</p>
            </div>
            <div className="h-42 flex h-[10vh] flex-col items-center justify-center rounded-xl bg-[#18181C]">
              <h3 className="text-4xl font-semibold text-primary">
                {trackFeatures?.tempo.toFixed(1)}
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
  );
};

export default TrackAudioFeatures;
