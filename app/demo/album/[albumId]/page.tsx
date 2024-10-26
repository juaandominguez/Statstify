"use client";
import React from "react";
import Disclaimer from "../../Disclaimer";
import AlbumPage from "./AlbumPage";
const Page = ({ params }: { params: { albumId: string } }) => {
  return (
    <main className="flex flex-col items-center justify-center">
      <Disclaimer />
      <AlbumPage albumId={params.albumId} />
    </main>
  );
};

export default Page;
