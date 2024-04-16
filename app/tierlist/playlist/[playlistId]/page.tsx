"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Tiers from "../../components/Tiers";
const Page = ({ params }: { params: { playlistId: string } }) => {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") redirect("/sign-in");
  if (status === "loading") {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  return (
    <main className="mx-auto my-[10dvh] flex min-h-[80dvh] w-[90vw] max-w-[1300px] items-center justify-center">
      <Tiers id={params.playlistId} session={session} tierType="playlist" />
    </main>
  );
};

export default Page;
