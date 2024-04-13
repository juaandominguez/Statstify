"use client";
import NavbarSimplified from "@/components/NavbarSimplified";
import React from "react";
import TrackPage from "./components/TrackPage";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
const Page = ({ params }: { params: { trackId: string } }) => {
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
    <main className="flex flex-col items-center justify-center">
      <NavbarSimplified session={session} />
      <TrackPage trackId={params.trackId} session={session} />
    </main>
  );
};

export default Page;
