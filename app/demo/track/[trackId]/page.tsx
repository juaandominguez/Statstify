import React from "react";
import TrackPage from "./TrackPage";
import Disclaimer from "../../Disclaimer";
const Page = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <Disclaimer />
      <TrackPage />
    </main>
  );
};

export default Page;
