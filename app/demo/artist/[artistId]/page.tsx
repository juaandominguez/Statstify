"use client";
import React from "react";
import Disclaimer from "../../Disclaimer";
import ArtistPage from "./ArtistPage";
const Page = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <Disclaimer />
      <ArtistPage />
    </main>
  );
};

export default Page;
